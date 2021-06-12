<template>
  <div class="tab-control">
      <div class="tab-control-item" :class="{active:index === actNum}"
       @click="itemClick(index)" 
       v-for="(item,index) in titles" :key="index">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
      titles: []
  },
  data(){
      return {
          actNum: 0
      }
  },
  methods: {
      itemClick(index){
          this.actNum = index
          this.$emit('tabClick',index)
      }
  }
}
</script>

<style>
  .tab-control{
      display: flex;
      text-align: center;
      font-size: 14px;
      background-color: #fff;
  }
  .tab-control-item{
      flex: 1;
      height: 40px;
      line-height: 40px;
  }
  .active{
      color: var(--color-high-text);
      border-bottom: 3px solid var(--color-tint);
  }
</style>