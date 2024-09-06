// components/other/list-item/listItem.js
import * as fetch from '../../../services/index';
const app = getApp()
Component({
    properties: {
      listItem: {
        type: Object
      }
    },
    data: {
      isFavorite: false
    },

    lifetimes: {
      attached() {
      }
    },
    methods: {
      favoriteClick(event) {
        const topicId = event.currentTarget.dataset.topicid;
        fetch.favariteTopic({articleId: topicId}).then(res => {
          this.setData({
            isFavorite: !this.data.isFavorite
          })
        })
      },
      topicItemClick(event) {
        let detailId = this.data.listItem.id;
        wx.navigateTo({
          url: `/pages/detail/index?detailId=${detailId}`,
        })
      }
    }
})
