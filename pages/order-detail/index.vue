<template>
  <div class="conter-boby">
      <!-- 客户 -->
    <div class="contentuser" v-show="userType === '2'">
        <div class="con-top">
            <div class="top-item">
                <div class="top-img-con">
                    <img src='../../assets/u919.png'>
                <span>取货门店：{{orderList.storeName}}</span>
                </div>
                <div class="top-item">
                <div class="top-img-con">
                     <img src="../../assets/u295.png">
                <span>{{orderList.storeAddress}}</span>
                </div>
                 </div>
            </div>
        </div>

        <div class="line"></div>
        <div class="order-item" v-for="item of orderList.orderDetailsInfoList" :key="item.id">
            <div class="item-center">
                <div class="img-con">
                    <img :src="item.goodsPhoto">
                </div>
                <div class="text">
                    <div class="text-con">{{item.goodsName}}</div>
                    <div class="props-con">{{item.goodsProduce}}</div>
                    <div class="price-con">
                        <span>￥</span>
                        <span>{{item.goodsSaleMoney}}</span>
                        <span>x{{item.buyNumber}}</span>
                    </div>
                </div>
            </div>
            </div>
            <div class="item-bottom">
                <span>共{{orderList.buyNumber}}件商品，合计￥</span>
                <span>{{orderList.ordersTotalMoney}}</span>
            </div>
         <div class="order-msg">
        <ul>
            <li>订单信息</li>
            <li>订单编号：</li>
            <li>创建时间：</li>
            <li>订单状态：</li>
        </ul>
        <ul>
            <li></li>
            <li>{{orderList.ordersId}}</li>
            <li>{{orderList.gmtCreate}}</li>
            <li class="active">{{orderList.ordersState}}</li>
        </ul>
    </div>
    </div>
<!-- 店长 -->
     <div class="content" v-show="userType === '3'">
      <div class="ordershop-msg" >
        <ul>
            <li>订单信息</li>
            <li>订单编号：</li>
            <li>创建时间：</li>
            <li>订单状态：</li>
        </ul>
        <ul>
            <li></li>
            <li>{{orderList.ordersId}}</li>
            <li>{{orderList.gmtCreate}}</li>
            <li class="active">{{orderList.ordersState}}</li>
        </ul>
    </div>
     <div class="content1">
         <div>
             <img src="@/assets/u1157.png" alt="">
             <span>{{orderList.customerName}}</span>
         </div>
         <div>
             <img src="@/assets/u1151.png" alt="">
             <span>{{orderList.customerPhone}}</span>
         </div>
        </div>
        <div class="con-top">
            <!-- <div class="top-item" v-for="item in topList"
            :key="item.id">
                <div class="top-img-con">
                    <img :src="item.img" :width="item.width">
                </div>
                <span>{{item.text}}</span>
            </div> -->
            <div>
             <img src="@/assets/u919.png" alt="">
             <span>取货门店：{{orderList.storeName}}</span>
         </div>
         <div>
             <img src="@/assets/u1210.png" alt="">
             <span>{{orderList.storeAddress}}</span>
         </div>
        </div>
        <div class="line"></div>
        <div class="order-item" v-for="item of orderList.orderDetailsInfoList" :key="item.id">
            <div class="item-center">
                <div class="img-con">
                    <img :src="item.goodsPhoto">
                </div>
                <div class="text">
                    <div class="text-con">{{item.goodsName}}</div>
                    <div class="props-con">{{item.goodsProduce}}</div>
                    <div class="price-con">
                        <span>￥</span>
                        <span>{{item.goodsSaleMoney}} </span>
                        <span>x{{item.buyNumber}}</span>
                    </div>
                </div>
            </div>
            </div>
            <div class="item-bottom">
                <span>共{{orderList.buyNumber}}件商品，合计￥</span>
                <span>{{orderList.ordersTotalMoney}}</span>
            </div>
    <div class="shopfooter" v-show="userType === '3'&&orderList.ordersState==='已取货'">
            <button type="primary" @click="changestate">完成取货</button>
        </div>
  </div>
    </div>
</template>

