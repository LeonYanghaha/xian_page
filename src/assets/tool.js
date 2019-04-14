const axios = require('axios')
const qs = require('qs')
const conf = require('./conf/conf.js')

export default {
  get_product_list: function (self, item, cb) {
    self.$tool.http_tool(
      { pageShowNumber: item.pageShowNumber, currentPage: item.currentPage },
      null,
      self.url + item.url,
      function (data) {
        if (data.data.length <= 0) {
          // TODO  2019/3/30 9:54 AM 后端没有返回数据的情况 应该有提示
          return false
        }
        let product_list = []
        for (let i = 0; i < data.data.length; i++) {
          let signItem = data.data[i]
          product_list.push({
            'name': data.data[i].name,
            'pid': signItem.pid ? signItem.pid : signItem['strPid'],
            'price': signItem.price,
            'img': self.img_host + signItem['productImgList'][0].name
          })
        }
        cb(product_list)
      }
    )
  },
  confirm_msg: function (self, title = '提示', str = '确认该操作', ok_cb, cancel_cb) {
    self.$confirm(str, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(function () {
      ok_cb()
    }).catch(function () {
      cancel_cb()
    })
  },
  recived_order: function (self, oid, cb) {
    self.$tool.http_tool(
      { oid: oid },
      self.current_user.phone,
      self.url + '/order/recivedOrder',
      function (data, token) {
        self.$tool.check_data(data, cb)
      }
    )
  },
  pay_order: function (self, oid, cb) {
    self.$tool.http_tool(
      { oid: oid },
      self.current_user.phone,
      self.url + '/order/payOrder',
      function (data, token) {
        self.$tool.check_data(data, cb)
        self.$tool.update_token(token, self)
      }
    )
  },
  cancel_order: function (self, oid, cb) {
    self.$tool.http_tool(
      { oid: oid },
      self.current_user.phone,
      self.url + '/order/cancelOrder',
      function (data, token) {
        self.$tool.check_data(data, cb)
      }
    )
  },
  update_token: function (token, self) {
    if (!token) {
      return null
    }
    if (self && self.current_user) {
      self.current_user.phone = token
    }
  },
  check_data: function (data, cb) {
    let temp = data !== null
    cb(temp)
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
  // TODO  2019/4/10 5:46 PM  代码架构有问题，导致现在前端每次刷新token是很费劲的工作
  http_tool: function (data, token, url, cb) {
    const header_key = conf.token_key
    axios({
      headers: {
        'deviceCode': 'A95ZEF1-47B5-AC90BF3',
        'token': token
      },
      method: 'post',
      url: url,
      data: qs.stringify(data)
    }).then(function (res) {
      if (res.status !== 200) { // TODO  2019/4/3 5:25 PM 对于服务器端返回的错误，这里需要做处理
        alert(res.status)
        return cb(null)
      }
      let data = res.data
      if (data.msg !== 'OK' && data.status !== 200) {
        return cb(null)
      }
      // 成功
      let new_token = res.headers[header_key]
      cb(data.data, new_token)
    })
  },
  check_user: function (self) {
    let token_key = conf.token_key
    if (!self.$cookies.isKey(token_key)) {
      return null
    }
    // 往下走，就是目前有合法登录用户的情况
    return self.$cookies.get(token_key)
  },
  remove_order_from_list: function (list, oid) {
    let temp = []
    for (let i = 0; i < list.length; i++) {
      if (list[i].oid !== oid) {
        temp.push(list[i])
      }
    }
    return temp
  },
  format_order_list_status: function (self, order_list) {
    for (let i = 0; i < order_list.length; i++) {
      order_list[i] = self.$tool.format_order_status(order_list[i])
    }
    return order_list
  },
  // status 状态  10  已提交   20 未付款  30 已付款  40 待发货   50 已发货，待收货
  //              60 收货，交易成功  70 超时未付款，关闭  80 用户主动关闭
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
