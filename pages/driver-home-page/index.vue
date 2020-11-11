<template>
    <div class="conter-header">
      <div class="box1" v-for="(item, index) in list" :key="index">
        <div class="box2">
        <img src="@/assets/u919.png" alt="">
        <div class="box1-son">{{item.storeId}}</div>
      </div>
      <div class="box3">
        <div>门店信息：{{item.storeName}}</div>
        <div>地址：{{item.storeAddress}}</div>
      </div>
        <div class="box4">
          <div>店长：{{item.storeManagerName}}</div>
          <div>手机：{{item.phone}}</div>
        </div>
      </div>
      </div>
</template>
<script>
import req from '@/api/driver.js'
export default {
  computed: {
    userType () {
      return JSON.parse(sessionStorage.getItem('roleInfo')).role
    },

    storeId () {
      return JSON.parse(sessionStorage.getItem('storeIdInfo'))
    }
  },
  methods: {
    search () {
      req('findStoreById', {driverAreaId: this.storeId.driverAreaId}).then(data => {
        // console.log(data)
        this.list = data.data
      })
    }
  },
  mounted () {
    this.search()
  },
  data () {
    return {
      list: []
    }
  }
}
</script>
<style lang="scss" scoped>
.conter-header {
  padding-bottom: 60px;
}
.box1 {
  .box2 {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 10px;
    box-sizing: border-box;
    // margin-left: 5px;
    img {
      margin-right: 5px;
    }
  }
  .box3 {
    height: 60px;
    padding-left: 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #cccccc;
    div {
      margin-top: 5px;
      font-size: 14px;
    }
    // div:nth-child(2) {
    //   position: relative;
    //   left: 20px;
    // }
  }
  .box4 {
    height: 80px;
    padding: 15px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
     div {
      margin-top: 5px;
      font-size: 14px;
    }
  }
}
</style>
