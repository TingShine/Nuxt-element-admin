<template>
  <BaseSearchBar v-bind="$attrs" v-model="newSearch" v-on="$listeners">
    <template #Search="{SearchContent: temp}">
      <el-form-item label="账号">
        <el-input v-model="temp.accountNo" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="temp.userName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="区域">
        <el-select v-model="temp.area" placeholder="请选择区域">
          <el-option label="全部" :value="-1"></el-option>
          <el-option
            v-for="item in positions"
            :key="item.id"
            :label="item.desc"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </template>
    <template #Custom>
      <el-form-item>
        <el-button type="primary" icon="el-icon-user-solid" plain @click="$emit('mySub')">我的客户</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-plus" @click="$router.push('/home/staff/create')">新建</el-button>
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
      positions: [],
      newSearch: this.search,
    }
  },
  mounted() {
    this.$api
      .$post('/static/area')
      .then((data) => {
        console.log(data)
        this.positions = data.areaList
      })
  },
}
</script>
