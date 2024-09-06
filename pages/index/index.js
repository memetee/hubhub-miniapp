Page({
  data: {
      home: 'footer-home-active',
      mine: 'footer-mine'
  },
  onReady: function() {
    let oldUserInfo = wx.getStorageSync('userInfo') || null;
    // 本地没有用户信息，需要登录
    if (!oldUserInfo) {
      wx.navigateTo({
        url: `/pages/login/index`,
      })
    }
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  homeClick() {
    this.setData({
      home: 'footer-home-active',
      mine: 'footer-mine'
    })
  },

  mineClick() {
    this.setData({
      home: 'footer-home',
      mine: 'footer-mine-active'
    })
  },

  incrementClick() {
    wx.navigateTo({
      url: '/pages/publish/index',
    })
  }
})
