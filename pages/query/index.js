import { findWaiterList } from '../../utils/api.js';
import { showToast } from '../../utils/index.js';
import config from '../../config/index.js';
const { baseURL } = config;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    isNodata: false,
    resultList: [],
  },
  onSearch(e) {
    this.setData({
      isNodata: false
    });
    if(!this.data.value) {
      showToast('请求输入认证编码、手机号、身份证号之一查询')
      return;
    }
    findWaiterList({ code: this.data.value}, 'post', true).then(res => {
      if(res.data.data && res.data.data.length) {
        this.setData({
          value: '',
          resultList: res.data.data.map(v => {
            v.headImg = baseURL + v.headImg;
            return v;
          })
        });
      }else {
        this.setData({
          value: '',
          isNodata: true
        });
      }
    }).catch(err => {
      console.log(err);
    });
  },
  handelInput(e) {
    this.data.value = e.detail;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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