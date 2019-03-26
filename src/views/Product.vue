<template>
  <div id="main">
    <Head></Head>
    <div class="product_main">
      <div class="product_head">
        <div class="product_img">
            <img class="product_main_img" v-bind:src="img_host + current_product.productImgList[0].name">
        </div>
        <div class="product_meta">


        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
  import Head from '@/components/Head.vue'
  import Foot from '@/components/Foot.vue'
  import conf from '../assets/conf/conf.js'
  import axios from 'axios'
  export default {
    name: "Product",
    props: ['pid'],
    components: {
      Head, Foot
    },
    data: function() {
      return {
        url: conf.host,
        img_host: conf.img_host,
        current_product: {}
      }
    },
    mounted: function () {
      let _self = this;
      axios.get(_self.url + "/product/findById/" + _self.pid).then(function (res) {
        if (res.status !== 200 || res.data.status !==200 ) {
          return false
        }
        _self.current_product = res.data.data;
        console.log(_self.current_product);
      });
    }
  }
</script>

<style scoped>
#main{
  /*width: 69%;*/
  margin: auto;
}
.product_head{
  width: 69%;
  margin:5em auto;
}
.product_img{
  border: 1px solid red;
  display: table-cell;
  width: 40em;
  height: 22em;
}
.product_meta{
  border: 2px solid green;
  display:   table-cell;
  width: 60em;
  height: 22em;
}
.product_main_img{
  width: 90%;
  height: 90%;
  box-shadow: 3px 3px 7px grey;
  margin: auto;
}
</style>
