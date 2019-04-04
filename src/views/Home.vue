<template>
  <div class="home_main">
    <Head></Head>
    <div class="home_meanuList">
      <div class="home_meanu">
        <MeanuMain v-on:change_show_img="change">
        </MeanuMain>
      </div>
      <div class="home_img" v-if="show_img">
        <el-carousel height="350px">
          <el-carousel-item v-for="index in 4" :key="index">
            <img class="slide_img" src="../assets/img/slide_1.jpg" v-if="index === 4"/>
            <img class="slide_img" src="../assets/img/slide_2.jpg" v-if="index === 1"/>
            <img class="slide_img" src="../assets/img/slide_3.jpg" v-if="index === 2"/>
            <img class="slide_img" src="../assets/img/slide_4.jpg" v-if="index === 3"/>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="slide_meanu" v-if="!show_img">
        ---------------------{{slide_data}}++
        <div  v-bind="slide_data" v-for="(item, index) in slide_data" v-bind:key="index">
            {{item + '--'}} -- {{index}}
        </div>
      </div>
    </div>
    <div class="home_product_list">
      <div class="home_product_type_list">
        <ProductList v-for="(item,index)  in show_unit" v-bind:key="index" v-bind:item="item">
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
  methods: {
    change: function (data) {
      console.log(data)
      for (let key in data.item) {
        console.log(key.toString())
      }
      this.show_img = data.show_img
      if (this.show_img === true) {
        this.slide_data = data.item
      }
    }
  },
  data: function () {
    return {
      show_img: true,
      slide_data: null,
      show_unit: {
        'food': {
          name: '食物',
          url: '/product/findAll',
          currentPage: 0,
          pageShowNumber: 4
        },
        'clothes': {
          name: '衣服',
          url: '/product/findAll',
          currentPage: 0,
          pageShowNumber: 4
        },
        'electron': {
          name: '电器',
          url: '/product/findAll',
          currentPage: 0,
          pageShowNumber: 4
        },
        'hot_sell': {
          name: '热销',
          url: '/product/findAll',
          currentPage: 0,
          pageShowNumber: 8
        },
        'cheap_sell': {
          name: '特价',
          url: '/product/findAll',
          currentPage: 0,
          pageShowNumber: 8
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
  }
  .home_meanu{
    width: 19em;
    display: table-cell;
    background-color: ghostwhite;
  }
  .home_img{
    width: 80em;
    display: table-cell;
    padding-left: 0.2em;
  }
  .slide_meanu{
    width: 80em;
    display: table-cell;
    padding-left: 0.2em;
    border: 1px solid firebrick;
  }
</style>
