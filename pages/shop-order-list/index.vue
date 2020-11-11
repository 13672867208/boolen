<template>
  <div>
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
    <div class="shop-mes">
      <div class="shop-mes-box"><img src="../../assets/u1056.png" alt="">
      <span>{{item.customerName}}</span>
      </div>
      <div class="shop-mes-box2"><img src="../../assets/u1060.png" alt="">
      <span>{{item.customerPhone}}</span>
      </div>
    </div>
     <div class="item-bottom">
            <span>共{{item.buyNumber}}件商品，合计￥</span>
            <span>{{item.ordersTotalMoney}}</span>
      </div>
      <!-- <button
        class="btn"
        @click.stop="orderoff(item)"
       >
          <span>取消订单</span>
      </button>
      <button class="btn" @click.stop="relley(item)">
          <span>确认收货</span>
      </button> -->
      <el-select v-model="item.value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    <button @click="orderoff(item)">确定</button>
    </div>
  </div>
</template>

<script>
import req from '@/api/shop.js'
export default {
  name: 'order-list',
  data () {
    return {
      list: [],
      options: [
        {label: '未到货', value: '0'},
        {label: '已到货', value: '1'},
        {label: '未取货', value: '2'},
        {label: '已取货', value: '3'}
      ],
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
    toPage (data) {
      this.$router.push({path: '/order-detail', query: data})
    },
    orderoff (value) {
      // console.log(value, '1111')
      req('updateOrderState', {
        ordersId: value.ordersId,
        ordersState: '0',
        version: value.version}).then(data => {
        // console.log(data)
        if (data.code === 0) {
          this.$message.success('删除成功')
        } else {
          this.$messsage.error('删除失败')
        }
      })
    }
    // relley (value) {
    //   this.$confirm('是否确认', {

    //   })
    // },
    // evaluate (data) {
    //   console.log(data)
    //   this.$router.push({path: '/order-evaluate'})
    // }
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
  .leader {
      height: 54px;
      width: 100%;
      // padding-bottom: 60px;
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
      margin: 10px auto 12px;
      background-color: white;
      border-radius: 8px;
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
          border-top: 1px solid rgb(150, 150, 150);
          border-bottom: 1px solid rgb(150, 150, 150);
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
  }
  .shop-mes {
    display: flex;
    border-bottom: 1px solid #cccccc;
    padding: 10px 0;
  .shop-mes-box{
    margin: 0 20px;
  }
  }
  .shop-num{
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
    text-align: right;
    padding-right: 15px;
  }

</style>
