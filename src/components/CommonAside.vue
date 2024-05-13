<template>
  <el-aside :width="$store.state.isCollapse ? '180px' : '64px'">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :collapse="!$store.state.isCollapse"
      :collapse-transition="false"
    >
      <h3 v-show="$store.state.isCollapse">Admin Management</h3>
      <h3 v-show="!$store.state.isCollapse">Admin</h3>
      <el-menu-item
        :index="item.path"
        v-for="item in noChildren()"
        :key="item.path"
        @click="clickMenu(item)"
      >
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        :index="item.label"
        v-for="item in hasChildren()"
        :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.path"
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            @click="clickMenu(subItem)"
          >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const list = [
  {
    path: "/user",
    name: "user",
    label: "UserManage",
    icon: "user",
    url: "UserManage/UserManage",
  },
  {
    label: "Other",
    icon: "location",
    path: "/other",
    children: [
      {
        path: "/page1",
        name: "page1",
        label: "Page1",
        icon: "setting",
        url: "Other/PageOne",
      },
      {
        path: "/page2",
        name: "page2",
        label: "Page2",
        icon: "setting",
        url: "Other/PageTwo",
      },
    ],
  },
];

const router = useRouter();

const noChildren = () => {
  return asyncList.filter((item) => {
    return !item.children;
  });
};

const hasChildren = () => {
  return asyncList.filter((item) => {
    return item.children;
  });
};

const asyncList = store.state.menu;

const clickMenu = (item) => {
  router.push({
    name: item.name,
  });
  // vuex来管理当前选中的菜单
  store.commit("selectMenu", item);
};

</script>

<style lang="less">
.icons {
  width: 18px;
  height: 18px;
}
.el-menu {
  border-right: none; // delete the default border
  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}
.el-menu-item{
  span{
    margin-left: 5px;
  }
}

.el-sub-menu{
  span{
    margin-left: 5px;
  }
}
</style>
