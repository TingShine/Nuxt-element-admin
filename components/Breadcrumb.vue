<template>
 <div  >
  <el-breadcrumb separator="/" class="bread">
   <el-breadcrumb-item
    v-for="(item, index) in breadcrumbData"
    :to="item.clickable ? item.path : ''"
    :key="index">
     {{ $store.state.locale === 'en' ? item.En : item.Zn}}
   </el-breadcrumb-item>
  </el-breadcrumb>
 </div>
</template>

<script>
export default {
 name: 'Breadcrumb',
 computed: {
//   isBreadcrumbShow () {
//    return this.curBreadcrumb && this.curBreadcrumb.isShow
//   },
  breadcrumbData () {
   return this.$store.state.breadcrums;
  },
//   curBreadcrumb () {
//    return this.breadcrumbData[this.breadcrumbData.length - 1]
//   }
 }
}
</script>
<style>
  .bread {
    padding: 1rem 1rem;
    border-bottom: 1px#C0C0C0 solid;
    box-shadow: 2px 2px 3px #C0C0C0;
    border-radius: 0.4rem;
  }
</style>

