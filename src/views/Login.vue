<template>
  <div id="login">
    <Login />
  </div>
</template>

<script>
import Login from "../components/Login";

export default {
  components: {
    Login,
  },
};
</script>

<style>
#login {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
body {
  margin: 0;
  padding: 0;
  background: white;
  background-image: url("https://uploads.codesandbox.io/uploads/user/c3fb8e8a-35ea-4232-b5d6-0f3c5373510b/LVs7-dots.png");
  background-size: contain;
}
.footer,
.header {
  padding: 20px 20px;
  color: #f0f4f8;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.footer h1,
.header h1,
.footer h2,
.header h2,
.footer h3,
.header h3 {
  color: #f0f4f8;
  padding: 0;
  margin: 0;
}
.footer .links,
.header .links {
  display: flex;
  font-family: "Open Sans";
}
.footer .links span,
.header .links span {
  padding: 0 10px;
  font-size: 18px;
  border-right: 1px solid #9fb3c8;
}
.footer .links span:last-child,
.header .links span:last-child {
  border-right: none;
}
.footer .version,
.header .version {
  font-family: "Open Sans";
  padding: 0 10px;
  color: #9fb3c8;
  font-size: 12px;
  margin-top: 5px;
}
.header {
  padding: 10px 20px;
}
.header .logo {
  font-family: "Open Sans";
  letter-spacing: 3px;
  padding-top: 15px;
  padding-bottom: 15px;
}
.header .logo .part-2 {
  color: #d64545;
}
</style>
