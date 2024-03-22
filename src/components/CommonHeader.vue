<template>
    <el-header>
        <div class="left-content">
            <el-button size="small" plain @click="handleCollapse"> 
                <el-icon size="20">
                    <Menu />
                </el-icon>
            </el-button>
            <h3>HomePage</h3>
        </div>
        <div class="right-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img :src="getImageUrl('user')" alt="" class="user" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Personal</el-dropdown-item>
                        <el-dropdown-item>Exit</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>

</template>

<script>
import { defineComponent } from "vue-demi";
import { useStore } from "vuex";
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
 
    return {
      // userImg,
      getImageUrl,
      handleCollapse,
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
        .el-button{
            margin-right: 20px;
        }
        h3{
            color: #fff;
        }
    }
</style>