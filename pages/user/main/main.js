// pages/user/main/main.js
const $wx = require('../../../utils/wx.js')
const $api = require("../../../utils/api.js")
Page({
    data: {
        // spinShow:false,
        show: false, //是否弹框（授权）
        userInfo: {
            avatarUrl: '/assets/hui.jpg',
            nickName: 'nickName'
        }
    },
    onAuth2: function (e) {
        $wx.auth2(e)
        if (e.detail.userInfo) {
            this.onClose()
            console.log(e.detail.userInfo)
            this.setData({
                spinShow: true,
                userInfo: e.detail.userInfo
            })
        }
        setTimeout(() => {
            let token = wx.getStorageSync("token")
            //消息通知的num
            $api.user.message({
                token: token
            }).then((detail) => {
                this.setData({
                    spinShow: false,
                    msg_num: detail.data.list.length
                })
            })
            // 获取已经支付的订单
            $api.order.list({
                token: token,
                pay_status: 3
            }).then((res) => {
                this.setData({
                    activity_num: res.data.list.length
                })
            })
            //查询待支付订单(获取审核通过的订单号)
            $api.order.list({
                token: token,
                pay_status: 2
            }).then((res) => {
                this.setData({
                    payment_num: res.data.list.length
                })
            })
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
                    recruitment_mun: list.data.list.length,
                    // spinShow: false,
                    recruitment_off: recruitment_off.length
                }), console.log(list.data.list)
            })
            // 获取审核列表
            $api.order.list({
                token: token,
                pay_status: 0
            }).then((res) => {
                this.setData({
                    audit_num: res.data.list.length
                })
            })
        }, 2000)
    },
    onClose() {
        this.setData({
            show: false
        });
    },
    onLoad: function (options) {
        let token = wx.getStorageSync("token")
        if (token) {
            this.setData({ spinShow: true })
        }
    },
    onShow() {
        let token = wx.getStorageSync("token")
        if (token) {
            this.onClose()
        }
        $api.user.userInfo({
            token: token
        }).then((detail) => {
            console.log(detail.data.list)
            this.setData({
                spinShow: false,
                userInfo: {
                    avatarUrl: detail.data.list.headimgurl,
                    nickName: detail.data.list.nickname
                }
            })
        })
        if (!token) {
            this.setData({
                show: true
            })
        }
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
                recruitment_mun: list.data.list.length,
                // spinShow: false,
                recruitment_off: recruitment_off.length
            }), console.log(list.data.list)
        })
        // 获取已经支付的订单
        $api.order.list({
            token: token,
            pay_status: 3
        }).then((res) => {
            this.setData({
                activity_num: res.data.list.length
            })
        })
        //查询待支付订单(获取审核通过的订单号)
        $api.order.list({
            token: token,
            pay_status: 2
        }).then((res) => {
            this.setData({
                payment_num: res.data.list.length
            })
        })
        // 获取审核列表
        $api.order.list({
            token: token,
            pay_status: 0
        }).then((res) => {
            this.setData({
                audit_num: res.data.list.length
            })
        })
    },
    onPullDownRefresh: function () {
        let token = wx.getStorageSync("token")
        //消息通知的num
        $api.user.message({
            token: token
        }).then((detail) => {
            this.setData({
                msg_num: detail.data.list.length
            })
        })
        // 获取已经支付的订单
        $api.order.list({
            token: token,
            pay_status: 3
        }).then((res) => {
            this.setData({
                activity_num: res.data.list.length
            })
        })
        //查询待支付订单(获取审核通过的订单号)
        $api.order.list({
            token: token,
            pay_status: 2
        }).then((res) => {
            this.setData({
                payment_num: res.data.list.length
            })
        })
        // 获取审核列表
        $api.order.list({
            token: token,
            pay_status: 0
        }).then((res) => {
            wx.stopPullDownRefresh()
            wx.showToast({
                title: '刷新成功',
                icon: 'success',
                duration: 1000
            })
            this.setData({
                audit_num: res.data.list.length
            })
        })


    }
})