<template>
  <el-container class="container-main">
    <el-header
      style="display: flex; align-items: center; height: 80px; background-color: rgb(238, 241, 246)"
    >
      <el-avatar :size="40" :src="user.avatar"></el-avatar>
      <div style="margin-left: 20px; font-size: large">{{user.name}}</div>
    </el-header>
    <el-main style="margin-bottom: 20px" id="container-message">
      <message
        v-for="(message, index) in messages"
        :key="`${message.userId}-${message.conversationId}-${index}`"
        :user="message.user || {}"
        :message="message"
        class="mt-3"
      ></message>
    </el-main>
    <div class="inp-message">
      <el-input placeholder="Enter message" v-model="textMessage" @keyup.enter.native="sendMessage"></el-input>
      <i class="fa fa-paper-plane" id="icon-plane" @click="sendMessage"></i>
    </div>
  </el-container>
</template>

<script>
import Message from "./Message.vue";

export default {
  components: {
    Message,
  },
  props: ["messages", "myUserId", "roomId"],
  data() {
    return {
      textMessage: "",
    };
  },
  computed:{
    user(){
      return this.$store.state.user;
    }
  },
  methods: {
    sendMessage() {
      if (this.textMessage === "") return;
      this.$store.dispatch('addMessage', this.textMessage);
      this.$root.$emit('setLastMessage', {
        content: this.textMessage,
        roomId: this.$store.state.curConvId
      });
      this.textMessage = "";
    },
  },
};
</script>