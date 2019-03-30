const axios = require('axios')
const qs = require('qs')

export default {
  pay_order: function (self, oid, cb) {
    self.$tool.http_tool(
      { oid: oid },
      self.current_user.phone,
      self.url + '/order/payOrder',
      function (data) {
        let temp = false
        if (data === null) {
          temp = false
        } else {
          temp = true
        }
        cb(temp)
      }
    )
  },
  cancel_order: function (self, oid) {
    self.$tool.http_tool(
      { oid: oid },
      self.current_user.phone,
      self.url + '/order/cancelOrder',
      function (data) {
        if (data === null) {
          return false
        }
        return true
      }
    )
  },
  show_success_msg: function (self, value) {
    self.$message({
      message: value,
      type: 'success'
    })
  },
  show_error_msg: function (self, value) {
    self.$message({
      message: value,
      type: 'error'
    })
  },
  show_warning_msg: function (self, value) {
    self.$message({
      message: value,
      type: 'warning'
    })
  },
  http_tool: function (data, token, url, cb) {
    axios({
      headers: {
        'deviceCode': 'A95ZEF1-47B5-AC90BF3',
        'token': token
      },
      method: 'post',
      url: url,
      data: qs.stringify(data)
    }).then(function (res) {
      if (res.status !== 200) {
        alert('发生异常')
        return cb(null)
      }
      let data = res.data
      if (data.msg !== 'OK' && data.status !== 200) {
        alert('失败')
        return cb(null)
      }
      // 成功
      cb(data.data)
    })
  },
  // <!--//    status 状态  10  已提交   20 未付款  30 已付款  40 待发货   50 已发货，待收货-->
  // <!--//                 60 收货，交易成功  70 超时未付款，关闭  80 用户主动关闭-->
  format_order_status: function (order) {
    switch (order.status) {
      case 10:
      case 20:
        order.msg = '订单已提交，待付款'
        break
      case 30:
      case 40:
        order.msg = '已付款，待发货'
        break
      case 50:
        order.msg = '已发货，待收货'
        break
      case 60:
        order.msg = '已收货，交易成功'
        break
      case 70:
        order.msg = '超时未付款，自动关闭'
        break
      case 80:
        order.msg = '用户主动关闭订单'
        break
      default:
        order.msg = 'error'
    }
    return order
  }
}
