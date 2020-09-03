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
            <conversation :conv="conv"></conversation>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <chat-main
        ref="chatMain"
        :my-user-id="myUserId"
        :room-id="curRoomId"
        :user="user"
        :active-messages="activeMessages"
        @message="onMessage"
      ></chat-main>

      <el-aside width="350px" style="background-color: rgb(238, 241, 246)">
        <Info :user="user"></Info>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import Info from "./Info.vue";
import Conversation from "./Conversation.vue";
import ChatMain from "./ChatMain.vue";
import { mapState } from 'vuex';
import {messageMarkup} from '../helpers/chat-helper';

// import EventBus from './event-bus';


export default {
  data() {
    console.log("data");
    return {
      curRoomId: 101,
      myUserId: 1004,
      search: "",
    };
  },
  components: {
    Info,
    Conversation,
    ChatMain,
  },
  updated() {
    this.$el.querySelector(
      "#container-message"
    ).scrollTop = this.$el.querySelector("#container-message").scrollHeight;
  },
  computed: {
    activeMessages() {
      return this.$store.getters.activeMessages;
    },
    conversations() {
      return this.$store.getters.conversations;
    },
    user() {
      if (this.curRoomId) {
        const conv = this.conversations.find((c) => c.id === this.curRoomId);
        const convName = (conv && conv.name) || "__NONAME__";
        return this.users.find((u) => u.name === convName);
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

    ...mapState(['messages', 'users'])

  },
  methods: {
    notifyChange(field, index) {
      this.$set(this[field], index, this[field][index]);
    },
    openChatRoom(roomId) {
      this.curRoomId = roomId;
    },
    addConversation() {},
    onMessage(message) {
      // this.$store.dispatch('addMessage', message);
      console.log('xxx', message);
    }
  },
  watch: {
    messages(newVal) {
      console.log("messages was changed", newVal);
    },
    conversations(newVal) {
      console.log("conversations was changed", newVal);
    },
  },
  mounted() {
    console.log('refs', this.$refs);
    window.__chat = this;
    setInterval(() => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
        
      const message = messageMarkup({
        user_id: this.myUserId,
        chat_id: this.curRoomId,
        message: {
          content: now.toISOString(),
          created_at: now,
          seen: `Seen ${(h > 12) ? (h-12 + ':' + m +' PM') : (h + ':' + m +' AM')}`
        },
      }, this.users, this.myUserId);
      // this.$refs['chatMain'].$emit('addMessage', message);
      this.$root.$emit('addMessage', message);
      this.$root.$emit('setLastMessage', message);
    }, 5000)
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
.active {
  background: white;
  border-radius: 10px;
}
</style>