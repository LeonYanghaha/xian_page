<template>
  <div class="main_datum">
    <el-card class="box_card">
      <div >
        &nbsp;&nbsp;
        用户名：{{current_user["un"]}}
      </div>
      <div >
        &nbsp;&nbsp;&nbsp;&nbsp;
        密码：********  修改密码
      </div>
      <div>
        注册时间：{{current_user.registerTime?current_user.registerTime:""}}
      </div>
      <div>
        最近登录：{{current_user.lastLoginTime?current_user.lastLoginTime:""}}
      </div>
      <div>
        <div class="address_label">
          地址列表：
          <span class="add_address_btn">
            <el-button class="el-icon-news" @click="show_dialog = true">&nbsp;&nbsp;添加地址</el-button>
          </span>
        </div>
        <div class="address_list_main">
            <div class="address_sign" v-for="(item,index) in address_list" v-bind:key="index">
              {{item.address}}&nbsp;&nbsp;&nbsp;&nbsp;
              <el-tag>{{item.label}}</el-tag>
              <span class="btn_span">
                <el-button icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" plain>删除</el-button>
              </span>
              <br/>
              收件人信息：{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.phone}}
              <hr/>
              <el-dialog title="添加收货地址" :visible.sync="show_dialog">
                <el-form :model="form">
                  <el-form-item label="地址详情" :label-width="form_width">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="标签" :label-width="form_width">
                    <el-select v-model="form.label" placeholder="请选择标签">
                      <el-option label="家" value="家"></el-option>
                      <el-option label="公司" value="公司"></el-option>
                      <el-option label="学校" value="学校"></el-option>
                      <el-option label="其他" value="其他"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="收件人姓名" :label-width="form_width">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="收件人电话" :label-width="form_width">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="show_dialog = false">取 消</el-button>
                  <el-button type="primary" @click="add_address">确 定</el-button>
                </div>
              </el-dialog>
            </div>
        </div>
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
      address_list: [],
      url: conf.host,
      show_dialog: false,
      form: {
        address: '',
        label: '',
        phone: '',
        name: ''
      },
      form_width: '120px'
    }
  },
  methods: {
    add_address: function () {
      let _self = this
      if (!_self.form.address || !_self.form.phone || !_self.form.name) {
        return _self.$tool.show_warning_msg(_self, '请完善信息')
      }
      debugger
      _self.$tool.add_address(_self, _self.$store.state.token, _self.form, function (data) {
        console.log(data)
      })
    }
  },
  created: function () {
    let _self = this
    _self.current_user = _self.$tool.check_user(_self)
    if (_self.current_user === null) {
      return _self.$router.push('/')
    }
  },
  mounted: function () {
    let _self = this
    _self.$tool.http_tool(
      {},
      _self.current_user.phone,
      _self.url + '/address/getAddressList',
      function (data) {
        if (data === null) {
          return false
        }
        data = data.data
        for (let i = 0; i < data.length; i++) {
          _self.address_list.push({
            aid: data[i].aid,
            address: data[i]['aadderss'],
            name: data[i].aname,
            phone: data[i].aphone,
            label: data[i].atag
          })
        }
      }
    )
  }
}
</script>

<style scoped>
.main_datum{
}
.box_card div{
  margin-top: 1em;
}
.address_list_main{
  /*border: 2px solid green;*/
  /*width: 100%;*/
  margin:2em 2em 0em 3em;
}
.address_sign{
  width: 100%;
}
.address_label{
  width: 100%;
}
.add_address_btn{
  float: right;
  margin-right: 2em;
}
.btn_span{
  float: right;
  margin-right: 2em;
  display: inline-block;
}
</style>
