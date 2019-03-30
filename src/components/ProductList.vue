<template>
  <div class="list_main">
    <div>{{item.name}}</div>
    <div v-for="(item, index) in list_data" v-bind:key="index" class="sign_product_main">
      <router-link v-bind:to="'/product/'+item.pid"  v-bind:pid="item.pid" target="_blank">
        <img class="product_main_img" v-bind:src='item.img'/>
      </router-link>
      <span class="product_name">
        {{item.name}}
        <span class="product_price">
          {{item.price}}
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import conf from '../assets/conf/conf.js'
import axios from 'axios'

export default {
  name: 'ProductList',
  props: ['item'],
  data: function () {
    return {
      url: conf.host,
      img_host: conf.img_host,
      list_data: []
    }
  },
  watch: {
  },
  mounted: function () {
    // TODO  2019/3/25 5:54 PM  这里的参数是写死的，后面改吧
    let _self = this
    axios.get(_self.url + _self.item.url).then(function (res) {
      if (res.status !== 200 || res.data.status !== 200) {
        return false
      }
      if (res.data.data.length <= 0) {
        // TODO  2019/3/30 9:54 AM 后端没有返回数据的情况 应该有提示
        return false
      }
      for (let i = 0; i < res.data.data.length; i++) {
        let signItem = res.data.data[i]
        _self.list_data.push({
          'name': res.data.data[i].name,
          'pid': signItem.pid,
          'price': signItem.price,
          'img': _self.img_host + signItem.productImgList[0].name
        })
      }
    })
  }
}
</script>

<style scoped>
  .list_main{
    width: 69%;
    /*border: 2px solid red;*/
    margin: 1em auto;
  }
  .sign_product_main{
    /*border: 2px solid hotpink;*/
    width: 14em;
    height: 17em;
    margin: 0.2em 0.4em;
    display: inline-block;
    box-shadow: 2px 2px 5px gainsboro;
    border: 1px solid #f3f3f3;
    text-align: center;
  }
  .sign_product_main:hover{
    box-shadow: 3px 3px 7px grey;
  }
  .product_main_img{
    width: 14em;
    height: 14em;
  }
  .product_name{
    font-size: 15px;
    color: grey;
  }
  .product_price{
    font-size: 18px;
    color: brown;
    font-style: italic;
    margin-left: 3em;
  }
</style>
