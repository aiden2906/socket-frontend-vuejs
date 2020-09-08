<template>
  <div>
    <el-dialog title="Create New Conversation" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="Receiver">
          <el-input v-model="form.username2"></el-input>
        </el-form-item>
        <el-form-item label="Content">
          <el-input v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createConversation">Confirm</el-button>
      </span>
    </el-dialog>
    <el-container style="height: 945px; border: 1px solid #eee">
      <el-aside width="350px" style="background-color: rgb(238, 241, 246); padding: 20px 30px">
        <el-menu style="border-radius: 10px">
          <el-menu-item style="padding: 0; border-radius: 10px" @click="openDialog">
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
            :class="{active: conv.id === curConvId}"
          >
            <conversation :conv="conv"></conversation>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <chat-main ref="chatMain" :my-user-id="myUserId" :room-id="curConvId" :messages="messages"></chat-main>

      <el-aside width="350px" style="background-color: rgb(238, 241, 246)">
        <Info :user="user"></Info>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import Info from "../components/Info.vue";
import Conversation from "../components/Conversation.vue";
import ChatMain from "../components/ChatMain.vue";

export default {
  data() {
    return {
      curConvId: "",
      myUserId: "",
      search: "",
      socket: null,
      dialogVisible: false,
      form: {
        username2: "",
        content: "",
      },
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
    messages() {
      return this.$store.state.messages;
    },
    conversations() {
      return this.$store.state.conversations;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    notifyChange(field, index) {
      this.$set(this[field], index, this[field][index]);
    },
    openChatRoom(roomId) {
      this.curConvId = roomId;
    },
    openDialog() {
      this.dialogVisible = true;
    },
    createConversation() {
      this.$store.dispatch("createConversation", this.form);
    },
  },
  created() {
    // eslint-disable-next-line no-undef
    this.socket = io(this.$store.state.BASE_URL);
    this.socket.emit("login", this.$store.state.myUser.username);
    this.socket.on("message", (message) => {
      this.$store.dispatch("listenMessage", message);
    });
  },
  async mounted() {
    await this.$store.dispatch("fetchUsers");
    await this.$store.dispatch("fetchConversations");
    if (this.$store.state.conversations.length !== 0) {
      await this.$store.dispatch(
        "fetchConversationById",
        this.$store.state.conversations[
          this.$store.state.conversations.length - 1
        ].id
      );
    }
    this.myUserId = this.$store.state.myUser.id;
    this.curConvId = this.$store.state.curConvId;
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