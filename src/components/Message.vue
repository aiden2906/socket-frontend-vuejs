<template>
  <div class="message-wrapper" :class="direction">
    <div class="message">
      <div>{{content}}</div>
      <div class="time">{{ message.created_at | fromNow }}</div>
      <div v-if="user.id == 1004" class="seen">{{message.seen}}</div>
    </div>
    <div class="avatar" style="position: relative;">
      <div class="point" v-bind:class="{ active: user.id == 1004}"></div>
      <el-avatar :size="40" :src="avatarUrl"></el-avatar>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    message: Object,
    direction: {
      type: String,
      default: () => "left",
    },
  },
  data() {
    return {
      avatarUrl:
        (this.user && this.user.avatar) ||
        "https://nhacchuonghinhnen.com/wp-content/uploads/2020/03/bo-anh-hot-trends-avatar-giau-mat-facebook-1.jpeg",
      content: (this.message && this.message.content) || "N/A",
    };
  },
};
</script>

<style scoped>
.message-wrapper {
  display: flex;
  width: 100%;
}
.message-wrapper.left {
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: flex-end;
}
.message-wrapper.right {
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
}
.message {
  max-width: 50%;
  min-width: 35%;
  padding: 20px;
  border-radius: 10px;
  margin: 0 10px;
  text-align: left;
  position: relative;
}
.message-wrapper.right .message {
  background: #4564ff;
  color: white;
}

.message-wrapper.left .message {
  /* background: #cfbfd4; */
  background-color: white;
  color: black;
}
.time {
  font-size: small;
  color: #c0bfc2;
}
.seen {
  position: absolute;
  font-size: small;
  right: 10px;
  bottom: 20px;
  color: #c0bfc2;
}
.point {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  bottom: 3px;
  background: grey;
  right: 3px;
}
.active{
  background: rgb(110 200 130);
  bottom: 3px;
  left: 3px;
}
</style>