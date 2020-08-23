# mynuxt

* A admin-back framwork based on Nuxtjs *

## How to deploy in your server
> Upload .nuxt directory to your server after runing `npm run build`, and then `pm2 start npm --name "ProjectName" -- run start`

## System Snapshots
![image](https://raw.githubusercontent.com/VeryHandSomeBoy/mynuxt/master/static/StaffMange.png?token=AGUDWXO6ALKPQPW2BXPHYAK7IEMN6)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# mock at http://localhost:8090
$ cd mock
$ npm install
$ node index.js    # Maybe you can use PM2 or nodemon
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
