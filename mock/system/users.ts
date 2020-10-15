import faker from 'faker'
import { Response, Request } from 'express'

const userList: any[] = [
  {
    id: 0,
    username: 'admin',
    password: 'any',
    name: 'Super Admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: 'I am a super administrator',
    email: 'admin@test.com',
    phone: '1234567890',
    roles: ['admin']
  },
  {
    id: 1,
    username: 'editor',
    password: 'any',
    name: 'Normal Editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: 'I am an editor',
    email: 'editor@test.com',
    phone: '1234567890',
    roles: ['editor']
  }
]
const userCount = 100

for (let i = 2; i < userCount; i++) {
  userList.push({
    id: i,
    username: 'user_' + faker.random.alphaNumeric(9),
    password: faker.random.alphaNumeric(20),
    name: faker.name.findName(),
    avatar: faker.image.imageUrl(),
    introduction: faker.lorem.sentence(20),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    roles: ['visitor']
  })
}

export const register = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}

export const postLogin = (req: Request, res: Response) => {
  const { username } = req.body
  for (const user of userList) {
    if (user.username === username) {
      return res.json({
        code: 200,
        data: {
          token: username + '-token'
        }
      })
    }
  }
  return res.status(200).json({ 'code': 498, 'message': '\u7528\u6237\u540d\u5bc6\u7801\u9519\u8bef', 'data': null, 'extra_data': null })
}

export const getDictionay = (req: Request, res: Response) => {
  return res.json({
    'code': 200,
    'message': 'OK',
    'data': {
      'valuetype': [
        {
          'value': 1,
          'title': '整型(16)',
          'code': null
        },
        {
          'value': 4,
          'title': '整型(32)',
          'code': null
        },
        {
          'value': 5,
          'title': '整型(64)',
          'code': null
        },
        {
          'value': 2,
          'title': '浮点',
          'code': null
        },
        {
          'value': 3,
          'title': '布尔',
          'code': null
        },
        {
          'value': 7,
          'title': '字符串',
          'code': null
        },
        {
          'value': 6,
          'title': '实数',
          'code': null
        }
      ],
      'rangetype': [
        {
          'value': 1,
          'title': '百分比',
          'code': null
        },
        {
          'value': 2,
          'title': '绝对值',
          'code': null
        }
      ],
      'limittype': [
        {
          'value': 1,
          'title': '时间限制',
          'code': null
        },
        {
          'value': 2,
          'title': '区间限制',
          'code': null
        }
      ],
      'ipusercategory': [
        {
          'value': 1,
          'title': '网关',
          'code': null
        },
        {
          'value': 2,
          'title': '用户',
          'code': null
        },
        {
          'value': 3,
          'title': '机床',
          'code': null
        }
      ],
      'logaction': [
        {
          'value': 1,
          'title': '增加',
          'code': null
        },
        {
          'value': 2,
          'title': '删除',
          'code': null
        },
        {
          'value': 3,
          'title': '修改',
          'code': null
        }
      ],

      'cutterstatus': [
        {
          'value': 1,
          'title': '闲置',
          'code': null
        },
        {
          'value': 2,
          'title': '使用中',
          'code': null
        }
      ],
      'machinetoolstatus': [
        {
          'value': 1,
          'title': '正常',
          'code': 'fanuc'
        },
        {
          'value': 2,
          'title': '预警',
          'code': 'fanuc'
        },
        {
          'value': 3,
          'title': '待机',
          'code': 'fanuc'
        }
      ],
      'machinetoolcategory': [
        {
          'value': 1,
          'title': '法那科',
          'code': 'fanuc'
        },
        {
          'value': 2,
          'title': '三菱CNC',
          'code': 'mitsubishi'
        },
        {
          'value': 3,
          'title': '西门子CNC',
          'code': 'siemens_cnc'
        },
        {
          'value': 4,
          'title': '哈斯',
          'code': 'haas'
        },
        {
          'value': 5,
          'title': '凯恩帝',
          'code': 'knd'
        },
        {
          'value': 6,
          'title': '广数',
          'code': 'gsk'
        },
        {
          'value': 7,
          'title': '西铁城',
          'code': 'citizen'
        },
        {
          'value': 8,
          'title': '兄弟',
          'code': 'brother'
        },
        {
          'value': 9,
          'title': '海德汉',
          'code': 'heidenhain'
        },
        {
          'value': 10,
          'title': '马扎克',
          'code': 'mazak'
        },
        {
          'value': 11,
          'title': '新代',
          'code': 'syntec'
        }
      ]
    },
    'extra_data': null
  })
}

export const logout = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}

export const getUsers = (req: Request, res: Response) => {
  const { name } = req.query
  const users = userList.filter(user => {
    const lowerCaseName = user.name.toLowerCase()
    return !(name && lowerCaseName.indexOf((name as string).toLowerCase()) < 0)
  })
  return res.json({
    code: 20000,
    data: {
      items: users
    }
  })
}

export const getUserInfo = (req: Request, res: Response) => {
  // Mock data based on access token
  return res.json({ 'code': 200, 'message': 'OK', 'data': { 'username': 'admin', 'name': 'admin', 'phone': null, 'roles': ['\u7ba1\u7406\u5458'], 'email': null, 'avatar': null, 'custom': { 'id': 75, 'company_name': '\u897f\u95e8\u5b50PLC', 'name': '\u897f\u95e8\u5b50PLC', 'bank': null, 'uscc': null, 'bankno': null, 'area_id': 445, 'address': '.', 'contact': '.', 'phone': '.', 'parent': { 'id': null, 'name': null }, 'create_time': '2020-06-16 14:31:00' }, 'role_menu': [{ 'action': 31, 'menu': '/system' }, { 'action': 31, 'menu': '/system/admin_user' }, { 'action': 31, 'menu': '/device' }, { 'action': 31, 'menu': '/manager' }, { 'action': 31, 'menu': '/device/device' }, { 'action': 31, 'menu': '/device/machinetool' }, { 'action': 31, 'menu': '/manager/custom' }, { 'action': 31, 'menu': '/manager/goods' }, { 'action': 31, 'menu': '/system/debug_client' }] }, 'extra_data': null }
  )
}

export const getUserByName = (req: Request, res: Response) => {
  const { username } = req.params
  for (const user of userList) {
    if (user.username === username) {
      return res.json({
        code: 20000,
        data: {
          user
        }
      })
    }
  }
  return res.status(400).json({
    code: 50004,
    messaege: 'Invalid User'
  })
}

export const updateUser = (req: Request, res: Response) => {
  const { username } = req.params
  const { user } = req.body
  for (const v of userList) {
    if (v.username === username) {
      return res.json({
        code: 20000,
        data: {
          user
        }
      })
    }
  }
  return res.status(400).json({
    code: 50004,
    messaege: 'Invalid User'
  })
}

export const deleteUser = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}
