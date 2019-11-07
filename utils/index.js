
export function request(url = '', data = {}, method = 'get', isLoading = true) {
  isLoading && wx.showLoading({
    title: '加载中...',
  });
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