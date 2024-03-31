<!-- https://element-plus.org/en-US/component/table.html#table-with-fixed-column -->
<template>
  <div class="user-header">
    <el-button type="primary">+Add</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="Please enter">
        <el-input
          v-model="formInline.keyword"
          placeholder="Please enter user name"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">Search</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="list" style="width: 100%" height="500px">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
      />
      <el-table-column fixed="right" label="Operations" min-width="180">
        <template #default>
          <el-button type="primary" size="small" @click="handleClick"
            >Edit</el-button
          >
          <el-button type="danger" size="small">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="config.total"
      @current-change="changePage"
      class="pager mt-4"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  reactive,
} from "vue";

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const list = ref([]);
    const tableLabel = reactive([
      {
        prop: "name",
        label: "Name",
      },
      {
        prop: "age",
        label: "Age",
      },
      {
        prop: "sexLabel",
        label: "Gender",
      },
      {
        prop: "birth",
        label: "Date of Birth",
        width: 200,
      },
      {
        prop: "addr",
        label: "Address",
        width: 320,
      },
    ]);
    onMounted(() => {
      getUserData(config);
    });
    const config = reactive({
      total: 0,
      page: 1,
      name: "",
    });
    // Get user data, and update the total number of data
    const getUserData = async (config) => {
      let res = await proxy.$api.getUserData(config);
      //   console.log(res);
      config.total = res.count;
      list.value = res.list.map((item) => {
        item.sexLabel = item.sex === 0 ? "Female" : "Male";
        return item;
      });
    };
    const changePage = (page) => {
      config.page = page;
      getUserData(config); // Call the API again, and the data will be updated
    };
    const formInline = reactive({
      keyword: "",
    });
    const handleSearch = () => { 
      config.name = formInline.keyword; 
      getUserData(config); // Call the API again, and the data will be updated
    };
    return {
      list,
      tableLabel,
      config,
      changePage,
      formInline,
      handleSearch,
    };
  },
});
</script>

<style lang="less" scoped>
.table {
  position: relative;
  height: 520px;

  .pager {
    position: absolute;
    bottom: -20px;
    right: 0;
  }
}
.user-header {
  display: flex;
  justify-content: space-between;
}
</style>
