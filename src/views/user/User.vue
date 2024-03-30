<!-- https://element-plus.org/en-US/component/table.html#table-with-fixed-column -->
<template>
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
      getUserData();
    });
    const getUserData = async () => {
      let res = await proxy.$api.getUserData();
      //   console.log(res);
      list.value = res.list.map((item) => {
        item.sexLabel = item.sex === 0 ? "Female" : "Male";
        return item;
      });
    };
    return {
      list,
      tableLabel,
    };
  },
});
</script>
