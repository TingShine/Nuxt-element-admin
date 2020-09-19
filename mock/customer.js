var express = require('express')
var router = express.Router()
var Mock = require('mockjs')
let Random = Mock.Random

router.post('/list', (req, res) => {
    const { page, pageSize } = req.body
    res.json(generateDataPage(page, pageSize))
  })

router.all('/record/:id', (req, res) => {
  const {id} = req.params;
  console.log(id);
  res.download(__dirname + '/readme.doc')
})

router.post('/create', (req, res) => {
  res.json(Mock.mock({
    "data": {
      "accountNo|+1": 201920001
    },
    "code": "00",
    "msg": "成功访问"
  }))
})

router.post('/info', (req, res) => {
  res.json(Mock.mock({
    "code": "00",
    "msg": "成功访问",
    "data": {
      "user": {
        "accountNo|+1": 201920001,
        "userName": "李九三",
        "sex": "男",
        "idNo": "123467777776",
        "birthDay": "1995-02-28",
        "mobile": "18812341235",
        "city": [
          "广东省", "广州市", "天河区"
        ],
        "address": "什么街道",
        "area": {
          "id": 1,
          "desc": "天河南"
        },
        "signStatus": "未签约",
        "signTime": "PT10H",
        "img": "123123123",
        "hospitalizedId": "sdada",
        "diagnosis": "dsadas",
        "age": 18,
        "nurseStartTime": "12:00",
        "nurseEndTime": "20:00"
      },
      "editable": () => {
        return Mock.Random.boolean(8, 2, true);
      }
    }
  }))
})

router.post('/relation', (req, res) => {
  res.json(Mock.mock({
    "code": "00",
    "msg": "成功访问",
    "data": {
      "currentCustomer": {
        "accountNo": "201920001",
        "userName": "李九",
        "idNo": "123467777777"
      },
      "nurse|3": [
        {
          "accountNo|+1": [
            "201910004",
            "201910003",
            "201910002"
          ],
          "userName|+1": [
            "王五",
            "李四",
            "张三"
          ],
          "position|+1": [
            "护理员",
            "护理员",
            "护理员"
          ]
        }
      ]
    }
  }))
})

router.post('/relation/nurse/update', (req, res) => {
  res.json({
    code: '00',
    msg: '成功访问'
  })
})

router.post('/relation/nurse', (req, res) => {
  const { page, pageSize } = req.body;
  res.json(generateDataPage3(page, pageSize))
})

  const generateDataPage3 = (page = 1, pageSize = 5) => {
    const total = 56;
      const pageEnd =  Math.ceil(total / pageSize);
      page = page > pageEnd ? pageEnd : page;
      if(page == pageEnd) {
          pageSize = total - ( page - 1 ) * pageSize;
      }
      return Mock.mock({
        code: '00',
        msg: '成功访问',
        data: {
          [`nurse|${pageSize}`]: [
            {
              "accountNo|+1": 201910003,
              "userName|+1": '@cname',
              "status": () => {
                return Mock.Random.boolean(7, 3, true) ? '可用' : '不可用'
              }
            }
            ],
          total: total,
        },
      })
  }

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
              "accountNo|+1": 
                123456789 + ( page - 1 ) * pageSize,
              "userName|+1": "@cname",
              "sex": () => {
                  return Random.boolean(5, 5, true) ? "男" : "女"
              },
              "signStatus|1": [
                "已签约-10h",
                "已签约-24h",
                "已签约-6h"
              ],
              "area|+1": [
                "天河北",
                "天河南"
              ],
              "nurse|+1": [
                "经理-张三",
                "未分配",
                "护士-朱护士"
              ],
              "viewable": true,
              "editable": true,
              "nurseEditable": true
            }
          ],
        total: total,
        creatable: true,
      },
    })
  }

module.exports = router