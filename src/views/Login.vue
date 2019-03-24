<template>
  <div class="login_main">
    <Head/>
    <div class="login_div_main">
        <div class="login_from_main">
            用户名：<el-input  style="width:15em" v-model="un" placeholder="请输入用户名"></el-input><br/><br/>
            密&nbsp;&nbsp;&nbsp;码：<el-input style="width:15em" v-model="pw" placeholder="请输入密码"></el-input><br/><br/>
            <el-button type="primary" plain v-on:click="login">登录</el-button>
        </div>
    </div>
    <div class="foot_main">
      <Foot></Foot>
    </div>
  </div>
</template>

<script>
import Head from '@/components/Head.vue'
import Foot from '@/components/Foot.vue'
import axios from 'axios'
import config from '@/assets/config/config.js'
import Qs from 'qs'
export default {
  name: "Login",
  components: {
    Head, Foot
  },
  data() {
    return {
      un: 'yang',
      pw: '123'
    }
  },
  methods: {
      login: function () {
          let _self = this
          if( _self.un.trim() === '' || _self.pw.trim()==='' ){
              alert("用户名和密码不能为空")
              return false;
          }
          let url = config.host + "/user/login"
          let data = {
              "un": _self.un,
              "pw": _self.pw
          }
          axios({
              headers: {
                  'deviceCode': 'A95ZEF1-47B5-AC90BF3'
              },
              method: 'post',
              url: url,
              data: Qs.stringify(data)
          }).then(function(res) {
              if(res.status!==200){
                  alert("发生异常")
                  return false
              }
              // console.log(res)
              let data = res.data
              if(data.msg!=='OK' && data.status !==200){
                  alert("登录失败")
                  return false
              }
              alert("ol") // TODO  这里是登录成功的情况，但是目前后端是基于session的，存在问题。后面抽时间改了吧
          });

      }
  }
}
</script>

<style scoped>
.login_main{
  width: 70%;
  margin: auto;
}
.login_from_main{
    width: 50%;
    border: 2px solid greenyellow;
    margin: 8em auto;

}
</style>
