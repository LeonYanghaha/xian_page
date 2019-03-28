<template>
  <div id="main">
    <Head></Head>
    <div class="product_main">
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
          <el-button type="primary" @click="add_car" plain>加入购物车</el-button>
          <el-button type="primary" @click="submit_order" plain>提交订单</el-button>
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
import qs from 'qs'
const common = function (data, token, url, cb) {
  axios({
    headers: {
      'deviceCode': 'A95ZEF1-47B5-AC90BF3',
      'token': token
    },
    method: 'post',
    url: url,
    data: qs.stringify(data)
  }).then(function(res) {
    if (res.status !== 200) {
      alert("发生异常");
      return cb(null)
    }
    let data = res.data;
    if (data.msg !== 'OK' && data.status !== 200) {
      alert("失败");
      return cb(null)
    }
    //成功
    cb(data.data)
  });
};
export default {
  name: "Product",
  props: ['pid'],
  components: {
    Head, Foot
  },
  data: function() {
    return {
      url: conf.host,
      img_host: conf.img_host,
      current_product: null,
      number: 1,
      sign_price: 0,
      total_price: 0,
      address_list: [],
      label_info: "选择收货地址",
      token_key: conf.token_key,
      order_meta: null
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
        });
      }
    },
    submit_order: function () {
      let _self = this
      // 提交订单前，检查是否有用户登录
      if (!_self.current_user) {
        return _self.$message({
          showClose: true,
          message: '当前尚未登录！',
          type: 'error'
        });
      }
      let data = {
        aid: _self.label_info,
        name: _self.current_product.name + '---' + _self.number + '*' + _self.current_product.price,
        order_meta: _self.order_meta,
        pid: _self.pid,
        number: _self.number,
        total_price: _self.total_price
      }
      common(
        data, _self.current_user.phone, _self.url + "/order/submitOrder",
        function (data) {
          console.log(data)
        }
      )
    }
  },
  beforeMount: function () {
    let _self = this;
    // 获取商品
    axios.get(_self.url + "/product/findById/" + _self.pid).then(function (res) {
      if (res.status !== 200 || res.data.status !==200 ) {
        return false
      }
      _self.current_product = res.data.data;
      _self.sign_price = _self.current_product.price;
      _self.total_price = _self.current_product.price;
    });
    // 获取当前用户的收货地址
    // 如果没有登录，就给出提示信息
    if (!_self.$cookies.isKey (_self.token_key)) {
      _self.$message({
        message: '当前还没有登录.',
        type: 'warning'
      });
      return;
    }
    // 往下走，就是目前有合法登录用户的情况
    // 获取当前用户的合法信息之后，去获取地址列表
    _self.current_user = _self.$cookies.get(_self.token_key)
    common(
      {},
      _self.current_user.phone,
      _self.url + '/address/getAddressList',
      function (data) {
        if (data === null) {
           return;
        }
        for (let i = 0; i<data.length; i++) {
          let temp_address_list = {
            value: null,
            label: null
          };
          temp_address_list.value = data[i].aid
          temp_address_list.label = data[i].aadderss
          _self.address_list.push(temp_address_list)
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
</style>
