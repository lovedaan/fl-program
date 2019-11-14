export function request(url = '', data = {}, method = 'get', isLoading = false) {
  isLoading && wx.showLoading({
    title: '加载中...',
  });
  console.log(url);
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      success(res) {
        isLoading && wx.hideLoading();
        resolve(res.data);
      },
      fail(err) {
        isLoading && wx.hideLoading();
        reject(err);
      }
    })
  });
}

export function getLocation() {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        resolve(res);
      },
      fail: function(err) {
        reject(err);
      }
    })
  });
}