<template>
  <div>
    <el-form :inline="true" :model="search" class="demo-form-inline">
      <slot name="Search" v-bind:SearchContent="search"></slot>

      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          :loading="loading"
          @click="handleClick"
          >{{$t('staff.manage.search')}}</el-button
        >
      </el-form-item>
      <slot name="Custom"></slot>
    </el-form>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  model: {
    prop: 'search',
    event: 'change'
  },
  props: {
    formInline: {
      type: Object,
      default() {
        return {}
      },
    },
    loading: {
      type: Boolean,
      default() {
        return false
      },
    },
    search: {
      type: Object
    }
  },
  mounted() {
    console.log(this.loading);
    console.log(this.search);
    
  },
  data() {
    return {}
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleClick() {
      this.$emit('update:loading', true)
      this.$emit('Search')
    },
  },
}
</script>
