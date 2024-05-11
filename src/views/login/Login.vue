<template>
  <el-form :model="loginForm" class="login-container">
    <h3>System Login</h3>
    <el-form-item>
      <el-input
        type="input"
        placeholder="Please enter name"
        v-model="loginForm.username"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        type="input"
        placeholder="Please enter password"
        v-model="loginForm.password"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login"> Login </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getCurrentInstance, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const loginForm = reactive({
      username: "admin",
      password: "admin",
    });
    const { proxy } = getCurrentInstance(); // 解构出proxy，相当于getCurrentInstance().proxy
    const store = useStore();
    const router = useRouter();
    const login = async () => {
      const res = await proxy.$api.getMenu(loginForm);
      //   console.log(res);
      store.commit("setMenu", res.menu);
      store.commit("addMenu", router);
      store.commit("setToken", res.token); // 将token存入vuex,用于路由守卫
      router.push({
        name: "home",
      });
    };
    return {
      loginForm,
      login,
    };
  },
};
</script>

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
  :deep(.el-form-item__content) {
    // 因为el-form-item__content是element-ui的样式，所以需要穿透
    justify-content: center;
  }
}
</style>
