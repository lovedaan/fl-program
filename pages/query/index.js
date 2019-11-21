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
  // 输入法点击回车或确定的时候触发
  searchConfirm(e) {
    this.data.value = e.detail;
    this.onSearch();
  },
  // 点击搜索按钮的时候触发
  onSearch() {
    this.setData({
      isNodata: false
    });
    let _this = this;
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
        payParam({
          openId: app.globalData.openId,
          queryParam: searchValue
        }, 'post', true).then(result => {
          this.weixinPay(result.data, res.data.data);
        }).catch(err => {
          showToast('请求失败，请重新试一下！');
        })
      }else {
        this.setData({
          isNodata: true,
          value: ''
        });
      }
    })
  },
  // 微信支付
  weixinPay(params, data) {
    wx.requestPayment({
      timeStamp: params.timeStamp,
      nonceStr: params.nonce_str,
      package: `prepay_id=${params.prepay_id}`,
      signType: 'MD5',
      paySign: params.sign,
      success(ret) {
        _this.setData({
          reasonList: data.reasonList,
          rankInfo: data.rank,
          value: ''
        });
      },
      fail(res) { }
    })
  },
  onChange(e) {
    this.data.value = e.detail;
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      value: '',
      isNodata: false,
      rankInfo: {},
      reasonList: []
    });
  }
})