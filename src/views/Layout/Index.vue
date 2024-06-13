<script setup>
import LayoutHeader from './Components/LayoutHeader.vue'
import LayoutFooter from './Components/LayoutFooter.vue'
</script>
<template>
  <div class="main-wrapper">
    <LayoutHeader></LayoutHeader>
    <main><RouterView /></main>
    <LayoutFooter></LayoutFooter>
  </div>
</template>
<style>
.header {
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
}
.navbar {
  max-width: 100%;
  margin: 0 auto;
}
.main-wrapper {
  width: 100%;
}
main {
  padding: 20px 0 100px 0;
}
</style>
