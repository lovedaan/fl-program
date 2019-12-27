import {findCourseList} from '../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
  },
  initData() {
    findCourseList({}, 'post', true).then(res => {
      if(res.status) {
        let data = res.data, list = [];
        for(let k in data) {
          list.push({
            name: k,
            list: data[k]
          });
        }
        this.setData({
          list
        });
      }
      console.log(res.data);
    })
  },
  goToPage(e) {

    let id = e.currentTarget.id || e.target.id;
    wx.navigateTo({
      url: '/pages/courseDetail/index?id=' + id
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