// utils/auth
const app = getApp()
const $api = require('./api.js')

// 获取微信code
const getCode = () => new Promise((resolve, reject) => {
  wx.login({
    success: (res) => resolve(res.code),
    fail: (err) => reject(err)
  })
})

// 获取微信用户信息
const getUserInfo = () => new Promise((resolve, reject) => {
  wx.getUserInfo({
    success: (res) => resolve(res),
    fail: (err) => reject(err)
  })
})
//查看登录状态是否过期 成功则未过期
const checkSession = () => new Promise((resolve, reject) => {
  wx.checkSession({
    success: (res) => resolve(res),
    fail: (err) => reject(err)
  })
})

const navigateTo = (url) => new Promise((resolve, reject) => {
  wx.switchTab({
    url,
    success: (res) => resolve(res),
    fail: (err) => reject(err)
  })
})
// 使用微信数据登陆后台
const getToken = () => {
  return getCode()
    .then(code => Promise.all([code, `getUserInfo`()]))
    .then(([code, userInfo]) => $api.user.login(code, userInfo.iv, userInfo.encryptedData))
    .then(res => res.data.token)
    .catch(err => Promise.reject(err))
}
// 获取到token存到本地
const setToken = (token) => {
  console.log('获取后台token成功: ', token)
  app.globalData.token = token
  wx.setStorage({
    key: 'token',
    data: token,
  })
}

// 微信用户授权跳转
const auth2 = (event) => {
  if (!event.detail.userInfo) return
  checkSession()
    .then(() => {
      if (!wx.getStorageSync('token')) throw new Error('获取本地token失败')
      return wx.getStorageSync('token')
    })
    .catch(err => getToken())
    .then(token => setToken(token))
    .then(() => navigateTo(event.currentTarget.dataset.url))
    .catch(err => console.log('微信授权跳转失败!', err))
}

module.exports = {
  auth2,
}