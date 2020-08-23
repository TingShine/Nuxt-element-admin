<template>
  <div>
    <Nav></Nav>
    <SearchBar v-model="search" @Search="handleSearch" @mySub="handleMySub" :loading.sync="isLoading" />
    <el-table :data="tableData" stripe style="width: 100%;" border>
      <el-table-column prop="accountNo" :label="$t('staff.manage.acc_table')">
        <template slot-scope="scope">
          <el-link
            :type="scope.row.viewable ? 'primary' : 'info'"
            :underline="false"
            :disabled="!scope.row.viewable"
          >
            <i class="el-icon-view el-icon--left" v-if="scope.row.viewable"></i>
            {{ scope.row.accountNo }}
            <i class="el-icon-edit el-icon--left" v-if="scope.row.editable"></i>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="userName" :label="$t('staff.manage.user_table')"> </el-table-column>
      <el-table-column prop="position" :label="$t('staff.manage.pos_table')"> </el-table-column>
      <el-table-column prop="status" :label="$t('staff.manage.status_table')" width="100">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '可用' ? 'success' : 'danger'"
            disable-transitions
            >{{ scope.row.status }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="superior" :label="$t('staff.manage.re_table')"> </el-table-column>
      <el-table-column :label="$t('staff.manage.op_table')" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleDelete(scope.$index, scope.row)"
            >查看客户</el-button
          >
          <el-button
            size="mini"
            type="warning"
            @click="handleSub(scope.$index, scope.row)"
            >查看下属</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" class="staff-pagination">
      <el-col :span="22" class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pageSize"
          background
          layout="total, prev, pager, next, jumper, sizes "
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Nav from '@/components/Nav.vue'
import SearchBar from '@/components/StaffSearchBar.vue'
export default {
  components: {
    Nav,
    SearchBar,
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      loading: false,
      search: {
        accountNo: '',
        userName: '',
        position: -1,
      },
      isLoading: false
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    // 按照查找内容获取数据
    fetch() {
      let option = {
        page: this.page,
        pageSize: this.pageSize,
      }
      option = Object.assign(option, this.search)
      this.$api.$post('/manage/employee/list', option).then((data) => {
        this.isLoading = false;
        this.total = data.total
        this.tableData = data.list
      })
    },
    // 当前页数变化时
    handleCurrentChange(val) {
      this.page = val
      this.fetch()
    },
    // 当pageSize变化时
    handleSizeChange(val) {
      this.pageSize = val
      this.fetch()
    },
    // 点击查找
    handleSearch() {
      console.log(this.isLoading); 
      this.page = 1;
      this.fetch();      
    },
    // 查看我的下属
    handleMySub() {
      let accountNo = this.$store.state.info.accountNo;
      this.fetchSub(accountNo);
    },
    // 按id查找其下属
    fetchSub(accountNo) {
      this.page = 1;
      let option = {
        page: this.page,
        pageSize: this.pageSize,
        superior: accountNo
      }
      this.$api.$post('/manage/employee/list', option).then((data) => {
        this.isLoading = false;
        this.total = data.total
        this.tableData = data.list
      })
    },
    // 查找某人下属
    handleSub(index, row) {
      this.fetchSub(row.accountNo);
    }
  },
}
</script>
<style lang="scss" scoped>
.staff-pagination {
  margin: 1.2rem 0;
  .pagination {
    text-align: center;
  }
}
</style>
