import config from '../../config/index.js';
import { getLocation, request } from '../../utils/index.js';
const { TX_MAP_KEY } = config;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    address: '',
    value: '',
    latitude: '',
    longitude: '',
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]]
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      address: e.detail.value.splice(0,2)
    })
    this.getAddress(e.detail.value.toString());
  },
  getAddress: function (address) {
    request('https://apis.map.qq.com/ws/geocoder/v1/', {
      address,
      key: TX_MAP_KEY
    }).then(res => {
      this.setData({
        latitude: res.result.location.lat,
        longitude: res.result.location.lng,
      });
    });
  },
  getLocation: function() {
    getLocation().then(res => {
      this.setData({
        latitude: res.latitude,
        longitude: res.longitude,
      });
      return request('https://apis.map.qq.com/ws/geocoder/v1/', {
        location: [res.latitude, res.longitude].join(','),
        key: TX_MAP_KEY
      });
    }).then(res => {
      const { ad_info } = res.result;
      this.setData({
        region: [ad_info.province, ad_info.city, ad_info.district],
        address: [ad_info.province, ad_info.city].join(' ')
      });
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation();
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