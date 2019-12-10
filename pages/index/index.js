import { getBannerList } from '../../utils/api.js'
import config from '../../config/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['/assets/img/3.jpg', '/assets/img/4.jpg'],
    indicatorDots: true,
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
    getBannerList({ code: 'AD_XJRZ'}, 'post', true).then(res => {
      console.log(res);
      if(res.data.data.length) {
        this.setData({
          background: res.data.data.map(r => {
            return config.baseURL + r.adImg;
          })
        });
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '携家认证精准查询',
      path: '/pages/index/index',
      imageUrl: '/assets/img/1.jpg'
    }
  }
})