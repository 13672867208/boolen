<template>
  <div>
    <div class="pwd-con">
        <div class="pwd-item">
            <div class="item-left">原密码</div>
            <input type="password" v-model="userPassword" placeholder="请输入原密码">
        </div>
        <div class="pwd-item">
            <div class="item-left">新密码</div>
            <input type="password" v-model="userNewPassword" placeholder="请输入新密码">
        </div>
        <div class="pwd-item">
            <div class="item-left">确认新密码</div>
            <input type="password" v-model="userNewConfirmPassword" placeholder="请再次输入新密码">
        </div>
    </div>
    <div class="btn" @click="submit">
        <img src="../../assets/按钮.png" >
        <span>确认</span>
    </div>
  </div>
</template>

<script>
import req from '@/api/user.js'
export default {
  name: 'change-password',
  data () {
    return {
      userPassword: '',
      userNewPassword: '',
      userNewConfirmPassword: ''
    }
  },
  methods: {
    submit () {
      if (!this.userPassword) {
        this.$message.error('请输入密码')
        return
      }
      if (!this.userNewPassword) {
        this.$message.error('请输入新密码')
        return
      }
      if (!this.userNewConfirmPassword) {
        this.$message.error('请再次输入密码')
        return
      }
      if (this.userNewPassword !== this.userNewConfirmPassword) {
        this.$message.error('新密码不一致')
        return
      }
      req('updatePasswordById', {
        userPassword: this.userPassword,
        newPassword: this.userNewPassword
      }).then(data => {
        if (data.code === 0) {
          this.$message.success(data.msg + '请重新登录')
          sessionStorage.clear('roleInfo')
          sessionStorage.clear('userInfo')
          sessionStorage.clear('currentComm')
          sessionStorage.clear('storeIdInfo')
          setTimeout(() => {
            this.$router.push({path: '/login'})
          }, 1000)
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .pwd-con {
      width: 95%;
      height: 160px;
      margin: 12px auto;
      background-color: white;
      padding: 12px 24px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      border-radius: 8px;
      .pwd-item {
          flex: 1;
          width: 100%;
          display: flex;
          line-height: 45.34px;
          .item-left {
              flex: 1;
              font-size: 17px;
          }
          input {
              flex: 2;
              border: none;
              outline: none;
              font-size: 17px;
              color: rgb(168,168,168);
              &::placeholder {
                  color: rgb(168,168,168);
              }
          }
      }
  }
  .btn {
      width: 300px;
      height: 65px;
      position: absolute;
      left: 50%;
      margin-left: -150px;
      bottom: 80px;
      img {
          width: 100%;
      }
      span {
          font-size: 22px;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -14.4px;
          margin-left: -22px;
      }
  }
</style>
