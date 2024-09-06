// components/swiper/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      bannerList: Array
    },

    /**
     * 组件的初始数据
     */
    data: {
      imageList: [
        {
          url: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.xc5KsKdO2u9T5hBCpE0yCgHaEK?pid=ImgDet&rs=1'
        },
        {
          url: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.oMibVUjenfCFjQitq3C42gHaE8?pid=ImgDet&rs=1',
        },
        {
          url: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.i71XTvR0MsWrPsIfkOauAQHaEH?pid=ImgDet&rs=1'
        }
      ],
      interval: 5000,
      duration: 500
    },

    lifetimes: {
      attached() {
      }
    },

    /**
     * 组件的方法列表
     */
    methods: {

    },
    created() {
    }
})
