<template>
  <div>
    <div class="user">
        <div class="img-con">
            <img :src="userType.photo" >
        </div>
        <div class="text-con">{{userType.userAccount}}</div>
    </div>
    <div class="content1"  v-show="userType.role === '1'">
        <div class="content-son">
        <img src="../../assets/u1210.png" alt="">
        {{storeId.driverName}}
      <div>
        <img src="../../assets/u1151.png" alt="">
        {{storeId.driverPhone}}
      </div>
      </div>
  </div>
  <div class="content1"  v-show="userType.role === '3'">
        <div class="content-son">
          <div>
        <img src="@/assets/u919.png" alt="">
        <span>门店：{{storeId.storeName}}</span>
      </div>
      <div>
        <img src="@/assets/u1265.png" alt="">
        <span>邀请码：{{storeId.inviteCode}}</span>
      </div>
      <div>
        <img src="@/assets/u295.png" alt="">
        <span>地址：{{storeId.storeAddress}}</span>
      </div>
        </div>
  </div>
    <div class="content">
        <div class="con-item" @click="toPage('/order-list')" v-show="userType.role === '2'">
            <div>
                <img src="../../assets/订单.png" alt="">
            </div>
            <div><span>我的订单</span></div>
            <div>
                <img src="../../assets/右.png" alt="">
            </div>
        </div>
        <div
          class="con-item"
          @click="toPage('/change-password')"
          v-show="userType.role === '1' || userType.role === '2' || userType.role === '3'">
            <div>
                <img src="../../assets/修改密码.png" alt="">
            </div>
            <div><span>修改密码</span></div>
            <div>
                <img src="../../assets/右.png" alt="">
            </div>
        </div>
        <div
          class="con-item"
          @click="toPage('/change-store-code')"
          v-show="userType.role === '2'">
            <div>
                <img src="../../assets/邀请码.png" alt="">
            </div>
            <div><span>修改店铺邀请码</span></div>
            <div>
                <img src="../../assets/右.png" alt="">
            </div>
        </div>
        <div
          class="con-item"
          @click="toLogin"
          v-show="userType.role === '1' || userType.role === '2' || userType.role === '3'">
            <div>
                <img src="../../assets/退出.png" alt="">
            </div>
            <div><span>退出登录</span></div>
            <div>
                <img src="../../assets/右.png" alt="">
            </div>
        </div>
    </div>

  </div>
</template>

<script>
import req from '@/api/user.js'
export default {
  name: 'mine',
  data () {
    return {
      storeId: []
    }
  },
  created () {
    this.getvalue()
  },
  methods: {
    toPage (data) {
      this.$router.push({path: data})
    },
    getvalue () {
      req('findInformationById', {role: this.userType.role}).then(data => {
        // console.log(data, '1111111111')
        this.storeId = data.data
      })
    },
    toLogin () {
      sessionStorage.clear('userInfo')
      sessionStorage.clear('roleInfo')
      sessionStorage.clear('currentComm')
      this.$router.push('/login')
    }
  },
  computed: {
    userType () {
      return JSON.parse(sessionStorage.getItem('roleInfo'))
    }

  }
}
</script>

<style lang="scss" scoped>
   .user {
      width: 100%;
      display: flex;
      align-content: center;
      justify-content: center;
      flex-direction: column;
      .img-con {
          flex: 1;
          display: flex;
          align-items: center;
          padding-top: 10px;
          padding-bottom: 10px;

          img {
              width: 65px;
              height: 65px;
              position: relative;
              border-radius: 50%;
              left: 50%;
              transform: translate(-50% );
          }
      }
      .text-con {
          flex: 2;
          text-align: center;
          // line-height: 105px;
          font-size: 22px;
      }
  }
.content {
      width: 95%;
      // height: 206px;
      // padding: 18px 16px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      // background-color: rgb(236, 235, 235);
      border-radius: 8px;
      .con-item {
          width: 100%;
          flex: 1;
          display: flex;
          margin: 5px 0;
          padding: 0 15px;
          box-sizing: border-box;
          background-color: rgb(236, 235, 235);
           border-radius: 10px;
          div:nth-child(1) {
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                  width: 14px;
                  height: 16px;
              }
          }
          div:nth-child(2) {
              flex: 1;
              line-height: 42.5px;
              font-size: 17px;
              span {
                  position: relative;
                  left: 10px;
              }
          }
          div:nth-child(3) {
              width: 10px;
              display: flex;
              align-items: center;
              img {
                  width: 100%;
                  height: 14px;
              }
          }
      }
  }
  .img-spc {
      width: 15px;
      height: 15px;
  }

  // .img-spc {
  //     width: 15px;
  //     height: 15px;
  // }
   .content1 {
     width: 95%;
     margin: 0 auto;
     margin-top: 20px;
     .content-son {
      background-color: rgb(236, 235, 235);
       border-radius: 10px;
       padding: 10px 15px;
       div {
         margin: 3px 0;
         font-size: 14px;
       }
       img {
         margin-right: 5px;
         width: 20px;
         height: 20px;
       }
     }
     .con-item{
       background-color: rgb(236, 235, 235);
       padding: 10px 0;
      .con-item-box1 {
        display: flex;
        margin: 10px 0 10px 20px;
        div{
          margin-left: 10px;
          font-size: 14px;
        }
      }
     }
     img {
       width: 16px;
       height: 16px;
     }
     .con-item-box2{
      width: 100%;
           flex: 1;
           display: flex;
           background-color: rgb(236, 235, 235);
           margin: 10px 0;
           // padding: 0 10px;
           div:nth-child(1) {
               display: flex;
               margin-left: 20px;
               align-items: center;
               justify-content: center;
               img {
                   width: 14px;
                   height: 16px;
               }
           }
           div:nth-child(2) {
               flex: 1;
               line-height: 42.5px;
               font-size: 14px;
               span {
                   position: relative;
                   left: 10px;
               }
           }
           div:nth-child(3) {
               width: 10px;
               display: flex;
               margin-right: 10px;
               align-items: center;
               img {
                   width: 100%;
                   height: 14px;
               }
       }
     }
  }
</style>
