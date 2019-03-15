<template>
  <div class="meanu_main">
    <div class="list_main">
      <p v-for="item in meanuMapper" @mouseleave="mouseLeaveList(item)" @mouseenter="mouseEnterList(item)">
        {{ item }}
      </p>
    </div>
    <div class="meanu_detial">
      <div class="meanu_title_div" v-for="(item, index) in tempMeanuList">
        <p class="meanu_title_p">{{ index }}</p>
          <span class="meanu_title_span" v-for="signItem in item">
            {{ signItem }}
          </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuList',
  data: function () {
    return {
      isShowMeanuDetial: false,
      meanuMapper: ['食品', '衣物', '电器', '热销', '特价', '好评'],
      tempMeanuList: null,
      meanuList: {
        '食品': {
          '水果': ['苹果', '橘子', '香蕉', '樱桃'],
          '水产': ['带鱼', '鱿鱼'],
          '肉类': ['鸡肉', '猪肉', '牛肉', '羊肉']
        },
        '衣物': {
          '男装': ['上衣', '裤子', '棉衣', '运动装'],
          '女装': ['上衣', '裤子', '棉衣', '运动装'],
          '童装': ['上衣', '裤子', '棉衣', '运动装']
        },
        '电器': {
          '手机': ['小米', '华为', 'vivo', 'OPPO'],
          '家电': ['电视', '电脑', '相机', '冰箱', '空调']
        },
        '热销': {
          '零食': [],
          '主食': []
        },
        '特价': {
          '零食': [],
          '主食': []
        },
        '好评': {
          '零食': [],
          '主食': []
        }
      }
    }
  },
  methods: {
    mouseEnterList (event) {
      this.isShowMeanuDetial = true
      this.tempMeanuList = this.meanuList[event]
      console.log(this.tempMeanuList)
    },
    mouseLeaveList (string) {
      this.isShowMeanuDetial = false
      this.tempMeanuList = null
    }
  }
}
</script>

<style scoped>
.list_main{
  margin-top: 1em;
  border: 2px solid green;
  display: inline;
  width: 9em;
  float: left;
}
.list_main p{
  margin-top: 2em;
  font-size: 15px;
}
.meanu_detial{
  border: 1px solid black;
  border-radius: inherit;
}
.meanu_detial{
  position: relative;
  width: 40em;
  height: 20em;
  z-index: 100;
  top: 1em;
  left: 10em;
  background-color: dimgray;
  opacity: 0.8;
}
.meanu_title_p{
  font-size: 20px;
  border: 2px solid red;
  text-align: left;
  padding-left: 0em;
}
.meanu_title_div{
  display: block;
  border: 2px solid blueviolet;
}
</style>
