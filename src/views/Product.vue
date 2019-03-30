<template>
  <div id="main">
    <Head></Head>
    <div class="order_submit_after" v-if="oid !== 0">
      <el-card class="box-card">
        <span class="info_title"><i class="el-icon-success"></i>订单已提交成功</span>
        <span class="info_line"><div class="info_column_name">ID:</div>{{current_order.oid}}</span>
        <span class="info_line"><div class="info_column_name">订单名:</div>{{current_order.name}}</span>
        <span class="info_line"><div class="info_column_name">收货地址:</div>{{current_order.aadderss}}</span>
        <span class="info_line"><div class="info_column_name">下单时间:</div>{{current_order.submitTime}}</span>
        <span class="info_line"><div class="info_column_name">订单状态:</div>{{current_order.status}}</span>
        <span class="info_line"><div class="info_column_name">订单总价格:</div>{{current_order.totalPrice}}</span>
        <span class="info_line"><div class="info_column_name">订单详情:</div>{{current_order.orderDetial.pname}}--
            {{current_order.orderDetial.number}}--{{current_order.orderDetial.price}}
        </span>
        <div class="info_btn">
          <el-button type="primary" plain>去付款</el-button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="danger" plain>取消订单</el-button>
        </div>
      </el-card>
    </div>
    <div class="product_main" v-if="oid===0">
      <div class="product_head">
        <div class="product_img">
          <img class="product_main_img" v-bind:src="img_host + current_product.productImgList[0].name">
        </div>
        <div class="product_meta">
          <span>商品名：{{current_product.name}}</span><br/>
          <span>介绍：{{current_product.desc}}</span><br/>
          <span>单价：{{current_product.price}}</span><br/>
          <span>销量：{{current_product.sellNumber}}</span><br/>

          <span>上架时间：{{current_product.pushTime}}</span><br/>
          <span>总价格：{{total_price}}</span><br/>
          <el-input-number v-model="number" @change="handle_change" :min="1" :max="current_product.stock" label="描述文字">
          </el-input-number><br/>
          <span>
              收货地址：
            <el-select v-model="label_info">
              <el-option v-for="item in address_list" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>添加新地址
          </span><br/>
          <span>
            留言：<el-input v-model="order_meta" placeholder="请输入内容"></el-input>
          </span>
          <el-button type="primary" @click="add_car" v-bind:disabled="car_btn_is_disable" plain>
            加入购物车
          </el-button>
          <el-button type="primary" @click="submit_order" v-bind:disabled="submit_btn_is_disable" plain>
            提交订单
          </el-button>
        </div>
      </div>
      <div class="product_info">
        <hr/>
        <span>商品名：{{current_product.name}}</span><br/>
        <span>价格{{current_product.price}}</span><br/>
        <span>销量：{{current_product.sellNumber}}</span><br/>
        <span>库存：{{current_product.stock}}</span><br/>
        <span>上架时间：{{current_product.pushTime}}</span><br/>
        <span>厂家信息：</span><br/>
        <span>{{current_product.create.caddress}}</span>
        <span>{{current_product.create.cname}}</span>
        <span>{{current_product.create.cdesc}}</span>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from '@/components/Head.vue'
