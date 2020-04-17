const $api = require("../../utils/api.js")
Page({
    data: {
        baoming_id: '',
        isbaoming: false,
        name: '',
        num: '',
        content:''
    },
    onLoad: function (options) {
        this.setData({ baoming_id: options.id })
        console.log(options.id)
    },
    //判断是否状态
    bao_define: function () {
        setTimeout(()=>{
            let token = wx.getStorageSync("token")
            $api.order.sign_up({ num: this.data.num, name: this.data.name, token: token, id: this.data.baoming_id, content: this.data.content }).then((res) => {
                if (res.data.msg == 'ok') {
                    this.setData({
                        isbaoming: true
                    })
                }
                if (res.data.msg == "号码错误") {
                    wx.showModal({
                        title: '温馨提示',
                        content: '电话号码有误',
                    })
                }
                if (res.data.msg == '信息不完整') {
                    wx.showModal({
                        title: '温馨提示',
                        content: '请认真填写信息',
                    })
                }
                if (res.data.msg == '报名说明未填写') {
                    wx.showModal({
                        title: '温馨提示',
                        content: '报名说明未填写',
                    })
                }
                console.log(res)
            })
        },100)
        
        // }
    },
    // 返回指定页面
    return_index: function () {
        wx.navigateBack({
            delta: 2,
        })
    },
    // 获取文本的值
    get_name: function (e) {
        this.setData({
            name: e.detail.value,
        })
        console.log(e.detail.value)
    },
    get_num: function (e) {
        this.setData({
            num: e.detail.value
        })
        console.log(e.detail.value)
    },
    get_explain: function (e) {
        this.setData({
            content: e.detail.value
        })
        console.log(e.detail.value)
    }

});