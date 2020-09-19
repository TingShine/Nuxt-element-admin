<template>
  <div>
    <Nav></Nav>
    <SearchBar
      v-model="search"
      @Search="handleSearch"
      @mySub="handleMySub"
      :loading.sync="isLoading"
    />
    <el-table :data="tableData" stripe style="width: 100%;" border>
      <el-table-column prop="accountNo" label="账号">
        <template slot-scope="scope">
          <el-link
            :type="scope.row.viewable ? 'primary' : 'info'"
            :underline="false"
            :disabled="!scope.row.viewable"
            @click="$router.push({ path: '/home/client/info', query: { accountNo: scope.row.accountNo } })"
          >
            <i class="el-icon-view el-icon--left" v-if="scope.row.viewable"></i>
            {{ scope.row.accountNo }}
            <i class="el-icon-edit el-icon--left" v-if="scope.row.editable"></i>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="姓名"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="120" align="center">
      </el-table-column>
      <el-table-column prop="signStatus" label="状态">
        <template slot-scope="scope">
          已签约 -
          <el-tag type="success">{{
            scope.row.signStatus.split('-')[1]
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column >
        <template #header>
           <el-tooltip content="点击修改对应的护理关系" placement="right" effect="light">
               <el-button type="text">护理关系</el-button>
           </el-tooltip>
        </template>
        <template slot-scope="scope">
          <el-link type="primary"
          @click="$router.push({ path: '/home/client/relation', query: { accountNo: scope.row.accountNo } })"
            >{{ scope.row.nurse }}
            <i
              class="el-icon-edit el-icon--right"
              v-if="scope.row.nurseEditable"
            ></i>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="area" label="区域" width="100" align="center">
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            @click="handleForm(scope.$index, scope.row)"
            >相关表单</el-button
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
import SearchBar from '@/components/ClientSearchBar.vue'
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
        area: -1,
      },
      isLoading: false,
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
      this.$api.$post('/manage/customer/list', option).then((data) => {
        this.isLoading = false
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
      console.log(this.isLoading)
      this.page = 1
      this.fetch()
    },
    // 查看我的客户
    handleMySub() {
      let accountNo = this.$store.state.info.accountNo
      this.fetchNurse(accountNo)
    },
    // 按id查找其客户
    fetchNurse(accountNo) {
      this.page = 1
      let option = {
        page: this.page,
        pageSize: this.pageSize,
        nurse: accountNo,
      }
      this.$api.$post('/manage/customer/list', option).then((data) => {
        this.isLoading = false
        this.total = data.total
        this.tableData = data.list
      })
    },
    // 查找某人的客户
    handleSub(index, row) {
      this.fetchSub(row.accountNo)
    },
    handleForm(index, row) {
      console.log(this.$store.state.client);
      this.$store.commit('SET_CLIENT', row);
      this.$router.push('/home/client/form');
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
