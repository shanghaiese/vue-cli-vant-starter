<template>
  <div class="container">
<!--    <van-tabbar v-model="true" active-color="#07c160" inactive-color="#000">-->
<!--      <van-tabbar-item icon="home-o">标签</van-tabbar-item>-->
<!--      <van-tabbar-item icon="search">标签</van-tabbar-item>-->
<!--      <van-tabbar-item icon="freinds-o">标签</van-tabbar-item>-->
<!--      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>-->
<!--    </van-tabbar>-->
  </div>
</template>

<script>
  // import { Tabbar, TabbarItem } from 'vant'
  //
  // Vue.use(Tabbar)
  // Vue.use(TabbarItem)

  export default {
    name: 'home',
    props: [],
    data () {
      return {
        // menuList: [
        //   {
        //     text: '首页',
        //     path: '/home',
        //     active: true,
        //     imgUrl: require('../../../src/assets/imgs/home/home.png'),
        //     selectedImgUrl: require('../../../src/assets/imgs/home/home-h.png'),
        //   }, {
        //     text: '权易宝',
        //     path: '/huicuiTemplate',
        //     active: false,
        //     imgUrl: require('../../../src/assets/imgs/home/remit.png'),
        //     selectedImgUrl: require('../../../src/assets/imgs/home/remit-h.png'),
        //   },
        //   {
        //     text: '联系客服',
        //     path: '/contact',
        //     active: false,
        //     imgUrl: require('../../../src/assets/imgs/home/client.png'),
        //     selectedImgUrl: require('../../../src/assets/imgs/home/client-h.png'),
        //   },
        //   {
        //     text: '我的',
        //     path: '/mine',
        //     active: false,
        //     imgUrl: require('../../../src/assets/imgs/home/user.png'),
        //     selectedImgUrl: require('../../../src/assets/imgs/home/user-h.png'),
        //   }
        // ]
      }
    },
    // watch: {
    //   $route (to) {
    //     this.menuList.map(item => {
    //       if (item.path === to.path) {
    //         this.active = true
    //       }
    //     })
    //   }
    // },
    methods: {},
    mounted () {
      // this.menuList.map(item => {
      //   item.active = false
      //   if (item.path === to.path) {
      //     item.active = true
      //   }
      // })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .container {
    padding: 0 !important;
  }

  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }
</style>
