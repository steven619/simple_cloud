import faker from 'faker'
import { Response, Request } from 'express'
import { articleList as cutterCategoryList } from './cutter_category'
import { genTask } from '../schedule_management/task'
var fakerZh = require('faker-zh-cn')

const articleList: any[] = []
const articleCount = 100

export const mtData = { 'cnc_alarm': { 'ts': 1594614332141, 'value': [{ 'alarm_msg': '', 'alarm_no': 8081, 'alarm_type': '' }, { 'alarm_msg': '', 'alarm_no': 8081, 'alarm_type': '' }] }, 'cnc_cycletime': { 'ts': 1594614332163, 'value': 6522.128 }, 'cnc_emer': { 'ts': 1594614332150, 'value': 0 }, 'cnc_id': { 'ts': 1594614332134, 'value': 'SPG2012080300764' }, 'cnc_ip': { 'ts': 1594614332157, 'value': '192.168.100.102' }, 'cnc_mainproname': { 'ts': 1594614332155, 'value': '/_N_SPF_DIR/_N_MAINK1_SPF' }, 'cnc_mode': { 'ts': 1594614332143, 'value': 3 }, 'cnc_products': { 'ts': 1594614332159, 'value': { 'chazhi': 0, 'dangqian_cnc_products': 24385, 'shangci_cnc_products': 24385 } }, 'cnc_remtime': { 'ts': 1594614332165, 'value': 0.0 }, 'cnc_respos': { 'ts': 1594614332147, 'value': [{ 'axis': 'X', 'value': 0.0 }, { 'axis': 'Y', 'value': 0.0 }, { 'axis': 'Z', 'value': 0.0 }, { 'axis': 'W1', 'value': 0.453 }, { 'axis': 'W2', 'value': -2.673 }] }, 'cnc_runstatus': { 'ts': 1594614332149, 'value': 3 }, 'cnc_softver_version': { 'ts': 1594614332155, 'value': 'Numeric ContSI83.03' }, 'cnc_toolnum': { 'ts': 1594614332153, 'value': '' }, 'cnc_type': { 'ts': 1594614332157, 'value': '730-31A10C' } }

for (let i = 1; i < articleCount; i++) {
  let index = Math.floor((Math.random() * cutterCategoryList.length))
  let alarm:any = []
  for(let i = 1; i < index%10; i++){
    alarm.push({
      code: 'W' + faker.random.number({min: 1000, max: 8000}),
      message: faker.company.companySuffix()
    })
  }
  articleList.push({
    id: i,
    name: fakerZh.Name.firstName(),
    no: 'NO' + faker.random.number({ min: 10000, max: 19999 }),
    machine_tool_category: faker.random.number({ min: 1, max: 11 }),
    machine_tool_status: faker.random.number({ min: 1, max: 3 }),
    phone: fakerZh.PhoneNumber.phoneNumber(),
    checklist: fakerZh.Name.firstName(),
    model: 'NO' + faker.random.number({ min: 10000, max: 19999 }),
    operator: fakerZh.Name.firstName(),
    current_task: genTask(i),
    cutter: [
      { name: fakerZh.Name.firstName(), cutter_category: cutterCategoryList[index], id: i },
      { name: fakerZh.Name.firstName(), cutter_category: cutterCategoryList[index], id: i },
      { name: fakerZh.Name.firstName(), cutter_category: cutterCategoryList[index], id: i },
      { name: fakerZh.Name.firstName(), cutter_category: cutterCategoryList[index], id: i }
    ],
    alarm: alarm
  })
}

export const getOperatorList = (req: Request, res: Response) => {
  const { keywords, page = 1, limit = 20 } = req.query

  let mockList = articleList.filter(item => {
    if (keywords && item.name.indexOf(keywords) < 0) return false
    return true
  })

  const pageList = mockList.filter((_, index) => index < + limit *  + page && index >= + limit * ( + page - 1))
  return res.json(
    {
      'code': 200,
      'message': 'OK',
      'count': mockList.length,
      'start': 0,
      'limit': 10,
      'previous': '',
      'extra_data': null,
      'data': pageList
    }
  )
}

export const getOperator = (req: Request, res: Response) => {
  const { id } = req.params
  for (const article of articleList) {
    if (article.id.toString() === id) {
      return res.json({
        code: 200,
        data: article
      })
    }
  }
  return res.json({
    code: 404,
    data: {
    }
  })
}

export const createOperator = (req: Request, res: Response) => {
  const { article } = req.body
  return res.json({
    code: 200,
    data: {
      article
    }
  })
}

export const updateOperator = (req: Request, res: Response) => {
  const { id } = req.params
  const { article } = req.body
  for (const v of articleList) {
    if (v.id.toString() === id) {
      return res.json({
        code: 200,
        data: article
      })
    }
  }
  return res.json({
    code: 404,
    message: '信息不存在'
  })
}

export const deleteOperator = (req: Request, res: Response) => {
  return res.json({
    code: 200
  })
}
