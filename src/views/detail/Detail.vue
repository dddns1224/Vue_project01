<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNavBar"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :images-info="detailInfo" @imgLoad="imgLoad" ref="detail"></detail-goods-info>
      <detail-params-info :paramInfo="paramInfo" ref="params"></detail-params-info>
      <detail-comment :commentInfo="commentInfo" ref="comment"></detail-comment>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamsInfo from "./childComps/DetailParamsInfo"
import DetailComment from "./childComps/DetailComment.vue"
import DetailBottomBar from "./childComps/DetailBottomBar.vue"

import { Goods,Shop,GoodsParams,getDetail,getRecommend } from 'network/detail.js'
import { imgListener,backTopListener } from 'common/mixin'
import { debounce } from 'common/util'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailComment,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  mixins: [imgListener,backTopListener],
  data(){
      return {
          iid: null,
          topImages:[],
          goods: {},
          shop: {},
          detailInfo: {},
          paramInfo: {},
          commentInfo: {},
          recommends: [],
          themeTopYs: [0, 100, 1000, 2000],
          currentIndex: 0
      }
  },
  created(){
    //1.获取商品的id
      this.iid = this.$route.params.iid
    //2.根据id进行网络请求
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.data.result
        //1.取出轮播图数据
        this.topImages = res.data.result.itemInfo.topImages
        //2.取出商品数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //3.取出店铺数据
        this.shop = new Shop(data.shopInfo)
        //4.取出详情数据
        this.detailInfo = data.detailInfo
        //5.取出参数数据
        this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)
        //6.取出评论数据
        if( data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })
      //7.取出推荐数据
      getRecommend().then(res => {
        console.log(res);
        this.recommends = res.data.data.list
      })
      //图片加载完成后获取各个组件离页面上方的距离
      this.getThemeTopYs = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop  - 44)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop - 44)
        //添加一个比较大的值，方便后续判断条件的编写
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs);
    })
  },
  destroy(){
    this.$bus.$off('itemImageLoad',this.imgListener)
  },
  methods: {
    imgLoad(){
      this.$refs.scroll.refresh()
      this.getThemeTopYs()
    },
    titleClick(index){
      console.log(index);
      this.$refs.scroll.scrollTo(0,(-this.themeTopYs[index]),100)
    },
    contentScroll(position){
      // console.log(position);
      this.isShow = (-position.y) > 1000;
      const positionY = -position.y
      let length = this.themeTopYs.length
      //简化了判断条件
      for(let i = 0; i < length; i++){
        //1.防止打印i过于频繁，设置一个条件使之不会重复打印
        if(this.currentIndex !== i && 
        //2.遍历每个元素时，将位置与前一个元素与后一个元素比较
           ((i < length - 1 && positionY >= this.themeTopYs[i] && 
             positionY < this.themeTopYs[i+1]))){
                  //打印i，调试作用
                  console.log(i);
                  //currentIndex作为一个调试参数，此处进行赋值
                  this.currentIndex = i
                  //将导航栏组件中的currentIndex的值更改为当前的遍历元素位置，对应某一个区域
                  this.$refs.detailNavBar.currentIndex = this.currentIndex
              }
        // //1.防止打印i过于频繁，设置一个条件使之不会重复打印
        // if(this.currentIndex !== i && 
        // //2.当遍历除了最后位置的元素时，将位置与前一个元素与后一个元素比较
        //    ((i < length - 1 && positionY >= this.themeTopYs[i] && 
        //      positionY < this.themeTopYs[i+1]) || 
        //      //3.当遍历到最后一个元素时，将位置与其比较
        //        (i === length - 1 && 
        //         positionY >= this.themeTopYs[i]))){
        //           //打印i，调试作用
        //           console.log(i);
        //           //currentIndex作为一个调试参数，此处进行赋值
        //           this.currentIndex = i
        //           //将导航栏组件中的currentIndex的值更改为当前的遍历元素位置，对应某一个区域
        //           this.$refs.detailNavBar.currentIndex = this.currentIndex
        //       }
      }
    },
    addCart(){
      // console.log(111);
      //1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      //2.将商品添加到购物车里面
      this.$store.dispatch('addCart',product)
      console.log(this.product);

    }
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px - 50px);
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>