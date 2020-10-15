import faker from 'faker'
import { Response, Request } from 'express'
var fakerZh = require('faker-zh-cn')

const articleList: any[] = []
const articleCount = 100

for (let i = 1; i < articleCount; i++) {
  articleList.push({
    custom: fakerZh.Name.findName() + '科技有限公司',
    ip: fakerZh.Internet.ip(),
    user: fakerZh.Name.findName(),
    create_time: faker.date.past()
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
