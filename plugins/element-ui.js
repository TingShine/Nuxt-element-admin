import Vue from 'vue'
import Element from 'element-ui'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale, // 或者用 Object.assign({ message: 'hello' }, enLocale)
  },
  zn: {
    ...zhLocale, // 或者用 Object.assign({ message: '你好' }, zhLocale)
  },
}

export default ({ store }) => {
  // Create VueI18n instance with options
  const i18n = new VueI18n({
    locale: store.state.locale, // set locale
    messages, // set locale messages
  })

  Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value),
  })
}
