const $api = require("../../../utils/api.js")
Page({
    data: {

    },

    onLoad: function(options) {
        console.log(options)
        let token = wx.getStorageSync("token")
        //  消息通知
        $api.order.write_off({
            token: token,
            id: options.id
        }).then((res) => {
            this.setData({
                write_off:res.data.data.target
            })
            console.log(res)
        })

    },
    onShow: function() {

    },
})