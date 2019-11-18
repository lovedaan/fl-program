import config from '../config/index.js';
import {request} from './index.js';
const { baseApiURL } = config;


// 机构列表
export const findOrganizationList = (data = {}, method = 'get', isLoading = false) => {
  return request(`${baseApiURL}/findOrganizationPage`, data, method, isLoading)
}

// 机构详情
export const findOrganizationDetail = (data = {}, method = 'get', isLoading = false) => {
  return request(`${baseApiURL}/findOrganizationById`, data, method, isLoading)
}

// 对应机构的培训课程
export const findOrganizationCase = (data = {}, method = 'get', isLoading = false) => {
  return request(`${baseApiURL}/findCourseListByOrganizationId`, data, method, isLoading)
}

// 服务人员列表
export const findWaiterList = (data = {}, method = 'get', isLoading = false) => {
  return request(`${baseApiURL}/findWaiterList`, data, method, isLoading)
}

// 服务人员详情
export const findWaiterDetail = (data = {}, method = 'get', isLoading = false) => {
  return request(`${baseApiURL}/findWaiterById`, data, method, isLoading)
}

// 服务人员详情对应的证件列表
export const findWaiterCertList = (data = {}, method = 'get', isLoading = false) => {
  return request(`${baseApiURL}/findWaiterCertList`, data, method, isLoading)
}