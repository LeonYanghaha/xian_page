<template>
  <div class="list_main">
    <hr/>
    <div class="sign_product" v-for="signItem of list">
      <span class="sign_product_img">
        <a target="_blank" v-bind:href="'http://127.0.0.1:8888/product/findById/'+signItem.pid">
        <img v-bind:src="'http://127.0.0.1:8888/img/'+ signItem.productImgList[0].name ">
        </a>
      </span>
      <span class="sign_product_info">
        <router-link to="/product">
          {{signItem.name}}
        </router-link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span style="font-size: 25px; color: red; font-style: italic;">
          <span style="font-size: 20px">￥:</span>
          {{signItem.price}}
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import config from '@/assets/config/config.js'
export default {
  name: 'ProductList',
  props: ['list'],
  data: function () {
    return {
      imgHost: config.imgHost
    }
  }
}
</script>

<style scoped>
.list_main{
  width: 100%;
  margin: auto;
  /*border: 2px solid greenyellow;*/
}
.sign_product{
  border: 1px solid gainsboro;
  margin: 0.5em 0.5em;
  display: inline-block;
  width: 18em;
  box-shadow: 2px 2px 5px gainsboro;
}
span.sign_product :hover{
  border: 1px solid black;
}
.sign_product_img{
  display: block;
}
.sign_product_img img{
  width: 15em;
  height: 15em;
}
</style>
