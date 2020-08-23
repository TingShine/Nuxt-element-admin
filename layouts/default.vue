<template>
  <div>
    <div
      class="dropdown"
      @mouseenter="showList = true"
      @mouseleave="showList = false"
    >
      <span>{{ lang }}</span>
      <ul v-if="showList">
        <li @click="changLen(1)">中文</li>
        <li @click="changLen(2)">English</li>
      </ul>
    </div>
    <Nuxt />
  </div>
</template>
<script>
export default {
  name: 'default',
  data() {
    return {
      lang: '中文',
      showList: false,
    }
  },
  methods: {
    changLen(id) {
      if (id == 1) {
        this.$store.commit('SET_LANG', 'zn')
        this.lang = '中文'
      } else {
        this.$store.commit('SET_LANG', 'en')
        this.lang = 'English'
      }
      this.$i18n.locale = this.$store.state.locale
    },
  },
}
</script>
<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.dropdown {
  position: fixed;
  z-index: 9999888;
  top: 1rem;
  left: 2rem;
  color: #fff;
  span {
    padding-right: 15px;
    font-size: 1.2rem;
    &::before {
      padding-left: 10px;
      content: '▽';
    }
  }
  ul {
    padding: 5px 0;
    margin: 5px 0;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    li {
      font-size: 1rem;
      text-align: center;
      &:hover {
        background: rgba(175, 238, 238, 0.2);
        cursor: pointer;
      }
    }
  }
}
</style>
