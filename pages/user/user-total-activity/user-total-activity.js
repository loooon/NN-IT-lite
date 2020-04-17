const $api = require("../../../utils/api.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    user_confirm: function(e) {
        wx.navigateTo({
            url: '../user-confirm/user-confirm?id=' + e.currentTarget.dataset.id,
            success: function(res) {},
        })
    },
    // 去支付
    topay: function(e) {
        wx.showLoading({
            title: '加载中',
        })
        this.setData({
            pay_status: e.target.dataset
        })
        console.log(e.target.dataset)
        // 支付接口（获取requestPyament的支付参数）
        $api.order.pay({
            pay_status: e.target.dataset.status,
            order_sn: e.target.dataset.order,
            token: wx.getStorageSync("token")
        }).then((res) => {
            wx.hideLoading()
            console.log(res)
            wx.requestPayment({
                timeStamp: res.data.data.target.timeStamp,
                nonceStr: res.data.data.target.nonceStr,
                package: res.data.data.target.package,
                signType: 'MD5',
                paySign: res.data.data.target.paySign,
                success: (res) => {
                    console.log("支付成功")
                    this.getorder()
                },
                fail(res) {}
            })
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
    onLoad: function(options) {
        let token = wx.getStorageSync("token")
        //查询待支付订单(获取审核通过的订单号)
        $api.order.list({
            token: token,
            pay_status: 2
        }).then((res) => {
            console.log(res.data.list)
            if (res.data.list == '') {
                this.setData({
                    kong: true
                })
            }
            for(let i=0;i<res.data.list.length;i++){
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
                user_payment: res.data.list
            })
            console.log(res.data.list)
        })
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



    onShow: function() {

    },


})