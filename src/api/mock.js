import Mock from 'mockjs'
import { homeApi } from './mockData/home'
// 拦截请求，返回模拟数据
Mock.mock('/home/getData', homeApi.getHomeData)