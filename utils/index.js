export const showToast = (title = '', duration = 2000) => {
  wx.showToast({
    title,
    icon: 'none',
    duration
  })
}
export function request(url = '', data = {}, method = 'get', isLoading = false) {
  isLoading && wx.showLoading({
    title: '加载中...',
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
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