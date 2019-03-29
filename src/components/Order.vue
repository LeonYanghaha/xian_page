<template>
  <div class="main">
    <el-card v-if="order_list==null" class="item_order_none">
      <span class="el-icon-warning"/>&nbsp;&nbsp;暂无订单
    </el-card>
    <el-card>
      <div class="item_order" v-for="(item,index) of order_list" :key="index">
        <span>{{item.name}}</span>
        <a>查看订单详情</a>
        <br/>
        订单状态：{{item.msg}}
        <el-button v-if="item.status==50" type="primary" size="small"  @click="recived(item.oid)" plain>
          确认收货
        </el-button>
        <el-button v-if="item.status==10 || item.status==20" type="primary" size="small"  @click="pay(item.oid)" plain>
          去付款
        </el-button>
        <el-button v-if="item.status==10 || item.status==20" type="warning" size="small"  @click="cancel(item.oid)" plain>
          取消订单
        </el-button>
        <br/>
        总价格：{{item.totalPrice}}<br/>
        下单时间：{{item.submitTime}}<br/>
        <span v-if="item.status>=30 && item.status!=70 && item.status!=80">付款时间：{{item.payTime}} <br/> </span>
        <span v-if="item.status>=50 && item.status!=70 && item.status!=80">发货时间：{{item.pushTime}}
          <br/>
        </span>
        <span v-if="item.status>=60 && item.status!=70 && item.status!=80">收货时间：{{item.ReceivedTime}} <br/> </span>
        <hr/>
      </div>
    </el-card>
  </div>
</template>
<script>
import conf from '../assets/conf/conf.js'
import axios from 'axios'
// import http_tool from '../assets/http_tool'

export default {
  name: 'Order',
  data: function () {
    return {
      current_user: null,
      token_key: conf.token_key,
      order_list: null,
      url: conf.host,
      http_token_head: conf.http_token_head
    }
  },
  methods: {
    cancel: function (oid) {
      let _self = this
      _self.$tool.http_tool(
        { oid: oid },
        _self.current_user.phone,
        _self.url + '/order/cancelOrder',
        function (data) {
          if (data === null) {
            return false
          }
          for (let i = 0; i < _self.order_list.length; i++) {
            if (oid !== _self.order_list[i].oid) {
              continue
            }
            _self.order_list[i].status = 80
          }
        }
      )
    },
    recived: function (oid) {
      let _self = this
      _self.$tool.http_tool(
        { oid: oid },
        _self.current_user.phone,
        _self.url + '/order/recivedOrder',
        function (data) {
          if (data === null) {
            return false
          }
          for (let i = 0; i < _self.order_list.length; i++) {
            if (oid !== _self.order_list[i].oid) {
              continue
            }
            _self.order_list[i].status = 60
            _self.order_list[i].ReceivedTime = new Date().toDateString()
          }
        }
      )
    },
    pay: function (oid) {
      let _self = this
      _self.$tool.http_tool(
        { oid: oid },
        _self.current_user.phone,
        _self.url + '/order/payOrder',
        function (data) {
          if (data === null) {
            return false
          }
          for (let i = 0; i < _self.order_list.length; i++) {
            if (oid !== _self.order_list[i].oid) {
              continue
            }
            _self.order_list[i].status = 30
            _self.order_list[i].payTime = new Date().toDateString()
          }
        }
      )
    }
  },
  created: function () {
    let _self = this
    if (!_self.$cookies.isKey(_self.token_key)) {
      return _self.$router.push('/')
    }
    // 往下走，就是目前有合法登录用户的情况
    _self.current_user = _self.$cookies.get(_self.token_key)
  },
  mounted: function () {
    let _self = this
    axios({
      headers: {
        'deviceCode': 'A95ZEF1-47B5-AC90BF3',
        'token': _self.current_user.phone
      },
      method: 'post',
      url: _self.url + '/order/getOrderList'
    }).then(function (res) {
      if (res.status !== 200) {
        alert('发生异常')
        return false
      }
      let data = res.data
      if (data.msg !== 'OK' && data.status !== 200) {
        alert('获取失败')
        return false
      }
      if (!res.data.data || res.data.data == null) {
        return false
      }
      // 获取成功
      for (let i = 0; i < res.data.data.length; i++) {
        if (!res.data.data[i].status) {
          continue
        }
        res.data.data[i] = _self.$tool.format_order_status(res.data.data[i])
      }
      _self.order_list = res.data.data
    })
  }
}
</script>

<style scoped>
.main{
  width: 100%;
}
.item_order{
  margin-top: 1em;
}
.item_order_none{
  text-align: center;
  color: grey;
  height: 15em;
  padding-top: 2em;
}
</style>
