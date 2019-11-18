import { findHhbList, payParam } from '../../utils/api.js';
import { showToast } from '../../utils/index.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    isNodata: false,
    rankInfo: {},
    reasonList: [],
  },
  onSearch() {
    this.setData({
      isNodata: false
    });
    let searchValue = this.data.value;
    if (!searchValue) {
      showToast('请输入姓名、机构名、电话、身份证查询');
      return;
    }
    findHhbList({ code: searchValue}, 'post', true).then(res => {
      if (res.data.retCode == '0') {
        app.globalData.queryData = {
          reasonList: res.data.data.reasonList,
          rankInfo: res.data.data.rank,
        };
        this.setData({
          reasonList: res.data.data.reasonList,
          rankInfo: res.data.data.rank,
          value: ''
        });
        payParam({
          openId: app.globalData.openId,
          queryParam: searchValue
        }, 'post', true).then(result => {
          console.log(result);
        })
      }else {
        this.setData({
          isNodata: true,
          value: ''
        });
      }
    })
  },
  onChange(e) {
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