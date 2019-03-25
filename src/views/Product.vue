<template>
  <div>
  </div>
</template>

<script>
  import conf from '../assets/conf/conf.js'
  import axios from 'axios'
  export default {
    name: "Product",
    props: ['pid'],
    data: function() {
      return {
        url: conf.host,
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

</style>
