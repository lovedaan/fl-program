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

      res[0].data.data.headImg = res[0].data.data.headImg ? (baseURL + res[0].data.data.headImg) : '/assets/no-pic.jpg';
      res[0].data.data.idCardImgb = res[0].data.data.idCardImgb ? (baseURL + res[0].data.data.idCardImgb) : '/assets/no-pic.jpg';
      res[0].data.data.idCardImgf = res[0].data.data.idCardImgf ? (baseURL + res[0].data.data.idCardImgf) : '/assets/no-pic.jpg';
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

          if (v.certImageUrl) {
            v.certImageUrl = baseURL + v.certImageUrl;
          } else {
            v.certImageUrl = '/assets/no-pic.jpg';
          }

          v.dateStart = formatTime(new Date(v.dateStart));
          v.dateEnd = formatTime(new Date(v.dateEnd));
          return v;
        })
      });
    })
  },
  // 图片预览
  previewImg(e) {
    let url = e.currentTarget.id;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
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