import Foot from '@/components/Foot.vue'
import conf from '../assets/conf/conf.js'
import axios from 'axios'
export default {
  name: 'Product',
  props: ['pid'],
  components: {
    Head, Foot
  },
  data: function () {
    return {
      url: conf.host,
      img_host: conf.img_host,
      current_product: null,
      number: 1,
      sign_price: 0,
      total_price: 0,
      address_list: [],
      label_info: '选择收货地址', // 地址id
      token_key: conf.token_key,
      order_meta: null,
      submit_btn_is_disable: false,
      car_btn_is_disable: false,
      oid: 0,
      current_order: null
    }
  },
  methods: {
    handle_change: function (value) {
      let _self = this
      _self.total_price = _self.sign_price * value
    },
    add_car: function () {
      let _self = this
      // 提交订单前，检查是否有用户登录
      if (!_self.current_user) {
        return _self.$message({
          showClose: true,
          message: '当前尚未登录！',
          type: 'error'
        })
      }
      // 在向后台发送请求之前，禁用按钮
      _self.car_btn_is_disable = true
      let data = {
        pid: _self.pid
      }
      _self.$tool.http_tool(data, _self.current_user.phone, _self.url + '/car/addItemToCar',
        function (data) {
          _self.$message({
            message: '添加成功',
            type: 'success'
          })
        })
    },
    submit_order: function () {
      let _self = this
      // 提交订单前，检查是否有用户登录
      if (!_self.current_user) {
        return _self.$message({
          showClose: true,
          message: '当前尚未登录！',
          type: 'error'
        })
      }
      // 检查完用户登录，需要检查当前是否有地址
      // r如果没有地址，则应该先添加地址
      if (_self.address_list.length <= 0) {
        return _self.$message({
          showClose: true,
          message: '当前没有收货地址！',
          type: 'error'
        })
      }
      // 判断用户是否选择了合法的地址
      if (typeof _self.label_info !== 'number') {
        return _self.$message({
          showClose: true,
          message: '请选择收货地址！',
          type: 'error'
        })
      }
      // 在向后台发送请求之前，禁用按钮
      _self.submit_btn_is_disable = true
      let data = {
        aid: _self.label_info,
        name: _self.current_product.name + '---' + _self.number + '*' + _self.current_product.price,
        order_meta: _self.order_meta,
        pid: _self.pid,
        number: _self.number,
        total_price: _self.total_price
      }
      _self.$tool.http_tool(data, _self.current_user.phone, _self.url + '/order/submitOrder',
        function (data) {
          // 这里是订单提交成功之后的情况
          // 根oid 获取订单详情并展示到页面
          _self.oid = data
          _self.$tool.http_tool({ oid: data }, _self.current_user.phone, _self.url + '/order/getOrderById',
            function (data) {
              _self.current_order = _self.$tool.format_order_status(data)
            })
        })
    }
  },
  beforeMount: function () {
    // 在进入这里之前，应该先检查传入的ID是否合法。
    let _self = this
    if (isNaN(_self.pid)) {
      _self.$message({
        showClose: true,
        message: '商品ID错误❌',
        type: 'error'
      })
      return false
    }
    // 获取商品
    axios.get(_self.url + '/product/findById/' + _self.pid).then(function (res) {
      if (res.status !== 200 || res.data.status !== 200) {
        return false
      }
      _self.current_product = res.data.data
      _self.sign_price = _self.current_product.price
      _self.total_price = _self.current_product.price
    })
    // 获取当前用户的收货地址
    // 如果没有登录，就给出提示信息
    if (!_self.$cookies.isKey(_self.token_key)) {
      _self.$message({
        message: '当前还没有登录.',
        type: 'warning'
      })
      return
    }
    // 往下走，就是目前有合法登录用户的情况
    // 获取当前用户的合法信息之后，去获取地址列表
    _self.current_user = _self.$cookies.get(_self.token_key)
    _self.$tool.http_tool(
      {},
      _self.current_user.phone,
      _self.url + '/address/getAddressList',
      function (data) {
        if (data === null) {
          // TODO  2019/3/30 9:32 AM  如果没有查到对应的商品，这里应该有个友好的提示
          return false
        }
        for (let i = 0; i < data.length; i++) {
          _self.address_list.push({
            value: data[i].aid,
            label: data[i].aadderss
          })
        }
      }
    )
  }
}
</script>

<style scoped>
#main{
  /*width: 69%;*/
  margin: auto;
}
.product_head{
  width: 69%;
  margin:5em auto 1em auto;
}
.product_img{
  border: 1px solid red;
  display: table-cell;
  width: 40em;
  height: 22em;
}
.product_meta{
  border: 2px solid green;
  display: table-cell;
  vertical-align: top;
  width: 60em;
  height: 22em;
}
.product_main_img{
  width: 90%;
  height: 90%;
  box-shadow: 3px 3px 7px grey;
  margin: auto;
}
.product_info{
  width: 69%;
  margin: auto;
  border: 2px solid green;
}
.order_submit_after{
  width: 69%;
  margin: auto;
}
.info_line{
  display: block;
  width: 100%;
}
.info_column_name{
  display: inline-block;
  /*border: 1px solid green;*/
  width: 20em;
  text-align: right;
  padding-right: 1em;
  margin-top: 1em;
}
.info_title{
  width: 100%;
  display: inline-block;
  text-align: center;
  margin: 1em auto;
}
.info_btn{
  /*display: inline-block;*/
  width: 100%;
  text-align: center;
  padding-top: 1.5em;
}
</style>
