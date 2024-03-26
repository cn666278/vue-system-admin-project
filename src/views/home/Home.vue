<template>
  <el-row class="home" :gutter="20">
    <el-col :span="9" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img src="../../assets/images/user.png" alt="user" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="role">Administrator</p>
          </div>
        </div>
        <div class="login-info">
          <p>Last login time: <span>2024-03-24 12:00:00</span></p>
          <p>Last login location: <span>Cardiff</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px" height="450px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLable"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="15" style="margin-top: 20px"> </el-col>
  </el-row>
</template>

<script>
import { defineComponent, onMounted, ref, getCurrentInstance } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    // tableData使用let定义，因为后续会对其进行赋值, tableData is defined using let because it will be assigned later
    let tableData = ref([]); // 双向绑定，使用ref包裹数组，实现响应式数据, Two-way binding, use ref to wrap the array to achieve responsive data
    // 今日购买，本月购买，总购买 Today's purchases, Monthly purchases, Total purchases
    const tableLable = {
      name: "Brand",
      todayPurchase: "Today's purchases",
      monthlyPurchase: "Monthly purchases",
      totalPurchase: "Total purchases",
    };

    // proxy是vue3.0提供的一个全局对象，可以通过getCurrentInstance()获取到当前实例，
    // 再通过proxy.$api获取到api-fox模拟的接口数据
    const { proxy } = getCurrentInstance(); 
    const getTableList = async () => {
      // 使用api-fox模拟请求数据
      //   await axios
      //     .get(
      //       "https://mock.apifox.com/m1/4216854-0-default/api/home/getTableData"
      //     )
      //     .then((res) => {
      //       console.log(res);
      //       if (res.data.code === 200) {
      //         tableData.value = res.data.data;
      //       }
      //     });
      let res = await proxy.$api.getTableData();
    //   console.log(res);
      tableData.value = res;
    };
    onMounted(() => {
      getTableList();
    });
    return {
      tableData,
      tableLable,
    };
  },
});
</script>

<style lang="less">
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
  }
  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }
}

.el-table .cell {
  padding: 0 3px;
}
</style>
