<template>
  <div class="goods">
      <goods-list-item v-for="(items,index) in goods" :key="index"
                    :goods-item="items" />
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  name: "GoodsList",
  components: {
     GoodsListItem
  },
  props: {
      goods: {
          default(){
              return []
          }
      }
  }
}
</script>

<style>
  .goods{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 2px;
  }
</style>