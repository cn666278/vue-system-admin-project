<template>
  <el-form :model="loginForm" class="login-container">
    <h3>System Login</h3>
    <el-form-item>
      <el-input type="input" placeholder="Please enter name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="input" placeholder="Please enter name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"> Login </el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts"></script>

<style lang="less" scoped>
// scoped的作用是只在当前组件生效，不会影响全局样式。
// 当前组件是指当前的.vue文件
.login-container {
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px; // 上右下左
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  box-shadow: 0 0 25px #cacaca;
  h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #505450;
  }
  :deep(.el-form-item__content) { // 因为el-form-item__content是element-ui的样式，所以需要穿透
    justify-content: center;
  }
}
</style>
