import { getWxOpenId } from './utils/api.js';
App({
  onLaunch: function () {
    this.getLogin();
  },
  getLogin() {
    let _this = this;
    wx.login({
      success(res) {
        getWxOpenId({JSCODE: res.code, type: 1}, 'post').then(data => {
          _this.globalData.openId = data.data;
        })
      }
    })
  }, 
  globalData: {
    openId: '', // osWGis4soBFtzsEkSWUgcNIQVmOc
    queryData: {},
    userInfo: null
  }
})