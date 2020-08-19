<template>
    <div class="message-wrapper" :class="direction">
        <div class="message">
           {{content}}
           <div class="time">
               {{ message.created_at | fromNow }}
           </div>
        </div>
        <div class="avatar">
            <el-avatar :size="60" :src="avatarUrl"></el-avatar>
        </div>
    </div>
</template>

<script>
// import * as moment from 'moment';
export default {
    props:{
        user:Object,
        message:Object,
        direction: {
            type: String,
            default: () => 'left'
        }
    },
    data(){
        return{
            avatarUrl: (this.user && this.user.avatar) || 'https://nhacchuonghinhnen.com/wp-content/uploads/2020/03/bo-anh-hot-trends-avatar-giau-mat-facebook-1.jpeg',
            content: (this.message && this.message.content) || 'N/A',
        }
    }
}
</script>

<style scoped>
    .message-wrapper {
        display: flex;
        width: 100%;
    }
    .message-wrapper.left {
        flex-direction: row-reverse;
        justify-content: flex-end;
    }
    .message-wrapper.right {
        flex-direction: row;
        justify-content: flex-end;
    }
    .message {
        max-width: 50%;
    }
    .message-wrapper.right .message{
        background: blue;
        color: white
    }
</style>