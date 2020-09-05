import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// const BASE_URL = `http://eyeteam.vn:8100`;
const BASE_URL = `http://localhost:3456`;
Vue.use(Vuex);

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  withCredentials: false,
});

export default new Vuex.Store({
  state: {
    conversations: [],
    messages: [],
    users: [],
    curConvId: '',
    myUser: {},
    user: {
      id: '',
      username: '',
      name: '',
      avatar: '',
      description: '',
    },
  },
  mutations: {
    LOGIN(state, payload) {
      state.myUser = payload;
    },
    FETCH_CONVERSATIONS(state, payload) {
      state.conversations = payload;
    },
    CHANGE_CURRENT_CONVERSATION(state, payload) {
      state.curConvId = payload;
    },
    CHANGE_MESSAGE(state, payload) {
      state.messages = payload;
    },
    FETCH_USERS(state, payload) {
      state.users = payload;
    },
    CHANGE_USER(state, payload){
      state.user = payload;
    },
    LISTEN_MESSAGE(state, payload) {
      state.messages.push(payload);
    },
  },
  actions: {
    fetchConversations(ctx) {
      return new Promise((resolve, reject) => {
        client
          .get(`${BASE_URL}/conversation?username=${ctx.state.myUser.username}`)
          .then((res) => {
            ctx.commit('FETCH_CONVERSATIONS', res.data);
            ctx.commit('CHANGE_CURRENT_CONVERSATION', (res.data[0] && res.data[0].id) || 0);
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    fetchConversationById(ctx, payload) {
      return new Promise((resolve, reject) => {
        client
          .get(`${BASE_URL}/conversation/${payload}`)
          .then((res) => {
            const { user1Id, user2Id } = ctx.state.conversations.find((c) => c.id === ctx.state.curConvId);
            const findId = (user1Id == ctx.state.myUser.id ? user2Id : user1Id);
            const user = ctx.state.users.find((u) => u.id == findId);
            ctx.commit('CHANGE_USER', user);
            ctx.commit('CHANGE_MESSAGE', res.data.messages);
            resolve(res.data);
          })
          .catch((err) => reject(err));
      });
    },
    addMessage(ctx, payload) {
      const { user1Id, user2Id } = ctx.state.conversations.find((c) => c.id === ctx.state.curConvId);
      const findId = (user1Id == ctx.state.myUser.id ? user2Id : user1Id)
      const username2 = ctx.state.users.find((u) => u.id == findId).username;
      return new Promise((resolve, reject) => {
        client
          .post(`${BASE_URL}/message`, {
            username1: ctx.state.myUser.username,
            username2: username2,
            content: payload,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    login(ctx, payload) {
      return new Promise((resolve, reject) => {
        client
          .post(`${BASE_URL}/login`, { username: payload })
          .then((res) => {
            ctx.commit('LOGIN', res.data);
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    fetchUsers(ctx) {
      return new Promise((resolve, reject) => {
        client
          .get(`${BASE_URL}/user`)
          .then((res) => {
            ctx.commit('FETCH_USERS', res.data);
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
