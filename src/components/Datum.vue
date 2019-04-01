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
export default {
  name: 'Datum',
  data: function () {
    return {
      current_user: null
    }
  },
  created: function () {
    let _self = this
    _self.current_user = _self.$tool.check_user(_self)
    if (_self.current_user === null) {
      return _self.$router.push('/')
    }
  }
}
</script>

<style scoped>
.main_datum{
}
.box_card div{
  margin-top: 1em;
}
</style>
