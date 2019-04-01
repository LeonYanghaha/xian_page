<template>
  <div class="meanu_main">
    <div class="menu_root" v-for="(item,index) in meanuMapper" v-bind:key="index">{{item}}</div>
  </div>
</template>

<script>
export default {
  name: 'MeanuMain',
  data: function () {
    return {
      meanuMapper: ['食品', '衣物', '电器', '热销', '好评'],
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
    },
    mouseLeaveList (string) {
    }
  }
}
</script>

<style scoped>
  .meanu_main{
    display: inline-block;
    width: 100%;
    /*border: 1px solid lawngreen;*/
    vertical-align:bottom;
    text-align: center;
  }
  .menu_root{
    display: inline-block;
    width: 100%;
    height: 2.5em;
    padding-top: 2em;
    /*border: 1px solid green;*/
    text-align: center;
  }
</style>
