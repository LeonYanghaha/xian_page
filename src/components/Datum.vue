<template>
  <div class="main_datum">
    <el-card class="box_card">
      <div >
        用户名：{{current_user.un}}
      </div>
      <div >
        密码：********
      </div>
      <div>
        注册时间：{{current_user.registerTime}}
      </div>
      <div>
        最近登录：{{current_user.lastLoginTime}}
      </div>
      <div>
        地址列表：
      </div>
      <br/>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Datum",
    props: ['current_user'],
    mounted: function(){
      this.current_user = this.$cookies.get(this.token_key);
      console.log(this.current_user);
      // if(!this.current_user){
      //   alert("current_user is null");
      //   return false;
      // }
    }
  }
</script>

<style scoped>
.main_datum{
  /*border: 2px solid green;*/
  width: 85%;
  margin: 1em  1em;
}
.box_card div{
  margin-top: 1em;
}
</style>
