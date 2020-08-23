<template>
  <div class="Container">
    <Breadcrumb></Breadcrumb>
     <el-backtop target=".main-content"></el-backtop>
    <div class="main-content">
    <nuxt-child />

    </div>
  </div>
</template>
<script>
import Breadcrumb from '~/components/Breadcrumb.vue'
export default {
  layout: 'home',
  components: {
    Breadcrumb
  }
}
</script>
<style lang="scss" scoped>
  .Container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .main-content {
    position: absolute;
    top: 50px;
    padding: 20px;
    width: 100%;
    left: 0;
    bottom: 0px;
    overflow: auto;
  }
</style>
