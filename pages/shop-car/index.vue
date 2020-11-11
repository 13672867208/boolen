<template>
  <div class="container">
    <ul class="book-list">
      <li class="book-list-item" v-for="(item, index) in list" :key="index">

        <!-- 选择按钮 -->
        <div class="select-btn-box">
          <div>
            <input type="checkbox" @change="inputChange(item)">
            <div class="action" :style="{display: item.checked ? 'block' : 'none'}"></div>
          </div>
        </div>
        <!-- 书本信息 -->
        <div class="book-count-info">
          <img :src="item.goodsPhoto" alt="">
          <div>
            <div>{{item.goodsName}}</div>
            <div>重量：0.32kg 系列：一生自在系列</div>
            <div>
              <span>￥{{item.goodsSaleMoney}}</span>
              <div class="change-count-box">
                <div @click="countDelect(item)">-</div>
                <div>{{item.buyNumber}}</div>
                <div @click="countAdd(item)">+</div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="close-count">
      <div>
        <div>
          <input type="checkbox" @change="allInputChange">
          <div class="action" :style="{display: allChecked ? 'block' : 'none'}"></div>
        </div>
        <span>全选</span>
      </div>

      <div>
        <div>
          <b>合计:</b>
          <span>{{totalPice}}</span>
        </div>

        <button @click="numfunc">结算</button>
        <button @click="delectfunc">删除</button>
      </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/user.js'
