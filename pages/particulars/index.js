
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
    // let reasonList = [
    //   {
    //     "createMobile": "15916545623",
    //     "createUser": "李刚",
    //     "dateCreated": 1574068759000,
    //     "reason": "李宁匿名信你一次，",
    //     "type": 1
    //   },
    //   {
    //     "createMobile": "15915941956",
    //     "createUser": "王五",
    //     "dateCreated": 1573973971000,
    //     "reason": "42342342324",
    //     "type": 1
    //   },
    //   {
    //     "createMobile": "15915941956",
    //     "createUser": "张三",
    //     "dateCreated": 1573973956000,
    //     "reason": "42342342324",
    //     "type": 1
    //   },
    //   {
    //     "createMobile": "15915941956",
    //     "createUser": "李四",
    //     "dateCreated": 1573973810000,
    //     "reason": "42342342324",
    //     "type": 1
    //   }
    // ];
    // let rankInfo = {
    //   "headImg": "https://hg.ykjk168.cn/files/2019-11-18/20191118171903275.jpg",
    //   "id": "5dd26216e4b0cd1a24fdefed",
    //   "idCard": "4646564646",
    //   "idCardImg": "https://hg.ykjk168.cn/files/2019-11-18/20191118171908124.jpg",
    //   "mobile": "15915946465",
    //   "name": "黑马"
    // };
    rankInfo.headImg = rankInfo.headImg || '/assets/no-pic.jpg';
    rankInfo.idCardImg = rankInfo.idCardImg || '/assets/no-pic.jpg';
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
