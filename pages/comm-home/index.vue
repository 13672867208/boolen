<template>
  <div class="container">
    <div class="banner-pic-list">
      <el-carousel height="200px" indicator-position="none">
        <el-carousel-item v-for="(item, index) in picList" :key="index">
          <img :src="item.slideshowsRoute" alt="" @click="toDetailPage(item)">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="module-title">热门商品</div>

    <ul class="comm-list">
      <li
        v-for="(item, index) in commList"
        :key="index"
        @click="toDetailPage(item)">
        <img :src="item.goodsPhoto" alt="">
        <div class="book-info">{{item.goodsName}}</div>
        <div>￥{{item.goodsSaleMoney}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/user.js'
export default {
  name: 'comm-home',
  data () {
    return {
      picList: [],
      commList: []
    }
  },
  mounted () {
    this.getRotationChart()
    this.hotShop()
  },
  methods: {
    toDetailPage (data) {
      // console.log(data, '跳转')
      sessionStorage.setItem('currentComm', JSON.stringify(data))
      this.$router.push({path: '/comm-detail'})
    },
    getRotationChart () {
      req('listSlideshows', {}).then(data => {
        // console.log('轮播图', data)
        this.picList = data.data
      })
    },
    hotShop () {
      req('listHotgoods', {}).then(data => {
        // console.log(data, '热门')
        this.commList = data.data
      })
    }
  },
  computed: {
    store () {
      return JSON.parse(sessionStorage.getItem('storeIdInfo'))
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #ddd;
}
.el-carousel {
  .el-carousel__container {
    .el-carousel__item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.module-title {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  background: #ddd;
  margin-top: 10px;
}
.comm-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  // margin-top: 10px;
  li {
    position: relative;
    width: 48%;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
    margin: 5px 1%;
    border-radius: 10px;
    img {
      width: 100%;
      height: 170px;
    }
    div:nth-child(2) {
      font-size: 12px;
      padding-left: 10px;
    }
    div:nth-child(3) {
      font-size: 12px;
      text-align: center;
      margin-top: 10px;
      color: red;
    }
  }
}
</style>
