<template>
  <div class="head_main">
    <div class="head_area head_logo">
      <img class="head_logo_img" src="../assets/img/logo.png">
      <span class="head_logo_span"> Haha商场</span>
    </div>
    <div class="head_area head_meanu">
      <span>首页</span>
      <span>热销</span>
      <span>好评</span>
    </div>
    <div class="head_area head_meta">
      <span>登录</span>
      <span>注册</span>
      <span>反馈</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Head',
  }
</script>
<style scoped>
  .head_main{
    height: auto;
    width: 69%;
    margin: 2em auto;
    /*border: 2px solid blue;*/
  }
  .head_area{
    height: 3em;
    display: table-cell;
    vertical-align: bottom;
    /*border: 2px solid green;*/
  }
  .head_meanu{
    width: 30em;
  }
  .head_meanu span{
    margin-left: 2.5em;
    font-size: 20px;
  }
  .head_meta{
    width: 15em;
    text-align: right;
  }
  .head_meta span{
    margin-right: 1em;
    font-size: 12px;
    color: grey;
  }
  .head_logo{
    float: left;
    width: 15em;
  }
  .head_logo_img{
    width: 3.5em;
    height: 3.5em;
  }
  .head_logo_span{
    margin-left: 1em;
    font-style: oblique;
  }
</style>
