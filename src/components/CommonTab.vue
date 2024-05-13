<template>
  <div class="tags">
    <el-tag
      :key="tag.name"
      v-for="(tag, index) in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      >{{ tag.label }}</el-tag
    >
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const route = useRoute();
const tags = store.state.tabsList;
// 切换tab菜单功能，点击tag切换路由
const changeMenu = (item) => {
  router.push({ name: item.name });
};
const handleClose = (tag, index) => {
  let length = tags.length - 1; // 除去home标签
  // 处理vuex中的tabsList
  store.commit("closeTab", tag);

  // ！删除标签后的跳转逻辑！
  // 1. 如果关闭的不是当前路由,则不需要跳转
  if (tag.name !== route.name) {
    return;
  }
  // 2. 如果关闭的是最后一个标签,则跳转到前一个标签
  if (index === length) {
    router.push({ name: tags[index - 1].name });
  }
  // 3. 否则,则跳转到下一个标签
  else {
    router.push({ name: tags[index].name }); // 由于删除了标签,所以index位置的标签就是下一个标签
  }
};

</script>

<style lang="less" scoped>
.tags {
  padding: 20px 20px 0 20px;
  width: 100%;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
    padding: 15px;
  }
}
</style>
