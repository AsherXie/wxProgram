// pages/food_list/food_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opt: '',
    groom_list: [],
    info: false,
    num: 0,
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.search
    })
    if (options.search == 'name') {
      this.setData({
        opt: options.type,
      })
      this.getGroom()
    } else if (options.search == 'class') {
      this.setData({
        opt: options.type,
      })
      this.getGroom();
    }
    console.log(this.data.opt)
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
    this.getGroom()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  go_cook: function (e) {
    wx.navigateTo({
      url: '/pages/cook/cook?id=' + e.currentTarget.dataset.id,
    })
  },
  getGroom: function () {
    var that = this;
    var key = this.data.opt;
    let num = this.data.num;
    num += 10;
    this.setData({
      num: num
    })
    var data1 = {};
    let url=''
    // 不同值判断不同的传递参数
    if (that.data.type == 'name') {
      url ='http://api.jisuapi.com/recipe/search'
      data1 = {
        keyword: key,
        num: that.data.num,
        appkey: 'f4ec97d309289766'
      }
    } else {
      url = 'http://api.jisuapi.com/recipe/byclass'
      data1 = {
        classid: key*1,
        start: 0,
        num: that.data.num,
        appkey: 'f4ec97d309289766'
      }
    }

    console.log(data1)

    wx.request({
      url: url,
      data: data1,
      success: (res) => {
        console.log(res)
        if (res.data.msg == "没有信息" || res.data.msg == "关键词为空") {
          this.setData({
            info: true
          })
          return
        }
        var data = res.data.result.list;
        for (var i = 0; i < data.length; i++) {
          data[i].content = res.data.result.list[i].content.slice(1, 30) + '...';
          data[i].tag = res.data.result.list[i].tag.split(',').slice(1, 3);
        }
        that.setData({
          groom_list: data
        });
      }
    })
  }
})