//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:{
      avatarUrl:"../../files/imgs/tou.png",
      nickName:"您的姓名",
    },
    Moreinfo:{
      Company:"公司名称",
      Post:"职位",
      PhoneNumber:"手机（仅好友可见）",
      Department:"部门",
      Email:"邮箱",
      Wechat:"微信",
      Area:"地区"
    }
  },
  //分享
  onShareAppMessage() {
    return {
        title:   '亲，这是我的名片，请惠存！',  // 默认是小程序的名称
    }
  },
  //事件处理函数
  toCreat:function(options){
      wx.navigateTo({
      url: '../creat/creat'
    })
  },
  toMyCode:function(options){
      wx.navigateTo({
      url: '../mycode/mycode'
    })
  },
  getPhoneNumber (e) {
    console.log(e);
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    if (e.detail.encryptedData) {
      this.setData({
        havePhone: false
      })
      wx.request({
        url: app.globalData.url + 'xiao_bindphone',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          user_id: app.globalData.user_id,
          sessionKey: app.globalData.sessionKey,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        },
        success(res) {
          //业务代码
        }
      })
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
