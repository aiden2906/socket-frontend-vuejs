<template>
  <div class="conversation">
    <el-avatar :size="40" :src="conv.avatar"></el-avatar>
    <div class="chat-summary">
      <div class="chat-name">{{conv.name}}</div>
      <span class="last-message" v-html="lastMessage"></span>
      <span class="last-time">{{conv.lastTime | fromNow}}</span>
    </div>
  </div>
</template>

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
        width: calc(100% - 60px); /* Code Ngu - Bữa sau nhờ Linh nhỏ sửa */
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

<script>
// import EventBus from './event-bus';

export default {
  props: ["conv"],
  data() {
      return {
          privateLastMessage: ''
      }
  },
  mounted() {
      console.log('mounted');
      this.$root.$on('setLastMessage', (data) => {
        const conversationId = data.chat_id;
        const messageText = data.message.content;
        if (conversationId !== this.conv.id) return;

        this.privateLastMessage = messageText;
      });
  },
  updated() {
      console.log('updated');
  },
  computed: {
      lastMessage() {
          return this.privateLastMessage || (this.conv && this.conv.lastMessage) || '&nbsp;';
      }
  },
  watch: {
      conv(newVal) {
          console.log('conv was change', newVal);
      }
  }
};
</script>