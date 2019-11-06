
import Toast from '../../components/toast/toast';
const app = getApp()

Page({
  data: {
    user_name: '',
    user_phone: '',
  
    r_name: '',
    r_phone: '',
    r_id_card: '',
    r_xw: '',
    pic1: '',
    pic2: '',
    radio: '1',
  },
  onChangeRadio(e) {
    this.setData({
      radio: e.detail
    });
  },
  onChange(e) {
    this.data[e.target.id] = e.detail.value;
  },
  // 提交
  submit() {
    let { user_name, user_phone, r_name, r_phone, r_id_card, r_xw, pic1, pic2, radio} = this.data;
    if (!user_name) {
      Toast('请输入录用者姓名~');
      return;
    }
    if (!user_phone) {
      Toast('请输入录用者手机号码~');
      return;
    }

    if (!r_name) {
      Toast('请输入录上榜人员姓名~');
      return;
    }
    if (!r_phone && !r_id_card) {
      Toast('请输入录上榜人员手机号码或身份证号码~');
      return;
    }
    if (!r_xw) {
      Toast('请输入录用者的具体行为~');
      return;
    }
    if (r_xw.length > 200) {
      Toast('录用者具体行为不能超过200个字~');
      return;
    }
  },
  // 选择图片
  chooseImage(e) {
    console.log(e.currentTarget.id);
    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        let opt = {};
        opt[e.currentTarget.id] = res.tempFilePaths[0]
        _this.setData(opt);
        // 执行上传
        res.tempFilePaths.forEach(element => {
          // getFilePromise(element, 'voucher').then(res => {

          // })
          //   .catch(err => {
          //   });
        });
      }
    });
  },
  // 删除图片
  removeImage(e) {
    let opt = {};
    opt[e.currentTarget.id] = '';
    this.setData(opt);
  },
  //事件处理函数
  onLoad: function () {
    
  },
})
