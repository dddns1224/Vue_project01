<template>
  <div id="cart">
      <nav-bar class="nav-bar">
      <!-- 导航栏 -->
        <div slot="center">购物车({{length}})</div>
      </nav-bar>
      <!-- 商品列表 -->
      <scroll class="content" ref="scroll">
        <cart-list/>
      </scroll>

      <!-- 底部汇总 -->
  </div>

</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'

import Scroll from 'components/common/scroll/Scroll'

import { mapGetters } from 'vuex'
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll
  },
  computed: {
    //第一种写法 ...mapGetters(['cartLength'])
    //第二种写法 可以命名属性名称
    ...mapGetters({
      length: 'cartLength'
    })
  },
  activated(){
    //添加新内容到购物车后，需要在页面激活后进行刷新使better-scroll检测到新内容
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: white;
  font-weight: 700;
}
#cart{
  height: 100vh;
}
.content{
  height: calc(100% - 44px - 50px);
  overflow: hidden;
}
</style>