import {saveApply} from '../../utils/api.js';
import { showToast } from '../../utils/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    mobile: '',
    companyName: '',
    address: '',
    remark: '',
  },
  onChange(e) {
    this.data[e.target.id] = e.detail.value;
  },
  selectCity(e) {
    this.setData({
      address: e.detail.value.join(' ')
    });
  },
  submit() {
    let { name, mobile, companyName, address, remark} = this.data;
    if(!name) {
      showToast('请输入联系人姓名');
      return;
    }
    if(!mobile) {
      showToast('请输入联系电话');
      return;
    }
    if (mobile && !/^1[0-9]{10}$/.test(mobile)) {
      showToast('请输入正确格式的手机号码~');
      return;
    }
    if(!companyName) {
      showToast('请输入机构名');
      return;
    }
    if(!address) {
      showToast('请选择城市');
      return;
    }
    if(!remark) {
      showToast('请输入基本情况');
      return;
    }
    let params = {
      name,
      mobile,
      address,
      companyName,
      remark,
      type: 2
    };
    console.log(name, mobile, companyName, address, remark);
    saveApply(JSON.stringify(params), 'post', true).then(res => {
      if(res.status) {
        showToast('提交成功');
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 1500);
      }

    })

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