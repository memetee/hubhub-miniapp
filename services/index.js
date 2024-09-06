import {request as req} from './request';
import qs from 'qs';
import {baseURL, Authorization} from './config';
// 登陆
export function login(payload) {
  const url = '/login';
  return new Promise((resolve, reject) => {
    req.post({url, data: payload}).then(res => {
      if (res.status === 200) {
        resolve(res.data);
      } else {
        reject(res);
      }
    });
  })
}

// 获取轮播图
export function getBanner() {
  const url = '/banner';
  return new Promise((resolve, reject) => {
    req.get({url}).then(res => {
      resolve(res.data);
    });
  })
}

// 获取所有列表
export function getAllList(payload) {
  let url = '/moment?';
  const queryStr = qs.stringify(payload);
  url += queryStr;
  return new Promise((resolve, reject) => {
    req.get({url}).then(res => {
      if (res.status === 200) {
        resolve(res.data);
      } else {
        reject(res);
      }
    });
  })
}

// 获取最热列表
export function getHotList(payload) {
  let url = '/moment/hotList?';
  const queryStr = qs.stringify(payload);
  url += queryStr;
  return new Promise((resolve, reject) => {
    req.get({url}).then(res => {
      if (res.status === 200) {
        resolve(res.data);
      } else {
        reject(res);
      }
    });
  })
}

// 获取话题详情
export function getTopicDetail(payload) {
  let url = `/moment/${payload.momentId}`;
  return new Promise((resolve, reject) => {
    req.get({url}).then(res => {
      resolve(res.data);
    });
  })
}
export function getTopicDetailComment(momentId, offset, size) {
  let url = `/comment/${momentId}?offset=${offset}&size=${size}`;
  return new Promise((resolve, reject) => {
    req.get({url}).then(res => {
      resolve(res.data);
    });
  })
}

// 获取标签
export function getLabel() {
  let url = '/label';
  return new Promise((resolve, reject) => {
    req.get({url}).then(res => {
      if (res.status === 200) {
        resolve(res.data);
      } else {
        reject('请求失败');
      }
    });
  })
}

// 发布评论
export function submitComment(payload) {
  let url = '/comment';
  return new Promise((resolve, reject) => {
    req.post({url, data: payload}).then(res => {
      if (res.status === 200) {
        resolve({code: 200});
      } else {
        reject({code: 500, message: '失败'})
      }
    });
  })
}

// 回复评论
export function submitReplyComment(commentId, payload) {
  let url = `/comment/${commentId}/reply`;
  return new Promise((resolve, reject) => {
    req.post({url, data: payload}).then(res => {
      if (res.status === 200){
        resolve(res);
      } else {
        reject(res);
      }
    });
  })
}

// 发布话题
export function publishTopic(data) {
  let url = '/moment';
  return new Promise((resolve, reject) => {
    req.post({url, data: data}).then(res => {
      resolve(res);
    });
  })
}

// 我的动态列表
export function getMineDynamic(payload) {
  let url = '/user/moment?';
  const queryStr = qs.stringify(payload);
  url += queryStr;
  return new Promise((resolve, reject) => {
    req.get({url}).then(res => {
      resolve(res.data);
    });
  })
}

// 我的关注列表
export function getMineFocus(payload) {
  let url = '/mine/myCollectList?';
  const queryStr = qs.stringify(payload);
  url += queryStr;
  return new Promise((resolve, reject) => {
    req.get({url}).then(res => {
      resolve(res.data);
    });
  })
}


// 发布话题
export function subMitAdvice(data) {
  let url = '/mine/advice';
  let newData = {...data, userId: 1};
  return new Promise((resolve, reject) => {
    req.post({url, data: newData}).then(res => {
      if (res.code === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  })
}

// 修改用户数据
export function submitUserInfo(avatar, userInfo) {
  return new Promise((resolve, reject) => {
    if (avatar) {
      let uploadAvatarUrl = baseURL + `/user/upload/avatar`;
      wx.uploadFile({
        url: uploadAvatarUrl,
        filePath: avatar,
        name: 'avatar',
        header: {
          Authorization: req.Authorization
        },
        success (res){
          let url = `/user/update/userInfo`;
          req.put({url, data: {...userInfo}}).then(res => {
            if (res.status === 200) resolve(res);
            else reject(res);
          });
        }
      })
    } else {
      let url =`/user/update/userInfo`;
      req.put({url, data: {...userInfo}}).then(res => {
        if (res.status === 200) resolve(res);
        else reject(res);
      });
    }
  })
}

// 上传图片
export function uploadFile(tempFilePaths) {
  let url = baseURL + `/user/avatar/upload`;
    wx.uploadFile({
      url,
      filePath: tempFilePaths,
      name: 'avatar',
      header: {
        Authorization
      },
      success (res){
        resolve(res.data);
      }
    })
}

// 收藏文章
export function favariteMoment(data) {
  let url = `/moment/collect/${data.momentId}`;
  return new Promise((resolve, reject) => {
    req.post({url, data}).then(res => {
      resolve(res);
    });
  })
}

// 收藏评论/取消收藏
export function favariteComment(data) {
  let url = `/comment/collect/${data.commentId}`;
  return new Promise((resolve, reject) => {
    req.post({url, data}).then(res => {
      resolve(res);
    });
  })
}