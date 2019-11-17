import config from '../config/index.js';
import {request} from './index.js';
const { baseURL } = config;

// 服务人员列表
export const findWaiterList = (data = {}, method = 'get', isLoading = false) => {
  return request(`${baseURL}/findWaiterList`, data, method, isLoading)
}