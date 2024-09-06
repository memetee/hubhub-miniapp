import dayjs from 'dayjs';
require('dayjs/locale/zh-cn')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
App({
  onLaunch: function() {
    const userHasAccess = this.checkUserAccess();
    if (!userHasAccess) {
      wx.reLaunch({
        url: '/pages/login/login'  // 如果用户没有访问权限，则重启到登录页面
      });
    }
  },
  checkUserAccess: function() {
    // 添加检查用户访问权限的逻辑
    const token = wx.getStorageSync('userInfo');
    return !!token;
  },
  globalData: {
    dayjs: dayjs
  }
})