import breadcrumbDatas from '@/locales/breadcrumb'

export default () => ({
  locales: ['en', 'zn'],
  locale: 'zn',
  info: {
    accountNo: "",
    userName: "",
    position: "",
    sex: "男",
  },
  breadcrumbData: breadcrumbDatas,   // 面包屑数据
  breadcrums: []  // 当前面包屑页头数据
})
