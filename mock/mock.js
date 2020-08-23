var express = require('express')
var router = express.Router()
let Mock = require('mockjs')
let Random = Mock.Random
let static = require('./static')
let staff = require('./staff')
let customer = require('./customer')

// 路由
router.use('/static', static)
router.use('/manage/employee', staff)
router.use('/manage/customer', customer)

router.post('/login', (req, res) => {
    res.send({
        "code": "00",
        "data": {
          "token": "ASD2F1S2DFA1A3D2",
          "type": "employee",
          "recordCreatable": false,
          "customerCreatable": false
        },
        "msg": "成功"
      })
}) 

router.all('/personal', (req, res) => {
    res.json(Mock.mock({
        "code": "00",
        "data": {
            "accountNo": "@string('number', 9)",
            "userName": "@cname",
            "sex": () => {
                return Random.boolean() ? '男' : '女'
            }
        }
    }))
})



module.exports = router