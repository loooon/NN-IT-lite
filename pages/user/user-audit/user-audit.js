// pages/user/user-audit/user-audit.js
const $api = require("../../../utils/api.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // user_audit:'',
    },
    // 返回指定页面
    return_index: function() {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },

    onLoad: function(options) {
        let token = wx.getStorageSync("token")
        let recruitment_off = []
        //请求热门招聘
        $api.recruitment.self({
            token: token,
        }).then((list) => {
            for (let i = 0; i < list.data.list.length; i++) {
                if (list.data.list[i].style == 0) {
                    recruitment_off.push(list.data.list[i])
                }
            }
            this.setData({
                spinShow: false,
                recruitment_off,
            }), console.log(list.data.list)
        })
        // 获取审核列表
        $api.order.list({
            token: token,
            pay_status: 0
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
                user_audit: res.data.list
            }), console.log(res.data.list)
        })
    },
    onclick_detail: function(e) {
        console.log(e.currentTarget.dataset.id)
        wx.navigateTo({
            url: '/pages/active-detail/active-detail?id=' + e.currentTarget.dataset.id + '&status=baoming',
            success: function(res) {
                console.log("挑战")
            },
            fail: function(res) {},

        })
    },
    del_recruit: function(e) {
        wx.showModal({
            title: '提示',
            content: '确认是否删除',
            success: (res) => {
                if (res.confirm) {
                    wx.request({
                        url: 'https://nnitq.yuhuofei.cn/api/recruitment/create',
                        method: 'POST',
                        data: {
                            token: wx.getStorageSync("token"),
                            id: e.target.dataset.id,
                            choice: 2
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded',
                        },
                        success: (res) => {
                            this.recruit()
                            wx.showToast({
                                title: '删除成功',
                                icon: 'success',
                                duration: 2000
                            })
                            console.log(res.data)
                        }
                    })

                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })

    },
    recruit: function () {
        let recruitment_off = []
        let recruitment_on = []
        //请求热门招聘
        $api.recruitment.self({
            token: wx.getStorageSync("token"),
        }).then((list) => {
            for (let i = 0; i < list.data.list.length; i++) {
                if (list.data.list[i].style == 0) {
                    recruitment_off.push(list.data.list[i])
                } else {
                    recruitment_on.push(list.data.list[i])
                }
            }
            this.setData({
                spinShow: false,
                recruitment_off,
                recruitment_on
            }), console.log(list.data.list)
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

    },

})