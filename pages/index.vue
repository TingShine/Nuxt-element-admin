<template>
  <div class="container">
    <!-- 背景粒子图 -->
    <div class="bg">
      <!-- 粒子图不提供ssr功能 -->
      <!-- <client-only> -->
        <no-ssr>
        <vue-particles
          color="#fff"
          :particleOpacity="0.8"
          :particlesNumber="50"
          shapeType="circle"
          :particleSize="4"
          linesColor="#fff"
          :linesWidth="2"
          :lineLinked="true"
          :lineOpacity="0.8"
          :linesDistance="200"
          :moveSpeed="2"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="push"
          class="lizi"
        ></vue-particles>
        </no-ssr>
      <!-- </client-only> -->
    </div>
    <!-- 登陆入口 -->
    <div class="login_form">
      <el-row type="flex" justify="center">
        <el-col :xl="7" :lg="10" :md="12" :sm="15" class="login_box">
          <!-- 标题 -->
          <el-row type="flex" justify="center" align="center">
            <el-col :span="15" class="title">
              <h1 class="title_text">{{ $t('login.title') }}</h1>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <transition name="fade">
              <el-col :span="22">
                <el-form
                  ref="form"
                  v-model="form"
                  label-width="100px"
                  size="medium"
                >
                  <el-form-item :label="$t('login.account_text')">
                    <el-input v-model="form.accountNo"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('login.pwd_text')">
                    <el-input
                      v-model="form.password"
                      type="password"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item size="large" class="form_button">
                    <el-button type="primary" class="btn" @click="submit">{{
                      $t('login.login_btn')
                    }}</el-button>
                    <el-button class="btn" @click="changeLang">{{
                      $t('login.forget_btn')
                    }}</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </transition>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  layout: 'default',
  data() {
    return {
      form: {
        accountNo: '',
        password: '',
      },
    }
  },
  methods: {
    submit() {
      this.$api
        .$post('/login', {
          accountNo: this.form.accountNo,
          password: md5(this.form.password),
        })
        .then((res) => {
          this.$success('登陆成功');
          this.$store.commit('setToken', res.token);
          // 获取当前用户信息
          this.$api.$post("/personal").then(data => {
            this.$store.commit("SET_INFO", data);
          })
          this.$router.push('/home')
        }).catch(e => e)
    },
    changeLang() {
      this.$warning('当事人忘记了密码')
    },
  },
}
</script>

<style lang="scss" scoped>
$main-color: #bed;
@mixin title {
  font-size: 3rem;
  color: white;
  text-align: center;
  padding: 2rem 0;
  font-weight: bold;
}

@mixin form_label {
  font-size: 1.2rem;
  color: white;
  font-weight: bold;
}

.container {
  height: 100vh;
  background: linear-gradient(
    to bottom,
    $main-color,
    adjust-hue($main-color, 40deg),
    adjust-hue($main-color, 60deg)
  );
  position: relative;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    .lizi {
      height: 100%;
    }
  }
  .login_form {
    width: 100%;
    height: 40vh;
    position: absolute;
    top: 35%;
    .login_box {
      z-index: 3;
      box-shadow: 5px 5px 20px 10px rgba(252, 246, 246, 0.904);
      border-radius: 10px;
      .title {
        text-align: center;
        .title_text {
          @include title;
        }
      }
      /deep/ .el-form-item__label {
        @include form_label;
      }
      .form_button {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
