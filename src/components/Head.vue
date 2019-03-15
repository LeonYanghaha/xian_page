<template>
  <div class="head_main">
    <div class="logo_main">
      <img src='../assets/img/logo.png'/>
      <!--<p>哈哈商场</p>-->
    </div>
    <div class="head_menu">
      <span>首页</span>
      <span>热销</span>
      <span>热销产品</span>
    </div>
    <div class="head_right">
      <span>登录</span>
      <span>注册</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Head',
  props: {
    msg: String
  }
}
</script>
<style scoped>
.head_main{
  /*border: 2px solid green;*/
  margin-top: 2em;
}
.head_menu{
  display: inline;
  /*padding-top: 12em;*/
  /*border: 2px solid blue;*/
  margin-right: 15em;
  margin-top: 3em;
}
.logo_main{
  display: inline;
  float: left;
  margin-left: 15em;
  /*border: 2px solid gold;*/
}
.logo_main img{
  width: 3em;
  height: 3em;
  display: inline;
}
.head_menu span{
  margin-left: 3em;
  font-size: 25px;
}
.head_right{
  /*border: 2px solid red;*/
  float: right;
  margin-right: 15em;
}
.head_right span{
  padding-right: 1em;
  font-size: 10px;
  color: gray;
}
</style>
