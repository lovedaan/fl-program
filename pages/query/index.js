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
  // 输入法点击回车确定触发
  searchConfirm(e) {
    this.data.value = e.detail;
    this.onSearch();
  },
  // 点击搜索按钮触发
  onSearch() {
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
      showToast('查询失败，请重新试一下~')
    });
  },
  handelInput(e) {
    this.data.value = e.detail;
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      value: '',
      isNodata: false,
      resultList: []
    });
  }
})