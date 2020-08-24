# mynuxt

* 本系统是一个通用的企业后台管理系统，拥有登陆、职工管理、客户管理和职工创建等功能，有较为美观的界面设计，系统基于Nuxt.js和element-UI实现，Nuxt.js是基于Vue的SSR框架，运行在服务端，能有较快的首屏速度和SEO优势。

* A admin-back framwork based on Nuxtjs 

## Features

系统的特色点和优势主要有以下几个部分：
* 自动生成的路由配置
* 自响应的布局
* 支持i18n中英切换（部分场景自行适配）
* 自动生成的面包屑页头（利用nuxt的中间件实现）
* mock模拟后台接口

## How to deploy in your server
使用`npm run build`构建.nuxt目录，然后将.nuxt、/static和package.json打包到服务器的某个目录下面，运行`npm install`下载依赖，然后使用pm2部署该系统

> Upload .nuxt and /static directory and package.json to your server  
(You can run `npm run build` and then get .nuxt directory)

```bash
# install dependencies
$ npm install

# start your website
$ pm2 start npm --name "ProjectName" -- run start
```

## System Snapshots
![image](https://github.com/VeryHandSomeBoy/Nuxt-element-admin/blob/master/static/StaffMange.png)

![image](https://github.com/VeryHandSomeBoy/Nuxt-element-admin/blob/master/static/StaffCreate.png)

## Build Setup

```bash
# install dependencies
$ npm install

# 开发时使用该命令行可实现热编译，默认3000端口
# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# 生成静态页面
# generate static project
$ npm run generate

# 进入mock目录并启动index.js搭建后台接口服务器
# mock at http://localhost:8090
$ cd mock
$ npm install
$ node index.js    # Maybe you can use PM2 or nodemon
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Donation
如果您觉得本项目对您有帮助，可以请作者喝一杯咖啡, 让开源走的更远，感谢支持。

![image](https://github.com/VeryHandSomeBoy/Nuxt-element-admin/blob/master/static/wechat.png)

![image](https://github.com/VeryHandSomeBoy/Nuxt-element-admin/blob/master/static/alipay.png)

## Mozilla Public License
MIT