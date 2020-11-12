// pages/creat/creat.js
//获取应用实例
const app = getApp();
const { $Message } = require('../../dist/base/index');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:{
      avatarUrl:"../../files/imgs/tou.png",
      nickName:"您的姓名",
      province:"地址",
    },
    Moreinfo:{
      Company:"公司名称",
      Post:"职位",
      PhoneNumber:"手机号",
      Department:"部门",
      Email:"邮箱",
      Wechat:"微信"
    },
    getCode:'获取验证码',
    array: ['美国', '中国', '巴西', '日本'],
    isAgree: false,
    showDialog: false,
    PhoneText:'自动获取',
    isCreated:false,
    industry:[],
    isAnnual:0,
  },
  //点击弹出框按钮关闭或分享
  openDialog: function () {
    this.setData({
        istrue: true
    })
  },
  closeDialog: function () {
    this.setData({
        istrue: false
    })
  },
  toMyCode:function(options){
      wx.navigateTo({
      url: '../mycode/mycode'
    })
  },
  //绑定行业
  hyChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
        isAnnual: e.detail.value
    })
  },
  //绑定部门
  bmChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
        isAnnual: e.detail.value
    })
  },
  //绑定地区
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
        isAnnual: e.detail.value
    })
  },
  //获取手机号
  getPhoneNumber (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  //同意条款
  bindAgreeChange: function (e) {
    this.setData({
        isAgree: !!e.detail.value.length
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getIndustry();
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
  },
  getIndustry (e) {
    let that = this; 
    wx.request({
      url: 'http://10.20.57.206:9100/Contacts/GetTradeInfo',
      method:'POST',
      header: {
        'content-type': 'application/json'
      },
      success:(res) => {
        wx.setStorageSync("hy",res.data);
        console.log(res.data);
        that.setData({
          industry:res.data
        })
      }
    })
    // let industry=wx.getStorageSync("hy");
    // console.log(industry);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.industry)

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})