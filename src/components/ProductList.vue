<template>
  <div class="list_main">
    <div class="title_main">
      <i class="el-icon-d-arrow-right"/>
      {{item.name}}
      <i class="el-icon-d-arrow-left"></i>
    </div>
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
export default {
  name: 'ProductList',
  props: ['item'],
  data: function () {
    return {
      url: conf.host,
      img_host: conf.img_host,
      list_data: [],
      key_word: '',
      tempObj: null
    }
  },
  watch: {
    getorderid (curval, oldval) {
      curval = curval.trim()
      if (curval === '') {
        return false
      }
      let _self = this
      _self.item.url = curval
      _self.$tool.get_product_list(_self, _self.item, function (data) {
        _self.list_data = data
      })
    }
  },
  computed: { // 同步了store中state内的orderid值
    getorderid () {
      return this.$store.state.query_word
    }
  },
  mounted: function () {
    let _self = this
    _self.$tool.get_product_list(_self, _self.item, function (data) {
      _self.list_data = data
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
  .title_main{
    font-size: 17px;
    margin: 1em;

  }
</style>
