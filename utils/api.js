// utils/api.js
const app = getApp()
const $http = require('./http.js')


// 后台用户接口
const user = {
    //获取token
    login: (code, iv, data) => $http.post('/api/user/login', {
        code,
        iv,
        data
    }).then(res => res.data),
    //获取用户信息
    userInfo: (params) => $http.get('/api/user/self', {
        token: params.token
    }).then(res => res.data),
    //消息列表
    message: (params) => $http.get('/api/message/list', {
        token: params.token
    }).then(res => res.data)
}

// 招聘接口
const recruitment = {
    self: (params) => $http.get('/api/recruitment/self', { token: params.token }).then(res => res.data),
    // 获取招聘列表
    list: (params) => $http.get('/api/recruitment/list', { eoice: params.choice} ).then(res => res.data),
    // 获取招聘详情
    detail: (params) => $http.get('/api/recruitment/detail', {
        id: params.id,
        token: params.token
    }).then(res => res.data),
    // 提交招聘信息
    create: (data) => $http.post('/api/recruitment/create', {
        token: data.token,
        title: data.title, // 招聘岗位
        compensation: data.compensation, // 薪资
        work_address: data.work_address, // 公司地址
        province: data.province, // 省份
        city: data.city, // 城市
        district: data.district, // 区
        work_years: data.work_years, // 工作经验
        education: data.education, // 学历
        contents: data.contents, // 职业描述
        email: data.email,//邮箱
        company: data.company, // 公司名称
        choice:data.choice,
        id:data.id
    }).then(res => res.data),
    //上传照片（七牛）
    qiniu: () => $http.get('/api/qn/token')
        .then(res => [res.data.data.upload_token, res.data.data.upload_url, res.data.data.upload_domain]),
}
// 待支付(2)，待参加列表(3)
const order = {
    //查看订单列表（待支付，或待参加）
    list: (params) => $http.get('/api/order/list', {
        pay_status: params.pay_status,
        token: params.token
    }).then(res => res.data),
    //报名接口（创建订单）
    sign_up: (params) => $http.post('/api/order/create', {
        id: params.id,
        phone: params.num,
        name: params.name,
        content: params.content,
        token: params.token
    }),
    pay: (params) => $http.post('/api/pay', {
        token: params.token,
        pay_status: params.pay_status,
        order_sn: params.order_sn
    }),
    write_off: (params) => $http.get('/api/check/detail', {
        token: params.token,
        id: params.id
    })
}


//活动接口
const activity = {
    //活动列表
    list: (params) => {
        return $http.get('/api/activity/list', {
            type: params.type
        }).then(res => res)
    },
    // 获取活动详情
    detail: (params) => $http.get('/api/activity/detail', {
        id: params.id,
        token: params.token
    }).then(res => res.data),
    //发送评论
    comment: (params) => $http.post("/api/comment/create", {
        token: params.token,
        id: params.id,
        body: params.body
    }).then(res => res.data)
}
module.exports = {
    user,
    recruitment,
    activity,
    order
}