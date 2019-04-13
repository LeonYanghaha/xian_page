<template>
  <div class="main">
    <Head></Head>
    <div>
      <ProductList v-bind:item="item"></ProductList>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from '@/components/Head.vue'
import Foot from '@/components/Foot.vue'
import ProductList from '@/components/ProductList.vue'
import conf from '../assets/conf/conf.js'
export default {
  name: 'ShowList',
  props: ['kw'],
  components: {
    Head, Foot, ProductList
  },
  data: function () {
    return {
      url: conf.host,
      img_host: conf.img_host,
      item: {
        name: '关键字的搜索结果',
        url: '/product/search',
        currentPage: 0,
        pageShowNumber: 16
      }
    }
  },
  mounted: function () {
    // let _self = this
  }
}
</script>

<style scoped>

</style>
