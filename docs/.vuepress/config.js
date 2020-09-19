module.exports = {
  title: 'Nuxt-element-admin',
  description: '基于nuxt的后台管理系统',
  base: '/Nuxt-element-admin/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: `/favicon.ico`,
      },
    ],
  ],
  ga: '',
  evergreen: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Github', link: 'https://github.com/VeryHandSomeBoy/Nuxt-element-admin' },
      { text: '国内文档', link: 'https://superting-shine.gitee.io/nuxt-element-admin/'},
    ],
    sidebarDepth: 2,
    sidebar: [
      {
        title: 'Guide',
        collapsable: false,
        children: ['/guide/'],
      },
    ],
  },
}