<script>
import req from '@/api/user.js'
export default {
  name: 'order-detail',
  data () {
    return {
      topList: [
        {
          id: '001',
          img: require('../../assets/卡车.png'),
          width: '18px',
          text: '取货门店：'
        }, {
          id: '002',
          img: require('../../assets/position2.png'),
          width: '13px'
        }
      ],
      orderList: [
      ],
      msgList: [
      ],
      driverconList: [
        {
          img1: require('@/assets/u1210.png'),
          label: '嘀师傅',
          img2: require('@/assets/u1151.png'),
          label2: '13762468793'
        }
      ]
    }
  },
  mounted () {
    this.search()
  },
  methods: {
    search () {
      req('findOrderById', {ordersId: this.$route.query.ordersId}).then(data => {
        // console.log(data, 'findOrderById')
        this.orderList = data.data
        if (this.orderList.ordersState === '0') {
          this.orderList.ordersState = '未到货'
        } else if (this.orderList.ordersState === '1') {
          this.orderList.ordersState = '已到货'
        } else if (this.orderList.ordersState === '2') {
          this.orderList.ordersState = '未取货'
        } else if (this.orderList.ordersState === '3') {
          this.orderList.ordersState = '已取货'
        } else if (this.orderList.ordersState === '4') {
          this.orderList.ordersState = '未评价'
        } else if (this.orderList.ordersState === '5') {
          this.orderList.ordersState = '已评价'
        } else {
          this.orderList.ordersState = '已取消'
        }
      })
    },
    changestate () {
      req('updateOrderState', {
        ordersId: this.$route.query.ordersId,
        ordersState: '4',
        version: this.$route.query.version
      }).then(data => {
        if (data.code === 0) {
          this.$message.success('状态修改成功')
          this.search()
        } else {
          this.$message.error('状态修改失败')
        }
      })
    }
  },
  computed: {
    userType () {
      return JSON.parse(sessionStorage.getItem('roleInfo')).role
    },
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
.conter-boby{
  padding-bottom: 40px;
}
  .content {
      width: 95%;
      margin: 0 auto;
      background-color: white;
      border-radius: 8px;
      padding: 13px 13px 0;
      box-sizing: border-box;
      .con-top {
          width: 100%;
          margin-top: 10px;
          .top-item {
              display: flex;
              flex-direction: column;
              padding: 5px 0 22px;
            //   .top-img-con {
            //     //   width: 30px;
            //     //   text-align: center;
            //   }
              span {
                  font-size: 15px;
              }
          }
      }
      .line {
          width: 100%;
          height: 1px;
          background-color: rgb(204,204,204);
          margin: 5px 0;
      }
  }
   .order-item {
          width: 95%;
          margin: 20px auto;
          background-color: #f2f2f2;
          border-radius: 8px;
          padding: 10px 15px;
          box-sizing: border-box;
          .item-center {
              width: 100%;
              display: flex;
              box-sizing: border-box;
              padding-top: 5px;
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
                      margin-left: 5px;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;
                  }
                  .props-con {
                      font-size: 13.5px;
                      height: 26px;
                      line-height: 26px;
                      margin-left: 5px;
                      color: rgb(168,168,168);
                      overflow: hidden;
                  }
                  .price-con {
                      text-align: right;
                      line-height: 26px;
                      span:nth-child(1) {
                          font-size: 11px;
                        //   position: relative;
                        //   left: -110px;
                          color: rgb(242,0,0);
                      }
                      span:nth-child(2) {
                          font-size: 16px;
                        //    position: relative;
                        //   left: -110px;
                          color: rgb(242,0,0);
                      }
                      span:nth-child(3) {
                          font-size: 11px;
                          color: rgb(168,168,168);
                      }
                  }
              }
          }
      }
     .item-bottom {
              width: 100%;
              line-height: 40px;
              text-align: right;
              padding-top: 5px;
              span:nth-child(1) {
                  font-size: 15px;
              }
              span:nth-child(2) {
                  font-size: 20px;
              }
          }
  .order-msg {
      width: 95%;
      border-top: 1px solid #cccccc;
      background-color: white;
      box-sizing: border-box;
      padding: 8px 0 12px;
      margin: 0 auto;
      display: flex;
      ul:nth-child(1) {
          margin: 0;
          padding: 0;
          flex: 1;
          li:nth-child(1) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 16.5px;
              font-weight: bold;
              line-height: 42px;
          }
          li:nth-child(2) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(3) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(4) {
              margin: 0;
              padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
      }
      ul:nth-child(2) {
          margin: 0;
          padding: 0;
          flex: 2;
          li:nth-child(1) {
              margin: 0;
              padding: 0;
              list-style: none;
              height: 42px;
          }
          li:nth-child(2) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(3) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(4) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          .active {
              color: rgb(195,152,98);
          }
      }
  }
  .ordershop-msg {
      width: 95%;
      border-bottom: 1px solid #cccccc;
      background-color: white;
      box-sizing: border-box;
    //   padding: 8px 0 12px;
    padding-bottom: 10px;
      margin: 0 auto;
      display: flex;
      ul:nth-child(1) {
          margin: 0;
          padding: 0;
          flex: 1;
          li:nth-child(1) {
              margin: 0;
            //   padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 16.5px;
              font-weight: bold;
              line-height: 42px;
          }
          li:nth-child(2) {
              margin: 0;
            //   padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(3) {
              margin: 0;
            //   padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(4) {
              margin: 0;
            //   padding: 0 0 0 25%;
              box-sizing: border-box;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
      }
      ul:nth-child(2) {
          margin: 0;
          padding: 0;
          flex: 2;
          li:nth-child(1) {
              margin: 0;
              padding: 0;
              list-style: none;
              height: 42px;
          }
          li:nth-child(2) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(3) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          li:nth-child(4) {
              margin: 0;
              padding: 0;
              list-style: none;
              font-size: 14.5px;
              line-height: 30px;
          }
          .active {
              color: rgb(195,152,98);
          }
      }
  }
  .content1 {
     margin-top: 20px;
     border-bottom: 1px solid rgb(208, 208, 208);
     padding-bottom: 10px;
     div {
         margin-bottom: 5px;
         height: 25px;
     }
     img {
         width: 20px;
         height: 20px;
     }
  }
    .con-top {
        //  padding: 10px 0;
         div {
             margin: 5px;
         }
     }

  .shopfooter {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 40px;
      left: 0;
      background-color: #f2f2f2;
      button{
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translate(0,-50%);
            width: 80px;
            height: 30px;
            border-radius: 15px;
            background: red;
            border: none;
            color: white;
            outline: none;
}
}
.contentuser{
    .con-top {
        padding: 10px 0 0 10px;
        height: 80px;
        border-bottom: 1px solid rgb(208, 208, 208);
        //  div{
        //     img {
        //         width: 20px;
        //     }
        //     font-size: 14px;
        // }
        .top-item{
            // height: 100%;
            // background-color: #aaa;
            padding: 0;
            margin: 0;
         .top-img-con {
          img {
                width: 20px;
            }
            font-size: 14px;
         }
        }
        .top-img-con {
            position: relative;
            left: 5px;
            // background-color: yellow;
        }
    }
    .item-bottom {
        width: 95%;
    }
}

</style>
