var express = require('express')
var router = express.Router()
var Mock = require('mockjs')
let Random = Mock.Random

router.post('/list', (req, res) => {
    const { page, pageSize } = req.body
    res.json(generateDataPage(page, pageSize))
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