//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    groom_list: [],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    classify_list: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getDataList();
    this.getGroom();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getDataList: function () {
    var that = this;
    wx.request({
      url: 'http://api.jisuapi.com/recipe/class',
      data: {
        appkey: 'f4ec97d309289766'
      },
      success: (res) => {
        let data = res.data.result;
        console.log(data)
        for(var i=0;i<data.length;i++){
          data[i].list = res.data.result[i].list.slice(1,11)
        }
    
        that.setData({
          classify_list:data
        })
      }
    })
  },
  getGroom: function () {
    var that = this;
    wx.request({
      url: 'http://api.jisuapi.com/recipe/search',
      data: {
        keyword: '白菜',
        num: 10,
        appkey: 'f4ec97d309289766'
      },
      success: (res) => {
        var data = res.data.result.list;
        for (var i = 0; i < data.length; i++) {
          data[i].content = res.data.result.list[i].content.slice(1, 30) + '...';
          data[i].tag = res.data.result.list[i].tag.split(',').slice(1,3);
        }
        console.log(data)
        that.setData({
          groom_list: data
        })
      }
    })
  },
  go_detail_classify:function(e){
    let data_arr = JSON.stringify(e.currentTarget.dataset.list);
  
    wx.navigateTo({
      url: '/pages/detail_classify/detail_classify?data='+data_arr,
    })
  },
  go_cook:function(e){
    wx.navigateTo({
      url: '/pages/cook/cook?id=' + e.currentTarget.dataset.id,
    })
  },
  go_search:function(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }
})
