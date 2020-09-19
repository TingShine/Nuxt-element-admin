<template>
  <div>
    <Nav></Nav>
    <el-row style="width: 100%;">
      <el-col :offset="1" :span="16">
        <el-table border v-if="subordinateEditable" :data="tableData" stripe>
          <el-table-column label="账号" prop="accountNo"></el-table-column>
          <el-table-column label="姓名" prop="userName"></el-table-column>
          <el-table-column label="职位" prop="position"></el-table-column>
          <el-table-column label="状态">
            <div slot-scope="scope">
              <el-tag
                :type="scope.row.status === '可用' ? 'success' : 'danger'"
                >{{ scope.row.status }}</el-tag
              >
            </div>
          </el-table-column>
          <el-table-column label="从属关系" prop="relation"></el-table-column>
          <el-table-column label="操作">
            <div slot-scope="scope">
              <el-button
                type="primary"
                @click="handleRelease(scope.row.accountNo)"
                plain
                v-if="scope.row.sort === 0"
                >释放下属</el-button
              >
              <el-button
                type="success"
                @click="handleSet(scope.row.accountNo)"
                plain
                v-else-if="scope.row.sort === 1"
                >设为下属</el-button
              >
              <el-button
                type="warning"
                @click="handleSetAndRelease(scope.row.accountNo)"
                plain
                v-else
                >释放并设为下属</el-button
              >
            </div>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" class="pagination">
          <el-col>
            <el-pagination
              background
              layout="total, prev, pager, next, jumper, sizes"
              :total="total"
              :page-size="pageSize"
              :page-sizes="[5, 10, 20]"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </el-col>
        </el-row>
      </el-col>
      <el-col :offset="1" :span="6">
        <el-card>
          <el-row>
            <el-col :xl="8" :span="10">
              <el-avatar
                :size="80"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              ></el-avatar>
            </el-col>
            <el-col :xl="16" :span="14" class="introduce">
              <h4>账号: {{ accountNo }}</h4>
              <h4>姓名: {{ userName }}</h4>
              <h4>职位: {{ position }}</h4>
            </el-col>
          </el-row>
        </el-card>
        <BaseNav title="上级上司" />
        <div
          v-for="(item, index) in superior"
          :key="index"
          class="superior-item"
        >
          <el-tag type="primary">{{ item.position }}</el-tag
          >—— <el-tag type="success">{{ item.userName }}</el-tag
          >——
          <el-tag type="warning">{{ item.accountNo }}</el-tag>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Nav from '@/components/Nav.vue'
import BaseNav from '@/components/BaseNav.vue'
import CopyObject from '@/utils/CopyObject.js'
export default {
  components: { Nav, BaseNav },
  data() {
    return {
      accountNo: '',
      userName: '',
      position: '',
      superior: [],
      subordinateEditable: false,
      page: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
    }
  },
  mounted() {
    const {
      accountNo,
      userName,
      position,
      subordinateEditable,
    } = this.$route.query
    this.accountNo = accountNo
    this.userName = userName
    this.position = position
    this.subordinateEditable = subordinateEditable === 'true'
    this.$api
      .$post('/manage/employee/relation', { accountNo: accountNo })
      .then((data) => {
        console.log(data)
        this.superior = data.superior
      })
    if (subordinateEditable) {
      this.fetch()
    }
  },
  methods: {
    fetch() {
      const accountNo = this.$route.query.accountNo
      this.$api
        .$post('/manage/employee/relation/subordinate', {
          page: this.page,
          pageSize: this.pageSize,
          accountNo: accountNo,
        })
        .then((data) => {
          // 处理数据
          this.tableData = this.handleData(data.subordinate)
          this.total = data.total
        })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetch()
    },
    handleCurrentChange(val) {
      this.page = val
      this.fetch()
    },
    handleData(tableData) {
      let temp = tableData.map((val) => {
        if (val.relation == 'TA的下属') {
          val.sort = 0
        } else if (val.relation == '无') {
          val.sort = 1
        } else {
          val.sort = 2
        }
        return val
      })
      return temp
    },
    handleSet(accountNo) {
      const acc = this.$route.query.accountNo
      this.$api
        .$post('/manage/employee/relation/subordinate/set', {
          accountNo: acc,
          subordinate: accountNo,
        })
        .then((data) => {
          this.$success('成功设为下属')
          this.fetch()
        })
    },
    handleRelease(accountNo) {
      this.$api
        .$post('/manage/employee/relation/subordinate/release', {
          subordinate: accountNo,
        })
        .then((data) => {
          this.$success('成功释放下属')
          this.fetch()
        })
    },
    handleSetAndRelease(accountNo) {
      const acc = this.$route.query.accountNo
      this.$api
        .$post('/manage/employee/relation/subordinate/release', {
          subordinate: accountNo,
        })
        .then(() => {
          this.$api
            .$post('/manage/employee/relation/subordinate/set', {
              accountNo: acc,
              subordinate: accountNo,
            })
            .then((data) => {
              this.$success('成功释放并设为下属')
              this.fetch()
            })
        })
        .catch((e) => {
          this.$error(e)
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.introduce {
  h4 {
    padding-bottom: 0.5rem;
  }
}
.superior-item {
  padding-bottom: 1rem;
}
.pagination {
  width: 100%;
  text-align: center;
  margin-top: 1rem;
}
</style>
