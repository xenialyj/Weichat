//app.js
App({
  onLaunch: function () {
    const APP_ID = 'wx262bf1dca70022cf'; //输入小程序appid 
    const APP_SECRET = '7facb5d2ff5dee42bb378d5ee55fbf60'; //输入小程序app_secret 
    var OPEN_ID = '' //储存获取到openid 
    var SESSION_KEY = '' //储存获取到session_key
    // 登录
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+APP_ID+'&secret='+APP_SECRET+'&js_code='+res.code+'&grant_type=authorization_code',
            data: {},
            method: 'GET',
            success: function(res) {
              console.log(res.data)
              OPEN_ID = res.data.openid; //获取到的openid 
              SESSION_KEY = res.data.session_key; //获取到session_key 
              wx.setStorageSync("session_key",res.data.session_key);
            }
          })
        } 
        else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              //console.log(res);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              var userInfo =res.userInfo;//用户基本信息
              console.log(userInfo)
              let sessionKey=wx.getStorageSync("session_key");//临时会话秘钥，通过小程序登录流程获取到的
              console.log(sessionKey)
              //请求.net webapi解密接口
              wx.request({
                url: 'http://10.20.57.206:9100/Decryption/DecryptSensitiveData',
                data:{
                  sessionKey:sessionKey,
                  encryptedData:res.encryptedData,
                  iv:res.iv
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                method: 'POST',
                success(res){
                  //解密返回过来的UnionID
                  console.log('UnionID是：'+res.data);
                }
              })

            }
          })
        }
      }
    })

    wx.checkSession({
      success (res) {
        //session_key 未过期，并且在本生命周期一直有效
        console.log('处于登录状态')
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        wx.login() //重新登录
      }
    })
  },
  getCode:function (){
    wx.request({
      url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=ACCESS_TOKEN',
      data:{
        page:"pages/mycode",
        scene:1234&123,
        width:260
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      method:'POST',
      dataType:'json',
      success:function(res){
        let smallCode = res.data; //服务器小程序码地址
      },
      fail: function(){
        complete: options.complete || function(){}
      }
    })
  },
  onUnload:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  globalData: {
    userInfo: null
  },

})