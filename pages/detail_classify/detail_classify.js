// pages/detail_classify/detail_classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classify_list: [],
    windowW: '',
    widnowH: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let data = JSON.parse(options.data);
    for (var i = 0; i < data.length; i++) {
      let r = parseInt(Math.random() * 255);
      let g = parseInt(Math.random() * 255);
      let b = parseInt(Math.random() * 255);
      var color = 'rgb(' + r + ',' + g + ',' + b + ')';
      data[i].color = color;
    }
    console.log(data)
    this.setData({
      classify_list: data
    });

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowH: res.windowHeight,
          windowW: res.windowWidth
        })
      },
    })
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

  },
  go_list: function (e) {
    let vm = this;
    console.log(e)
    wx.navigateTo({
      url: '/pages/food_list/food_list?search=class&type='+e.currentTarget.dataset.hi,
    })
  }
})