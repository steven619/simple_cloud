import faker from 'faker'
import { Response, Request } from 'express'
var fakerZh = require('faker-zh-cn')

const articleList: any[] = []
const articleCount = 100
export const genTask = (i:number) => {
  let mt = fakerZh.Name.firstName()
  let wp = faker.name.lastName()
  return {
    id: i,
    name: `[${mt}]生产[${wp}]的任务`,
    machine_tool: { name: mt,
      id: i,
      no: 'NO' + faker.random.number({ min: 10000, max: 19999 }) },
    workpiece: { name: wp, id: i },
    task_number: faker.random.number({ max: 500, min: 320 }),
    amount_completed: faker.random.number({ max: 100, min: 300 }),
    create_time: faker.date.past(),
    task: [
      { operator: { name: fakerZh.Name.findName(), id: i }, count: faker.random.number({ max: 50, min: 100 }) },
      { operator: { name: fakerZh.Name.findName(), id: i }, count: faker.random.number({ max: 40, min: 100 }) },
      { operator: { name: fakerZh.Name.findName(), id: i }, count: faker.random.number({ max: 60, min: 100 }) }
    ]
  }
}

for (let i = 1; i < articleCount; i++) {
  articleList.push(genTask(i))
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
