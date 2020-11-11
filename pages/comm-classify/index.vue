<template>
  <div class="container">
    <ul class="book-classify">
      <li :class="{active: item.classifyId === currentClassify.classifyId}" v-for="(item, index) in classiftyList" :key="index" @click="clickTitle(item)">
        <b></b>
        <span>{{item.classifyName}}</span>
      </li>
    </ul>

    <ul class="book-classify-conteiner">
      <li class="book-classify-item" v-for="(item, index) in commList" :key="index">
        <div class="book-classify-item-title">{{item.classifyName}}</div>
        <ul class="book-list">
          <li v-for="(childItem, childIndex) in item.list" :key="childIndex" @click="getCommDetail(childItem)">
            <img :src="childItem.goodsPhoto" alt="">
            <div>{{childItem.goodsName}}</div>
            <div>
              ￥{{childItem.goodsSaleMoney}}
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/user.js'
export default {
  name: 'comm-classify',
  data () {
    return {
      classiftyList: [],
      commList: [],
      currentClassify: {}
    }
  },
  mounted () {
    this.getoneClassify()
  },
  methods: {
    getoneClassify () {
      req('queryGoodClassify', {}).then(data => {
        this.classiftyList = data.data
        // console.log(this.classiftyList[0], '=====')
        this.currentClassify = this.classiftyList[0]
        this.clickTitle(this.currentClassify)
      })
    },
    clickTitle (item) {
      // console.log(item, 'item')
      this.currentClassify = item
      req('listGoods', {goodsFirstClassifyId: item.classifyId}).then(data => {
        // console.log(data, '1231')
        this.commList = data.data
      })
    },
    getCommDetail (data) {
      sessionStorage.setItem('currentComm', JSON.stringify(data))
      this.$router.push({path: '/comm-detail'})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #ddd;
  .book-classify {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20%;
    background: #fff;
    li {
      position: relative;
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      >span {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    li.active {
      color: rgb(197, 156, 104);
      background: #ddd;
      b {
        position: absolute;
        left: 0;
        top: 50%;
        width: 3px;
        height: 20px;
        background: rgb(197, 156, 104);
        margin-top: -10px;
      }
    }
  }
  .book-classify{
    padding-bottom: 60px;
  }
  .book-classify-conteiner {
    position: absolute;
    top: 0;
    left: 22%;
    bottom: 0;
    overflow: auto;
    width: 78%;
    padding-bottom: 60px;
    .book-classify-item {
      .book-classify-item-title {
        width: 100%;
        height: 40px;
        padding-left: 10px;
        box-sizing: border-box;
        line-height: 40px;
      }
      .book-list {
        width: 100%;
        background: #fff;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        box-sizing: border-box;
        li {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 50%;
          margin-bottom: 10px;
          img {
            width: 70%;
            height: 70%;
          }
          div:nth-child(2) {
            font-size: 12px;
          }
          div:nth-child(3) {
            color: red;
            font-size: 14px;
            font-weight: bold;
            span {
              color: #ddd;
              font-weight: normal;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
