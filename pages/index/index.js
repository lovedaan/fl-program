import { getBannerList} from '../../utils/api.js'
import config from '../../config/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: [],
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500
  },
  onLoad() {
    this.getBannerList();
  },
  getBannerList() {
    getBannerList({ code: 'AD_HMD' }, 'post', true).then(res => {
      if (res.data.data.length) {
        this.setData({
          background: res.data.data.map(r => {
            return config.baseURL + r.adImg;
          }),
          indicatorDots: res.data.data.length > 1 ? true : false
        });
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '专业的查家政公司、家政人员、雇主信誉',
      path: '/pages/index/index',
      imageUrl: '/assets/img/1.jpg'
    }
  }
})