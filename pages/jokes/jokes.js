// pages/jokes/jokes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jokes: [],
    hasmore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getJokes(1)
  },

  /**
   * 获取笑话
   * 请求地址：http://v.juhe.cn/joke/content/list.php
   * 请求参数：sort=desc&page=&pagesize=20&time=1418816972&key=f85c43b707495aad5330d0d8df3e8xxx
   * 请求方式：GET
   */
  getJokes: function (page) {
    let self = this
    let timeStamp = null
    if (page === 1) {
      timeStamp = parseInt((new Date()).getTime() / 1000)
    } else {
      timeStamp = self.data.timeStamp
    }
    wx.request({
      url: 'http://v.juhe.cn/joke/content/list.php',
      data: {
        'sort': 'desc',
        'page': page,
        'pagesize':10,
        'time': timeStamp,
        'key': '9a6a2b6e80acd63bc57e39874b4b2dxx'
      },
      success: res => {
        let newData = res.data.result.data
        if (!newData) {
          self.setData({
            hasmore: false
          })
          return;
        }
        let oldData = self.data.jokes
        let newJoke = null
        if (!oldData || page === 1) {
          newJoke = newData
        } else {
          newJoke = oldData.concat(newData)
        }
        self.setData({
          jokes: newJoke,
          timeStamp: timeStamp,
          page: page
        })
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getJokes(1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let page = this.data.page
    this.getJokes(page + 1)
  }
})