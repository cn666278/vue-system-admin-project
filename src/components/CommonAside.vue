<template>
  <el-aside width="200px">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :collapse="false" 
    >
      <el-menu-item :index="item.path" v-for="item in noChildren()" :key="item.path">
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu :index="item.label" v-for="item in hasChildren()" :key="item.path">
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.path"
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
          >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  setup() {
    const list = [
      {
        path: "/user",
        name: "user",
        label: "UserManage",
        icon: "user",
        url: "UserManage/UserManage"
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
            url: "Other/PageOne"
          },
          {
            path: "/page2",
            name: "page2",
            label: "Page2",
            icon: "setting",
            url: "Other/PageTwo"
          }
        ]
      }
    ];

    const noChildren = () => {
      return list.filter(item => {
        return !item.children;
      });
    };

    const hasChildren = () => {
      return list.filter(item => {
        return item.children;
      });
    };

    return {
      noChildren,
      hasChildren
    };
  }
};
</script>

<style lang="less">
.icons {
  width: 18px;
  height: 18px;
}
</style>