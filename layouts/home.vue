<template>
  <div>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="16%" class="aside">
        <div class="border_right"></div>
        <div style="height: 13vh;"></div>
        <el-row>
          <el-col :span="20" style="text-align: center;">
            <el-avatar
              :size="80"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <div class="username">
              <h1>{{$store.state.info.userName}}</h1>
            </div>
            <div style="height: 10vh;"></div>
            <!-- 导航栏 -->
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#00bfff"
              text-color="#fff"
              active-text-color="#ffd04b"
              unique-opened
              router
            >
              <el-menu-item index="/home/staff">
                <i class="el-icon-s-custom"></i>
                <span slot="title">{{ $t('home.nav1') }}</span>
              </el-menu-item>
              <el-menu-item index="/home/client">
                <i class="el-icon-user"></i>
                <span slot="title">{{ $t('home.nav2') }}</span>
              </el-menu-item>
              <el-menu-item index="/home/data">
                <i class="el-icon-s-data"></i>
                <span slot="title">{{ $t('home.nav3') }}</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <div class="main-part">
        <el-container>
          <!-- 顶部栏 -->
          <el-header height="6vh" class="elheader">
            <el-row style="height: 100%;">
              <el-col :span="24" class="header_btn">
                <!-- 弹出选择框 -->
                <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                    <el-button icon="el-icon-s-tools" circle></el-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-receiving" command="0">{{
                      $t('home.change-lang')
                    }}</el-dropdown-item
                    ><el-dropdown-item icon="el-icon-setting" command="1">{{
                      $t('home.logout')
                    }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-header>
          <el-main class="elmain">
            <nuxt class="elmain-inbox"/>
          </el-main>
          <!-- 底部栏 -->
          <el-footer height="5vh" class="elfoot">
            Copyright © 2020 - 2022  粤ICP备号 号
            有限公司官方网站 搭建基于腾讯云平台
          </el-footer>
        </el-container>
      </div>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'home',
  methods: {
    handleCommand(command) {
      switch (command) {
        case '0':
          const lang = this.$store.state.locale
          if (lang == 'en') {
            this.$store.commit('SET_LANG', 'zn')
            this.$i18n.locale = 'zn'
          } else {
            this.$store.commit('SET_LANG', 'en')
            this.$i18n.locale = 'en'
          }
          break
        case '1':
          localStorage.clear()
          this.$store.commit('setStateAtStart')
          this.$router.replace('/')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@mixin linear-gradient($from, $to) {
  /* Fallback for sad browsers */
  background-color: $to;
  /* Mozilla Firefox */
  background-image: -moz-linear-gradient($from, $to);
  /* Opera */
  background-image: -o-linear-gradient($from, $to);
  /* WebKit (Safari 4+, Chrome 1+) */
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0, $from),
    color-stop(1, $to)
  );
  /* WebKit (Chrome 11+) */
  background-image: -webkit-linear-gradient($from, $to);
  /* IE10 */
  background-image: -ms-linear-gradient($from, $to);
  /* W3C */
  background-image: linear-gradient($from, $to);
}

.aside {
  min-height: 100vh;
  position: relative;
  background: linear-gradient(#1e90ff, #00bfff, #87cefa, #e1ffff);
  border-right: none;
  // border-radius: 30px 0 0 30px / 50px 0 0 50px;
  .username {
    color: white;
    font-weight: bold;
  }
  .border_right {
    position: absolute;
    z-index: 998;
    width: 18%;
    min-height: 100vh;
    background: #fff;
    border-radius: 2rem 0 0 2rem / 3.5rem 0 0 3.5rem;
    position: absolute;
    right: 0;
  }
}

.main-part {
  z-index: 999;
  width: 86.9vw;
  position: absolute;
  left: 13.1%;
  .elheader {
    height: 20vh;
    background: #e6e6fa;
    border-radius: 2rem 0 0 0 / 3.5rem 0 0 0;
    box-shadow: 2px 4px 10px 1px rgb(192, 185, 185);
    .header_btn {
      text-align: right;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}

.elmain {
  height: 89vh;
  background-color: #F5F5F5;
  .elmain-inbox {
    height: 100%;
    background-color: #fff;
    border-radius: 1rem 0 2rem 2rem / 1rem 0 2.3rem 2.3rem;
  }
}
.elfoot {
  background: #696969;
  border-radius: 0 0 0 2rem/ 0 0 0 3.5rem;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: none;
}
</style>
