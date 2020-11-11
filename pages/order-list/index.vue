<template>
  <div class="conterbody">
    <div class="leader">
        <ul>
            <li :class="{active: this.orderType === 'all'}" @click="getvalue('', 'all')">全部订单</li>
            <li :class="{active: this.orderType === 'payed'}" @click="getvalue('1', 'payed')">已付款</li>
            <li :class="{active: this.orderType === 'pickup'}" @click="getvalue('2', 'pickup')">待取货</li>
            <li :class="{active: this.orderType === 'confirm'}" @click="getvalue('5', 'confirm')">已完成</li>
        </ul>
    </div>
    <div class="order-item" v-for="item of list" :key="item.id" @click="toPage(item)">
        <div class="item-top">
            <img src="../../assets/我的订单.png" alt="">
            <span>{{item.ordersId}}</span>
            <span>{{item.ordersState === '0' ? '未到货' :
                    item.ordersState === '1' ? '已到货' :
                    item.ordersState === '2' ? '未取货' :
                    item.ordersState === '3' ? '已取货' :
                    item.ordersState === '4' ? '未评价' :
                    item.ordersState === '5' ? '已评价' :
                    '已取消'
                   }}</span>
        </div>
        <div class="item-center" v-for="(childitem, index) in item.orderDetailsInfoList" :key="index">
            <div class="img-con">
                <img :src="childitem.goodsPhoto" alt="">
            </div>
            <div class="text">
                <div class="text-con">
                    {{childitem.goodsName}}
                </div>
                <div class="props-con">
                    {{childitem.goodsProduce}}
                </div>
                <div class="price-con">
                    <span>￥</span>
                    <span>{{childitem.goodsSaleMoney}} &nbsp;</span>
                    <span>x{{childitem.buyNumber}}</span>
                </div>
            </div>
        </div>
        <div class="item-bottom">
            <span>共{{item.buyNumber}}件商品，合计￥</span>
            <span>{{item.ordersTotalMoney}}</span>
        </div>
        <div class="userbutton" v-show="userType === '2'">
        <button
              class="btn"
              @click.stop="orderchange(item, '6')"
              v-show="item.ordersState === '0'">
                <span>取消订单</span>
        </button>
            <button class="btn" @click.stop="evaluate(item)" v-show="item.ordersState === '4'">
                <span>评价</span>
            </button>
            <button class="btn" @click.stop="orderchange(item, '3')" v-show="item.ordersState === '2' || item.ordersState === '1'">
                <span>确认收货</span>
            </button>
        </div>
        <!-- 店长 -->
        <div class="storebutton" v-show="userType === '3'">
        <button class="btn" @click.stop="orderchange(item, '0')" v-show="item.ordersState === '2'">
                <span>取消到货</span>
            </button>
            <button class="btn" @click.stop="orderchange(item, '2')" v-show="item.ordersState === '0'">
                <span>订单到货</span>
            </button>
            <button class="btn" @click.stop="orderchange(item, '4')" v-show="item.ordersState === '3'">
                <span>订单已取货</span>
            </button>
            <button class="btn" @click.stop="orderchange(item, '2')" v-show="item.ordersState === '4'">
                <span>取消已取货</span>
            </button>
        </div>

    </div>
  </div>
</template>

