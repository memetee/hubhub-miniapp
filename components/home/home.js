// components/home/home.js
import * as fetch from '../../services/index.js';
const app = getApp();
const dayjs = app.globalData.dayjs;
Component({
    /**
     * 组件的初始数据
     */
    data: {
      activeList: 'all',
      bannerList: [],
      allList: {
        list: [],
        pageNum: 0,
        pageSize: 10,
        pageLoadComplete: false
      },
      hotList: {
        list: [],
        pageNum: 0,
        pageSize: 10,
        pageLoadComplete: false
      },
      showList: []
    },
    async ready(e) {
      // 获取轮播图
      fetch.getBanner().then(res => {
        this.setData({
          bannerList: res.list
        })
      })

      let allList = await this.getAllList()
      // TODO: 获取最热列表
      let hotList = await this.getHotList();
      this.setData({
        allList: {...this.data.allList, list: allList, pageNum: ++this.data.allList.pageNum},
        hotList: {...this.data.hotList, list: hotList, pageNum: ++this.data.hotList.pageNum},
        showList: allList
      })
    },

    /**
     * 组件的方法列表
     */
    methods: {
      async onScrollBottom() {
        wx.showLoading({
          title: '加载中',
        })
        if (this.data.activeList === 'all') { // 拉底，所有列表
          if (this.data.allList.pageLoadComplete) {
            wx.hideLoading();
            return
          };
          let result = await this.getAllList()
          result.forEach(item => {
            item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss');
          })
          let currentAllList = this.data.allList.list.concat(result);
          let newAllList = {...this.data.allList, list: currentAllList, pageNum: ++this.data.allList.pageNum, pageLoadComplete: false}
          if (result.length < 10) {
            newAllList.pageLoadComplete = true;
          }
          wx.hideLoading();
          this.setData({
            allList: newAllList,
            showList: currentAllList
          })
        } else if (this.data.activeList === 'hot') {  // 拉底，热门列表
          if (this.data.hotList.pageLoadComplete) {
            wx.hideLoading();
            return
          };
          let result = await this.getHotList()
          result.forEach(item => {
            item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss');
          })
          const currentHotList = this.data.hotList.list.concat(result);
          let newAllList = {...this.data.hotList, list: currentHotList, pageNum: ++this.data.hotList.pageNum, pageLoadComplete: false}
          wx.hideLoading();
          if (result.length < 10) {
            newAllList.pageLoadComplete = true;
          }
          this.setData({
            hotList: {...this.data.hotList, list: currentHotList, pageNum: ++this.data.hotList.pageNum},
            showList: currentHotList
          })
        }
      },

      async getAllList() {
        const dayjs = app.globalData.dayjs;
        wx.showLoading({
          title: '加载中',
        })
        let result = await fetch.getAllList({offset: this.data.allList.pageNum * this.data.allList.pageSize, size: this.data.allList.pageSize})
        result.forEach(item => {
          item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss');
        })
        wx.hideLoading()
        return result;
      },

      async getHotList() {
        const dayjs = app.globalData.dayjs;
        let result = await fetch.getHotList({offset: this.data.hotList.pageNum * this.data.allList.pageSize, size: this.data.hotList.pageSize})
        result.forEach(item => {
          item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss');
        })
        return result;
      },

      controlList(item) {
        let type = item.currentTarget.dataset.item;
        let showList = [];
        if (type === 'all') {
          showList = this.data.allList.list;
        } else {
          showList = this.data.hotList.list;
        }
        this.setData({
          activeList: type,
          showList
        })
      }
    }
})
