import Vue from 'vue'
import Vuex from 'vuex'
const messages = require("../mocks/messages.json");
const users = require("../mocks/users.json");
const conversations = require("../mocks/conversations.json");
import {messageMarkup} from '../helpers/chat-helper';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    conversations: conversations,
    messages: messages,
    users: users,
    curRoomId: 101,
    myUserId: 1004,

    user: {
      id: '',
      name: '',
      avatar: '',
      description: ''
    },
  },
  getters: {
    conversations(state) {
      if (!state.conversations) return [];
      return state.conversations
        .map((c) => {
          const user = state.users.find((u) => u.name === c.name);
          const lastMessage = state.messages
            .filter((m) => m.chat_id === c.id)
            .pop().message;
          c.avatar = user.avatar;
          c.lastTime = lastMessage.created_at;
          c.lastMessage = lastMessage.content;
          return c;
        });
    },
    activeMessages(state) {
      return state.messages
        .filter((m) => m.chat_id === state.curRoomId)
        .map(m => messageMarkup(m, state.users, state.myUserId));
    }
  },
  mutations: {
    addMessage(state, payload) {
      state.messages.push(payload);
    }
  },
  actions: {
    addMessage(ctx, payload) {
      ctx.commit('addMessage', payload);
    }
  }
})
