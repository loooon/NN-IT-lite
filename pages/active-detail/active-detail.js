const $api = require("../../utils/api.js")
let list = []
let mar_top
const app = getApp()
Page({
    currentIndenNav: 0,
    data: {
        // 头部导航文字
        navList: [{
                "text": "活动详情",
                "id": 0,
            },
            {
                "text": "活动小结",
                "id": 1,
               
            },
            {
                "text": "活动相册",
                "id": 2
            },
            {
                "text": "留言建议",
                "id": 3
            },
        ],
        spinShow: true,
        activity_detail: '',
        active_id: '',
        comment_val: '',
    },
    onLoad: function(options) {
        let modelmes = wx.getStorageSync('modelmes');
        let isIphoneX = app.globalData.isIphoneX;
        this.setData({
            isIphoneX: isIphoneX
        })
        console.log(options)
        if(options.status=="baoming"){
            this.setData({
                baoming:"baoming",
                disabled: true,
                text:"正在报名",
                active_id: options.id
            })
        }else{
            this.setData({
                text: "已结束",
                disabled: false,
                active_id: options.id
            })
        }
        // 对应详情页的id
        this.setData({
            active_id: options.id
        })
        let token = wx.getStorageSync("token")
        //请求获取对应的详情页
        $api.activity.detail({
            id: options.id,
            token: token
        }).then((detail) => {
            if (detail.data.target.start_week == 0) {
                detail.data.target.start_week = "周一"
            } else if (detail.data.target.start_week == 1) {
                detail.data.target.start_week = "周二"
            } else if (detail.data.target.start_week == 2) {
                detail.data.target.start_week = "周三"
            } else if (detail.data.target.start_week == 3) {
                detail.data.target.start_week = "周四"
            } else if (detail.data.target.start_week == 4) {
                detail.data.target.start_week = "周五"
            } else if (detail.data.target.start_week == 5) {
                detail.data.target.start_week = "周六"
            } else {
                detail.data.target.start_week = "周日"
            }
            this.setData({
                spinShow: false,
                activity_detail: detail.data.target
            }), console.log(detail.data.target)
        })
    },
    onReady: function(){
        //获取每个nav的高度
        this.createQuery()
        this.tab()
        this.nav()
    },
    // 获取每个分类开始的高度
    createQuery() {
        let that = this
        const query = wx.createSelectorQuery() //创建节点查询器 query
        query.selectAll('.y').boundingClientRect() //这段代码的意思是选择Id=the-id的节点，获取节点位置信息的查询请求
        query.selectViewport().scrollOffset() //这段代码的意思是获取页面滑动位置的查询请求
        query.exec(function(res) {
            console.log(res)
            list = res[0] //节点的信息
        })
    },
  
    // 获取头部隐藏导航的高度
    tab: function() {
        const query = wx.createSelectorQuery() //创建查询
        query.select('.tab').boundingClientRect() //查询节点的信息
        query.selectViewport().scrollOffset()
        query.exec((res) => {
            console.log(res)
            this.setData({
                scrollTop_tab: res[0].top
            })
            console.log(this.data.scrollTop_tab)
        })
    },
    // 获取头部隐藏导航的高度
    nav: function() {
        const query = wx.createSelectorQuery() //创建查询
        query.select('.nav').boundingClientRect() //查询节点的信息
        query.selectViewport().scrollOffset()
        query.exec((res) => {
            console.log(res)
            mar_top = res[0].height
        })
    },

    //获取评论的值
    comment_val: function(e) {
        this.setData({
            comment_val: e.detail.value
        })
    },

    //发送评论
    comment: function() {
        if (this.data.comment_val != '') {
            $api.activity.comment({
                id: this.data.active_id,
                token: wx.getStorageSync("token"),
                body: this.data.comment_val
            }).then((detail) => {
                console.log(detail)
                this.setData({
                    comment_val: ''
                })
                $api.activity.detail({
                    id: this.data.active_id,
                    token: wx.getStorageSync("token")
                }).then((detail) => {
                    this.setData({
                        activity_detail: detail.data.target
                    }), console.log(detail.data.target)
                })
            })
        }
    },
    // 跳转到报名页面
    baoming: function() {
        wx.navigateTo({
            url: '../sign-up/sign-up?id=' + this.data.active_id,
            success: function(res) {
                console.log("跳转报名页面")
            },
            fail: function(res) {},
        })
    },
    //分享需要提供的一些参数
    onShareAppMessage: function(res) {
        if (res.from == 'button') {}
        return {
            title: '南宁IT圈 | 快来看看圈内的最新活动吧',
            path: '/pages/index/index', // 路径，传递参数到指定页面。
            success: function(res) {
                console.log(res)
            }
        }
    },
    activeNav: function(e) {
        this.setData({
            status: true
        })
        if (e.currentTarget.dataset.index == 0) {
            wx.pageScrollTo({
                scrollTop: list[e.currentTarget.dataset.index].top - mar_top,
                success: () => {
                    this.setData({
                        scrollTop: this.data.scrollTop_tab + 100,
                        currentIndenNav: e.currentTarget.dataset.index,
                        status: false
                    })
                    console.log(this.data.scrollTop)
                }
            })

        } else {
            wx.pageScrollTo({
                scrollTop: list[e.currentTarget.dataset.index].top - mar_top - 10,
                success: () => {
                    this.setData({
                        currentIndenNav: e.currentTarget.dataset.index,
                        status: false
                    })
                }
            })

        }
    },
    onPageScroll: function(e) { //监听页面滚动
        this.setData({
            scrollTop: e.scrollTop
        })
        console.log(e.scrollTop)
        if (this.data.status) {
            this.setData({
                scrollTop: this.data.scrollTop_tab + 100
            })
        } else {

            if (e.scrollTop >= this.data.scrollTop_tab) {
                this.setData({
                    mar_top: mar_top + 5
                })
            } else {
                this.setData({
                    mar_top: 0
                })
            }
            if (e.scrollTop < list[1].top - mar_top - 10) {
                this.setData({
                    currentIndenNav: 0
                })
            } else if (e.scrollTop < list[2].top - mar_top - 10) {
                this.setData({
                    currentIndenNav: 1
                })
            } else if (e.scrollTop < list[3].top - mar_top - 10) {
                this.setData({
                    currentIndenNav: 2
                })
            } else {
                this.setData({
                    currentIndenNav: 3
                })
            }
        }

    },
});