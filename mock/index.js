let express = require('express');    //引入express模块
let mork = require('./mock')
let app = express();                //实例化express
let bodyParser = require('body-parser')

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

app.use('/mock', mork);

/**
 * 监听8090端口
 */
const port = "8090"
app.listen(port, () => {
    console.log(`Server has been started at http://127.0.0.1:${port}/mock`);
})