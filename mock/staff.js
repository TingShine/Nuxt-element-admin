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

router.post('/info', (req, res) => {
  res.json(Mock.mock({
    "code": "00",
    "msg": "成功访问",
    "data": {
      "recordCreatable": true,
      "user": {
        "accountNo": "123456",
        "userName": "",
        "sex": "",
        "status": "",
        "position": {
          "id": 1,
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
            "desc": "描述"
          }
        ]
      },
      "editable": false
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

module.exports = router
