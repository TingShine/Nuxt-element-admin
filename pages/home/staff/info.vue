<template>
  <div>
    <el-row>
      <el-col :xl="6" :lg="10" :md="10">
        <Nav></Nav>

        <el-form ref="form" :rules="rules" :model="form" label-width="130px">
          <!-- 用户名 -->
          <el-form-item :label="$t('staff.create.user')" prop="userName">
            <el-input
              v-show="!editableNot"
              v-model="form.userName"
              :placeholder="$t('staff.create.userPlacehold')"
            ></el-input>
            <el-tag v-show="editableNot">{{ form.userName }}</el-tag>
          </el-form-item>
          <!-- 账号 -->
          <el-form-item :label="$t('staff.create.accountNo')">
            <el-tag>{{ accountNo }}</el-tag>
          </el-form-item>
          <!-- 状态 -->
          <el-form-item :label="$t('staff.create.status')">
            <el-tooltip
              :content="'当前选择的状态: ' + form.status"
              placement="top"
            >
              <el-switch
                v-model="form.status"
                active-value="可用"
                inactive-value="不可用"
                :disabled="editableNot"
              >
              </el-switch>
            </el-tooltip>
          </el-form-item>
          <!-- 性别 -->
          <el-form-item :label="$t('staff.create.sex')">
            <el-radio-group v-model="form.sex" :disabled="editableNot">
              <el-radio-button
                :label="$t('staff.create.man')"
              ></el-radio-button>
              <el-radio-button
                :label="$t('staff.create.woman')"
              ></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <!-- 职位 -->
          <el-form-item :label="$t('staff.create.position')" prop="position">
            <el-select
              v-model="form.position"
              :placeholder="$t('staff.create.posPlacehold')"
              :disabled="editableNot"
            >
              <el-option
                v-for="item in positions"
                :key="item.id"
                :label="item.desc"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" v-if="!isModified">
            ******
          </el-form-item>
          <!-- 初始密码 -->
          <el-form-item label="初始密码" v-if="startPwd !== ''">
            <el-tag type="primary">{{ startPwd }}</el-tag>
          </el-form-item>
          <!-- 倒计时 -->
          <el-form-item
            :label="$t('staff.create.countdown')"
            class="time-count"
            v-if="isModified"
          >
            <el-progress
              :percentage="progressNum"
              :format="format"
            ></el-progress>
          </el-form-item>
          <!-- 按钮组 -->
          <el-form-item>
            <el-button
              type="primary"
              @click="handleClick"
              v-if="!editableNot && !isModified"
              >提交修改</el-button
            >
            <!-- 重置密码 -->
            <el-popover
              placement="right"
              width="300"
              v-model="visible"
              v-if="!editableNot && !isModified"
            >
              <p>
                <i class="el-icon-refresh-left" style="color: red;"></i>
                确定重置该职员密码吗？
              </p>
              <div style="text-align: right; margin: 0;">
                <el-button size="mini" type="text" @click="visible = false"
                  >取消</el-button
                >
                <el-button type="primary" size="mini" @click="handleReset"
                  >确定</el-button
                >
              </div>
              <el-button slot="reference">重置密码</el-button>
            </el-popover>
            <el-button
              type="primary"
              @click="finishProgress"
              v-if="isModified"
              >{{ $t('staff.create.return') }}</el-button
            >
            <el-button @click="handleCancle" v-if="isModified">{{
              $t('staff.create.cancle')
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :offset="2" :xl="16" :lg="12" :md="12">
        <BaseNav title="合同">
          <template #default>
            <el-button
              type="success"
              icon="el-icon-plus"
              size="small"
              style="margin-left: 3rem;"
              >创建合同</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-plus"
              size="small"
              style="margin-left: 1rem;"
              @click="handleDownload"
              >批量导出</el-button
            >
          </template>
        </BaseNav>
        <el-row class="contract-list">
          <el-col>
            <el-table
              stripe
              :data="tableData"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column label="名称">
                <template slot-scope="scope">
                  <el-tooltip
                    effect="light"
                    :content="scope.row.desc"
                    placement="top-end"
                  >
                    <el-tag effect="plain">{{ scope.row.docName }}</el-tag>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                label="日期"
                prop="recordStartDate"
              ></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Nav from '@/components/Nav'
import BaseNav from '@/components/BaseNav'
import CopyObject from '@/utils/CopyObject.js'
export default {
  components: {
    Nav,
    BaseNav,
  },
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('再次输入的密码不能为空'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        userName: '',
        status: '可用',
        sex: '男',
        position: -1,
        password: '',
        password_again: '',
      },
      tableData: [],
      startPwd: '',
      visible: false,
      isModified: false,
      progressNum: 0,
      accountNo: '',
      startTimer: '',
      endTimer: '',
      editableNot: false,
      positions: [],
      rules: {
        userName: [
          { required: true, message: '姓名输入不能为空', triger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' },
        ],
        position: [
          { required: true, message: '请选择活动区域', trigger: 'change' },
        ],
        password: [
          { required: true, message: '密码输入不能为空', triger: 'blur' },
          { min: 6, message: '密码不能少于6个字符', trigger: 'blur' },
        ],
        password_again: [{ validator: validatePass2, triger: 'blur' }],
      },
    }
  },
  async mounted() {
    await this.$api
      .$post('/static/position', { forEmployeeSaving: true })
      .then((data) => {
        this.positions = data.positionList
      })

    const accountNo = this.$route.query.id || ''
    this.$api
      .$post('/manage/employee/info', { accountNo: accountNo })
      .then((data) => {
        this.form = CopyObject(this.form, data.user, [
          'accountNo',
          'sex',
          'status',
          'userName',
        ])
        this.editableNot = !data.editable
        this.accountNo = data.user.accountNo
        this.form.position = parseInt(data.user.position.id)
        this.tableData = data.user.contract
      })
  },
  methods: {
    // 修改
    handleClick() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$api.$post('/manage/employee/update', this.form).then((data) => {
            this.$notify({
              title: `职工${this.form.accountNo}修改成功`,
              message: '30秒后将跳转至职工列表',
              type: 'success',
            })
            this.editableNot = true
            this.editableNot = true
            this.isModified = true
            this.startProgress()
          })
        } else {
          this.$warning('当前表单有不合法输入')
        }
      })
    },
    // 重置密码
    handleReset() {
      this.visible = false
      const pwd = Math.floor(Math.random() * 1000000)
      this.$api
        .$post('/manage/employee/resetPassword', {
          accountNo: this.form.accountNo,
          password: pwd,
        })
        .then((data) => {
          this.startPwd = data.password
          this.$notify.success({
            title: `密码重置成功,初始密码${data.password}`,
            message: '请通知该职员修改密码',
          })
          this.isModified = true
          this.editableNot = true
          this.startProgress()
        })
        .catch((e) => {
          this.$error(e)
        })
    },
    format(percentage) {
      return `${30 - Math.floor(percentage * 0.3)}s`
    },
    startProgress() {
      this.startTimer = setInterval(() => {
        this.progressNum++
        if (this.progressNum == 100) {
          clearInterval(this.startTimer)
          this.finishProgress()
        }
      }, 300)
    },
    finishProgress() {
      clearInterval(this.startTimer)
      this.$router.replace('/home/staff')
    },
    handleCancle() {
      this.progressNum = 0
      clearInterval(this.startTimer)
    },
    // 选中的合同变化时
    handleSelectionChange(row) {
      console.log(row);
      
    },
    handleDownload() {
      this.$download('http://127.0.0.1:8090/mock/manage/customer/record/hello', 'test.doc')
    }
  },
}
</script>
<style lang="scss" scoped>
// /deep/ .el-form-item__content {
//     display: flex;
// }
/deep/ .el-progress {
  top: 0.5rem;
}

.contract-list {
  font-size: 1.5rem;
}
</style>
