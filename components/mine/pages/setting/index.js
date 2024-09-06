import * as fetch from '../../../../services/index';
Page({
  data: {
    name: '',
    avatar: '',
    isSelectAvatar: false
  },
  onLoad(options) {
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      name: userInfo.name,
      avatar: userInfo.avatarUrl
    })
  },

  // 选择头像
  updateImage() {
    wx.chooseImage({
      success: (res) => {
        this.setData({
          avatar: res.tempFilePaths[0],
          isSelectAvatar: true
        })
      }
    })
  },

  // 输入名字
  inputUserName(event) {
    this.setData({
      name: event.detail
    })
  },

  // 保存修改
  submitChange() {
    const newUserInfo = {
      name: this.data.name
    }
    let avatar = this.data.isSelectAvatar ? this.data.avatar : null;
    fetch.submitUserInfo(avatar, newUserInfo).then(res => {
      let resInfo = {
        icon: 'success',
        title: '发布成功'
      };
      if (res.status !== 200) {
        resInfo.icon = 'error';
        resInfo.title = '发布失败'
      } else { // 更新缓存
        let userInfo = wx.getStorageSync('userInfo');
        userInfo.name = this.data.name;
        wx.setStorageSync('userInfo', userInfo);
      }
      wx.showToast({
        ...resInfo,
        duration: 2000,
        mask: true,
        complete() {
          wx.navigateBack();
        }
      })
    });
  }
})