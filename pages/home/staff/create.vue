<template>
  <div>
    <Nav></Nav>
    <el-row>
      <el-col :xl="8" :lg="12" :md="12">
        <el-form ref="form" :rules="rules" :model="form" label-width="130px">
          <el-form-item :label="$t('staff.create.user')" prop="userName">
            <el-input
              v-show="!createSuccess"
              v-model="form.userName"
              :placeholder="$t('staff.create.userPlacehold')"
            ></el-input>
            <el-tag v-show="createSuccess">{{ form.userName }}</el-tag>
          </el-form-item>
          <el-form-item :label="$t('staff.create.accountNo')" v-if="createSuccess">
            <el-tag>{{ accountNo }}</el-tag>
          </el-form-item>
          <el-form-item :label="$t('staff.create.status')">
            <el-tooltip
              :content="'当前选择的状态: ' + form.status"
              placement="top"
            >
              <el-switch
                v-model="form.status"
                active-value="可用"
                inactive-value="不可用"
                :disabled="createSuccess"
              >
              </el-switch>
            </el-tooltip>
          </el-form-item>
          <el-form-item :label="$t('staff.create.sex')">
            <el-radio-group v-model="form.sex" :disabled="createSuccess">
              <el-radio-button :label="$t('staff.create.man')"></el-radio-button>
              <el-radio-button :label="$t('staff.create.woman')"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('staff.create.position')" prop="position">
            <el-select
              v-model="form.position"
              :placeholder="$t('staff.create.posPlacehold')"
              :disabled="createSuccess"
            >
              <el-option
                v-for="item in positions"
                :key="item.id"
                :label="item.desc"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('staff.create.pwd')" prop="password">
            <el-input
              v-show="!createSuccess"
              v-model="form.password"
              :placeholder="$t('staff.create.pwdPlacehold')"
              type="password"
            ></el-input>
            <span v-show="createSuccess">********</span>
          </el-form-item>
          <el-form-item
            :label="$t('staff.create.pwd_again')"
            prop="password_again"
            required
            v-show="!createSuccess"
          >
            <el-input
              v-model="form.password_again"
              :placeholder="$t('staff.create.pwd_againPlacehold')"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('staff.create.countdown')" class="time-count" v-if="createSuccess">
            <el-progress
              :percentage="progressNum"
              :format="format"
            ></el-progress>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleClick" v-if="!createSuccess">{{$t('staff.create.submit_btn')}}</el-button>
            <el-button @click="resetForm" v-if="!createSuccess">{{$t('staff.create.reset_btn')}}</el-button>
            <el-button
              type="primary"
              @click="finishProgress"
              v-if="createSuccess"
              >{{$t('staff.create.return')}}</el-button
            >
            <el-button @click="handleCancle" v-if="createSuccess"
              >{{$t('staff.create.cancle')}}</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Nav from '@/components/Nav'
export default {
  components: {
    Nav,
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
        position: '',
        password: '',
        password_again: '',
      },
      progressNum: 0,
      accountNo: '',
      startTimer: '',
      endTimer: '',
      createSuccess: false,
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
  mounted() {
    this.$api
      .$post('/static/position', { forEmployeeSaving: true })
      .then((data) => {
        this.positions = data.positionList
      })
  },
  methods: {
    handleClick() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$api.$post('/manage/employee/create').then((data) => {
            this.$notify({
              title: `职工${data.accountNo}创建成功`,
              message: '30秒后将跳转至职工列表',
              type: 'success',
            })
            this.accountNo = data.accountNo
            this.createSuccess = true
            this.startProgress()
          })
        } else {
          this.$warning('当前表单有不合法输入')
        }
      })
    },
    resetForm() {
      this.$refs['form'].resetFields()
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
      this.progressNum = 0;
      clearInterval(this.startTimer)
    },
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
</style>
