<template>
  <div class="head_main">
    <div class="head_area head_logo">
      <img class="head_logo_img" src="../assets/img/logo.png">
      <span class="head_logo_span"> Haha商场</span>
    </div>
    <div class="head_area head_meanu">
      <router-link v-bind:to = "'/'">
        <span>首页</span>
      </router-link>
      <span>热销</span>
      <span>好评</span>
    </div>
    <div class="head_area search_input">
      <el-autocomplete
        v-model="state4"
        size="mini"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入要搜索的东西."
        @select="handle_select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-autocomplete>
    </div>
    <div class="head_area head_meta">
      <div v-if="current_user === null">
        <router-link v-bind:to = "'/user/login'">
          <span>登录</span>
        </router-link>
        <router-link v-bind:to = "'/user/regist'">
          <span>注册</span>
        </router-link>
      </div>
      <div v-else>
        <el-dropdown>
          <span class="el-dropdown-link" style="font-size: 17px">
            {{ current_user.un }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link v-bind:to = "'/usercenter/datum'">
                个人资料
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link v-bind:to = "'/usercenter/order'">
                订单列表
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link v-bind:to = "'/usercenter/car'">
                购物车
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link v-bind:to = "'/usercenter/msg'">
                消息
              </router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span @click="show_msg()" class="user_exit">退出登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import conf from '@/assets/conf/conf.js'
export default {
  name: 'Head',
  data: function () {
    return {
      current_user: null,
      token_key: conf.token_key,
      hot_product: [],
      state4: '',
      timeout: null
    }
  },
  store,
  methods: {
    getHotProduct () {
      let _self = this
      _self.$tool.http_tool(null, null, '/product/getHotProduct', function (data, token) {
        return data
      })

      // return [{ 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
      //   { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
      //   { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
      //   { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' },
      //   { 'value': '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
      //   { 'value': '贡茶', 'address': '上海市长宁区金钟路633号' },
      //   { 'value': '南拳妈妈龙虾盖浇饭', 'address': '普陀区金沙江路1699号鑫乐惠美食广场A13' }
      // ]
    },
    querySearchAsync (queryString, cb) {
      let hot_product = this.hot_product
      let results = queryString ? hot_product.filter(this.createStateFilter(queryString)) : hot_product

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handle_select (item) { // 点击选中建议项时触发

    },
    show_msg: function () {
      let _self = this
      _self.$confirm('确定要退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 退出登录，清除cookie ， 刷新页面
        _self.$cookies.remove(_self.token_key)
        _self.$router.push('/')
        _self.current_user = null
      }).catch(() => {
        _self.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  },
  mounted: function () {
    let _self = this
    _self.hot_product = this.getHotProduct()
    _self.current_user = _self.$tool.check_user(_self)
  }
}
</script>
<style scoped>
  .head_main{
    height: auto;
    width: 69%;
    margin: 2em auto;
  }
  .head_area{
    height: 3em;
    display: table-cell;
    vertical-align: bottom;
  }
  .head_meanu{
    width: 30em;
  }
  .head_meanu span{
    margin-left: 2.5em;
    font-size: 20px;
  }
  .head_meta{
    width: 13em;
    text-align: right;
    /*border: 1px solid lawngreen;*/
  }
  .head_meta span{
    margin-right: 1em;
    font-size: 12px;
    color: grey;
  }
  .head_logo{
    float: left;
    width: 15em;
  }
  .head_logo_img{
    width: 3.5em;
    height: 3.5em;
  }
  .head_logo_span{
    margin-left: 1em;
    font-style: oblique;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 18px;
  }
  .user_exit{
    font-size: 16px;
  }
  .user_exit:hover{
    color: red;
  }
  .search_input{
    /*border: 2px solid green;*/
    width: 15em;
    text-align: right;
  }
</style>
