<template>
  <div class="main_datum">
    <el-card class="box_card">
      <div >
        &nbsp;&nbsp;
        用户名:{{current_user["un"]}}
      </div>
      <div >
        &nbsp;&nbsp;&nbsp;&nbsp;
        密码:********  修改密码
      </div>
      <div>
        注册时间：{{current_user.registerTime?current_user.registerTime:""}}
      </div>
      <div>
        最近登录：{{current_user.lastLoginTime?current_user.lastLoginTime:""}}
      </div>
      <div>
        地址列表：
      </div>
      <br/>
    </el-card>
  </div>
</template>

<script>
import conf from '../assets/conf/conf.js'
export default {
  name: 'Datum',
  data: function () {
    return {
      current_user: null,
      token_key: conf.token_key
    }
  },
  // TODO  2019/3/27 11:07 AM  对Vue的生命周期函数理解还不够，导致在这里花了很多的时间。后面需要重点了解一下生命周期函数
  // 还有一个问题：从父组件给子组件传值的时候，这里是拿不到的，会导致页面报错
  created: function () {
    let _self = this
    if (!_self.$cookies.isKey (_self.token_key)) {
      return _self.$router.push('/')
    }
    // 往下走，就是目前有合法登录用户的情况
    _self.current_user = _self.$cookies.get(_self.token_key)
  }
}
</script>

<style scoped>
.main_datum{
  /*border: 2px solid green;*/
  /*width: 85%;*/
  /*margin: 1em  1em;*/
}
.box_card div{
  margin-top: 1em;
}
</style>
