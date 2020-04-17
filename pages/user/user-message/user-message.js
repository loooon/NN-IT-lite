// pages/user/user-message/user-message.js
const $api = require("../../../utils/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meg_list:[],
  },
    // 返回指定页面
    return_index: function () {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync("token")
    //  消息通知
    $api.user.message({
        token: token
      }).then((detail) => {
        if(detail.data.list==''){
            this.setData({ kong: true })
        }
        this.setData({
          meg_list: detail.data.list
        })
        console.log(detail.data.list)
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("支付页面摧毁")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})