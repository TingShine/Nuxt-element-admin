# 介绍
[Nuxt-element-admin](https://github.com/VeryHandSomeBoy/Nuxt-element-admin)是一个通用的企业后台管理系统，拥有登陆、职工管理、客户管理和职工创建等功能，有较为美观的界面设计，系统基于[Nuxt.js](https://www.nuxtjs.cn/)和[element-UI](https://element.eleme.cn/#/zh-CN)实现，Nuxt.js是基于Vue的SSR框架，运行在服务端，能有较快的首屏速度和SEO优势。

## 目录
```md
|- assets    # 资源文件，通常放js,css等
|- components    # 组件
|- layouts   # 布局，UI框架
|- locales   # 存放国际化插件所需的信息，中英切换
|- middleware    # 中间件，在组件切换或路由变化时会自动调用
|- mock  # 后台模拟接口
|- pages # 所有页面都在此目录
|- plugins   # 定义插件，需在nuxt.config.js引入
|- server    # 服务端
|- static    # 静态文件，此文件夹不会被编译
|- store     # vuex使用
|- nuxt.config.js    # 系统配置文件
```

## 开发部署
- 开发模式下：
```bash
# 下载依赖
$ npm install

# 开发模式，默认监听3000端口
$ npm run dev

# Mock数据
$ cd mock
$ npm install
$ node index.js  # 建议使用nodemon
```
- 部署：
```bash
# 打包生成.nuxt目录
$ npm run build

# 上传.nuxt, package.json和static目录到服务器新建到目录下(如果要mock数据将mock目录一起上传)
$ npm install
$ pm2 start npm --name "ProjectName" -- run start
```

## 展示
1. 登陆界面
<img :src="$withBase('/particles.png')" alt="login">

2. 职工查询
<img :src="$withBase('/StaffMange.png')" alt="StaffManage">

3. 职工创建
<img :src="$withBase('/StaffCreate.png')" alt="SyaffCreate">


## 特色
系统主要有以下几个功能特色：
- [支持中英无缝切换](./#支持中英文无缝切换)
- [粒子特效](./#粒子特效)
- [面包屑页头](./#面包屑页头)
- [mock模拟数据](./#mock数据)

另外还有登陆、封装组件、列表查询、分页、条件搜索、职工创建等功能可作参考

### 支持中英文无缝切换
在`plugins/i18n.js`配置后，在`nuxt.config.js`的plugins中添加插件
``` js
import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.locale,     // 使用vuex管理当前语言
    fallbackLocale: 'en',
    messages: {
      'en': require('~/locales/en.json'),   // 引入外部json英文文件
      'zn': require('~/locales/zn.json')    // 引入外部json中文文件
    }
  });
  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`;
    }
    return `/${app.i18n.locale}/${link}`;
  }
}
```
中英文json语料在`locales`的en.json和zn.json中，以下为样例：
```json
// English
{
    "login": {
        "title": "Admin System"
    }
}

// Chinese
{
    "login": {
        "title": "后台管理系统"
    }
}
```
::: tip 使用
在vue中使用时，请使用`$t('login.title')`,当改变vuex中store.state.locale，该字段会自动切换对应当语言，而不会重载页面
:::

### 粒子特效

使用了vue-particle组件，使用`npm i -S vue-particle`下载依赖，并在`nuxt.config.js`中引入

<img :src="$withBase('/particles.png')" alt="particles">

::: warning 提醒
如果最后要生成静态页面，需要在`nuxt.config.js`引入vue-particle时ssr设置为false
使用的时候，需要在`<vue-particle />`外包裹`<no-ssr></no-ssr>`(在nuxt3之后将换成`<client-only></client-only>`)
:::

### 面包屑页头
<img :src="$withBase('/bread.png')" alt="breadcrumb">

middleware目录可以自定义各种中间件，在组件切换和路由变换时会自动调用，我们利用nuxt这个特性可实现获取当前路由，跟自定义的路由名称相匹配，形成路径列表，以下为`middleware/breadumb.js`中代码：
```js
export default (context) => {
    const { route, store } = context
    store.commit('setBreadcrumbNone');
    const { fullPath } = route;     // 获取当前的全路径
    let pathSplit = fullPath.split('/');
    pathSplit = pathSplit.splice(1)
    let pathMatched = []
    for(let i = 1; i <= pathSplit.length; i++) {
        pathMatched.push('/' + pathSplit.slice(0, i).join('/'))     
    }
    // 例pathMatched: ['/home', '/home/staff', '/home/staff/create']
    pathMatched.forEach(e => {
        store.commit('setBreadcrumbByPath', e)  // vuex执行setBreadcrumbByPath, 将当前路径添加到面包屑列表中
    })
}
```

### Mock数据
为了方便展示效果，采用了mockjs模块来生成数据，用express来作为后台框架，在此涉及到一点express知识，不影响理解

express框架的主进程`mock/index.js`,以下为代码：
```js
let express = require('express');    //引入express模块
let mork = require('./mock')
let app = express();                //实例化express
let bodyParser = require('body-parser')     // 获取post请求中的body

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// 解决跨域问题
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// 使用路由，所有带有前缀/mock的请求都会引导向定义的mork模块
app.use('/mock', mork);

/**
 * 监听8090端口，可自行修改端口，默认监听的ip为127.0.0.1
 */
const port = "8090" 
app.listen(port, () => {
    console.log(`Server has been started at http://127.0.0.1:${port}/mock`);
})
```

Mockjs示例代码如下，主要用于生成随机数据，具体请访问其[官网](http://mockjs.com/)
```js
// 请求/create接口时调用
router.post('/create', (req, res) => {
  res.json(Mock.mock({
    "code": "00",
    "msg": "成功访问",
    "data": {
      "accountNo|+1": 201910003     // 每次新增1
    }
  }))
})
```

## 开源协议

MIT License

Copyright (c) 2020 VeryHandSomeBoy

## 捐赠
如果你觉得代码对你有用的话，可以请作者喝杯卡布奇诺，谢谢～  
| <img :src="$withBase('/alipay.jpg')" alt="alipay"> | <img :src="$withBase('/wechat.jpg')" alt="wechat"> |
|:-|:-|