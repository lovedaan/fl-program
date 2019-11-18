import { getWxOpenId } from './utils/api.js';
App({
  onLaunch: function () {
    this.getLogin();
  },
  getLogin() {
    let _this = this;
    wx.login({
      success(res) {
        getWxOpenId({JSCODE: res.code}, 'post').then(data => {
          console.log(data, '-------');
          //_this.globalData.openId = data.data;
        })
      }
    })
  }, 
  globalData: {
    openId: 'osWGis4soBFtzsEkSWUgcNIQVmOc',
    queryData: {},
    userInfo: null
  }
})