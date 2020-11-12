// pages/feedback/feedback.js
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fkText:'',
    fkPhone:'',
    fkMail:'',
  },
  //set文本框内容
  fkText:function(e){
    this.setData({
      fkText:e.detail.value
    })           
  },
  fkPhone:function(e){
    this.setData({
      fkPhone:e.detail.value
    })           
  },
  fkMail:function(e){
    this.setData({
      fkMail:e.detail.value
    })           
  },
  //提交，获取文本数据,提交到后台
  handleSuccess () {
    console.log(this.data.fkText)
    if (this.data.fkText == '') {
      $Toast({
        content: '建议不能为空',
        type: 'warning'
      });
    } else {
      $Toast({
        content: '建议提交成功',
        type: 'success'
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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