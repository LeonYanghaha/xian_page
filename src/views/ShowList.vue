<template>
  <div class="main">
    <Head v-on:key_word_change="key_word_change"></Head>
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
  methods: {
    key_word_change: function (data) {
      let _self = this
      _self.$store.commit('change_query_word', { kw: '/product/search/' + data.kw })
    }
  },
  data: function () {
    return {
      url: conf.host,
      img_host: conf.img_host,
      item: {
        name: '关键字的搜索结果',
        url: '/product/search/' + this.kw,
        currentPage: 1,
        pageShowNumber: 16
      }
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped>

</style>
