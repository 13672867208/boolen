<template>
 <div class="bigbox" >
   <div v-for="(item, index) in list" :key="index">
   <div class="box1">
    <img src="@/assets/u1210.png" alt="">
     <div>{{item.driverName}}</div>
   </div>
    <div class="box1">
     <img src="@/assets/u1151.png" alt="">
     <div>{{item.driverPhone}}</div>
   </div>
   <hr>
   </div>
 </div>
</template>
<script>
import req from '@/api/shop.js'
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    search () {
      req('listDrivers', {storeAreaId: this.storeId.storeAreaId}).then(data => {
        // console.log(data)
        this.list = data.data
      })
    }
  },
  computed: {
    storeId () {
      return JSON.parse(sessionStorage.getItem('storeIdInfo'))
    }
  },
  created () {
    this.search()
  }
}
</script>
<style lang='scss' scoped>
.bigbox {
  padding-top: 30px;
}
  .box1{
    margin: 10px 0 20px 20px;
    display: flex;
    align-content: center;
  }
  .box1 div {
    margin-left: 8px;
    font-size: 14px;
  }
</style>
