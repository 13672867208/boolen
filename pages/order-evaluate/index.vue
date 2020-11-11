<template>
  <div class="container" >
    <div class="comm" v-for="(item, index) in list" :key="index">
      <div class="header">
      <img :src="item.goodsPhoto" alt="">
      <!-- <div class="star" :style="{backgroundPosition: `${180 - 5 * 36}px 0`}"></div> -->
      <!-- <ul v-for="(item, index) in photo" :key="index">
        <li @click="func(item, index)"></li>
      </ul> -->
      <div class="header-box">
      <span>评分：</span>
      <el-rate v-model="item.commentLevel"></el-rate>
      </div>
      </div>
      <div class="boxinput">
    <div class="titleclass">分享你的使用体验吧</div>
   <el-input v-model="item.comment" style="display: block;width:95%;margin: 0 auto;" type="textarea" :rows="5"></el-input>
    </div>
    </div>

    <el-button class="submit-btn" type="primary" @click="getmessage">提交</el-button>
  </div>
</template>

<script>
import req from '@/api/user.js'
import axios from 'axios'
export default {
  name: 'order-evaluate',
  data () {
    return {
      list: [],
      comment: [],
      orderDetailsInfoList: [],
      commentLevel: []
    }
  },
  mounted () {
    // console.log(this.$route.query.ordersId)
    this.submitmeaage()
  },
  methods: {
    submitmeaage () {
      req('findOrderById', {ordersId: this.$route.query.ordersId}).then(data => {
        // console.log(data)
        this.list = data.data.orderDetailsInfoList
      })
    },
    getmessage () {
      for (var i = 0; i < this.list.length; i++) {
        // console.log(this.list[i].commentLevel, 'this.list[i].commentLevel')
        this.commentLevel[i] = parseFloat(this.list[i].commentLevel).toFixed(1)
      }
      this.commentLevel.toString()
      // console.log(this.commentLevel, 'orderDetailsInfoList............................')

      // let orderDetailsInfoList = this.list.map(item => { return Object.assign({}, {goodsId: item.goodsId, commentLevel: item.commentLevel, comment: item.comment}) })
      for (i = 0; i < this.list.length; i++) {
        this.orderDetailsInfoList.push({goodsId: this.list[i].goodsId, commentLevel: this.commentLevel[i], comment: this.list[i].comment})
      }
      // console.log(this.orderDetailsInfoList, 'orderDetailsInfoList')
      axios({
        method: 'post',
        url: 'http://39.98.76.3:8080//app/comment/actionOrderComment',
        data: JSON.stringify({
          customerId: this.store.customerId,
          ordersId: this.$route.query.ordersId,
          list: this.orderDetailsInfoList
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
    },
    func (value, value1) {
      // console.log(value, value1, '11111111111')
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
  background: #fff;
  padding: 0 10px;
  .comm {
    width: 100%;
    padding: 10px;
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      img {
        width: 100px;
      }
      .header-box {
        display: flex;
        position: relative;
        left: 40px;
      }
    }
    .boxinput{
      .titleclass {
        padding: 0 10px;
         margin: 10px 0;
     }
   }
 }
}
    .el-button {
       width: 200px;
       height: 45px;
       border-radius: 10px;
       position: relative;
       top: 30px;
       left: 50%;
       transform: translate(-50%);
     }
</style>