import axios from 'axios'
export default {
  name: 'shop-car',
  data () {
    return {
      allChecked: false,
      totalPice: 0,
      list: [],
      orderDetailsInfoList: [
      ]

    }
  },
  mounted () {
    this.search()
  },
  computed: {
    // customer () {
    //   return JSON.parse(sessionStorage.getItem('storeIdInfo'))
    // },
    store () {
      return JSON.parse(sessionStorage.getItem('storeIdInfo'))
    }
  },
  methods: {
    search () {
      req('listBuycars', {customerId: this.store.customerId}).then(data => {
        // console.log(data)
        // this.list = data.data.list
        this.list = data.data.list.map(item => {
          return Object.assign({}, item, {checked: false})
        })
        this.allChecked = false
        this.totalPice = this.getTotal()
      })
    },
    allInputChange () {
      this.allChecked = !this.allChecked
      this.list.forEach(item => {
        item.checked = this.allChecked
      })
      this.totalPice = this.getTotal()
    },
    inputChange (item) {
      item.checked = !item.checked
      for (let i = 0; i < this.list.length; i++) {
        this.allChecked = true
        if (this.list[i].checked === false) {
          this.allChecked = false
          break
        }
      }
      this.totalPice = this.getTotal()
    },
    countDelect (data) {
      if (data.buyNumber > 1) {
        data.buyNumber = parseFloat(data.buyNumber) - 1
      }
      this.totalPice = this.getTotal()
    },
    countAdd (data) {
      data.buyNumber = parseFloat(data.buyNumber) + 1
      this.totalPice = this.getTotal()
    },
    getTotal () {
      let total = 0
      this.list.forEach(item => {
        if (item.checked) {
          total = total + parseFloat(item.buyNumber * item.goodsSaleMoney)
        }
      })
      return parseFloat(total.toFixed(2))
    },
    numfunc () {
      if (this.store.storeId) {
        this.$confirm('确定购买?').then(() => {
          let list = this.list.filter(item => { // 过滤数组里面带有true的
            return item.checked === true
          })
          if (list.length === 0) {
            return this.$message.error('请选择商品')
          }

          let goodsId = this.list.filter(item => { // 过滤数组里面带有true的
            return item.checked === true
          }).map(item => {
            return item.goodsId
          })

          let buyNumber = this.list.filter(item => { // 过滤数组里面带有true的
            return item.checked === true
          }).map(item => {
            return item.buyNumber
          })

          let goodsSaleMoney = this.list.filter(item => { // 过滤数组里面带有true的
            return item.checked === true
          }).map(item => {
            return item.goodsSaleMoney
          })
          let buycarId = this.list.filter(item => { // 过滤数组里面带有true的
            return item.checked === true
          }).map(item => {
            return item.buycarId
          })

          for (let i = 0; i < list.length; i++) {
            this.orderDetailsInfoList.push({goodsId: goodsId[i], buyNumber: buyNumber[i], goodsSaleMoney: goodsSaleMoney[i], buycarId: buycarId[i]})
          }
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
            // console.log(data)
            if (data.data.code === 0) {
              this.$message.success('提交成功')
              this.search()
            } else {
              this.$message.error('提交失败')
            }
          })
        }).catch(() => {
        })
      } else {
        // console.log(this.store)
        this.$confirm('确定购买?').then(() => {
          let list = this.list.filter(item => { // 过滤数组里面带有true的
            return item.checked === true
          })
          if (list.length === 0) {
            return this.$message.error('请选择商品')
          }
          this.$message.info('请填写店铺邀请码')
          setTimeout(() => {
            this.$router.push('/change-store-code')
          }, 1000)
        }).catch(() => {})
      }
    },
    delectfunc () {
      // this.list.checked
      this.$confirm('确定立即购买该商品吗?').then(() => {
        let listson = this.list.filter(item => { // 过滤数组里面带有true的
          return item.checked === true
        }).map(item => {
          return item.buycarId
        }).toString()
        if (listson.length === 0) {
          return this.$message.error('请选择商品')
        }
        req('deleteBuycar', {buycarId: listson}).then(data => {
          if (data.code === 0) {
            this.$message.success(data.msg)
            this.search()
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 110px;
}
  .book-list {
    width: 100%;
    // position: absolute;
    // left: 50%;
    // bottom: 55px;
    overflow: auto;
    // transform: translate(-50%, 0);

    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 150px;
      background: #fff;
      border-radius: 10px;
      padding: 10px 10px;
      box-sizing: border-box;
      margin-bottom: 10px;

      .select-btn-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 100%;

        >div {
          position: relative;
          width: 20px;
          height: 20px;
          border: 2px solid #ddd;
          border-radius: 50%;

          input {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 0;
            margin: 0;
            width: 15px;
            height: 15px;
            z-index: 1;
            opacity: 0;
          }

          .action {
            display: none;
            position: absolute;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: rgb(197, 156, 104);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
          }
        }
      }

      .book-count-info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1;
        height: 100%;

        >img {
          height: 55%;
          width: 20%;
          vertical-align: middle;
          align-self: center;
        }

        >div {
          > div:first-child {
            font-size: 14px;
            width: 100%;
            height: 27px;
            padding-left: 10px;
            box-sizing: border-box;
          }

          > div:nth-child(2) {
            font-size: 14px;
            width: 100%;
            height: 30px;
            padding-left: 10px;
            box-sizing: border-box;
            color: #ddd;
          }

          > div:nth-child(3) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            width: 100%;
            height: 30px;
            padding-left: 10px;
            box-sizing: border-box;

            .change-count-box {
              display: flex;
              height: 20px;

              div:first-child {
                width: 30px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
              }

              div:nth-child(2) {
                width: 50px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
                border-left: none;
                border-right: none;
              }

              div:nth-child(3) {
                width: 30px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
              }
            }
          }
        }
      }
    }
  }

.close-count {
  position: fixed;
  bottom: 60px;
  width: 100%;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  padding-left: 20px;

  div:first-child {
    display: flex;
    height: 50px;
    align-items: center;

    div {
      position: relative;
      width: 20px;
      height: 20px;
      border: 2px solid #ddd;
      border-radius: 50%;
      margin-right: 10px;

      input {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 0;
        margin: 0;
        width: 15px;
        height: 15px;
        z-index: 1;
        opacity: 0;
      }

      .action {
        display: none;
        position: absolute;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: rgb(197, 156, 104);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
      }
    }
  }

  div:nth-child(2) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
    font-size: 13px;

    div:first-child {
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      width: 100px;
      // background-color: wheat;
      font-size:13px;
      span {
        font-size: 18px;
        color: red;
      }
    }

    button {
      width: 60px;
      height: 30px;
      background: rgb(197, 156, 104);
      color: #fff;
      outline: none;
      line-height: 25px;
      text-align: center;
      border: none;
      border-radius: 10px;
      margin-left: 10px;
    }

    button:nth-child(3) {
      background: red;
    }
  }
}
</style>
