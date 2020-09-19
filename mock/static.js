var express = require('express')
var router = express.Router()
var Mock = require('mockjs')

router.post('/area', (req, res) => {
  res.json(
    Mock.mock({
      code: '00',
      msg: '成功访问',
      data: {
        'areaList|2': [
          {
            'id|+1': 1,
            'desc|+1': ['天河南', '天河北'],
          },
        ],
      },
    })
  )
})

router.post('/position', (req, res) => {
  res.json(
    Mock.mock({
      code: '00',
      msg: '成功访问',
      data: {
        'positionList|3': [
          {
            'id|+1': 4,
            'desc|+1': ['经理', '护士长', '护士', '兼职护士'],
          },
        ],
      },
    })
  )
})

router.post('/img/upload', (req, res) => {
  res.json({
    "data": {
      "img": "123123123"
    },
    "code": "00",
    "msg": "成功访问"
  });
})

router.all('/img/:id', (req, res) => {
  res.send(Mock.Random.image('200x200', '#50B347', '#FFF', 'Mock.js'))
})

module.exports = router
