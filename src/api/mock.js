import Mock from 'mockjs'
import homeApi from './mockData/home'
import userApi from './mockData/user'
// 拦截请求，返回模拟数据
Mock.mock('/home/getData', homeApi.getHomeData)

// 本地获取user数据
Mock.mock(/user\/getUser/, 'get', userApi.getUserList) // 使用正则匹配，拦截/user/getUser请求（\是转义字符）
Mock.mock(/user\/add/, 'post', userApi.createUser)