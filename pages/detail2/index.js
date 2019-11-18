import config from '../../config/index.js';
import { findWaiterDetail, findWaiterCertList } from '../../utils/api.js';
import { formatTime }from '../../utils/index.js';
const { baseURL } = config;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    waiterInfo: {},
    certList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData(options.id);
  },
  fetchData(id) {
    Promise.all([findWaiterDetail({ id }, 'post', true), findWaiterCertList({ waiterId: id }, 'post', false)]).then(res => {
      res[0].data.data.headImg = baseURL + res[0].data.data.headImg;
      res[0].data.data.idCardImgb = baseURL + res[0].data.data.idCardImgb;
      res[0].data.data.idCardImgf = baseURL + res[0].data.data.idCardImgf;
      if ( res[0].data.data.sex == 0 ) {
        res[0].data.data.sex = '未知'
      } else if (res[0].data.data.sex == 1) {
        res[0].data.data.sex = '男'
      } else if (res[0].data.data.sex == 2) {
        res[0].data.data.sex = '女'
      } 
      this.setData({
        waiterInfo: res[0].data.data,
        certList: res[1].data.data && res[1].data.data.map(v => {
          v.certImageUrl = baseURL + v.certImageUrl;
          v.dateStart = formatTime(new Date(v.dateStart));
          v.dateEnd = formatTime(new Date(v.dateEnd));
          return v;
        })
      });
    })
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