// components/mine/pages/my-dynamic/index.js
import * as fetch from '../../../../services/index';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mineDynamic: {
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
    const result = await this.getMineDynamic();
    const list = this.data.mineDynamic.list.concat(result);
    const mineDynamic = {list, pageNum: this.data.mineDynamic.pageNum += 1, pageSize: this.data.mineDynamic.pageSize}
    this.setData({mineDynamic})
  },

  async getMineDynamic() {
    if (this.data.mineDynamic.pageLoadComplete) return;
    wx.showLoading({
      title: '加载中',
    })
    const result = await fetch.getMineDynamic({offset: this.data.mineDynamic.pageNum * this.data.mineDynamic.pageSize, size: this.data.mineDynamic.pageSize})
    const dayjs = app.globalData.dayjs;
    result.forEach(item => {
      item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss');
    })
    wx.hideLoading()
    return result;
  },

  async onReachBottom() {
    if (this.data.mineDynamic.pageLoadComplete) return;
    const result = await this.getMineDynamic();
    const list = this.data.mineDynamic.list.concat(result);
    let mineDynamic = {list, pageNum: this.data.mineDynamic.pageNum += 1, pageSize: this.data.mineDynamic.pageSize}
    if (result.length < 10) {
      mineDynamic.pageLoadComplete = true;
    }
    this.setData({mineDynamic})
  }
})