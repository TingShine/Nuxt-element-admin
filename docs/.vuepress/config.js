module.exports = {
  title: 'Nuxt-element-admin',
  description: '基于nuxt的后台管理系统',
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
