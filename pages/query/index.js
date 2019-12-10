import { findHhbList, payParam } from '../../utils/api.js';
import { showToast } from '../../utils/index.js';
import config from '../../config/index.js';
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
      isNodata: false,
      rankInfo: {},
      reasonList: []
    });
    let _this = this;
    let searchValue = this.data.value;
    if (!searchValue) {
      showToast('请输入姓名、机构名、电话、身份证查询');
      return;
    }
    findHhbList({ code: searchValue}, 'post', true).then(res => {
      if (res.data.retCode == '0') {
        let data = res.data.data;
        if(!data.rank.headImg) {
          data.rank.headImg = '/assets/no-pic.jpg';
        }
        
        app.globalData.queryData = {
          reasonList: [data.blackList, data.redList],
          rankInfo: data.rank,
        };
        _this.setData({
          reasonList: data.blackList.concat(data.redList),
          rankInfo: data.rank,
          value: ''
        });
        payParam({
          openId: app.globalData.openId,
          queryParam: searchValue
        }, 'post', true).then(result => {
          if (result.data.retCode == 0) {
            this.weixinPay(result.data.data, data);
          }else {
            showToast('请求失败，请重新试一下！');
          }
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
    console.log(params);
    let _this = this;
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
      fail(res) { 
        // console.log(res);
        showToast('支付失败，请重新试一下！');
      }
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