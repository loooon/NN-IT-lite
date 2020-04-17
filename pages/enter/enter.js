// pages/enter/enter.js
Page({
    data: {

    },
    onLoad: function (options) {
        setTimeout(function () {
            wx.switchTab({
                url: '/pages/index/index'
            })
        }, 3000)
    },
    onShow: function () {
    },
})