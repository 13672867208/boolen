<template>
  <div class="container">
    <div class="book-banner">
      <img :src="commDetailData.goodsPhoto" alt="">
    </div>

    <div class="book-detail">
      <!-- <div class="book-name">{{commDetailData.goodsName}}</div> -->
      <div class="book-price">￥{{commDetailData.goodsSaleMoney}}</div>
      <div class="book-Describe">{{commDetailData.goodsAdvertise}}</div>
      <div class="book-score">
        <span>商品评分：</span>
        <el-rate
       v-model="commDetailData.value"
       disabled
       show-score
       text-color="#ff9900"
       score-template="{value}">
       </el-rate>
      </div>
      <div class="book-views"><span>浏览量：</span>{{commDetailData.goodsLookNumber}}</div>
      <div class="count-box">
        <span>数量</span>

        <div class="handler-box">
          <div @click="countDelete">-</div>
          <div>{{bookCount}}</div>
          <div @click="countAdd">+</div>
        </div>
      </div>
      <div class="address">
        <span>送至</span>
        <span class="iconfont iconhtmal5icon14"></span>
        <span>{{commDetailData.storeName}}</span>
      </div>
    </div>
    <div class="footer">
      <div @click="toShopCar">
        <img src="../../assets/shop_car2.png" alt="">
        <span>购物车</span>
      </div>

      <div @click="addShopCar">加入购物车</div>
      <div @click="payNow">立即购买</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import req from '@/api/user.js'
// const qs = require('qs')
export default {
  name: 'comm-detail',
  data () {
    return {
      commDetailData: {
        value: 0
      },
      bookCount: 1,
      address: '新华书店（新街口店）',
      buycarId: '',
      orderDetailsInfoList: [],
      list: []
    }
  },
  created () {
    this.loading()
  },
  methods: {
    countDelete () {
      if (this.bookCount > 1) {
        this.bookCount--
      }
    },
    countAdd () {
      this.bookCount++
    },
    loading () {
      req('findGoodById', {goodsId: this.current.goodsId,
        storeId: this.store.storeId}).then(data => {
        // console.log(data, '页面处理')
        this.commDetailData = Object.assign({}, data.data, {
          value: Number(data.data.commentLevel)
        })
      })
    },
    toShopCar () {
      this.$router.push({path: '/shop-car'})
    },
    addShopCar () {
      req('addBuycar', {
        customerId: this.store.customerId,
        goodsId: this.current.goodsId,
        buyNumber: this.bookCount,
        goodsSaleMoney: this.commDetailData.goodsSaleMoney
      }).then(data => {
        // console.log(data, '添加到购物车')
        if (data.code === 0) {
          setTimeout(() => {
            this.$message.success(data.msg)
          }, 1000)
        } else {
          setTimeout(() => {
            this.$message.error(data.msg)
          }, 1000)
        }
      })
    },
    payNow () {
    //   let data = {
    //     goodsId: this.current.goodsId,
    //     buyNumber: this.bookCount,
    //     goodsSaleMoney: this.commDetailData.goodsSaleMoney}
    //   req('addOrder', {
    //     customerId: this.store.customerId,
    //     storeId: this.store.storeId,
    //     orderDetailsInfoList: data
    //   }).then(data => {
    //     console.log(data)
    //   })
    // }
      // let a = {goodsId: this.current.goodsId, buyNumber: this.bookCount, goodsSaleMoney: this.commDetailData.goodsSaleMoney}
      if (this.store.storeId) {
        this.$confirm('确定立即购买该商品吗?').then(() => {
          this.orderDetailsInfoList.push({goodsId: this.current.goodsId, buyNumber: this.bookCount, goodsSaleMoney: this.commDetailData.goodsSaleMoney})
          // console.log(this.orderDetailsInfoList)
          axios({
            method: 'post',
            url: 'http://39.98.76.3:8080//app/order/addOrder',
            data: JSON.stringify({
              customerId: this.store.customerId,
              storeId: this.store.storeId,
              orderDetailsInfoList: this.orderDetailsInfoList
            }),
            headers: {
              'Content-Type': 'application/json;',
              Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('userInfo')).access_token
            }
          }).then(data => {
            // console.log(data, '----')
            if (data.data.code === 0) {
              this.$message.success('提交成功')
              setTimeout(() => {
                this.$router.push({path: '/order-list'})
              }, 1000)
            } else {
              this.$message.error('提交失败')
            }
          })
        }).catch(() => {})
      } else {
        // console.log(this.store)
        this.$message.info('请填写店铺邀请码')
        setTimeout(() => {
          this.$router.push('/change-store-code')
        }, 1000)
      }
    }
  },
  computed: {
    current () {
      return JSON.parse(sessionStorage.getItem('currentComm'))
    },
    store () {
      return JSON.parse(sessionStorage.getItem('storeIdInfo'))
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #ddd;
  padding-bottom: 50px;
}

.book-banner {
  width: 100%;
  height: 300px;
  padding: 10px;
  background: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-sizing: border-box;

  img {
    display: block;
    width: 80%;
    height: 100%;
    margin: 0 auto;
  }
}

.book-detail {
  // padding-bottom: 50px;
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  margin-top: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  margin: 10px auto 0;

  .book-price {
    font-size: 22px;
    color: red;
  }

  // .book-name {
  //   font-size: 18px;
  //   line-height: 30px;
  // }

  .book-Describe {
    font-size: 14px;
    color: #333;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
    overflow: hidden;
  }
.book-score{
  margin-top: 5px;
}
.book-views{
  margin-top: 4px;
  font-size: 13px;
}
  .count-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;

    .handler-box {
      display: flex;
      height: 30px;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-top: 10px;

      div:first-child {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }

      div:nth-child(2) {
        width: 40px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
      }

      div:nth-child(3) {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }
    }
  }

  .address {
    margin-top: 10px;

    .iconhtmal5icon14 {
      color: #ddd;
    }
  }
  }
.footer {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  align-items: center;
  padding: 0 10px;
   div:first-child {
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 12px;

    img {
      width: 25px;
      height: 25px;
    }
  }

  div:nth-child(2) {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid rgb(197, 156, 104);
    background: #fff;
    border-radius: 10px;
    margin-left: 10px;
  }

  div:nth-child(3) {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: rgb(197, 156, 104);
    color: #fff;
    border-radius: 10px;
    margin-left: 10px;
    // margin-right: 10px;
  }
}

</style>
