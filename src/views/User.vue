<template>
  <div>
    <Head></Head>
    <div class="user_main">
      <div v-if="active ==='login'" class="login_main active_main">
        用户名：
        <el-input class="input_area" v-model="un" placeholder="请输入用户名">
        </el-input><br/>
        密&nbsp;&nbsp;&nbsp;码：
        <el-input  class="input_area" v-model="pw" placeholder="请输入密码">
        </el-input><br/>
        <el-button type="primary" @click="login()" plain>登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
      </div>
      <div v-if="active === 'regist'" class="regist_main active_main">
        用&nbsp;户&nbsp;名：
        <el-input class="input_area" v-model="un" placeholder="请输入用户名">
        </el-input><br/>
        密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：
        <el-input class="input_area" v-model="pw" placeholder="请输入密码">
        </el-input><br/>
        确认密码：
        <el-input  class="input_area" v-model="repw" placeholder="请输入确认密码">
        </el-input><br/>
        <el-button type="primary" @click="regist()" plain>注&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from '@/components/Head.vue'
import Foot from '@/components/Foot'
import conf from '../assets/conf/conf.js'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'User',
  components: { Foot, Head },
  component: {
    Head, Foot
  },
  props: ['active'],
  data: function () {
    return {
      un: 'yang',
      pw: '123',
      repw: '',
      url: conf.host,
      token_key: conf.token_key
    }
  },
  methods: {
    login: function () {
      let _self = this
      if (!_self.un || !_self.pw) {
        alert('用户名，密码不能为空')
        return false
      }
      let data = {
        'un': _self.un,
        'pw': _self.pw
      }
      axios({
        headers: {
          'deviceCode': 'A95ZEF1-47B5-AC90BF3'
        },
        method: 'post',
        url: _self.url + '/user/login',
        data: qs.stringify(data)
      }).then(function (res) {
        if (res.status !== 200) {
          alert('发生异常')
          return false
        }
        let data = res.data
        if (data.msg !== 'OK' && data.status !== 200) {
          alert('登录失败')
          return false
        }
        // 登录成功，将jwt 结果存储
        _self.$cookies.set(_self.token_key, data.data, '30MIN')
        // 登录成功后，跳转到首页
        _self.$router.push('/')
      })
    },
    regist: function () {
      let _self = this
      if (!_self.un || !_self.pw || !_self.repw) {
        alert('用户名，密码不能为空')
        return false
      }
      if (_self.pw !== _self.repw) {
        alert('两次输入的密码不一致')
        return false
      }

      let data = {
        'un': _self.un,
        'pw': _self.pw,
        'repw': _self.repw
      }
      axios({
        headers: {
          'deviceCode': 'A95ZEF1-47B5-AC90BF3'
        },
        method: 'post',
        url: _self.url + '/user/register',
        data: qs.stringify(data)
      }).then(function (res) {
        if (res.status !== 200) {
          alert('发生异常')
          return false
        }
        let data = res.data
        if (data.msg !== 'OK' && data.status !== 200) {
          alert('登录失败' + data.msg)
          return false
        }
        alert('注册成功')
      })
    }
  }
}
</script>

<style scoped>
.user_main{
  width: 69%;
  margin: 5em auto;
}
.active_main{
  width: 60em;
  margin: 2em auto;
  text-align: center;
}
.input_area{
  width: 20em;
  margin: 1em auto;
}
</style>
