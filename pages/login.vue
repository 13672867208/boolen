<template>
  <div>
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>

    <el-form :model="formData" inline label-width="65px" ref="form" :rules="formRules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop='password'>
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>

    </el-form>
    <div class="register-btn">
      <router-link to="/register">我要注册</router-link>
      <!-- <el-button type="text" @click="$router.push({path: '/register'})">注册</el-button> -->
    </div>
    <el-button @click="loginjump" class="login-btn" type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
  </div>
</template>

<script>
import axios from 'axios'
import req from '@/api/user.js'
const qs = require('qs')
export default {
  name: 'login',
  data () {
    return {
      formData: {
        username: '',
        password: '',
        role: ''
      },
      formRules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'change'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    loginjump () {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios({
            method: 'post',
            url: 'http://39.98.76.3:8080/uaa/auth/form',
            data: qs.stringify(this.formData),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(res => {
            if (res.data.code === 0) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              sessionStorage.setItem('userInfo', JSON.stringify(res.data.data)) // token存储
              this.jump()
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
        } else {
          return false
        }
      })
    },
    jump () {
      req('findInformationByIdkehu', {}).then(data => {
        this.role = data.data.role
        // console.log(this.role, '==========')
        sessionStorage.setItem('roleInfo', JSON.stringify(data.data)) // 角色存储
        if (data.data.role === '3') {
          this.preservation(data.data.role)
          this.$router.push({path: '/mine'})
        } else if (data.data.role === '2') {
          this.preservation(data.data.role)
          this.$router.push({path: '/home'})
        } else {
          this.preservation(data.data.role)
          this.$router.push({path: '/mine'})
        }
      })
    },
    preservation (value) {
      req('findInformationById', {role: value}).then(data => {
        sessionStorage.setItem('storeIdInfo', JSON.stringify(data.data))
        // this.$store.commit('addvalue', data.data) // 角色店铺id
        // console.log(this.$store.state.bookdata, 'storeId')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 80%;
  margin: 0 auto;

  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 100px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 20px auto;
  }
}

.register-btn {
  font-size: 14px;
  text-align: right;
  margin-right: 50px;
  margin-bottom: 20px;
  a {
    font-size: 13px;
    color: rgb(133, 133, 133);
  }
}

.login-btn {
  display: block;
  margin: 0 auto;
  width: 100px;
  height: 40px;
}
.el-button {
  border-radius: 10px;
  margin: 0 auto;
  width: 200px;
  height: 40px;
}
</style>
