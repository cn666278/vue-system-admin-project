<!-- https://element-plus.org/en-US/component/table.html#table-with-fixed-column -->
<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd()">+Add</el-button>
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
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)"
            >Edit</el-button
          >
          <el-button type="danger" size="small" @click="handelDelete(scope.row)"
            >Delete</el-button
          >
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
  <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? 'Add User' : 'Edit User'"
    width="40%"
    :before-close="handleClose"
  >
    <el-form
      :inline="true"
      :model="formUser"
      style="margin-top: 10px"
      label-width="auto"
      label-position="right"
      ref="userForm"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="Name"
            prop="name"
            :rules="[{ required: true, message: 'Name is required' }]"
          >
            <el-input
              v-model="formUser.name"
              placeholder="Please enter user name"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="Age"
            prop="age"
            :rules="[
              { required: true, message: 'Age is required' },
              { type: 'number', message: 'Age must be a number' },
            ]"
          >
            <el-input
              v-model.number="formUser.age"
              placeholder="Please enter age"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="Gender"
            style="display: flex"
            prop="sex"
            :rules="[{ required: true, message: 'Gender is required' }]"
          >
            <el-select v-model="formUser.sex" placeholder="Please select">
              <el-option label="Male" value="1" />
              <el-option label="Female" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="Date of Birth"
            prop="birth"
            :rules="[{ required: true, message: 'Date of Birth is required' }]"
          >
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              label="Date of Birth"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="Address"
          prop="addr"
          :rules="[{ required: true, message: 'Address is required' }]"
        >
          <el-input
            v-model="formUser.addr"
            placeholder="Please enter the address"
            clearable
          />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end; margin-top: 10px">
        <el-form-item>
          <el-button type="primary" @click="handelCancel">Cancel</el-button>
          <el-button type="primary" @click="onSubmit">Confirm</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template> -->
  </el-dialog>
</template>

<script setup>
import { ElMessage } from "element-plus";
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  reactive,
} from "vue";

const { proxy } = getCurrentInstance(); // Get the instance object
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
    item.sexLabel = item.sex == 0 ? "Female" : "Male";
    return item;
  });
};
const changePage = (page) => {
  config.page = page;
  getUserData(config); // Call the API again, and the data will be updated
};
// Search form data
const formInline = reactive({
  keyword: "",
});
const handleSearch = () => {
  config.name = formInline.keyword;
  getUserData(config); // Call the API again, and the data will be updated
};
// Dialog, 控制模态框的显示隐藏
const dialogVisible = ref(false);
const handleClose = (done) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      proxy.$refs.userForm.resetFields(); // Reset the form
      done(); // Close the dialog
    })
    .catch(() => {
      // catch error
    });
};
// 添加用户的表单数据
const formUser = reactive({
  name: "", // 用户名
  age: "", // 年龄
  sex: "", // 性别
  birth: "", // 出生日期
  addr: "", // 地址
});
// 时间格式化
// 也可以使用element-plus的日期格式化: value-format="YYYY-MM-DD"
// https://element-plus.org/en-US/component/date-picker.html#date-format
// 这里使用原生的
const timeFormat = (time) => {
  var time = new Date(time);
  var year = time.getFullYear();
  var month = time.getMonth() + 1; // 月份是从0开始的
  var date = time.getDate(); // 获取日: 1-31
  function addZero(num) {
    return num < 10 ? "0" + num : num; // 如果小于10,在前面加0
  }
  return year + "-" + addZero(month) + "-" + addZero(date); // 返回格式化的日期: YYYY-MM-DD
};
// 添加用户
const onSubmit = () => {
  // 验证
  // 验证有两种写法，在el-form-item上写rules，或者统一管理rules
  // 参照: https://element-plus.org/en-US/component/form.html#form-validation
  proxy.$refs.userForm.validate(async (valid) => {
    if (valid) {
      if (action.value == "add") {
        formUser.birth = timeFormat(formUser.birth); // 格式化日期
        let res = await proxy.$api.addUser(formUser);
        if (res) {
          // console.log(res)
          dialogVisible.value = false;
          proxy.$refs.userForm.resetFields(); // 重置表单
          getUserData(config); // 更新数据
        }
      } else {
        // 编辑的接口
        // console.log(formUser);
        formUser.sex = formUser.sex == "Male" ? 1 : 0; // 根据后端接口要求，转换性别为数字
        formUser.birth = timeFormat(formUser.birth); // 格式化日期
        let res = await proxy.$api.editUser(formUser);
        if (res) {
          dialogVisible.value = false;
          proxy.$refs.userForm.resetFields(); // 重置表单
          getUserData(config); // 更新数据
        }
      }
    } else {
      ElMessage({
        showClose: true,
        message: "Please fill in the form correctly",
        type: "error",
      });
    }
  });
};
// 取消添加用户,并重置表单
const handelCancel = () => {
  dialogVisible.value = false;
  proxy.$refs.userForm.resetFields(); // 重置表单
};
// 区分编辑和添加用户
const action = ref("add");
// 新增用户
const handleAdd = () => {
  action.value = "add";
  dialogVisible.value = true;
};
// 编辑用户
const handleEdit = (row) => {
  console.log(row);
  action.value = "edit";
  dialogVisible.value = true;
  row.sex = row.sex == 1 ? "Male" : "Female"; // 性别转换
  // 这里的proxy是当前实例
  // proxy.$nextTick的作用是在状态修改后等待dom更新后，再执行回调函数，否则当取消编辑时，表单数据不会重置
  // https://vuejs.org/guide/essentials/reactivity-fundamentals#dom-update-timing
  proxy.$nextTick(() => {
    Object.assign(formUser, row); // 浅拷贝
  });
};
// 删除用户
const handelDelete = (row) => {
  ElMessageBox.confirm("Are you sure to delete user (" + row.name + ")?")
    .then(async () => {
      await proxy.$api.deleteUser({ id: row.id });
      ElMessage({
        showClose: true,
        message: "Delete successfully",
        type: "success",
      });
      getUserData(config); // 更新数据
    })
    .catch(() => {
      // catch error
    });
};
// 批量删除用户 - todo
const handelDeleteAll = () => {
  console.log("delete all");
};
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

.el-table__body-wrapper{
  margin-left: 5px;
}
</style>
