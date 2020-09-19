<template>
  <div>
    <Nav></Nav>
    <el-row style="width: 100%;">
      <el-col :offset="1" :span="14">
        <el-button type="success" @click="handleAdd">新增</el-button>
        <el-button type="primary" @click="handleSubmit">保存修改</el-button>
        <el-row style="margin-top: 1rem;">
          <el-col>
            <draggable group="people" animation="500" v-model="list">
              <transition-group>
                <div
                  v-for="(item, index) in list"
                  :key="item.accountNo"
                  class="huli-item"
                >
                  <el-tag type="info">{{ index + 1 }}</el-tag> ——
                  <el-tag type="success">{{ item.accountNo }}</el-tag> ——
                  <el-tag type="primay">{{ item.userName }}</el-tag> ——
                  <el-button type="warning" size="small" @click="handleModify(index)">修改</el-button>
                  <el-button
                    type="danger"
                    size="small"
                    @click="handleCancel(index)"
                    >取消</el-button
                  >
                </div>
              </transition-group>
            </draggable>
          </el-col>
        </el-row>
      </el-col>
      <el-col :offset="1" :span="8">
        <el-card>
          <el-row>
            <el-col :xl="6" :span="8">
              <el-avatar
                :size="80"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              ></el-avatar>
            </el-col>
            <el-col :xl="18" :span="16" class="introduce">
              <h4>账号: {{ accountNo }}</h4>
              <h4>姓名: {{ userName }}</h4>
              <h4>身份证: {{ idNo }}</h4>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      title="选择护理员"
      :visible.sync="dialogTableVisible"
      :modal-append-to-body="false"
    >
      <HuliSearchBar v-model="search" @Search="fetchHuli" />
      <el-table :data="tableData">
        <el-table-column
          property="accountNo"
          label="账号"
          width="150"
        ></el-table-column>
        <el-table-column
          property="userName"
          label="姓名"
          width="200"
        ></el-table-column>
        <el-table-column label="是否可用">
            <div slot-scope="scope">
                <el-tag :type="scope.row.status == '可用' ? 'success' : 'danger'">{{scope.row.status}}</el-tag>
            </div>
        </el-table-column>
        <el-table-column label="操作">
            <div slot-scope="scope">
                <el-button size="small" plain type="primary" @click="handleChoose(scope.row, scope.$index)">选择</el-button>
            </div>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper, sizes"
          :total="total"
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[5, 10, 20]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Nav from '@/components/Nav.vue'
import BaseNav from '@/components/BaseNav.vue'
import CopyObject from '@/utils/CopyObject.js'
import draggable from 'vuedraggable'
import HuliSearchBar from '@/components/HuliSearchBar.vue'
export default {
  components: { Nav, BaseNav, draggable, HuliSearchBar },
  data() {
    return {
      selectIndex: 0,
      accountNo: '',
      userName: '',
      idNo: '',
      dialogTableVisible: false,
      page: 1,
      pageSize: 5,
      tableData: [],
      total: 0,
      list: [],
      search: {
        accountNo: '',
        userName: '',
      },
    }
  },
  mounted() {
    const { accountNo } = this.$route.query
    this.accountNo = accountNo
    this.fetch()
    this.fetchHuli()
  },
  methods: {
    fetch() {
      const accountNo = this.$route.query.accountNo
      this.$api
        .$post('/manage/customer/relation', { accountNo: accountNo })
        .then((data) => {
          this.userName = data.currentCustomer.userName
          this.idNo = data.currentCustomer.idNo
          this.list = data.nurse;
        })
    },
    handleCancel(index) {
      let temp = this.list
      temp.splice(index, 1)
    },
    handleSubmit() {
      const temp = this.list.map(val => val.accountNo);
      this.$api.$post('/manage/customer/relation/nurse/update', temp).then(data => {
        this.$success('保存修改成功');
      }).catch(e => {this.$error(e)})
    },
    handleAdd() {
      if(this.list.length >= 3) {
          this.$warning('当前最多可添加三个护理员');
          return false;
      }
      this.selectIndex = this.list.length;
      this.dialogTableVisible = true
    },
    fetchHuli() {
      let temp = {...this.search, page: this.page, pageSize: this.pageSize}
      this.$api
        .$post('/manage/customer/relation/nurse', temp)
        .then((data) => {
          console.log(data)
          this.tableData = data.nurse
          this.total = data.total
        })
    },
    handleSizeChange(val) {
        this.pageSize = val;
        this.fetchHuli()
    },
    handleCurrentChange(val) {
        this.page = val;
        this.fetchHuli()
    },
    handleChoose(row, index) {
        console.log(row, index);
        if(row.status === '不可用') {
            this.$warning('选择的护理员不可用');
            return;
        }
        let result = this.list.find(val => val.accountNo == row.accountNo)
        if(result) {
            this.$warning('当前护理员已被选择，不能重复选择')
            return; 
        }
        let temp = { accountNo: row.accountNo, userName: row.userName };
        this.dialogTableVisible = false;
        if(this.selectIndex === this.list.length ) {
            this.list.splice(this.selectIndex, 0, temp)
        } else {
            this.list.splice(this.selectIndex, 1, temp)
        }
    },
    handleModify(index) {
        this.selectIndex = index;
        this.dialogTableVisible = true;
    }
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
.huli-item {
  margin: 1rem 0 0.5rem;
  padding: 0.5rem 0;
  cursor: move;
  &:hover {
    background: #f1f1f1;
    cursor: move;
  }
}
.pagination {
  width: 100%;
  text-align: center;
}
</style>
