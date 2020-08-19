<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-menu-item index="1-1">Option 1</el-menu-item>
          <el-menu-item index="1-2">Option 2</el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>View</el-dropdown-item>
              <el-dropdown-item>Add</el-dropdown-item>
              <el-dropdown-item>Delete</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>Tom</span>
        </el-header>

        <el-main>
          <message v-for="(message, index) in activeMessages" 
            :key="index" :user="message.user" :message="message.message"
            :direction="message.direction"
          ></message>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
import Message from "./Message.vue";
const messages = require('../mocks/messages.json');
const users = require('../mocks/users.json');


export default {
  data() {
    return {
      currentChatId: 101,
      myUserId: 1003,
      messages: messages
    };
  },
  components: {
    Message
  },
  computed: {
      activeMessages() {
        return this.messages.filter(m => m.chat_id === this.currentChatId)
        .map(m => {
            m.user = users.find(u => m.user_id == u.id);
            m.direction = m.user.id == this.myUserId ? 'right' : 'left';
            return m;
        })
      }
  },
};
</script>