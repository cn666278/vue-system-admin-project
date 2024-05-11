import Mock from 'mockjs'
import homeApi from './mockData/home'
import userApi from './mockData/user'
import permissionApi from './mockData/permission'

// 拦截请求，返回模拟数据
Mock.mock('/home/getData', homeApi.getHomeData)

// 本地获取user数据
Mock.mock(/user\/getUser/, 'get', userApi.getUserList) // 使用正则匹配，拦截/user/getUser请求（\是转义字符）
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/user\/delete/, 'get', userApi.deleteUser)
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)