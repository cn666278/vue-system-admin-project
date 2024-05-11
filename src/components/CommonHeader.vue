<template>
  <el-header>
    <div class="left-content">
      <el-button size="small" plain @click="handleCollapse">
        <el-icon size="20">
          <Menu />
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <!-- 首页一定存在所以直接写死 -->
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{
          current.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getImageUrl('user')" alt="" class="user" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Personal</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { defineComponent, computed } from "vue-demi";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    let store = useStore();
    let getImageUrl = (user) => {
      // console.log(import.meta.url);
      // console.log(new URL("../assets/images/user.png", import.meta.url));
      return new URL(`../assets/images/${user}.png`, import.meta.url).href;
    };
    // let userImg = require("../assets/images/user.png");
    let handleCollapse = () => {
      // 调用vuex中的mutations
      store.commit("updateIsCollapse");
    };
    // 计算属性
    const current = computed(() => {
      return store.state.currentMenu;
    });

    const router = useRouter();

    // 退出登录
    const handleLogout = () => {
      store.commit("cleanMenu");
      router.push({
        name: "login",
      });
    };

    return {
      // userImg,
      getImageUrl,
      handleCollapse,
      current,
      handleLogout,
    };
  },
});
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #333;
}
.right-content .userImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.left-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  h3 {
    color: #fff;
  }
}
// 修改面包屑的样式
// :deep() 为了解决scoped的问题，可以穿透样式
:deep(.bread span) {
  color: #fff !important; // !important 为了覆盖element-plus的样式
  cursor: pointer !important; // 鼠标移上去变成手型
}
</style>
