<template>
  <BaseSearchBar v-bind="$attrs" v-model="newSearch" v-on="$listeners">
    <template #Search="{SearchContent: temp}">
      <el-form-item label="账号">
        <el-input v-model="temp.accountNo" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="temp.userName" placeholder="请输入姓名"></el-input>
      </el-form-item>
    </template>
  </BaseSearchBar>
</template>
<script>
import BaseSearchBar from './BaseSearchBar'
export default {
  inheritAttrs: false,
  components: {
    BaseSearchBar,
  },
  model: {
    prop: 'search',
    event: 'change',
  },
  props: {
    search: {
      type: Object,
    },
  },
  data() {
    return {
      newSearch: this.search,
    }
  },
}
</script>
