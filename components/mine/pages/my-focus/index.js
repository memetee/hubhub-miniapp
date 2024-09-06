// components/mine/pages/my-dynamic/index.js
import * as fetch from '../../../../services/index';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mineFocus: {
      list: [],
      pageNum: 0,
      pageSize: 10,
      pageLoadComplete: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    const result = await this.getMineFocus();
    const list = this.data.mineFocus.list.concat(result);
    const mineFocus = {list, pageNum: this.data.mineFocus.pageNum += 1, pageSize: this.data.mineFocus.pageSize}
    this.setData({mineFocus})
  },

  async getMineFocus() {
    if (this.data.mineFocus.pageLoadComplete) return;
    wx.showLoading({
      title: '加载中',
    })
    const result = await fetch.getMineFocus({offset: this.data.mineFocus.pageNum * this.data.mineFocus.pageSize, size: this.data.mineFocus.pageSize})
    const dayjs = app.globalData.dayjs;
    result.forEach(item => {
      item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss');
    })
    wx.hideLoading();
    return result;
  },

  async onReachBottom() {
    const result = await this.getMineFocus();
    const list = this.data.mineFocus.list.concat(result);
    let mineFocus = {list, pageNum: this.data.mineFocus.pageNum += 1, pageSize: this.data.mineFocus.pageSize}
    if (result.length < 10) {
      mineFocus.pageLoadComplete = true;
    }
    this.setData({mineFocus})
  }
})