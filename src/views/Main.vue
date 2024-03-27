<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <common-aside />
      <el-container class="el-container">
        <common-header />
        <el-main>
          <router-view />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonAside from "../components/CommonAside.vue";
export default defineComponent({
  components: {
    CommonHeader,
    CommonAside,
  },
});
</script>

<style lang="less" scoped>
.common-layout {
  .lay-container {
    flex-wrap: nowrap; // 不换行
  }
  height: 100%;
  & > .el-container {
    height: 100%;
    & > .el-aside {
      height: 100%;
      background: #545c64;
    }
  }
}
</style>
