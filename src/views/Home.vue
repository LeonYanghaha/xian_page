<template>
  <div class="home">
    <Head/>
    <div class="home_header_main">
      <div class="menu_list_main">
        <MenuList></MenuList>
      </div>
      <div class="home_carousel">
        <el-carousel height="350px">
          <el-carousel-item v-for="index in 4" :key="index">
            <img class="slide_img" src="../assets/img/slide_1.jpg" v-if="index == 4"/>
            <img class="slide_img" src="../assets/img/slide_2.jpg" v-if="index == 1"/>
            <img class="slide_img" src="../assets/img/slide_3.jpg" v-if="index == 2"/>
            <img class="slide_img" src="../assets/img/slide_4.jpg" v-if="index == 3"/>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="product_list_main">
      <div class="list_main hotsell_list_main">
        <div class="menu_list_main_tag">
          <span class="el-icon-star-on"></span>
          &nbsp;&nbsp;热销
        </div>
        <ProductList :list="hoteSellList"></ProductList>
      </div>
      <div class="list_main food_list_main">
        <div class="menu_list_main_tag">
          <span class="el-icon-goods"></span>
          &nbsp;&nbsp;食物
        </div>
        <ProductList :list="foodList"></ProductList>
      </div>
      <div class="list_main clothes_list_main">
        <div class="menu_list_main_tag">
          <span class="el-icon-info"></span>
          &nbsp;&nbsp;衣服
        </div>
        <ProductList :list="clothesList"></ProductList>
      </div>
      <div class="list_main electric_list_main">
        <div class="menu_list_main_tag">
          <span class="el-icon-mobile-phone"></span>
          &nbsp;&nbsp;电器
        </div>
        <ProductList :list="electricList"></ProductList>
      </div>
    </div>
    <div class="foot_main">
        <Foot></Foot>
    </div>
  </div>
</template>

<script>
import Head from '@/components/Head.vue'
import Foot from '@/components/Foot.vue'
import MenuList from '@/components/MenuList.vue'
import ProductList from '@/components/ProductList.vue'
import axios from 'axios'
import config from '@/assets/config/config.js'
export default {
  name: 'home',
  components: {
    Head, MenuList, ProductList, Foot
  },
  data: function () {
    return {
      foodList: {},
      clothesList: {},
      electricList: {},
      hoteSellList: {}
    }
  },
  beforeCreate () {
    let _self = this
    let getDataInfo = {
      foodList: ['/product/findAll/', 6, 'foodList'],
      clothesList: ['/product/findAll/', 6, 'clothesList'],
      electricList: ['/product/findAll/', 6, 'electricList'],
      hoteSellList: ['/product/findAll/', 6, 'hoteSellList'],
    };
    for(let key in getDataInfo){
      let url = config.host + getDataInfo[key][0] + getDataInfo[key][1]

      axios.get(url).then(function (res) {
        if (res.status !== 200) {
          return false
      }
      _self[getDataInfo[key][2]] = res.data.data
      })
    }
  }
}
</script>
<style scoped>
.home{
  width: 70%;
  margin: auto;
}
.menu_list_main{
  display: inline;
  float: left;
  width: 10em;
}
.home_header_main{
  width: 100%;
  height: 50%;
  margin: 2em auto;
  background-color: gainsboro;
}
.home_carousel{
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.list_main{
  margin-bottom: 1.5em;
}
.slide_img{
  width: 765px;
  height: 350px;
}
.menu_list_main_tag{
  /*border: 1px solid blue;*/
  text-align: left;
  font-size: 25px;
  font-style: italic;
  font-weight:bold;
}
.product_list_main{
  margin-top: 1em;
}
</style>
