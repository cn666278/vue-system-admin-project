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
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const tableData = [
      {
        name: "oppo",
        todayPurchase: 500,
        monthlyPurchase: 3500,
        totalPurchase: 22000,
      },
      {
        name: "vivo",
        todayPurchase: 300,
        monthlyPurchase: 2200,
        totalPurchase: 24000,
      },
      {
        name: "apple",
        todayPurchase: 800,
        monthlyPurchase: 4500,
        totalPurchase: 65000,
      },
      {
        name: "xiaomi",
        todayPurchase: 1200,
        monthlyPurchase: 6500,
        totalPurchase: 45000,
      },
      {
        name: "samsung",
        todayPurchase: 300,
        monthlyPurchase: 2000,
        totalPurchase: 34000,
      },
      {
        name: "hauwei",
        todayPurchase: 1050,
        monthlyPurchase: 8000,
        totalPurchase: 102000,
      },
    ];
    // 今日购买，本月购买，总购买 Today's purchases, Monthly purchases, Total purchases
    const tableLable = {
      name: "Brand",
      todayPurchase: "Today's purchases",
      monthlyPurchase: "Monthly purchases",
      totalPurchase: "Total purchases",
    };
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
