<template>
  <div id="main">
    <Head></Head>
    <div class="order_submit_after" v-if="oid !== 0">
      <el-card class="box-card">
        <span class="info_title"
              style="color: green; font-size: 20px;">
          <i class="el-icon-success"></i>
          &nbsp;&nbsp;&nbsp;&nbsp;订单已提交成功
        </span>
        <span class="info_line">
          <div class="info_column_name">
            ID:
          </div>{{current_order.oid}}
        </span>
        <span class="info_line">
          <div class="info_column_name">
            订单名:
          </div>{{current_order.name}}
        </span>
        <span class="info_line">
          <div class="info_column_name">
            收货地址:
          </div>{{current_order.aadderss}}
        </span>
        <span class="info_line">
          <div class="info_column_name">
            收件人:
          </div>{{current_order.aname}}
        </span>
        <span class="info_line">
          <div class="info_column_name">
            收货电话号码:
          </div>{{current_order.aphone}}
        </span>
        <span class="info_line">
          <div class="info_column_name">
            下单时间:
          </div>{{current_order.submitTime}}
        </span>
        <span class="info_line">
          <div class="info_column_name">
            订单状态:
          </div>{{current_order.msg}}
        </span>
        <span class="info_line">
          <div class="info_column_name">
            订单总价格:
          </div>{{current_order.totalPrice}}
        </span>
        <span class="info_line">
          <div class="info_column_name">
            订单详情:
          </div>
          <span class="order_detial"
                v-for="(item,index) in current_order.orderDetial"
                v-bind:key="index">
            商品名：{{item.pname}}<br/>
            数量：{{item.number}}<br/>
            单价：{{item.price}}<br/>
          </span>
        </span>
        <div class="info_btn">
          <el-button type="primary" @click="pay_order" plain>去付款
          </el-button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="danger" @click="cancel_order" plain>取消订单
          </el-button>
        </div>
      </el-card>
    </div>
    <div class="product_main" v-if="oid===0">
      <div class="product_head">
        <div class="product_img">
          <img class="product_main_img"
               v-bind:src="img_host + current_product.productImgList[0].name">
        </div>
        <div class="product_meta">
          <span class="meta_span">
            <div class="meta_column_name">
              商品名：
            </div>{{current_product.name}}
          </span>
          <span class="meta_span">
            <div class="meta_column_name">
              价格：
            </div>{{current_product.price}}
          </span>
          <span class="meta_span">
            <div class="meta_column_name">
              上架时间：
            </div>{{current_product.pushTime}}
          </span>
          <span class="meta_span">
            <div class="meta_column_name">
              总价格：
            </div>{{total_price}}
          </span>
          <span class="meta_span">
            <div class="meta_column_name">选择数量：</div>
            <el-input-number v-model="number" size="mini"
                             @change="handle_change"
                             :min="1"
                             :max="current_product.stock"
                             label="选择数量">
            </el-input-number>
          </span>
          <span class="meta_span">
            <div class="meta_column_name">
              收货地址：
            </div>
            <el-select v-model="label_info"
                       size="mini"
                       @focus="check_user">
              <el-option v-for="item in address_list"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button size="mini" plain>添加地址</el-button>
          </span>
          <span class="meta_span">
            <div class="meta_column_name">订单附言：</div>
            <el-input style="width: 30em"
                      v-model="order_meta"
                      placeholder="请输入内容"></el-input>
          </span>
          <span class="meta_btn">
            <el-button type="primary"
                       @click="add_car"
                       v-bind:disabled="car_btn_is_disable" plain>
              <i class="el-icon-sold-out"></i>&nbsp;&nbsp;加入购物车
            </el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary"
                       @click="submit_order"
                       v-bind:disabled="submit_btn_is_disable" plain>
              <i class="el-icon-tickets"></i>&nbsp;&nbsp;提交订单
            </el-button>
          </span>
        </div>
      </div>
      <div class="product_info">
        <hr/>
        <span>
          <div class="info_list">
          商品名：
          </div>{{current_product.name}}
        </span><br/>
        <span>
          <div class="info_list">商品简介：
          </div>{{current_product.desc}}
        </span><br/>
        <span>
          <div class="info_list">价格：
          </div>￥{{current_product.price}}
        </span><br/>
        <span>
          <div class="info_list">销量：
          </div>{{current_product.sellNumber}}件
        </span><br/>
        <span>
          <div class="info_list">库存：
          </div>{{current_product.stock}}件
        </span><br/>
        <span>
          <div class="info_list">上架时间：
          </div>{{current_product.pushTime}}
        </span><br/>
        <span>
          <div class="info_list">厂家信息：</div>
          <div class="product_create_info">
            <span class="create_info">
              生产商地址：{{current_product.create.caddress}}
            </span><br/>
            <span class="create_info">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生产商：{{current_product.create.cname}}
            </span><br/>
            <span class="create_info">
              生产商简介：{{current_product.create.cdesc}}
            </span><br/>
          </div>
        </span><br/>
        <div class="info_list_img">
          <img v-for="(item, index) in current_product.productImgList"
               v-bind:key="index"
               v-bind:src="img_host + item.name"/>
        </div>
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
    cancel_order: function () {
      let _self = this
      let oid = _self.current_order.oid
      _self.$tool.confirm_msg(
        _self,
        '确定要取消该订单吗？',
        '提示',
        function () {
          _self.$tool.cancel_order(
            _self,
            oid,
            function (data) {
              if (!data) {
                return _self.$tool.show_error_msg(_self, '操作失败')
              }
              _self.order_list = _self.$tool.format_order_list_status(_self, _self.order_list)
              _self.$tool.show_success_msg(_self, '已取消该订单')
            })
        }, function () {
          _self.$tool.show_success_msg(_self, '已取消')
        })
    },
    pay_order: function () {
      let _self = this
      let oid = _self.current_order.oid
      _self.$tool.pay_order(_self, oid, function (data) {
        if (data) {
          _self.$tool.show_success_msg(_self, '支付成功')
          // 跳转到订单页面
          _self.$router.push('/usercenter/order')
        } else {
          _self.$tool.show_error_msg(_self, '支付失败，请重新支付')
        }
      })
    },
    check_user: function () {
      // 当用户点击地址选择按钮的时候，应该首先检查是否有用户登录
      let _self = this
      // 提交订单前，检查是否有用户登录
      if (!_self.current_user) {
        return _self.$tool.show_error_msg(_self, '登录之后，才能选择地址')
      }
    },
    handle_change: function (value) {
      let _self = this
      _self.total_price = _self.sign_price * value
    },
    add_car: function () {
      let _self = this
      // 提交订单前，检查是否有用户登录
      if (!_self.current_user) {
        return _self.$tool.show_error_msg(_self, '当前尚未登录')
      }
      // 在向后台发送请求之前，禁用按钮
      _self.car_btn_is_disable = true
      let data = {
        pid: _self.pid
      }
      _self.$tool.http_tool(
        data,
        _self.current_user.phone,
        _self.url + '/car/addItemToCar',
        function (data) {
          _self.$tool.show_success_msg(_self, '添加成功')
        })
    },
    submit_order: function () {
      let _self = this
      // 提交订单前，检查是否有用户登录
      if (!_self.current_user) {
        return _self.$tool.show_error_msg(_self, '当前尚未登录')
      }
      // 检查完用户登录，需要检查当前是否有地址
      // r如果没有地址，则应该先添加地址
      if (_self.address_list.length <= 0) {
        return _self.$tool.show_error_msg(_self, '当前没有收货地址')
      }
      // 判断用户是否选择了合法的地址
      if (typeof _self.label_info !== 'number') {
        return _self.$tool.show_error_msg(_self, '请选择收货地址')
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
              console.log(_self.current_order)
            })
        })
    }
  },
  beforeMount: function () {
    // 在进入这里之前，应该先检查传入的ID是否合法。
    let _self = this
    if (isNaN(_self.pid)) {
      return _self.$tool.show_error_msg(_self, '商品ID错误❌')
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
      return _self.$tool.show_warning_msg(_self, '当前没有用户登录')
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
        data = data.data
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
  margin: auto;
}
.product_head{
  width: 69%;
  margin:5em auto 1em auto;
}
.product_img{
  display: table-cell;
  width: 40em;
  height: 22em;
}
.product_meta{
  display: table-cell;
  vertical-align: top;
  width: 60em;
  height: 22em;
}
.product_main_img{
  width: 100%;
  height: 95%;
  box-shadow: 3px 3px 7px grey;
  margin: auto;
}
.product_info{
  width: 69%;
  margin: auto;
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
  width: 100%;
  text-align: left;
  margin-left: 20em;
  padding-top: 1.5em;
}
.meta_column_name{
  display: inline-block;
  width: 10em;
  text-align: right;
}
.meta_span{
  display: block;
  margin-top: 0.8em;
  width: 100%;
}
.meta_btn{
  width: 100%;
  display: inline-block;
  margin: 1em 7em;
}
.info_list{
  display: inline-block;
  width: 15em;
  text-align: right;
  margin-top: 1em;
}
.product_create_info{
  width: 45em;
  float: right;
  padding-top: 1em;
  position: relative;
}
.info_list_img{
  width: 100%;
  margin: auto;
  text-align: center;
  padding-top: 2em;
}
.info_list_img img{
  width: 29em;
  height: 29em;
  margin: 2em 0.5em 0em 0em;
}
.order_detial{
  width: 35%;
  float: none;
  display: inline-block;
  margin-top: 1em;
}
</style>
