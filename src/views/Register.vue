<template>
    <div class="register_main">
        <Head/>
        <div class="register_div_main">
            <div class="register_from_main">
                用&nbsp;户&nbsp;名：<el-input  style="width:15em" v-model="un" placeholder="请输入用户名"></el-input><br/><br/>
                电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：<el-input  style="width:15em" v-model="phone" placeholder="请输入电话"></el-input><br/><br/>
                密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：<el-input style="width:15em" v-model="pw" placeholder="请输入密码"></el-input><br/><br/>
                确认密码：<el-input style="width:15em" v-model="repw" placeholder="请输入确认密码"></el-input><br/><br/>
                <el-button type="primary" plain v-on:click="register">注册</el-button>
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
  name: "Register",
  components: {
    Head,Foot
  },
  data() {
    return {
      un: 'yang',
      pw: '123',
      phone: '110',
      repw: '123'
    }
  },
  methods: {
    register:function () {
        let _self = this
        if( _self.un.trim() === '' || _self.pw.trim()==='' ||  _self.repw.trim()==='' ||  _self.phone.trim()==='' ){
            alert("用户名和密码不能为空")
            return false;
        }
        if(_self.repw.trim() !== _self.pw.trim()){
            alert("密码错误")
            return false;
        }
        let url = config.host + "/user/register"
        let data = {
            "un": _self.un,
            "pw": _self.pw,
            "phone": _self.phone,
            "repw": _self.repw,

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
.register_main{
    width: 70%;
    margin: auto;
}
.register_div_main{
    width: 50%;
    border: 2px solid black;
    margin: 8em auto;
}
</style>

