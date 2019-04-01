<template>
  <div class="main">
    <el-card v-if="car_list===null || car_list.length<=0" class="item_order_none">
      <span class="el-icon-warning"/>&nbsp;&nbsp;购物车中暂时没有商品
    </el-card>
    <el-card v-if="car_list!==null && car_list.length>0">
      <span>购物车列表</span>
      <div class="item_order" v-for="(item,index) of car_list" :key="index">
        <span class="car_title">{{item.name}}</span>
        <el-button type="primary" size="small"  @click="create_order(item.pid)" plain>立即下单</el-button>&nbsp;&nbsp;
        <el-button type="danger" size="small"  @click="remove_item(item.pid)" plain>移出购物车</el-button>
        <br/>
        <span class="car_desc"> {{item.desc}}</span><br/>
        <span class="car_time"> 添加时间：{{item.addTime}}</span>
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
let get_car_list = function (data, self) {
  self.$tool.http_tool(
    data,
    self.current_user.phone,
    self.url + '/car/getCarList',
    function (data) {
      if (data === null) {
        return false // self.$tool.show_error_msg(self, '数据获取失败，请稍后再试')
      }
      self.car_list = data.data // 页面数据
      self.total_page = data.count // 数据总数
      self.current_page = data.currentPage // 当前页码
    }
  )
}
export default {
  name: 'Car',
  data: function () {
    return {
      current_user: null,
      car_list: null,
      url: conf.host,
      total_page: 0,
      show_page: 5,
      current_page: 1
    }
  },
  methods: {
    change_page: function (page) {
      let _self = this
      _self.current_page = page
      get_car_list({ pageShowNumber: _self.show_page, currentPage: _self.current_page }, _self)
    },
    remove_item: function (pid) {
      let _self = this
      let url = _self.url + '/car/removeItem'
      _self.$tool.http_tool({ pid: pid }, _self.current_user.phone, url, function (data) {
        if (!data) {
          return _self.$tool.show_error_msg(_self, '操作失败')
        }
        let temp_car_list = []
        for (let i = 0; i < _self.car_list.lengthl; i++) {
          if (_self.car_list[i].pid !== pid) {
            temp_car_list.push(_self.car_list[i])
          }
        }
        _self.car_list = JSON.parse(JSON.stringify(temp_car_list))
      })
    },
    create_order: function (pid) {
      this.$router.push('/product/' + pid)
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
    get_car_list({ pageShowNumber: _self.show_page, currentPage: _self.current_page }, _self)
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
.car_title{
  margin: 2em 2em 1em 0em;
  font-size: 20px;
}
.car_desc{
  font-size: 16px;
  color: grey;
  font-style: italic
}
</style>
