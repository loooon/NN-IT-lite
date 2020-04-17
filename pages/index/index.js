const $api = require("../../utils/api.js")
const $wx = require('../../utils/wx.js')
const app = getApp()
Page({
    data: {
        spinShow: true,
    },
    onAuth2: function(e) {
        $wx.auth2(e)
        // if (e.detail.userInfo) {
        //     wx.showLoading({
        //         title: '加载中',
        //     })
        // }
    },
    onLoad: function(options) {
        let modelmes = wx.getStorageSync('modelmes');
        let isIphoneX = app.globalData.isIphoneX;
        this.setData({
            isIphoneX: isIphoneX
        })
        // 请求最新活动列表
        $api.activity.list({
            type: 0
        }).then((res) => {
            let activity_list = []
            let activity_end = []
            for (let i = 0; i < res.data.data.list.length;i++){
                if (res.data.data.list[i]._type==0){
                    if (res.data.data.list[i].start_week==0){
                        res.data.data.list[i].start_week = "周一"
                    } else if (res.data.data.list[i].start_week == 1){
                        res.data.data.list[i].start_week = "周二"
                    } else if (res.data.data.list[i].start_week == 2) {
                        res.data.data.list[i].start_week = "周三"
                    } else if (res.data.data.list[i].start_week == 3) {
                        res.data.data.list[i].start_week = "周四"
                    } else if (res.data.data.list[i].start_week == 4) {
                        res.data.data.list[i].start_week = "周五"
                    } else if (res.data.data.list[i].start_week == 5) {
                        res.data.data.list[i].start_week = "周六"
                    }else{
                        res.data.data.list[i].start_week = "周日"
                    }
                    activity_list.push(res.data.data.list[i]) 
                }else{
                    if (res.data.data.list[i].start_week == 0) {
                        res.data.data.list[i].start_week = "周一"
                    } else if (res.data.data.list[i].start_week == 1) {
                        res.data.data.list[i].start_week = "周二"
                    } else if (res.data.data.list[i].start_week == 2) {
                        res.data.data.list[i].start_week = "周三"
                    } else if (res.data.data.list[i].start_week == 3) {
                        res.data.data.list[i].start_week = "周四"
                    } else if (res.data.data.list[i].start_week == 4) {
                        res.data.data.list[i].start_week = "周五"
                    } else if (res.data.data.list[i].start_week == 5) {
                        res.data.data.list[i].start_week = "周六"
                    } else {
                        res.data.data.list[i].start_week = "周日"
                    }
                    activity_end.push(res.data.data.list[i]) 
                }
            }
            this.setData({
                spinShow: false,
                activity_end,
                activity_list
            })
            
            console.log(res.data.data.list)
        })
    },
    onShow: function() {

    },
    
})