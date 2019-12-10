import config from '../config/index.js';
import { request } from './index.js';
const { baseApiURL, baseURL } = config;

// 登录获取openId
export const getWxOpenId = (data = {}, method = 'get', isLoading = false) => {
  return request(`${baseURL}min/getOpenId `, data, method, isLoading)
}

// 首页轮播图列表
export const getBannerList = (data = {}, method = 'post', isLoading = false) => {
  return request(`${baseURL}min/xjrz/adList`, data, method, isLoading)
}

// 录入黑名单
export const saveHmd = (data, method = 'get', isLoading = false) => {
  return request(`${baseApiURL}/save`, data, method, isLoading, { 'content-type': 'application/json'})
}
// 上传图片
export const uploadFile = (data = {}) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${baseURL}upload/picture`,
      filePath: data.filePath,
      name: 'image',
      header: {
        'Content-Type': 'multipart/form-data'
      },
      formData: {
        userId: '12345678',
        file: data.filePath
      },
      success(res) {
        resolve(res);
      },
      file(err) {
        reject(err);
      }
    })
  });
}

// 搜素红黑榜
export const findHhbList = (data = {}, method = 'get', isLoading = false) => {
  return request(`${baseApiURL}/findList `, data, method, isLoading)
}

// 支付
export const payParam = (data = {}, method = 'get', isLoading = false) => {
  return request(`${baseURL}min/getPrepayParam `, data, method, isLoading)
}