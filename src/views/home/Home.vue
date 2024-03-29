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
    <el-col :span="15" style="margin-top: 20px">
      <div class="num">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <component
            class="icons"
            :is="item.icon"
            :style="{ background: item.color }"
          ></component>
          <div class="details">
            <p class="num">&pound; {{ item.value }}</p>
            <p class="text">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <div ref="echart" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px;">
          <div ref="userEchart" style="height: 240px;"></div>
        </el-card>
        <el-card style="height: 260px;">
          <div ref="videoEchart" style="height: 240px;"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
  getCurrentInstance,
  reactive,
} from "vue";
import axios from "axios";
import * as echarts from "echarts";

export default defineComponent({
  setup() {
    // tableData使用let定义，因为后续会对其进行赋值, tableData is defined using let because it will be assigned later
    let tableData = ref([]); // 双向绑定，使用ref包裹数组，实现响应式数据, Two-way binding, use ref to wrap the array to achieve responsive data
    let countData = ref({});
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
    // 获取首页count统计数据
    const getCountData = async () => {
      let res = await proxy.$api.getCountData();
      countData.value = res;
    };
    // 关于echarts的渲染部分，可以参考echarts官网的文档
    let xOptions = reactive({
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      series: [],
    });
    let pieOptions = reactive({
      tooltip: {
        trigger: "item",
      },
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
      series: [],
    });
    // 定义响应式数据 !!
    let orderData = reactive({
      xData: [],
      series: [],
    });
    let userData = reactive({
      xData: [],
      series: [],
    });
    let videoData = reactive({
      series: [],
    });

    // 获取echarts数据
    const getEchartData = async () => {
      let result = await proxy.$api.getEchartData();
      // console.log(result);
      // let { orderData, userData, videoData } = result; // 解构赋值后不具有响应式，因为result是一个普通对象 
      let res = result.orderData;
      let userRes = result.userData;
      let videoRes = result.videoData;
      orderData.xData = res.date;
      const keyArray = Object.keys(res.data[0]);
      const series = []
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: res.data.map((item) => item[key]),
          type: "line",
        });
      });
      orderData.series = series;
      xOptions.xAxis.data = orderData.xData;
      xOptions.series = orderData.series;
      // 渲染echarts: orderData
      let hEcharts = echarts.init(proxy.$refs['echart']); // 获取dom节点 ref="echart"
      hEcharts.setOption(xOptions);

      // 渲染柱状图: userData
      userData.xData = userRes.map((item) => item.date);
      userData.series = [
        {
          name: "New users",
          data: userRes.map((item) => item.new),
          type: "bar",
        },
        {
          name: "Active users",
          data: userRes.map((item) => item.active),
          type: "bar",
        },
      ];
      xOptions.xAxis.data = userData.xData;
      xOptions.series = userData.series;
      let userEcharts = echarts.init(proxy.$refs['userEchart']); // 获取dom节点 ref="userEchart" 
      userEcharts.setOption(xOptions);

      // 渲染饼图: videoData
      videoData.series = [
        {
          data: videoRes,
          type: "pie",
        }
      ];
      pieOptions.series = videoData.series;
      let videoEcharts = echarts.init(proxy.$refs['videoEchart']); // 获取dom节点 ref="videoEchart"
      videoEcharts.setOption(pieOptions);
    };

    onMounted(() => {
      getTableList();
      getCountData();
      getEchartData();
    });
    return {
      tableData,
      tableLable,
      countData,
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
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }
    .icons {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .details {
      margin-left: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num {
        font-size: 20px;
        margin-bottom: 10px;
      }
      .text {
        font-size: 13px;
        // text-align: center;
        color: #999;
      }
    }
  }
}

.el-table .cell {
  padding: 0 3px;
}
</style>
