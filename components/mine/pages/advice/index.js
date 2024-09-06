import * as fetch from '../../../../services/index';
import Notify from 'vant-weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adviceInfo: {
      content: '',
      contact: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },


  inputContent(info) {
    this.setData({
      adviceInfo: {
        ...this.data.adviceInfo,
        content: info.detail.value
      }
    })
  },

  inputContact(info) {
    this.setData({
      adviceInfo: {
        ...this.data.adviceInfo,
        contact: info.detail.value
      }
    })
  },

  subMitAdvice() {
    if (!this.data.adviceInfo.content.length) {
      Notify({
        text: '未输入留言内容',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: '#1989fa'
      });
      return;
    }
    if (!this.data.adviceInfo.contact.length) {
      Notify({
        text: '未输入联系方式',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: '#1989fa'
      });
      return;
    }
    fetch.subMitAdvice(this.data.adviceInfo).then(res => {
      let resInfo = {
        icon: 'success',
        title: '发布成功'
      };
      if (res.code !== 200) {
        resInfo.icon = 'error';
        resInfo.title = '发布失败'
      }
      wx.showToast({
        ...resInfo,
        duration: 2000,
        mask: true,
        complete() {
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/index/index',
            })
          }, 2000)
        }
      })
    })
  },


})