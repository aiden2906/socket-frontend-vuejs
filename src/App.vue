<template>
  <div id="app">
    <Chat />
  </div>
</template>

<script>
import Chat from "./components/Chat.vue";
import store from './store/index';

export default {
  name: "App",
  store,
  components: {
    Chat,
  },
};
</script>

<style>

body{
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
