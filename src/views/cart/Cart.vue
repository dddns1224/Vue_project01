<template>
  <nav-bar class="nav-bar">
    <div slot="center">购物车()</div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: "Cart",
  components: {
    NavBar
  }
}
</script>

<style>
.nav-bar{
  background-color: var(--color-tint);
  color: white;
  font-weight: 700;
}
</style>