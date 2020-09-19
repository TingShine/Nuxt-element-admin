var express = require('express')
var router = express.Router()
var Mock = require('mockjs')

router.post('/list', (req, res) => {
  const { page, pageSize } = req.body
  res.json(generateDataPage(page, pageSize))
})

router.post('/create', (req, res) => {
  res.json(Mock.mock({
    "code": "00",
    "msg": "成功访问",
    "data": {
      "accountNo|+1": 201910003
    }
  }))
})

router.post('/resetPassword', (req, res) => {
  const {password} = req.body;
  res.json({
    "code": "00",
    "msg": "成功访问",
    "data": {
      "password": password
    }
  })
})

router.post('/update', (req, res) => {
  res.json({
    "code": '00',
    "msg": "成功访问"
  })
})

router.post('/relation', (req, res) => {
  res.json(Mock.mock({
    "code": "00",
    "msg": "成功访问",
    "data": {
      "currentEmployee": {
        "accountNo": "123459",
        "userName": "赵六",
        "position": "护士长"
      },
      "superior|2": [
        {
          "accountNo|+1": [
            "123456",
            "123457"
          ],
          "userName|+1": [
            "张三",
            "李四"
          ],
          "position|+1": [
            "经理",
            "护士长"
          ]
        }
      ]
    }
  }))
})

router.post('/relation/subordinate', (req, res) => {
  const { page, pageSize } = req.body
  res.json(Mock.mock(generateDataPage2(page, pageSize)));
})

router.post('/relation/subordinate/:params', (req, res) => {
  const { params } = req.params;
  if(params == 'set' || params == 'release') {
    res.json({
      "code": "00",
      "msg": "成功访问"
    })
  }
})

router.post('/info', (req, res) => {
  res.json(Mock.mock({
    "code": "00",
    "msg": "成功访问",
    "data": {
      "recordCreatable": true,
      "user": {
        "accountNo": "123456",
        "userName": Mock.Random.cname(),
        "sex": "男",
        "status": "可用",
        "position": {
          "id": 5,
          "desc": "经理"
        },
        "sign": "1231231dsdaf",
        "contract": [
          {
            "recordId": "4e3399dc2207465db86b0f06b1bce1c0",
            "docId": "abcfsdf123",
            "docName": "初次表单2",
            "phase": "1",
            "recordStartDate": "2019-10-25",
            "recordEndDate": "2019-11-25",
            "desc": "描述1"
          },
          {
            "recordId": "4e3399dc2207465db86bds06b1bce1c0",
            "docId": "abcfsdf123",
            "docName": "初次表单3",
            "phase": "2",
            "recordStartDate": "2019-10-25",
            "recordEndDate": "2019-11-25",
            "desc": "描述2"
          }
        ]
      },
      "editable": true
    }
  }))
})

//生成限定第几页数据
const generateDataPage = (page = 1, pageSize = 10) => {
    const total = 923;
    const pageEnd =  Math.ceil(total / pageSize);
    page = page > pageEnd ? pageEnd : page;
    if(page == pageEnd) {
        pageSize = total - ( page - 1 ) * pageSize;
    }
  return Mock.mock({
    code: '00',
    msg: '成功访问',
    data: {
      [`list|${pageSize}`]: [
        {
          'accountNo|+1': 123456 + ( page - 1 ) * pageSize,
          'userName|+1': '@cname',
          'position|+1': ['经理', '护士长', '护士长', '护士长'],
          status: () => {
            return Mock.Random.boolean(9, 1, true) ? '可用' : '不可用'
          },
          'superior|+1': ['经理-张三', '经理-李四', '护士长-朱护士'],
          viewable: true,
          editable: true,
          subordinateEditable: true,
        },
      ],
      total: total,
      creatable: true,
    },
  })
}

//生成限定第几页数据(下属列表)
const generateDataPage2 = (page = 1, pageSize = 10) => {
  const total = 126;
  const pageEnd =  Math.ceil(total / pageSize);
  page = page > pageEnd ? pageEnd : page;
  if(page == pageEnd) {
      pageSize = total - ( page - 1 ) * pageSize;
  }
return Mock.mock({
  code: '00',
  msg: '成功访问',
  data: {
    [`subordinate|${pageSize}`]: [
      {
        'accountNo|+1': 201910002 + ( page - 1 ) * pageSize,
        'userName|+1': '@cname',
        'position|+1': ['经理', '护士长', '护士长', '护士长'],
        status: () => {
          return Mock.Random.boolean(9, 1, true) ? '可用' : '不可用'
        },
        "relation|+1": ["TA的下属", "无", "护士-朱护士"],
      },
    ],
    total: total,
  },
})
}

module.exports = router
