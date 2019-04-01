<template>
  <div class="foot_main">
    <hr/>
    <div class="foot_span">
      <span>关于我们</span>
      <span>举报</span>
      <span>联系客服</span>
      <span>加入我们</span>
      <br/>
      <span>Copyright © 2004 - {{year}}  Haha商城 版权所有</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Foot',
  data: function () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
<style scoped>
  .foot_main{
    text-align: center;
    padding-top: 2em;
  }
  .foot_span{
    padding-top: 2em;
  }
  .foot_span span{
    margin-left: 3em;
    font-size: 15px;
  }
  .foot_span img{
    width: 1em;
    height: 1em;
  }
</style>
