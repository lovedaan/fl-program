
import Toast from '../../components/toast/toast';
const app = getApp()

Page({
  data: {
    r_radio: '红榜',
    r_name: '',
    r_phone: '15915941956',
    r_id_card: '2144**44234',
    r_xw: '',
    pic1: 'http://images.jxsg.com/thumb/goods_gallery/wap/2019/10/decaf48af1dfeb3c4dfeb3b5d6ba75e6.jpg',
    pic2: 'http://images.jxsg.com/index_topic/2019/11/5b91cf06e6ad10de5c94e9fb9ee7f181.png',
    activeName: '1',
  },
  onCollapseChange(event) {
    this.setData({
      activeName: event.detail
    });
  },
  onChangeRadio(e) {
    this.setData({
      radio: e.detail
    });
  },
  onChange(e) {
    this.data[e.target.id] = e.detail.value;
  },
  //事件处理函数
  onLoad: function () {
    
  },
})
