/**
 * 整个项目的api的管理文件
 */
import request from "./request";
export default {
  // home组件，左侧表格数据获取
  getTableData(params) {
    return request({
      url: "/home/getTableData",
      method: "get",
      data: params,
      mock: true, // 是否使用mock数据, true则使用apifox数据，false则使用本地数据
    });
  },
  getCountData(){
    return request({
      url: "/home/getCountData",
      method: "get",
      mock: true,
    });
  },
  getEchartData() {
    return request({
      url: "/home/getEchartData",
      method: "get",
      mock: true,
    });
  },
  getUserData(params) {
    return request({
      url: "/user/getUser",
      method: "get",
      data: params,
      mock: false, // 本地获取数据，不使用mock(apifox)数据
    });
  }
};
