<template>
  <div class="register">
    <el-card>
      <h2>Register</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.native.prevent="register"
      >
        <el-form-item prop="username">
          <el-input v-model="model.username" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="model.name" placeholder="Name"></el-input>
        </el-form-item>
        <el-form-item prop="description">
          <el-input v-model="model.description" placeholder="Description"></el-input>
        </el-form-item>
        <el-form-item prop="avatar">
          <el-input v-model="model.avatar" placeholder="Avatar"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
          >Register</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      validCredentials: {
        username: "lightscope",
        name: "lightscope",
        description: "lightscope",
        avatar: "lightscope",
      },
      model: {
        username: "",
        name: "",
        description: "",
        avatar: "",
      },
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "username is required",
            trigger: "blur",
          },
          {
            min: 4,
            message: "username length should be at least 5 characters",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "name is required",
            trigger: "blur",
          },
          {
            min: 4,
            message: "name length should be at least 5 characters",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "description is required",
            trigger: "blur",
          },
          {
            min: 3,
            message: "description length should be at least 4 characters",
            trigger: "blur",
          },
        ],
        avatar: [
          {
            required: true,
            message: "avatar is required",
            trigger: "blur",
          },
          {
            min: 4,
            message: "avatar length should be at least 5 characters",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async register() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      try {
        await this.$store.dispatch("register", this.model);
        this.$router.push('/login')
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.register {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
}
</style>

<style>
.el-button--primary {
  background: #007c89;
  border-color: #007c89;
}
.el-button--primary:hover,
.el-button--primary.active,
.el-button--primary:focus {
  background: #009cad;
  border-color: #009cad;
}
.login .el-input__inner:hover {
  border-color: #007c89;
}
.login .el-input__prefix {
  background: #eeedea;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
}
.login .el-input__prefix .el-input__icon {
  width: 30px;
}
.login .el-input input {
  padding-left: 35px;
}
.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
a {
  color: #007c89;
  text-decoration: none;
}
a:hover,
a:active,
a:focus {
  color: #009cad;
}
.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}
</style>

