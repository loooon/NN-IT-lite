// utils/http.js
const DOMAIN = 'https://nnitq.yuhuofei.cn'

const get = (url, params) => {
  if (params) {
    params = Object.entries(params).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&');
    url = url + '?' + params
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: DOMAIN + url,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => resolve(res),
      fail: (res) => reject(res)
    })
  })
}

const post = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: DOMAIN + url,
      method: 'POST',
      data,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
}

module.exports = {
  get,
  post
}