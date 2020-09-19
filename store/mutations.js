import StartData from '@/assets/stateData'
import breadcrumbDatas from '@/locales/breadcrumb'

export default {
  // 切换语言
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  // 设置个人信息
  SET_INFO(state, payload) {
    const arr = Object.keys(payload)
    arr.forEach((val) => {
      if (state.info[`${val}`] != undefined) {
        state.info[`${val}`] = payload[`${val}`]
      }
    })
  },
  // 设置客户
  SET_CLIENT(state, payload) {
    console.log(payload);
    const arr = Object.keys(payload)
    arr.forEach((val) => {
      if (state.client[`${val}`] != undefined) {
        state.client[`${val}`] = payload[`${val}`]
      }
    })
  },
  State_Replace(state, payload) {
    const arr = Object.keys(payload)
    arr.forEach((val) => {
      if (state[`${val}`] != undefined) {
        state[`${val}`] = payload[`${val}`]
      }
    })
  },
  // 设置面包屑
  setBreadcrumb(state, breadcrumbData) {
    state.breadcrumbData = breadcrumbData
  },
  // 设置token
  setToken(state, token) {
    state.token = token
  },
  // 通过路径匹配设置面包屑
  setBreadcrumbByPath(state, path) {
    let curBreadcrumb = state.breadcrumbData.find(
      (breadcrumb) => breadcrumb.path === path
    )
    if(curBreadcrumb) {
      state.breadcrums.push(curBreadcrumb)
    }
  },
  // 设置当前面包屑列表为空
  setBreadcrumbNone(state) {
    state.breadcrums = [];
  },
  // 设置sate初始状态
  setStateAtStart(state) {
    state.token = '';
    state.breadcrumbData = breadcrumbDatas;
  }
}
