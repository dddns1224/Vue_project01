<template>
  <div class="recommend">
      <div class="recommend-item" v-for="(item,index) in recommends.list" :key="index">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
      recommends: {
          default(){
              return []
          }
      }
  }
}
</script>

<style>
  .recommend{
      display: flex;
      width: 100%;
      text-align: center;
      font-size: 12px;
      padding: 15px 0 20px;
      border-bottom: 8px solid #eee;
  }
  .recommend-item{
      flex: 1;
  }
  .recommend-item img{
      width: 65px;
      height: 65px;
      margin-bottom: 10px;
  }
</style>