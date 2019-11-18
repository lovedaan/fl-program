import { saveHmd, uploadFile } from '../../utils/api.js';
import { showToast } from '../../utils/index.js';
import config from '../../config/index.js';
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
      showToast('请输入姓名~');
      return;
    }
    if (!user_phone) {
      showToast('请输入手机号码~');
      return;
    }

    if (!r_name) {
      showToast('请输入录上榜人员姓名或机构名~');
      return;
    }
    if (!r_phone && !r_id_card) {
      showToast('请输入录上榜人员手机号码或身份证号码~');
      return;
    }
    if (!r_xw) {
      showToast('请输入录用者的具体行为~');
      return;
    }
    if (r_xw.length > 200) {
      showToast('录用者具体行为不能超过200个字~');
      return;
    }
    let data = {
      disabled: false,
      openId: app.globalData.openId,
      createMobile: user_phone,
      createUser: user_name,
      type: radio,
      state: 1,
      name: r_name,
      mobile: r_phone,
      idCard: r_id_card,
      idCardImg: pic2,
      headImg: pic1,
      sex: 0,
      address: '',
      reason: r_xw
    };
    saveHmd(JSON.stringify(data), 'post', true).then(res => {
      showToast('录入信息成功');
      this.resetData();
    }).catch(err => {
      console.log(err);
    })
  },
  // 选择图片
  chooseImage(e) {;
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
        uploadFile({ filePath: res.tempFilePaths[0] }).then(data => {
          let path = JSON.parse(data.data).data.path;
          _this.data[e.currentTarget.id] = config.baseURL + path;
        })
      }
    });
  },
  // 删除图片
  removeImage(e) {
    let opt = {};
    opt[e.currentTarget.id] = '';
    this.setData(opt);
  },
  resetData() {
    this.setData({
      user_name: '',
      user_phone: '',
      r_name: '',
      r_phone: '',
      r_id_card: '',
      r_xw: '',
      pic1: '',
      pic2: '',
      radio: '1'
    });
  },
  //事件处理函数
  onUnload: function () {
    this.resetData();
  },
})
