// 封装成类 -> 实例
import { baseURL } from "./config"

class Request {
  constructor(baseURL) {
    let userInfo = wx.getStorageSync('userInfo');
    this.baseURL = baseURL;
    this.Authorization = '';
    if (userInfo) {
      this.Authorization = userInfo.token;
    }
  }
  request(options) {
    const { url } = options
    return new Promise((resolve, reject) => {
      wx.request({
        ...options,
        header: {
          Authorization: this.Authorization
        },
        url: this.baseURL + url,
        success: (res) => {
          let data = res.data;
          if (data.status !== 200) {
            wx.navigateTo({
              url: '/pages/login/index',
            })
          } else {
            resolve(res.data)
          }
        },
        fail: (err) => {
          console.log("err:", err);
        }
      })
    })
  }
  get(options) {
    return this.request({ ...options, method: "get" })
  }
  post(options) {
    return this.request({ ...options, method: "post" })
  }
  put(options) {
    return this.request({...options, method: 'put'})
  }
  updateAuthorization() {
    let userInfo = wx.getStorageSync('userInfo');
    this.Authorization = userInfo.token;
  }
}

export const request = new Request(baseURL)
