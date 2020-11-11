<template>
  <div>
    <el-form :model="formData" inline label-width="80px" :rules="formRules" ref="form">
      <el-form-item label="头像" v-model="formData.photo" prop="photo">
        <el-upload
        class="avatar-uploader"
        action="http://39.98.76.3:8080/app/uploadImage"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
       </el-upload>

      </el-form-item>

      <el-form-item label="用户名" prop="customerAccount">
        <el-input v-model="formData.customerAccount"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="customerPassword">
        <el-input type="password" v-model="formData.customerPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmUserPassword" class="widthbox">
        <el-input type="password" v-model="formData.confirmUserPassword"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="customerPhone">
        <el-input v-model="formData.customerPhone"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="customerName">
        <el-input v-model="formData.customerName"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="customerSex">
        <el-radio-group v-model="formData.customerSex" >
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份证" prop="idCard">
        <el-input v-model="formData.idCard"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="邀请码">
        <el-input v-model="formData.inviteCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="register-btn" type="primary" @click="registerfunc">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
      </el-form-item>
    </el-form>
    <div class="return">
    <el-button @click="returnlogin" type="text">返回登录</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const qs = require('qs')
export default {
  name: 'register',
  data () {
    return {
      formData: {},
      imageUrl: '',
      formRules: {
        customerAccount: [
          {required: true, message: '请输入用户账号', trigger: 'change'}
        ],
        customerPassword: [
          {required: true, message: '请输入用户密码', trigger: 'change'}
        ],
        confirmUserPassword: [
          {required: true, message: '请确认密码', trigger: 'change'}
        ],
        customerPhone: [
          {required: true, message: '请输入手机号', trigger: 'change'},
          {message: '手机号格式不对', pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/}
        ],
        customerName: [
          {required: true, message: '请输入用户名称', trigger: 'change'}
        ],
        customerSex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        idCard: [
          {required: true, message: '请输入身份证', trigger: 'change'},
          { validator: this.validateIdCard, trigger: 'change' }
        ],
        email: [
          {required: true, message: '请输入用户邮箱', trigger: 'change'},
          {pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: '请输入正确的邮箱格式'}
        ],
        photo: [
          {required: true, message: '请输入用户头像', trigger: 'change'}
        ]

      }
    }
  },
  watch: {
    'formData.photo': {
      handler (value) {
        this.$refs.form.validateField('goodsId')
      },
      deep: true
    }
  },
  methods: {
    registerfunc () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.formData.customerPassword !== this.formData.confirmUserPassword) {
            this.$message.info('两次输入密码不一样')
            return
          }
          axios({
            method: 'post',
            url: 'http://39.98.76.3:8080/app/customer/addCustomer',
            data: qs.stringify({
              ...this.formData
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(data => {
            console.log(data)
            if (data.data.code === 0) {
              this.$message.success(data.data.msg)
              this.$router.push({path: '/login'})
            } else {
              this.$message.error(data.data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    handleAvatarSuccess (res, file) {
      this.formData.photo = res.data
      this.imageUrl = URL.createObjectURL(file.raw)
      // console.log(this.formData.photo)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    validateIdCard (rule, value, callback) {
      let reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确身份证号'))
      } else {
        callback()
      }
    },
    returnlogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 50px;
  background: #ddd;
  line-height: 50px;
  text-align: center;

  span.iconzuojiantou {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0, -50%);
    color: #409EFF;
  }
}

.logo {
  width: 80%;
  margin: 0 auto;

  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 20px;

  .el-form-item {
    width: 100%;
    text-align: center;
    // margin: 1px auto;
    /deep/ .el-form-item__content {
      width: 208px;
      height: 35px;
      .avatar-uploader {
        .el-upload {
          .avatar{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          }
        }
      }
    }
  }
}

.register-btn {
  width: 200px;
  height: 40px;
  border-radius: 10px;
  margin-top: 20px;
}
   /deep/ .el-form-item__label{
      font-size: 14px;
      width: 100px;
      // height: 80px;
      margin-right: 10px;
    }
// .el-container {
//   /deep/ .el-main .main-class2 {
//     background-color: rgb(22, 16, 16);
//     .el-form{

//     }
//   }
// }

  /deep/ .el-form-item__label {
    width: 100px;
    font-size: 14px;
    // background-color: brown;
  }
.return {
  margin-top: 3px;
  text-align: center;
  .el-button {
    color: rgb(98, 97, 97);
  }
}
</style>
