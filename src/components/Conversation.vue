<template>
  <div class="conversation" @click="changeConv">
    <el-avatar :size="40" :src="avatar"></el-avatar>
    <div class="chat-summary">
      <div class="chat-name">{{username}}</div>
      <span class="last-message" v-html="lastMessage"></span>
      <span class="last-time">{{lastTime | fromNow}}</span>
    </div>
    
  </div>
</template>

<script>
export default {
  props: ["conv"],
  data() {
    return {
      privateLastMessage: "",
      avatar: "",
      username: "",
    };
  },
  mounted() {
    const findId =
      this.conv.user1Id == this.$store.state.myUser.id
        ? this.conv.user2Id
        : this.conv.user1Id;
    const user = this.$store.state.users.find((u) => u.id == findId);
    this.avatar = user.avatar;
    this.username = user.name;

    this.$root.$on("setLastMessage", this.onLastMessageHandler);
  },
  beforeDestroy() {
    this.$root.$off("setLastMessage", this.onLastMessageHandler);
  },
  methods: {
    onLastMessageHandler(data) {
      const conversationId = data.roomId;
      const messageText = data.content;
      if (conversationId !== this.conv.id) return;
      this.privateLastMessage = messageText;
    },
    changeConv(){
      this.$store.dispatch('fetchConversationById', this.conv.id);
    }
  },
  computed: {
    lastMessage() {
      return `Last: ${
        this.privateLastMessage ||
        (this.conv &&
          this.conv.messages.length != 0 &&
          this.conv.messages[this.conv.messages.length - 1].content) ||
        "&nbsp;"
      }`;
    },
    lastTime() {
      const findId =
        this.conv.user1Id == this.$store.state.myUser.id
          ? this.conv.user2Id
          : this.conv.user1Id;
      const yourMessage = this.conv.messages.filter((m) => m.userId == findId);
      return yourMessage.length != 0
        ? yourMessage[yourMessage.length - 1].createdAt
        : null;
    },
  },
};
</script>



<style scoped>
.conversation {
  text-align: start;
  display: flex;
  width: 100%;
}

.conversation .chat-summary {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 60px);
}

.conversation .chat-name {
  color: #000;
  font-weight: bold;
  line-height: 1.5;
}

.conversation .last-time {
  font-size: small;
  line-height: 1.5;
  text-align: right;
}
.conversation .last-message {
  line-height: 1.5;
}
</style>