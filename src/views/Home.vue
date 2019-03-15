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
  </div>
</template>

<script>
import Head from '@/components/Head.vue'
import MenuList from '@/components/MenuList.vue'

export default {
  name: 'home',
  components: {
    Head, MenuList
  }
}
</script>
<style scoped>
.home{
  width: 100%;
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
  width: 65%;
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
</style>
