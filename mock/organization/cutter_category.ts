import faker from 'faker'
import { Response, Request } from 'express'
var fakerZh = require('faker-zh-cn')

export const articleList: any[] = [
  { name: '车刀', id: 1 },
  { name: '孔加工刀具', id: 2 },
  { name: '铣刀', id: 3 },
  { name: '拉刀', id: 4 },
  { name: '螺纹刀具', id: 5 },
  { name: '齿轮刀具', id: 6 },
  { name: '铰刀', id: 7 }
]
const articleCount = 100

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
