<template>
  <el-menu style="background: rgb(238, 241, 246); border: none; padding: 20px 10px">
    <div class="info">
      <el-avatar :size="80" :src="user.avatar"></el-avatar>
      <div style="font-size: x-large; line-height: 50px">
        <strong>{{user.name}}</strong>
      </div>
      <div>{{user.description}}</div>
    </div>
    <el-menu-item>
      <el-submenu index="x1" style="text-align: start; background: white; border-radius: 10px">
        <template slot="title">
          <span>Information</span>
        </template>
        <el-menu-item index="x1-1">Địa chỉ</el-menu-item>
        <el-menu-item index="x1-2">Ngày sinh</el-menu-item>
        <el-menu-item index="x1-3">Học vấn</el-menu-item>
      </el-submenu>
      <el-submenu
        index="x2"
        style="margin-top: 20px; text-align: start; background: white; border-radius: 10px"
      >
        <template slot="title">
          <span>Images (3)</span>
        </template>
        <el-menu-item index="x2-1">
          <el-avatar
            shape="square"
            :size="40"
            src="https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg"
            style="magin: 10px"
          ></el-avatar>
        </el-menu-item>
        <el-menu-item index="x2-2">
          <el-avatar
            shape="square"
            :size="40"
            src="https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png"
            style="magin: 10px"
          ></el-avatar>
        </el-menu-item>
        <el-menu-item index="x2-3">
          <el-avatar
            shape="square"
            :size="40"
            src="https://deep-image.ai/extra/slider-3-a.a21f311c.jpg"
            style="magin: 10px"
          ></el-avatar>
        </el-menu-item>
      </el-submenu>
      <el-submenu
        index="x3"
        style="margin-top: 20px; text-align: start; background: white; border-radius: 10px"
      >
        <template slot="title">
          <span>Files (3)</span>
        </template>
          <el-menu-item index="x3-1">File 1</el-menu-item>
          <el-menu-item index="x3-2">File 2</el-menu-item>
          <el-menu-item index="x3-3">File 3</el-menu-item>
      </el-submenu>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: ["user"],
};
</script>

<style scoped>
.info {
  box-sizing: border-box;
  background: white;
  padding: 20px;
  width: 88%;
  margin: auto;
  border-radius: 10px;
  margin-bottom: 20px;
}
.menu-item-info {
  background-color: white !important;
}
.menu-item-info:hover {
  background: white;
}
</style>