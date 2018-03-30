// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_data: '',
    hot_list: ['白菜', '韭菜', '减肥', '增肌'],
    near_list: [],
    is: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'near_search',
      success: function (res) {
        that.setData({
          near_list: JSON.parse(res.data)
        })

        console.log(that.data.near_list)
      },
      fail: (res) => {
        console.log(res)
      }
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
  set_data: function (e) {
    this.setData({
      search_data: e.detail.value
    })
  },
  search: function (e) {
    let vm = this;
    if (this.data.search_data == '') {
      this.setData({
        is: false
      })
      setTimeout(() => {
        vm.setData({
          is: true
        })
      }, 1000)
    } else {
      let list = this.data.near_list;
      for(let i=0;i<list.length;i++){
        if (list[i] == this.data.search_data){
          wx.navigateTo({
            url: '/pages/food_list/food_list?type=' + vm.data.search_data + '&search=name',
          })
          return;
        }
      }
      list.push(this.data.search_data)
      this.setData({
        near_search: list
      });
      wx.setStorage({
        key: 'near_search',
        data: JSON.stringify(list),
      });
      wx.navigateTo({
        url: '/pages/food_list/food_list?type=' + this.data.search_data+'&search=name',
      })
    }
  }
})