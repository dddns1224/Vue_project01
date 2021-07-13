<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 复制一份tabcontrol，在滑动到一定位置时，该标签才显示代替原来的标签 -->
    <tab-control class="tab-control" :titles="['流行','经典','精选']"
                   @tabClick="tabClick" ref="TopTabControl"
                   v-show="isFixed"/>
    <scroll class="content" ref="scroll" 
            :probe-type="3" :pull-up-load="true" 
            @scroll="scrollContent" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control :titles="['流行','经典','精选']"
                   @tabClick="tabClick" ref="tabControl"/>
      <goods-list :goods="goods[currentType].list"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { imgListener, backTopListener } from 'common/mixin'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatureView from './childComps/HomeFeatureView.vue'
export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView
  },
    data(){
    return {
      banners: [],
      recommends: [],
      goods:{
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isFixed: false,
      saveY: 0
    }
  },
  mixins: [ imgListener,backTopListener ],
  created(){
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
  },
  actived(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactived(){
    this.saveY = this.$refs.scroll.getScrollY()
    this.$bus.$off('itemImageLoad',this.imgListener)
  },
  methods: {
    //网络请求方法
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        this.banners = res.data.data.banner;
        this.recommends = res.data.data.recommend;
    })
    },
    getHomeGoods(type){
      let pages = this.goods[type].page + 1;
      getHomeGoods(type,pages).then(res => {
        console.log(res);
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
    })
    },
    //事件监听方法
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.TopTabControl.actNum = index
      this.$refs.tabControl.actNum = index

    },
    scrollContent(position){
      this.isShow = (-position.y) > 1000;
      this.isFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.refresh()
    },
    debounce(func, delay){
      let timer = null
      return function(...args){
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },
    swiperImgLoad(){
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    }
  }
}
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
} 
  .home-nav{
    background-color: var(--color-tint);
    color: white;
    /* 因为导航标签不在滚动标签内部，所以不用设置以下样式 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .content{
    /* 一定加overflow */
    overflow: hidden;
    /* 一定加overflow */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>