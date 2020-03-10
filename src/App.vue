<template>
  <div id="app">
    <div id="nav">
      <tabbar class="bar-border" v-show="tabShow"></tabbar>
    </div>
    <router-view/>
  </div>
</template>
<script>
import tabbar from '@/components/common/tabbar.vue'
import './assets/css/_main.less'

export default {
  name: 'app',
  data () {
    return {
      title: '首页',
      tabShow: false
    }
  },
  watch: {
    $route (to) {
      this.title = to.meta.title
      if (to.path == '/' || to.path == '/home' || to.path == '/huicuiTemplate' || to.path == '/contact' || to.path == '/mine') { ///huicuiList
        // this.$store.commit('SET_TABBAR_SHOW', true)
        this.tabShow = true
      } else {
        // this.$store.commit('SET_TABBAR_SHOW', false)
        this.tabShow = false
      }
    }
  },
  methods: {},
  components: {
    tabbar
  }
}
</script>

<style lang="less">
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
}
#nav {
  padding: 30px;
}
</style>
