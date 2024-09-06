import * as fetch from '../../services/index';
import Notify from 'vant-weapp/notify/notify';
const app = getApp();
Page({
    data: {
      detailInfo: {},
      commentInfo: {list: []},
      commentContent: '',
      replyContent: '',
      replyComment: {},
      replyCommentId: 0,
      showEditComment: false,
      offset: 0,
      size: 10,
      isGetAllList: false,
    },

    onLoad(options) {
      // 获取详情
      fetch.getTopicDetail({momentId: options.detailId}).then(this.handleDetailInfo)

      // 获取评论
      fetch.getTopicDetailComment(options.detailId, this.data.offset, this.data.size).then(this.handleDetailComment)
    },

    // 拉底
    onScrollBottom() {
      if (!this.data.isGetAllList) {
        let offset = this.data.offset;
        let size = this.data.size;
        // 获取评论
        fetch.getTopicDetailComment(this.data.detailInfo.id, offset + size, size).then(this.handleScroll)
        this.setData({
          offset: offset + size
        })
      }
    },

    handleDetailInfo(res) {
      let detailInfo = {
        ...res,
        time: ''
      }
      const dayjs = app.globalData.dayjs;
      detailInfo.time =  dayjs(res.createTime).format('YYYY-MM-DD HH:mm:ss');
      this.setData({
        detailInfo
      })
    },

    handleDate(list) {
      const dayjs = app.globalData.dayjs;
      list && list.forEach(item => {
        item.time = dayjs().to(dayjs(item.createTime));
      })
      return list;
    },
    handleScroll(res) {
      let list = this.handleDate(res.list);
      let newCommentInfo = this.data.commentInfo;
      newCommentInfo.list.push(...list);
      if(list.length < this.data.size) {
        this.setData({
          isGetAllList: true,
          commentCount: ''
        })
      }
      this.setData({
        commentInfo: newCommentInfo
      })
    },

    handleDetailComment(res) {
      let list = this.handleDate(res.list);
      let newCommentInfo = this.data.commentInfo;
      newCommentInfo.list = list;
      newCommentInfo.commentCount = res.commentCount;
      this.setData({
        commentInfo: newCommentInfo
      })
    },
    
    changeCommentInput(event) {
      if (event.detail.length > 200) {
        event.detail = event.detail.slice(0, 200);
        Notify({
          text: '最大输入200个字符',
          duration: 1000,
          selector: '#van-notify',
          backgroundColor: '#ff976a'
        });
      }
      this.setData({
        commentContent: event.detail
      })
    },

    // 点击回复评论按钮弹出输入框
    replyComment(event){
      let comment = event.target.dataset.comment;
      this.setData({
        replyComment: comment,
        showEditComment: true
      })
    },

    // 关闭弹出框
    onClosePop() {
      this.setData({
        replyComment: {},
        showEditComment: false,
        replyContent: ''
      })
    },

    // 提交回复评论
    submitReply() {
      let commentId = this.data.replyComment.id;
      let momentId = this.data.detailInfo.id;
      fetch.submitReplyComment(commentId, {content: this.data.replyContent, momentId}).then(res => {
        this.onClosePop();
        fetch.getTopicDetailComment(this.data.detailInfo.id, 0, 10).then(this.handleDetailComment)
      })
    },

    changeReplyInput(event) {
      if (event.detail.length > 200) {
        event.detail = event.detail.slice(0, 200);
        Notify({
          text: '最大输入200个字符',
          duration: 1000,
          selector: '#van-notify',
          backgroundColor: '#ff976a'
        });
      }
      this.setData({
        replyContent: event.detail
      })
    },

    // 提交评论
    submitComment() {
      let payload = {
        momentId: this.data.detailInfo.id,
        content: this.data.commentContent,
      }
      fetch.submitComment(payload).then(res => {
        this.setData({
          commentContent: '',
          offset: 0,
          size: 10
        })
        fetch.getTopicDetailComment(this.data.detailInfo.id, 0, 10).then(this.handleDetailComment) // 刷新详情
      })
    },
})