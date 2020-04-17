// pages/user/user-activity/user-activity.js
const $api = require("../../../utils/api.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ready_active: []
    },
    user_confirm:function(e){
        wx.navigateTo({
            url: '../user-confirm/user-confirm?id='+e.currentTarget.dataset.id,
            success: function(res) {},
           
        })
    },
    onclick_detail: function (e) {
        console.log(e.currentTarget.dataset.id)
        wx.navigateTo({
            url: '/pages/active-detail/active-detail?id=' + e.currentTarget.dataset.id + '&status=baoming',
            success: function (res) {
                console.log("挑战")
            },
            fail: function (res) { },

        })
    },
    // 返回指定页面
    return_index: function() {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let token = wx.getStorageSync("token")
        // 获取已经支付的订单
        $api.order.list({
            token: token,
            pay_status: 3
        }).then((res) => {
            if (res.data.list == '') {
                this.setData({
                    kong: true
                })
            }
            for (let i = 0; i < res.data.list.length; i++) {
                if (res.data.list[i].activities.start_week == 0) {
                    res.data.list[i].activities.start_week = "周一"
                } else if (res.data.list[i].activities.start_week == 1) {
                    res.data.list[i].activities.start_week = "周二"
                } else if (res.data.list[i].activities.start_week == 2) {
                    res.data.list[i].activities.start_week = "周三"
                } else if (res.data.list[i].activities.start_week == 3) {
                    res.data.list[i].activities.start_week = "周四"
                } else if (res.data.list[i].activities.start_week == 4) {
                    res.data.list[i].activities.start_week = "周五"
                } else if (res.data.list[i].activities.start_week == 5) {
                    res.data.list[i].activities.start_week = "周六"
                } else {
                    res.data.list[i].activities.start_week = "周日"
                }
            }
            this.setData({
                ready_active: res.data.list
            })
            console.log(res.data.list)
        })
    },
  
    onclick_detail: function (e) {
        console.log(e.currentTarget.dataset.id)
        wx.navigateTo({
            url: '/pages/active-detail/active-detail?id=' + e.currentTarget.dataset.id + '&status=baoming',
            success: function (res) {
                console.log("挑战")
            },
            fail: function (res) { },

        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})