<template>
  <BaseSearchBar v-bind="$attrs" v-model="newSearch" v-on="$listeners">
    <template #Search="{SearchContent: temp}">
      <el-form-item :label="$t('staff.manage.accountNo')">
        <el-input v-model="temp.accountNo" :placeholder="$t('staff.manage.accPlacehold')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('staff.manage.userName')">
        <el-input v-model="temp.userName" :placeholder="$t('staff.manage.userPlacehold')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('staff.manage.position')">
        <el-select v-model="temp.position" placeholder="请选择职位">
          <el-option :label="$t('staff.manage.posPlacehold')" :value="-1"></el-option>
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
        <el-button type="primary" icon="el-icon-user-solid" plain @click="$emit('mySub')">{{$t('staff.manage.mySub')}}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-plus" @click="$router.push('/home/staff/create')">{{$t('staff.manage.create')}}</el-button>
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
      .$post('/static/position', { forEmployeeSaving: true })
      .then((data) => {
        console.log(data)
        this.positions = data.positionList
      })
  },
}
</script>
