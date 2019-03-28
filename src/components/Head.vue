<template>
  <div class="head_main">
    <div class="head_area head_logo">
      <img class="head_logo_img" src="../assets/img/logo.png">
      <span class="head_logo_span"> Haha商场</span>
    </div>
    <div class="head_area head_meanu">
      <router-link v-bind:to = "'/'">
        <span>首页</span>
      </router-link>
      <span>热销</span>
      <span>好评</span>
    </div>
    <div class="head_area head_meta">
      <div v-if="current_user === null">
        <router-link v-bind:to = "'/user/login'">
          <span>登录</span>
        </router-link>
        <router-link v-bind:to = "'/user/regist'">
          <span>注册</span>
        </router-link>
      </div>
      <div v-else>
        <el-dropdown>
          <span class="el-dropdown-link" style="font-size: 17px">
            {{ current_user.un }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link v-bind:to = "'/usercenter/datum'">
                个人资料
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link v-bind:to = "'/usercenter/order'">
                订单列表
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link v-bind:to = "'/usercenter/car'">
                购物车
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link v-bind:to = "'/usercenter/msg'">
                消息
              </router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span @click="show_msg()" class="user_exit">退出登录</span>
      </div>
    </div>
  </div>
</template>

<script>
  import store  from '@/store'
  import conf from  '@/assets/conf/conf.js'
  export default {
    name: 'Head',
    data: function(){
      return {
        current_user: null,
        token_key: conf.token_key
      }
    },
    store,
    methods: {
      show_msg: function(){
        let _self = this;
        _self.$confirm("确定要退出登录？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 退出登录，清除cookie ， 刷新页面
          _self.$cookies.remove(_self.token_key);
          _self.$router.push('/');
          _self.current_user = null;
        }).catch(() => {
          _self.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    },
    mounted: function () {
      let _self = this;
      if(!_self.$cookies.isKey(_self.token_key)){
        return false;
      }
      // 有合法的cookie
      _self.current_user = _self.$cookies.get(_self.token_key);
    }
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
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 18px;
  }
  .user_exit{
    font-size: 16px;
  }
  .user_exit:hover{
    color: red;
  }
</style>
