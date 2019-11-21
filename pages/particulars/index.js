
import { formatTime } from '../../utils/index.js';
const app = getApp();

Page({
  data: {
    rankInfo: {},
    reasonList: [],
  },
  //事件处理函数
  onLoad: function () {
    const { reasonList, rankInfo} = app.globalData.queryData;
    reasonList.length && reasonList.forEach(r => {
      r.dateCreated = r.dateCreated ? formatTime(new Date(r.dateCreated)) : '';
      r.type = r.type == 1 ? '黑榜' : '红榜';
    })
    this.setData({
      reasonList,
      rankInfo
    });
  },
})
