<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import bscroll from 'better-scroll'
export default {
  name: "Scroll",
  data(){
      return {
          scroll: null
      }
  },
  props: {
      probeType: {
          type: Number,
          default: 0
      },
      pullUpLoad: {
          type: Boolean,
          default: true
      }
  },
  mounted(){
       this.scroll = new bscroll(this.$refs.wrapper,{
           observeDOM: true,
           click: true,
           mouseWheel: true,
           probeType: this.probeType,
           pullUpLoad: this.pullUpLoad
       }),
       //监听滚动的位置
       this.scroll.on('scroll',position => {
        //    console.log(position);
        this.$emit('scroll',position)
       }),
       //监听滚动到底部
       this.scroll.on('pullingUp', () => {
           this.$emit('pullingUp')
       })
  },
  methods: {
      scrollTo(x, y, time=500){
          this.scroll.scrollTo(x, y, time)
      },
      refresh(){
          this.scroll.refresh()
      },
      finishPullUp(){
          this.scroll.finishPullUp()
      },
      getScrollY(){
          return this.scroll ? this.scroll.y : 0
      }
  }
}
</script>

<style scope>

</style>