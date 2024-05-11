<script setup>
import { useStore } from 'vuex';

// 数据持久化，刷新页面后，vuex中的数据不会丢失
// 数据持久化的原理是将数据存储到localStorage中，当页面刷新时，从localStorage中取出数据，再存储到vuex中
const store = useStore();
store.commit('addMenu');
</script>

<template>

  <router-view /> <!-- the router will render the component here -->
</template>

<style>
#app {
  height: 100%;
}
</style>
