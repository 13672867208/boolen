<template>
  <div class="container">
    <div class="evaluate-title">
      <span :class="{active: type === 'all'}" @click="search('', 'all')">全部评价</span>
      <span :class="{active: type === 'good'}" @click="search('0', 'good')">好评</span>
      <span :class="{active: type === 'ordinary'}" @click="search('1', 'ordinary')">中评</span>
      <span :class="{active: type === 'bad'}" @click="search('2', 'bad')">差评</span>
    </div>

    <ul class="evaluate-list">
      <li v-for="(item, index) in list" :key="index">
        <!-- <div class="head-pic">
          <img src="../../assets/head_pic.png" alt="">
        </div> -->
        <div class="content">
          <div class="title">
            <div class="user-info">
              <div class="name">{{item.customerAccount}}</div>
              <div class="date">{{item.commentTime}}</div>
            </div>
            <div>
              <el-rate v-model="item.commentLevel"></el-rate>
            </div>
          </div>
          <div class="msg">{{item.comment}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/user.js'
export default {
  name: 'comm-evaluate',
  data () {
    return {
      list: {
      },
      type: 'all'
    }
  },
  mounted () {
    this.search('', this.type)
  },
  methods: {
    search (value, index) {
      if (index === 'all') {
        req('findGoodCommentById', {goodsId: this.current.goodsId}).then(data => {
          this.list = data.data.list
          for (let i = 0; i < this.list.length; i++) {
            // console.log(this.list[i].commentLevel, 'ata.data.list.commentLevel')
            this.list[i].commentLevel = Number(this.list[i].commentLevel)
          }
          // console.log(this.list, 'commentLevel')
          this.type = 'all'
        })
      } else if (index === 'good') {
        req('findGoodCommentById', {goodsId: this.current.goodsId,
          highComment: value
        }).then(data => {
          this.list = data.data.list
          for (let i = 0; i < this.list.length; i++) {
            // console.log(this.list[i].commentLevel, 'ata.data.list.commentLevel')
            this.list[i].commentLevel = Number(this.list[i].commentLevel)
          }
          this.type = 'good'
          // console.log(data)
        })
      } else if (index === 'ordinary') {
        req('findGoodCommentById', {goodsId: this.current.goodsId,
          highComment: value
        }).then(data => {
          this.list = data.data.list
          for (let i = 0; i < this.list.length; i++) {
            // console.log(this.list[i].commentLevel, 'ata.data.list.commentLevel')
            this.list[i].commentLevel = Number(this.list[i].commentLevel)
          }
          this.type = 'ordinary'
          // console.log(data)
        })
      } else {
        req('findGoodCommentById', {goodsId: this.current.goodsId,
          highComment: value
        }).then(data => {
          this.list = data.data.list
          for (let i = 0; i < this.list.length; i++) {
            // console.log(this.list[i].commentLevel, 'ata.data.list.commentLevel')
            this.list[i].commentLevel = Number(this.list[i].commentLevel)
          }
          this.type = 'bad'
          // console.log(data)
        })
      }
    }
  },
  computed: {
    current () {
      return JSON.parse(sessionStorage.getItem('currentComm'))
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  // background: #ddd;
  padding-bottom: 10px;
  // height: 100%;
  .evaluate-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    box-sizing: border-box;
    background: rgb(233, 232, 232);
    margin-top: 5px;
    span {
      padding: 0 10px;
    }

    .active {
      color: #C39862;
      font-size: 20px;
    }
  }

  .evaluate-list {
    width: 95%;
    background: #fff;
    margin: 0 auto;
    // background-color: rgb(230, 230, 230);
    border-radius: 10px;
    margin-top: 10px;
    // padding: 5px;
    box-sizing: border-box;
    li {
      display: flex;
      margin-bottom: 5px;
      border-radius: 10px;
      background-color: rgb(230, 230, 230);
      // border-bottom: 1px solid rgb(202, 199, 199);
      // margin-top: 10px;
      // .head-pic {
      //   width: 50px;
      //   height: 50px;
      //   padding: 10px;

      //   img {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }

      .content {
        flex: 1;
        padding: 10px;

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 60px;

          .user-info {
            .date {
              color: rgb(142, 142, 142);
              font-size: 14px;
            }
          }

          .star {
            width: 90px;
            height: 18px;
            background-image: url('../../assets/stars.png');
            background-position: 0 0;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
}
</style>
