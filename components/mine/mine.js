Component({
  /**
   * 组件的初始数据
   */
  data: {
    name: '',
    avatar: ''
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      this._updateUserInfo();
    },
    hide: function () {
      this.setData({
        avatar: ''
      })
    },
    resize: function () {},
  },
  lifetimes: {
    attached() {
      this._updateUserInfo();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _updateUserInfo() {
      const _this = this;
      wx.getStorage({
        key: "userInfo",
        success(res) {
          let userInfo = res.data;
          _this.setData({
            name: userInfo.name,
            avatar: userInfo.avatarUrl
          })
        }
      })
    },
    goMyDynamic() {
      wx.navigateTo({
        url: '/components/mine/pages/my-dynamic/index'
      })
    },
    goMyFocus() {
      wx.navigateTo({
        url: '/components/mine/pages/my-focus/index',
      })
    },
    goAdvice() {
      wx.navigateTo({
        url: '/components/mine/pages/advice/index',
      })
    },
    goSetting() {
      wx.navigateTo({
        url: '/components/mine/pages/setting/index',
      })
    }
  }
})