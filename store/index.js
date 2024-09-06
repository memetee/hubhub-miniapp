import { observable, action } from 'mobx-miniprogram';
// 创建实例对象
export const store = observable({
  userInfo: {
    avatar: '',
    userName: ''
  }, // 当前登陆用户信息
  
  updateUserInfo: action(function (userInfo) {
    this.userInfo = userInfo;
  }),
})