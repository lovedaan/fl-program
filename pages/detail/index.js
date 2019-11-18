
import config from '../../config/index.js';
import { getLocation, request } from '../../utils/index.js';
import { findOrganizationDetail, findOrganizationCase } from '../../utils/api.js';
const { TX_MAP_KEY, baseURL, txMapURL } = config;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    caseList: [],
    orgInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 解析地址成经纬度
    this.getLocation(options.address);
    // 请求详情数据
    this.fetachData(options.id);
  },
  getLocation(address) {
    request(`${txMapURL}ws/geocoder/v1/`, {
      address,
      key: TX_MAP_KEY
    }).then(res => {
      console.log(res);
      this.setData({
        longitude: res.result.location.lng,
        latitude: res.result.location.lat
      });
    });
  },
  fetachData(id) {
    Promise.all([findOrganizationDetail({ id }, 'post', true), findOrganizationCase({ organizationId: id }, 'post', false)]).then(res => {
      console.log(res);
      if(res.length == 2) {
        res[0].data.data.imgUrl = baseURL + res[0].data.data.imgUrl
        this.setData({
          orgInfo: res[0].data.data,
          caseList: res[1].data.data,
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})