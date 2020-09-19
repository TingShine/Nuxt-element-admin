<template>
  <div id="client-create">
    <Nav></Nav>
    <el-form
      ref="ruleform"
      :model="ruleform"
      :rules="rules"
      label-width="100px"
    >
      <el-row>
        <el-col :xl="10" :lg="12" :span="15">
          <el-form-item label="账号" v-if="ruleform.accountNo !== ''">
            <el-tag type="primay">{{ ruleform.accountNo }}</el-tag>
          </el-form-item>
          <el-form-item label="姓名" prop="userName">
            <el-input
              v-model="ruleform.userName"
              placeholder="请输入客户姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="初始密码">
            <el-tag type="success">{{ ruleform.password }}</el-tag>
            <el-button
              type="warning"
              size="small"
              style="margin-left: 1rem;"
              @click="handleGeneratePwd"
              >随机生成</el-button
            >
          </el-form-item>
          <el-form-item label="照片">
            <el-upload
              class="avatar-uploader"
              :data="{ token: $store.state.token }"
              :action="imgPostUrl"
              :on-success="handleAvatarSuccess"
              :show-file-list="false"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="性别" required>
            <el-radio-group v-model="ruleform.sex">
              <el-radio-button label="男">男</el-radio-button>
              <el-radio-button label="女">女</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份证号码" prop="idNo">
            <el-input
              v-model="ruleform.idNo"
              placeholder="请输入客户的身份证号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="出生年月日">
            <el-date-picker
              readonly
              type="date"
              v-model="ruleform.birthDay"
              placeholder="输入身份证后自动生成"
            >
            </el-date-picker>
            <el-tag v-if="ruleform.birthDay !== ''">24岁</el-tag>
          </el-form-item>
        </el-col>
        <el-col :offset="1" :xl="12" :lg="10" :span="7">
          <el-form-item label="手机号码" prop="mobile">
            <el-input
              v-model="ruleform.mobile"
              placeholder="请输入客户的手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-row style="width: 100%;">
              <el-col :span="10" :xl="8" :lg="8">
                <el-cascader
                  v-model="ruleform.city"
                  :options="options"
                  separator="-"
                ></el-cascader>
              </el-col>
              <el-col :offset="1" :span="12" :xl="13" :lg="13">
                <el-input
                  v-model="ruleform.address"
                  placeholder="请输入详细地址"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="区域">
            <el-select placeholder="请选择" v-model="ruleform.area">
              <el-option
                v-for="item in areaOptions"
                :key="item.id"
                :label="item.desc"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="住院号" prop="hospitalizedId">
            <el-input
              v-model="ruleform.hospitalizedId"
              placeholder="请输入客户住院号"
            ></el-input>
          </el-form-item>
          <el-form-item label="诊断" prop="diagnosis">
            <el-input
              v-model="ruleform.diagnosis"
              placeholder="请输入诊断"
              type="textarea"
              autosize
            ></el-input>
          </el-form-item>
          <el-form-item label="签约状态">
            <el-tooltip
              :content="'当前选择的状态: ' + ruleform.signStatus"
              placement="top"
            >
              <el-switch
                v-model="ruleform.signStatus"
                active-value="已签约"
                inactive-value="未签约"
              >
              </el-switch>
            </el-tooltip>
          </el-form-item>
          <el-form-item
            label="每日看护时长"
            prop="nurseEndTime"
            label-width="140px"
          >
            <el-time-select
              placeholder="起始时间"
              v-model="ruleform.nurseStartTime"
              :picker-options="{
                start: '00:00',
                step: '01:00',
                end: '20:00',
              }"
            >
            </el-time-select>
            至
            <el-time-select
              placeholder="结束时间(先填起始时间)"
              v-model="ruleform.nurseEndTime"
              :picker-options="{
                start: ruleform.nurseStartTime,
                step: '04:00',
                end: '24:00',
                minTime: ruleform.nurseStartTime,
              }"
            >
            </el-time-select>
            <el-tag type="primary" v-show="timeSub !== ''"
              >{{ timeSub }}小时</el-tag
            >
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit" v-if="!visible"
              >提交</el-button
            >
            <el-button v-if="!visible" @click="handleReset">重置</el-button>
            <el-button type="primay" v-if="visible" @click="$router.go(-1)"
              >返回</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import Nav from '@/components/Nav'
