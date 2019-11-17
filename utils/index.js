export const showToast = (title = '', duration = 2000) => {
  wx.showToast({
    title,
    icon: 'none',
    duration
  })
}
export function request(url = '', data,  method = 'get', isLoading = false, header = { 'content-type': 'application/x-www-form-urlencoded'}) {
  isLoading && wx.showLoading({
    title: '加载中...',
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header,
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
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      }
    })
  });
}

export const formatTime = (date) => {
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}