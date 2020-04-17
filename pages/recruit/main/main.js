const $api = require("../../../utils/api.js")
const $wx = require('../../../utils/wx.js')
let i = 2;
Page({
    data: {
        spinShow: true,
    },

    onLoad: function (options) {
        //请求热门招聘
        $api.recruitment.list({ choice:1}).then((list) => {
            this.setData({
                spinShow: false,
                recruitment_list: list.data.list
            }), console.log(list.data.list)
        })
    },
    onAuth2: function (e) {
        $wx.auth2(e)
        // if (e.detail.userInfo) {
        //     wx.showLoading({
        //         title: '加载中',
        //     })
        // }
    },
    create:function(){
        wx.navigateTo({
            url: '../create/create',
        })
    },
    onPullDownRefresh: function () {
        $api.recruitment.list({ choice: 1}).then((list) => {
            i = 2
            wx.stopPullDownRefresh()
            wx.showToast({
                title: '刷新成功',
                icon: 'success',
                duration: 1000
            })
            this.setData({
                msg_txt: "",
                recruitment_list: list.data.list
            }), console.log(list.data.list)
        })
    },


    onReachBottom() {
        // wx.showLoading({
        //     title: '数据加载中',
        // })
        wx.request({
            url: 'https://nnitq.yuhuofei.cn/api/recruitment/list?page=' + i,
            success: (res) => {
                // wx.hideLoading()
                let list = this.data.recruitment_list
                this.setData({
                    recruitment_list: list.concat(res.data.data.list)
                })
                i++;
                console.log(res)
                if (!res.data.data.has_next) {
                    this.setData({
                        msg_txt: "没有更多了"
                    })
                }
            }

        })
    },
})