import AddressList from '@/utils/AddressList'
import DateFormat from '@/utils/DateFormat'
export default {
  components: { Nav },
  data() {
    let checkIdCard = (rule, value, callback) => {
      if (value === '') {
        this.ruleform.birthDay = ''
        return callback(new Error('身份证号码不能为空'))
      }
      const idcard = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/

      if (!idcard.test(value)) {
        this.ruleform.birthDay = ''
        return callback(new Error('身份证填写不规范'))
      } else {
        const temp = value.split('').slice(6, 14)
        const birthDay =
          temp.slice(0, 4).join('') +
          '-' +
          temp.slice(4, 6).join('') +
          '-' +
          temp.slice(6).join('')
        this.ruleform.birthDay = new Date(birthDay)
        callback()
      }
    }
    let checkMobile = (rule, value, callback) => {
      const reg = /^1[3456789]\d{9}$/
      if (!reg.test(value)) {
        return callback(new Error('手机号码填写不规范'))
      }
      return callback()
    }
    return {
      rules: {
        idNo: [
          { required: true, message: '当前为必填项', trigger: 'blur' },
          { validator: checkIdCard, trigger: 'blur' },
        ],
        userName: [
          { required: true, message: '当前为必填项', trigger: 'blur' },
          { min: 2, max: 8, message: '姓名在2～8个字符间', trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '当前为必填项', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
        address: [{ required: true, message: '当前为必填项', trigger: 'blur' }],
        hospitalizedId: [
          { required: true, message: '当前为必填项', trigger: 'blur' },
        ],
        diagnosis: [
          { required: true, message: '当前为必填项', trigger: 'blur' },
        ],
        nurseEndTime: [
          { required: true, message: '当前为必填项', trigger: 'blur' },
        ],
      },
      ruleform: {
        accountNo: '',
        userName: '',
        sex: '男',
        password: '',
        birthDay: '',
        idNo: '',
        age: '',
        mobile: '',
        city: ['广东省', '广州市', '天河区'],
        signStatus: '已签约',
        nurseStartTime: '',
        nurseEndTime: '',
        img: '',
        address: '',
        area: 1,
        hospitalizedId: '',
        diagnosis: '',
      },
      visible: false,
      imgPostUrl: process.env.apiUrl + '/static/img/upload',
      timeSub: '',
      areaOptions: [],
      options: [],
      loadFinished: false,
    }
  },
  computed: {
    imageUrl() {
      if(this.ruleform.img !== '') {
        return process.env.apiUrl + '/static/img/' + this.ruleform.img
      }
      return ''
    }
  },
  watch: {
    'ruleform.city'(val) {
      const area = val.slice(-1)[0]
      console.log(area)
      const temp = this.areaOptions.find((val) => val.desc === '天河北')
      if (temp) {
        this.ruleform.area = temp.id
      }
    },
    'ruleform.nurseStartTime': {
      handler(val) {
        const endTime = this.ruleform.nurseEndTime

        let timeSub = parseInt(endTime.split(':')[0]) - parseInt(val.split(':')[0])
        if (
          (timeSub !== 4) & (timeSub !== 8) & (timeSub !== 12) &&
          timeSub !== 24
        ) {
          this.timeSub = '';
          this.ruleform.nurseEndTime = '';
        } 
      },
      immediate: false,
    },
    'ruleform.nurseEndTime'(val) {
      console.log('end' + val)

      if (val === '') {
        return false
        this.timeSub = ''
      }
      const startTime = this.ruleform.nurseStartTime
      let timeSub =
        parseInt(val.split(':')[0]) - parseInt(startTime.split(':')[0])
      if (
        (timeSub !== 4) & (timeSub !== 8) & (timeSub !== 12) &&
        timeSub !== 24
      ) {
        this.$warning('设置的看护时间范围得在4h,8h,12h和24h之间选择')
        this.ruleform.nurseEndTime = ''
        this.timeSub = ''
      } else {
        this.timeSub = timeSub.toString()
      }
    },
  },
  mounted() {
    this.ruleform.accountNo = this.$route.query.accountNo || ''
    this.options = AddressList()
    this.handleGeneratePwd()
    this.$api.$post('/static/area').then((data) => {
      this.areaOptions = data.areaList
    })
    this.$api
      .$post('/manage/customer/info', { accountNo: this.ruleform.accountNo })
      .then((data) => {
        let temp = data
        this.ruleform = { ...this.ruleform, ...temp.user }
        console.log(this.ruleform)
        this.loadFinished = true
      })
  },
  methods: {
    // 生成随机密码
    handleGeneratePwd() {
      const pwd = Math.random().toString().slice(-6)
      this.ruleform.password = pwd.toString()
    },
    // 上传的照片显示在页面上
    handleAvatarSuccess(res, file) {
      if (res.code == '00') {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.ruleform.img = res.data.img
      }
    },
    // 创建客户
    handleSubmit() {
      this.$refs['ruleform'].validate((valid) => {
        if (!valid) {
          this.$error('当前有未填项或填写不规范')
          return false
        }
        let temp = this.ruleform
        let timeSub =
          parseInt(temp.nurseStartTime.split(':')[0]) -
          parseInt(temp.nurseEndTime.split(':')[0])
        temp.signTime = 'PT' + timeSub + 'H'
        let birthDay = new Date(temp.birthDay)
        temp.birthDay = DateFormat(birthDay, 'yyyy-MM-dd')

        this.$api
          .$post('/manage/customer/create', temp)
          .then((data) => {
            this.ruleform.accountNo = data.accountNo
            this.$success(`客户${ruleform.accountNo}创建成功`)
            this.visible = true
          })
          .catch((e) => {
            console.log(e)
          })
      })
    },
    // 重置表单
    handleReset() {
      this.$refs['ruleform'].resetFields()
    },
  },
}
</script>
<style lang="scss" scoped>
/deep/ .el-form-item__content {
  line-height: 44px;
}
#client-create {
  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/ .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  /deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  /deep/ .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
}
</style>
