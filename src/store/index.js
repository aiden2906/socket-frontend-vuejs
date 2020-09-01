import Vue from 'vue';
import Vuex from 'vuex';
const messages = require('../mocks/messages.json');
const users = require('../mocks/users.json');
const conversations = require('../mocks/conversations.json');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    conversations: conversations,
    users: users,
    messages: messages,
  },
  mutations: {
    CHANGE_CONVERSATION(state, payload) {
      state.conversations = payload;
    },
    CHANGE_USER(state, payload) {
      state.users = payload;
    },
    CHANGE_MESSAGES(state, payload) {
      state.messages = payload;
    },
  },
  actions: {
    addMessage(ctx, payload){
      ctx.commit('CHANGE_MESSAGES', payload)
    }
  },
});
