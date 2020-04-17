// pages/user/user-payment/user-payment.js
const $wx = require('../../../utils/wx.js')
const $api = require("../../../utils/api.js")
Page({
    data: {
        active: 0,
        pay_status: '',
        user_payment: ''
    },
    onChange(event) {},
    // 返回指定页面
    return_index: function() {
        wx.switchTab({
            url: '/pages/index/index',
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
    // 拒绝支付
    nopay: function(e) {
        this.setData({
            pay_status: e.target.dataset
        })
        console.log(e.target.dataset)
        wx.showModal({
            title: '提示',
            content: '是否确认取消支付',
            success: (res) => {
                if (res.confirm) {
                    $api.order.pay({
                        pay_status: e.target.dataset.status,
                        order_sn: e.target.dataset.order,
                        token: wx.getStorageSync("token")
                    }).then((res) => {
                        console.log("拒绝支付")
                        this.getorder()
                        console.log(res)
                    })
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    onLoad: function(options) {
        this.getorder()
    },
    // 获取订单详情
    getorder: function() {
        let token = wx.getStorageSync("token")
        //查询待支付订单(获取审核通过的订单号)
        $api.order.list({
            token: token,
            pay_status: 2
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
                user_payment: res.data.list
            })
            console.log(res.data.list)
        })
    },
    // 点击跳转详情页
    onclick_detail: function(e) {
        console.log(e.currentTarget.dataset.id)
        wx.redirectTo({
            url: '../../active-detail/active-detail?id=' + e.currentTarget.dataset.id + '&status=baoming',
            success: function(res) {
                console.log("挑战")
            },
            fail: function(res) {},

        })
    },

})