<template>
  <div class="home_main">
    <Head></Head>
    <div class="home_meanuList">
      <div class="home_meanu">
        <MeanuMain></MeanuMain>
      </div>
      <div class="home_img">
        <el-carousel height="350px">
          <el-carousel-item v-for="index in 4" :key="index">
            <img class="slide_img" src="../assets/img/slide_1.jpg" v-if="index === 4"/>
            <img class="slide_img" src="../assets/img/slide_2.jpg" v-if="index === 1"/>
            <img class="slide_img" src="../assets/img/slide_3.jpg" v-if="index === 2"/>
            <img class="slide_img" src="../assets/img/slide_4.jpg" v-if="index === 3"/>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="home_product_list">
      <div class="home_product_type_list">
        <ProductList v-for="item  in show_unit" v-bind:item="item">
        </ProductList>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from '@/components/Head.vue'
import Foot from '@/components/Foot.vue'
import ProductList from '@/components/ProductList.vue'
import MeanuMain from '@/components/MeanuMain.vue'

export default {
  name: 'home',
  components: {
    Head, Foot, ProductList, MeanuMain
  },
  data: function(){
    return {
      show_unit:{
        'food': {
          name:'食物',
          url:'/product/findAll',
          start:0,
          pageSize:8
        },'clothes': {
          name:'衣服',
          url:'/product/findAll',
          start:0,
          pageSize:8
        },'electron': {
          name:'电器',
          url:'/product/findAll',
          start:0,
          pageSize:8
        },'hot_sell': {
          name:'热销',
          url:'/product/findAll',
          start:0,
          pageSize:8
        },'cheap_sell': {
          name:'特价',
          url:'/product/findAll',
          start:0,
          pageSize:8
        }
      }
    }
  }
}
</script>
<style scoped>
  .home_main{
    height: auto;
    width: 100%;
    margin: 2em auto;
  }
  .home_meanuList{
    margin: auto;
    width: 69%;
    /*border: 2px solid black;*/
  }
  .home_meanu{
    width: 19em;
    /*height: 20em;*/
    /*border: 2px solid lawngreen;*/
    display: table-cell;
    background-color: ghostwhite;
  }
  .home_img{
    width: 80em;
    /*height: 20em;*/
    /*border: 2px solid gold;*/
    display: table-cell;
    padding-left: 0.2em;
  }
</style>
