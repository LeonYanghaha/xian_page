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
      <div class="hotsell_list_main">
        <div class="menu_list_main_tag">热销</div>
        <ProductList :list="foodList"></ProductList>
      </div>
      <div class="food_list_main">
        <span>食物</span>
        <ProductList></ProductList>
      </div>
      <div class="clothes_list_main">
        <span>衣服</span>
        <ProductList></ProductList>
      </div>
      <div class="electric_list_main">
        <span>电器</span>
        <ProductList></ProductList>
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
  data: function(){
    return {
       foodList:{},
       clothesList:{},
       electricList:{},
       hoteSellList:{}
    }
  },
  beforeCreate () {
      let baseUrl = config.host;
      let _self = this;
      let url = baseUrl + '/product/findAll';
      axios.get(url).then(function (res) {
          if(res.status !== 200){
              return false;
          }
          console.log(res.data);
          _self.foodList = res.data.data;
      })
  }
}
</script>
<style scoped>
.home{
  width: 65%;
  margin: auto;
}
.menu_list_main{
  /*border: 2px solid hotpink;*/
  display: inline;
  float: left;
  width: 10em;
  /*height: 20em;*/
  /*margin-right: 1em;*/
}
.home_header_main{
  /*border: 2px solid green;*/
  width: 100%;
  height: 50%;
  margin: auto;
  margin-top: 2em;
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
.slide_img{
  width: 765px;
  height: 350px;
}
.menu_list_main_tag{
  border: 1px solid blue;
  text-align: left;
  font-size: 25px;
  font-style: italic;
  font-weight:bold;
}
.product_list_main{
  margin-top: 1em;
}
</style>
