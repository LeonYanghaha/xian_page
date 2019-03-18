<template>
    <div class="list_main">
        <div class="sign_product" v-for="signItem of list">
            <p>name:{{signItem.name}}</p>
            <p>desc:{{signItem.desc}}</p>
            <p>price:{{signItem.price}}</p>
        </div>
    </div>
</template>

<script>
import config from '@/assets/config/config.js'
export default {
  name: 'ProductList',
  props:['list'],
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
    border: 2px solid greenyellow;
}
.sign_product{
    border: 2px solid green;
    display: inline-block;
    width: 18em;
}
</style>
