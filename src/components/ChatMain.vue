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
        v-for="(message, index) in activeMessages"
        :key="`${message.user_id}-${message.chat_id}-${index}`"
        :user="message.user"
        :message="message.message"
        :direction="message.direction"
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
const lorem =
  "Dictum consectetur, ornare ridiculus vel eleifend volutpat a. Augue elit iaculis sagittis maecenas gravida? Sed habitasse nec luctus nostra massa accumsan adipiscing suspendisse a fusce molestie netus! Dictumst massa adipiscing sodales venenatis cras iaculis feugiat litora integer. Metus tempus blandit, urna praesent dis sociis maecenas. Morbi arcu placerat etiam mollis ac! Lacinia viverra convallis.";
import Message from "./Message.vue";
// import {mapState} from 'vuex'
// import EventBus from './event-bus';

export default {
    components: {
        Message
    },
    props: ['user', 'activeMessages', 'myUserId', 'roomId'],
    data() {
      return {
        textMessage: ''
      }
    },
    mounted() {
      console.log('ChatMain::user', this.user);
    },
    methods: {
        sendMessage() {
            if (this.textMessage === "") return;
            const message = this.makeMessage(this.myUserId, this.textMessage);
            this.emitMessage(message);
            // this.$store.dispatch('addMessage', message);
            this.$store.commit('addMessage', message);
            const botMessage = this.botReply();
            if (botMessage) {
              this.emitMessage(botMessage);
              // this.$store.dispatch('addMessage', botMessage);
              this.$store.commit('addMessage', botMessage);
            }
            this.textMessage = "";
            
        },
        botReply() {  
          const shouldReply = Math.random() >= 0.4;
          if (!shouldReply) return false;
          const randomText = lorem.slice(
              ~~(Math.random() * 10),
              ~~(Math.random() * 50 + 60)
          )
          return this.makeMessage(this.user.id, randomText);
        },
        makeMessage(userId, message) {
          const now = new Date();
          const h = now.getHours();
          const m = now.getMinutes();
            
          return {
            user_id: userId,
            chat_id: this.roomId,
            message: {
              content: message,
              created_at: now,
              seen: `Seen ${(h > 12) ? (h-12 + ':' + m +' PM') : (h + ':' + m +' AM')}`
            },
          }
        },
        emitMessage(message) {
          this.$emit('message', message);
        }
  }
}
</script>