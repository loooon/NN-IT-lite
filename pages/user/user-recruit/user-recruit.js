const $api = require("../../../utils/api.js")
Page({
    data: {
        active: 0
    },
    onChange(event) {},
    modify:function(e){
        console.log(e)
        wx.navigateTo({
            url: '../../recruit/create/create?id='+e.target.dataset.id,
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
    onLoad: function(options) {
        this.recruit()
    },
    recruit_detail:function(e){
        console.log(e)
        wx.navigateTo({
            url: '../../recruit/detail/detail?id=' + e.currentTarget.dataset.id,
            success: function(res) {},
            
        })
    },
    recruit:function(){
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
    onReady: function() {

    },
})