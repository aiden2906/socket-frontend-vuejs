<template>
  <div>
    <el-container style="height: 731px; border: 1px solid #eee">
      <el-aside width="350px" style="background-color: rgb(238, 241, 246); padding: 20px 30px">
        <el-menu style="border-radius: 10px">
          <el-menu-item style="padding: 0; border-radius: 10px" @click="addConversation">
            <div style="text-align: start; display: flex">
              <div
                style="width: 50px; display: flex; justify-content: center; align-items: center; border-right: 1px solid #d9dcde"
              >
                <i class="fa fa-plus" style="color: #4477b2"></i>
              </div>
              <span style="margin: auto">New Conversation</span>
            </div>
          </el-menu-item>
        </el-menu>
        <div
          style="padding: 20px 20px; background-color: white; font-size: xx-large; text-align: start; background: rgb(238, 241, 246)"
        >
          <strong>Chats</strong>
        </div>
        <el-menu style="background: rgb(238, 241, 246); border: none" default-active="1-0">
          <el-menu-item
            style="height: 80px; display: flex; align-items: center; position: relative;"
          >
            <el-input placeholder="Search conversation" v-model="search"></el-input>
            <i class="fa fa-search" style="position: absolute; right: 35px"></i>
          </el-menu-item>
          <el-menu-item
            v-for="(conv, index) in conversations"
            :key="conv.id"
            :index="`1-${index}`"
            @click="()=>openChatRoom(conv.id)"
            class="menu-item"
            :class="{active: conv.id === curRoomId}"
          >
            <div style="text-align: start; display: flex">
              <el-avatar :size="40" :src="conv.avatar"></el-avatar>
              <div style="margin-left: 20px; display: flex; flex-direction: column">
                <div style="line-height: 20px">{{conv.name}}</div>
                <span
                  style="font-size: small; line-height: 20px; text-align: start"
                >{{conv.lastTime | fromNow}}</span>
              </div>
            </div>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container class="container-main">
        <el-header
          style="display: flex; align-items: center; height: 80px; background-color: rgb(238, 241, 246)"
        >
          <el-avatar :size="40" :src="user.avatar"></el-avatar>
          <div style="margin-left: 20px; font-size: large">{{user.name}}</div>
        </el-header>
        <el-main style="margin-bottom: 20px" id="container-message">
          <message
            v-for="(message, index) in activeMessages"
            :key="`${message.user_id}-${message.chat_id}-${index}`"
            :user="message.user"
            :message="message.message"
            :direction="message.direction"
            class="mt-3"
          ></message>
        </el-main>
        <div class="inp-message">
          <el-input
            placeholder="Enter message"
            v-model="textMessage"
            @keyup.enter.native="sendMessage"
          ></el-input>
          <i class="fa fa-paper-plane" id="icon-plane" @click="sendMessage"></i>
        </div>
      </el-container>
      <el-aside width="350px" style="background-color: rgb(238, 241, 246)">
        <Info :user="user"></Info>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import Message from "./Message.vue";
import Info from "./Info.vue";
const messages = require("../mocks/messages.json");
const users = require("../mocks/users.json");
const conversations = require("../mocks/conversations.json");

const lorem =
  "Dictum consectetur, ornare ridiculus vel eleifend volutpat a. Augue elit iaculis sagittis maecenas gravida? Sed habitasse nec luctus nostra massa accumsan adipiscing suspendisse a fusce molestie netus! Dictumst massa adipiscing sodales venenatis cras iaculis feugiat litora integer. Metus tempus blandit, urna praesent dis sociis maecenas. Morbi arcu placerat etiam mollis ac! Lacinia viverra convallis.";

export default {
  data() {
    return {
      curRoomId: 101,
      myUserId: 1004,
      messages: messages,
      textMessage: "",
      search: "",
    };
  },
  components: {
    Message,
    Info,
  },
  updated() {
    this.$el.querySelector(
      "#container-message"
    ).scrollTop = this.$el.querySelector("#container-message").scrollHeight;
  },
  computed: {
    activeMessages() {
      return this.messages
        .filter((m) => m.chat_id === this.curRoomId)
        .map((m) => {
          m.user = users.find((u) => m.user_id == u.id);
          m.direction = m.user.id == this.myUserId ? "right" : "left";
          return m;
        });
    },
    conversations() {
      return conversations
        .filter((c) => c.name.includes(this.search))
        .map((c) => {
          const user = users.find((u) => u.name === c.name);
          const created_at = this.messages
            .filter((m) => m.user_id === user.id)
            .pop().message.created_at;
          c.avatar = user.avatar;
          c.lastTime = created_at;
          return c;
        });
    },
    user() {
      if (this.curRoomId) {
        const conv = conversations.find((c) => c.id === this.curRoomId);
        return users.find((u) => u.name === conv.name);
      }
      return {};
    },
    lastTime() {
      if (this.user) {
        const created_at = this.activeMessages
          .filter((m) => m.user_id === this.user.id)
          .pop().message.created_at;
        return created_at;
      }
      return 1;
    },
  },
  methods: {
    sendMessage() {
      if (this.textMessage === "") return;
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      this.messages.push({
        user_id: this.myUserId,
        chat_id: this.curRoomId,
        message: {
          content: this.textMessage,
          created_at: Date.now(),
          seen: `Seen ${(h > 12) ? (h-12 + ':' + m +' PM') : (h + ':' + m +' AM')}`
        },
      });
      this.messageBot();
      this.textMessage = "";
    },
    openChatRoom(roomId) {
      this.curRoomId = roomId;
    },
    messageBot() {
      const random_boolean = Math.random() >= 0.4;
      if (random_boolean) {
        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes();
        this.messages.push({
          user_id: this.user.id,
          chat_id: this.curRoomId,
          message: {
            content: lorem.slice(
              ~~(Math.random() * 10),
              ~~(Math.random() * 50 + 60)
            ),
            created_at: Date.now(),
            seen: `Seen ${(h > 12) ? (h-12 + ':' + m +' PM') : (h + ':' + m +' AM')}`
          },
        });
      }
    },
    addConversation(){}
  },
};
</script>


<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.inp-message {
  width: 95%;
  margin-left: 20px;
  margin-bottom: 20px;
  position: relative;
}

.menu-item {
  height: 80px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d9dcde;
}

.mt-3 {
  margin-top: 10px;
}

.container-main {
  background-color: rgb(238, 241, 246);
  border-left: 1px solid #d9dcde;
  border-right: 1px solid #d9dcde;
}

#icon-plane {
  position: absolute;
  top: 13px;
  right: 13px;
}
.active{
  background: white;
  border-radius: 10px;
}
</style>