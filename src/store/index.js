import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
const BASE_URL = `http://eyeteam.vn:8100`;
// const BASE_URL = `http://localhost:3456`;
Vue.use(Vuex);

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  withCredentials: false,
});

export default new Vuex.Store({
  state: {
    BASE_URL,
    conversations: [],
    messages: [],
    // users: [],
    curConvId: '',
    myUser: {},
    user: {
      id: '',
      username: '',
      name: '',
      avatar: '',
      description: '',
      createdAt: '',
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
    CHANGE_USER(state, payload) {
      state.user = payload;
    },
    LISTEN_MESSAGE(state, payload) {
      state.messages.push(payload);
    },
    REMOVE_LAST_CONVERSATION(state) {
      state.conversations.pop();
    },
  },
  actions: {
    async listenMessage(ctx, payload){
      const {conversationId} = payload;
      const conv = ctx.state.conversations.find(c=> c.id === conversationId);
      if (!conv){
        await ctx.dispatch('fetchConversations');
      }
      ctx.commit('LISTEN_MESSAGE', payload);
    },
    fetchConversations(ctx) {
      return new Promise((resolve, reject) => {
        client
          .get(`${BASE_URL}/conversation?username=${ctx.state.myUser.username}`)
          .then((res) => {
            ctx.commit('FETCH_CONVERSATIONS', res.data);
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
            ctx.commit('CHANGE_CURRENT_CONVERSATION', payload);
            const { user1Id, user2Id } = ctx.state.conversations.find((c) => c.id === ctx.state.curConvId);
            const findId = user1Id == ctx.state.myUser.id ? user2Id : user1Id;
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
      const findId = user1Id == ctx.state.myUser.id ? user2Id : user1Id;
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
    async createConversation(ctx, payload) {
      const { username2, content } = payload;
      console.log('start message');
      console.log({
        username1: ctx.state.myUser.username,
        username2,
        content,
      });
      await new Promise((resolve, reject) => {
        client
          .post(`${BASE_URL}/message`, {
            username1: ctx.state.myUser.username,
            username2: username2,
            content: content,
          })
          .then((res) => {
            console.log('res: ', res);
            resolve(res.data);
          })
          .catch((err) => {
            console.log('err: ', err);
            reject(err);
          });
      });
      console.log('start fetch conversation');
      await ctx.dispatch('fetchConversations');
      console.log('start fetch conversation by id');
      await ctx.dispatch('fetchConversationById', ctx.state.conversations[ctx.state.conversations.length - 1].id);
    },

    register(ctx, payload) {
      const { username, name, description, avatar } = payload;
      return new Promise((resolve, reject) => {
        client
          .post(`${BASE_URL}/register`, {
            username,
            name,
            description,
            avatar,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
