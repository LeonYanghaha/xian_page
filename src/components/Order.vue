<template>
  <div class="main">
    <el-card v-if="order_list==null" class="item_order_none">
      <span class="el-icon-warning"/>&nbsp;&nbsp;暂无订单
    </el-card>
    <el-card>
      <div class="item_order" v-for="(item,index) of order_list" :key="index">
        <span>{{item.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <a>查看订单详情</a>
        <br/>
        订单状态：{{item.msg}}
        <el-button v-if="item.status==50" type="primary" size="small"  @click="recived(item.oid)" plain>
          确认收货
        </el-button>
        <el-button v-if="item.status==10 || item.status==20" type="primary" size="small"  @click="pay(item.oid)" plain>
          去付款
        </el-button>
        <el-button v-if="item.status==10 || item.status==20" type="danger" size="small"  @click="cancel(item.oid)" plain>
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
      <span class="page_span">
        <el-pagination layout="prev, pager, next" :total="total_page" @current-change="change_page" :page-size="show_page">
        </el-pagination>
      </span>
    </el-card>
  </div>
</template>
<script>
import conf from '../assets/conf/conf.js'
let get_order_list = function (data, self) {
  self.$tool.http_tool(
    data,
    self.current_user.phone,
    self.url + '/order/getOrderList',
    function (data) {
      if (data === null) {
        return self.$tool.show_error_msg(self, '数据获取失败，请稍后再试')
      }
      for (let i = 0; i < data.data.length; i++) {
        if (!data.data[i].status) {
          continue
        }
        data.data[i] = self.$tool.format_order_status(data.data[i])
      }
      self.order_list = data.data // 页面数据
      self.total_page = data.count // 数据总数
      self.current_page = data.currentPage // 当前页码
    }
  )
}
export default {
  name: 'Order',
  data: function () {
    return {
      current_user: null,
      token_key: conf.token_key,
      order_list: null,
      url: conf.host,
      http_token_head: conf.http_token_head,
      total_page: 0,
      show_page: 5,
      current_page: 1
    }
  },
  methods: {
    change_page: function (page) {
      let _self = this
      this.current_page = page
      get_order_list({ pageShowNumber: _self.show_page, currentPage: _self.current_page }, _self)
    },
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
    get_order_list({ pageShowNumber: _self.show_page, currentPage: _self.current_page }, _self)
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
.page_span{
  width: 100%;
  text-align: center;
  margin-top: 1em;
  display: inline-block;
}
</style>
