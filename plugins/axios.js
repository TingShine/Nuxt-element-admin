import qs from 'qs'
import { Message } from 'element-ui'


const ERRORS = new Map([
  [500, '服务器异常...'],
  [404, '未找到对应资源'],
  [401, '未鉴权'],
])

export default function ({ $axios, redirect, store, app }, inject) {
  // 基本配置
  //   $axios.defaults.timeout = 10000

  const http = $axios.create({
    baseURL: 'http://127.0.0.1:8090/mock',
  })
  http.setHeader('Content-Type', 'application/x-www-form-urlencoded', ['post'])

  // 请求回调
  http.onRequest((config) => {
    const { baseURL, url, params, data, method } = config
    if (config.method == 'post') {
      // config. "Content-Type", "application/json")
      config.data = qs.stringify(data)
    }
    // if (!config.headers.Authorization) {
    //   config.headers.token = `${window.localStorage.getItem("token") || ''}`
    // }
    return config
  })

  // 返回回调
  http.onResponse((response) => {
    const { config, data, headers } = response
    // const { code, msg } = data
    if (data.code != '00') {
      return Promise.reject(response)
    }
    return data
  })

  // 错误回调
  http.onError((error) => {
    const { data } = error;
    if(data) {
      Message({
        message: data,
        type: 'error'
      })
      return Promise.reject(data);
    }

    const code = parseInt(error.response && error.response.status)
    if (ERRORS.has(code)) {
      console.log('请求失败-' + ERRORS.get(code))
    } else {
      console.log(error)
    }
    return Promise.reject(error.response)
  })

  // Inject to context as $api
  inject('api', http)
}

// plugins: [ '@/plugins/axios' ] write code for nuxt.config.js
