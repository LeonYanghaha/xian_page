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
        <el-button v-if="item.status==10 || item.status==20" type="primary" size="small"  @click="cancel(item.oid)" plain>
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
import qs from 'qs'

let commentFun = function (data, token, url,cb) {
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
    //成功后，修改当前页面中的数据
    cb(data.data)
  });
};

export default {
  name: "Order",
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
      let _self = this;
      commentFun(
        {oid: oid},
        _self.current_user.phone,
        _self.url + "/order/cancelOrder",
        function (data) {
          if (data===null) {
            return false;
          }
          for (let i = 0; i<_self.order_list.length; i++) {
            if (oid !== _self.order_list[i].oid) {
              continue
            }
            _self.order_list[i].status = 80
          }
        }
      )
    },
    recived: function (oid) {
      let _self = this;
      commentFun(
        {oid: oid},
        _self.current_user.phone,
        _self.url + "/order/recivedOrder",
        function (data) {
          if (data===null) {
            return false;
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
      let _self = this;
      commentFun(
        {oid: oid},
        _self.current_user.phone,
        _self.url + "/order/payOrder",
        function (data) {
          if (data === null) {
            return false;
          }
          for (let i = 0; i<_self.order_list.length; i++) {
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
    if (!_self.$cookies.isKey (_self.token_key)) {
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
      // <!--//    status 状态  10  已提交   20 未付款  30 已付款  40 待发货   50 已发货，待收货-->
      // <!--//                 60 收货，交易成功  70 超时未付款，关闭  80 用户主动关闭-->
      for (let i = 0; i < res.data.data.length; i++) {
        if (!res.data.data[i].status) {
          continue
        }
        let status = res.data.data[i].status
        switch (status) {
          case 10:
          case 20:
            res.data.data[i].msg = '订单已提交，待付款'
            break
          case 30:
          case 40:
            res.data.data[i].msg = '已付款，待发货'
            break
          case 50:
            res.data.data[i].msg = '已发货，待收货'
            break
          case 60:
            res.data.data[i].msg = '已收货，交易成功'
            break
          case 70:
            res.data.data[i].msg = '超时未付款，自动关闭'
            break
          case 80:
            res.data.data[i].msg = '用户主动关闭订单'
            break
          default:
            res.data.data[i].msg = 'error'
        }
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
