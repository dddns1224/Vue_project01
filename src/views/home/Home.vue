<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from 'network/home'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  data(){
    return {
      banners: [],
      recommends: [],
    }
  },
  created(){
    //1.请求多个数据
    getHomeMultidata().then(res => {
      console.log(res);
      this.banners = res.data.data.banner;
      this.recommends = res.data.data.recommend;
    })
    }
}
</script>

<style> 
  .home-nav{
    background-color: var(--color-tint);
    color: white;
  }
</style>