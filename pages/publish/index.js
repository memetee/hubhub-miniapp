import * as fetch from '../../services/index.js';
import Notify from 'vant-weapp/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    label: {id: '', content: ''},
    showLable: false,
    actions: [{
        name: '求助打听',
      },
      {
        name: '技术交流',
      },
      {
        name: '游戏交友',
      },
      {
        name: '吃瓜群众',
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取标签
    fetch.getLabel().then(res => {
      this.setData({
        actions: res.list,
        label: res.list[0]
      })
    })
  },

  inputContent(event){
    if (event.detail.value.length > 200) {
      event.detail.value = event.detail.value.slice(0, 200);
      Notify({
        text: '最大输入200个字符',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: '#ff976a'
      });
    }
    this.setData({
      content: event.detail.value
    })
  },
  inputLabel(event) {
    this.setData({
      showLable: false,
      label: event.detail,
    });
  },
  onClose() {
    this.setData({
      showLable: false
    });
  },

  closeLabel() {
    this.setData({
      showLable: false,
    });
  },

  selectLabel() {
    this.setData({
      showLable: true
    })
  },

  publishClick() {
    if (!this.data.content.length) {
      Notify({
        text: '未输入内容',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: '#ff976a'
      });
      return;
    }
    const payload = {
      content: this.data.content,
      labels: [this.data.label.name]
    }
    fetch.publishTopic(payload).then(res => {
      let resInfo = {
        icon: 'success',
        title: '发布成功'
      };
      if (res.status !== 200) {
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
  }
})