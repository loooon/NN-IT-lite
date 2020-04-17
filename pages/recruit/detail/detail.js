const $api = require('../../../utils/api.js')
const app = getApp()
Page({
    data: {
        resume:false
    },
    onLoad: function(options) {
        let modelmes = wx.getStorageSync('modelmes');
        let isIphoneX = app.globalData.isIphoneX;
        this.setData({
            isIphoneX: isIphoneX
        })
        let token = wx.getStorageSync("token")
        //请求获取对应的详情页
        console.log(options)
        $api.recruitment.detail({ id: options.id, token: token }).then((detail) => {
            this.setData({ spinShow: false, recruitment_list: detail.data.target }), console.log(detail)
        })
    },
    resume: function() {
        this.setData({
            resume:true
        })
    },
    resume_close:function(){
        this.setData({
            resume: false
        })
    },
    //分享需要提供的一些参数
    onShareAppMessage: function (res) {
        if (res.from == 'button') { }
        return {
            title: '南宁IT圈 | 快来看看圈内的招聘信息吧',
            path: '/pages/recruit/main/main', // 路径，传递参数到指定页面。
            success: function (res) {
                console.log(res)
            }
        }
    },
    onShow: function() {

    },




})