<script>
import req from '@/api/user.js'
export default {
  name: 'order-list',
  data () {
    return {
      list: [],
      orderType: 'all'
    }
  },
  mounted () {
    this.getvalue('', 'all')
  },
  methods: {
    getvalue (value, index) {
      if (index === 'all') {
        req('listOrders', {
          ordersState: value,
          customerId: this.store.customerId
        }).then(data => {
          // console.log(data.data.list)
          this.list = data.data.list
          this.orderType = 'all'
        })
      } else if (index === 'payed') {
        req('listOrders', {
          customerId: this.store.customerId,
          ordersPayState: value
        }).then(data => {
        //   console.log(data.data.list)
          this.list = data.data.list
          this.orderType = 'payed'
        })
      } else if (index === 'pickup') {
        req('listOrders', {
          customerId: this.store.customerId,
          ordersState: value
        }).then(data => {
          // console.log(data.data.list)
          this.list = data.data.list
          this.orderType = 'pickup'
        })
      } else {
        req('listOrders', {
          customerId: this.store.customerId,
          ordersState: value
        }).then(data => {
          // console.log(data.data.list)
          this.list = data.data.list
          this.orderType = 'confirm'
        })
      }
    },
    toPage (data) { // 跳转到详情
      this.$router.push({path: '/order-detail', query: data})
    },
    evaluate (data) { // 跳转到评价
      this.$router.push({path: '/order-evaluate', query: data})
    },
    orderchange (item, value) { // 取消收货
      // console.log(item, '--------------')
      req('updateOrderState', {
        ordersId: item.ordersId,
        ordersState: value,
        version: item.version
      }).then(data => {
        if (data.code === 0) {
          this.$message.success(data.msg)
          this.getvalue('', 'all')
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  },
  computed: {
    current () {
      return JSON.parse(sessionStorage.getItem('currentComm'))
    },
    store () {
      return JSON.parse(sessionStorage.getItem('storeIdInfo'))
    },
    userType () {
      return JSON.parse(sessionStorage.getItem('roleInfo')).role
    }
  }
}
</script>

<style lang="scss" scoped>
.conterbody {
  padding-bottom: 55px;
}
  .leader {
      height: 54px;
      width: 100%;
      ul {
          height: 100%;
          padding: 0 0 0 2.5%;
          margin: 0;
          display: flex;
          background-color: #f2f2f2;
          margin-top: 10px;
          li {
              line-height: 64px;
              padding: 0;
              margin: 0;
              list-style: none;
              padding: 0 13px;
              font-size: 15px;
          }
          .active {
              font-size: 17px;
              color: rgb(195,152,98);
              border-bottom: 2px solid red;
          }
      }
  }
  .order-item {
      width: 100%;
      margin: 10px auto 5px;
      background-color: white;
      border-radius: 8px;
      // padding-bottom: 60px;
    //   padding: 10px 15px;
      box-sizing: border-box;
      .item-top {
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          padding: 0 10px;
          box-sizing: border-box;
          img {
              width: 13px;
              height: 16px;
          }
          span:nth-child(2) {
              font-size: 16px;
              flex: 1;
              line-height: 38px;
              position: relative;
              left: 8px;
          }
          span:nth-child(3) {
              position: absolute;
              right: 10px;
              font-size: 13px;
              color: rgb(195,152,98);
          }
      }
      .item-center {
          width: 100%;
          display: flex;
          box-sizing: border-box;
        //   padding-to: 5px;
          background-color: #f2f2f2;
          padding: 20px 15px;
          border-top: 1px solid rgb(194, 193, 193);
          border-bottom: 1px solid rgb(194, 193, 193);
          .img-con {
              flex: 1;
              text-align: center;
              img {
                  width: 84px;
              }
          }
          .text {
              flex: 2.2;
              .text-con {
                  font-size: 15px;
                  line-height: 22px;
                  overflow : hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
              }
              .props-con {
                  font-size: 13.5px;
                  line-height: 26px;
                  color: rgb(168,168,168);
                  height: 30px;
                  overflow: hidden;
              }
              .price-con {
                  text-align: right;
                  line-height: 26px;
                  span:nth-child(1) {
                      font-size: 11px;
                      color: rgb(242,0,0);
                  }
                  span:nth-child(2) {
                      font-size: 16px;
                      color: rgb(242,0,0);
                  }
                  span:nth-child(3) {
                      font-size: 11px;
                      color: rgb(168,168,168);
                  }
              }
          }
      }
      .item-bottom {
          width: 95%;
          line-height: 40px;
          text-align: right;
          padding-top: 5px;
          padding-right: 10px;
          span:nth-child(1) {
              font-size: 15px;
          }
          span:nth-child(2) {
              font-size: 20px;
          }
      }
      .item-more {
          width: 95%;
          display: flex;
          .btn {
              width: 92px;
              height: 28px;
              border-radius: 20px;
              position: relative;
              border: 1.5px solid rgb(195,152,98);
              margin-left: auto;
              margin-top: 10px;
              margin-bottom: 6px;
              span {
                  font-size: 15px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  margin-top: -10.4px;
                  margin-left: -16px;
                  color: rgb(195,152,98);
              }
          }
      }
      .storebutton {
        text-align: right;
        padding: 5px 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #cccccc;
        button {
          margin: 0 2px;
         padding: 0;
         border: 1px solid rgb(105, 105, 105);  //自定义边框
         font-size: 15px;
         border-radius: 10px;
         width: 90px;
         height: 30px;
         background-color: #fff;
        }
      }
    .userbutton{
      text-align: right;
      margin-top: 5px;
      padding: 0 10px 10px 0;
      border-bottom: 1px solid rgb(105, 105, 105);
    .btn {
       margin: 0 2px;
         padding: 0;
         border: 1px solid rgb(105, 105, 105);  //自定义边框
         font-size: 14px;
         border-radius: 10px;
         width: 70px;
         height: 25px;
         background-color: #fff;
    }

  }
  }
</style>
