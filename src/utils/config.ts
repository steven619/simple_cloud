const baseURL = 'https://app.yangxu.woody.vip'
// const baseURL = 'http://127.0.0.1:9502'
const baseWsUrl = baseURL.replace('http','ws')
const baseDict:any = {
  device_state: [
    {name: 'Online', value: 0},
    {name: 'Offline', value: 1}
  ],
  valuetype: [
    {name: 'Int16', value: 1},
    {name: 'Float', value: 2},
    {name: 'Bool', value: 3},
    {name: 'Int32', value: 4},
    {name: 'Int64', value: 5},
    {name: 'Double', value: 6},
    {name: 'String', value: 7},
    {name: 'Int8', value: 8},
  ],
  fanuc: {
    cnc_mode:[
      {name: 'Mdi', value:0},
      {name: 'Memory', value:1},
      {name: 'None', value:2},
      {name: 'Edit', value:3},
      {name: 'Handle', value:4},
      {name: '内存模式中', value:8},
      {name: '纸带模式中', value:9},
      {name: '在线运行模式中', value:10},
      {name: 'MDI模式中', value:11},
      {name: 'Null2', value:12},
      {name: 'Null3', value:13},
      {name: '子系统控制I运行模式中', value:14},
      {name: 'Null4', value:15},
    ],
    cnc_runstatus: [
      {name: 'RESET', value:0},
      {name: 'STOP', value:1},
      {name: 'HOLD', value:2},
      {name: 'START', value:3},
      {name: 'Others', value:4},
    ],
    cnc_emer: [
      {name: '否', value:0},
      {name: '是', value:1},
    ]
  },
  siemens_cnc: {
    cnc_mode:[
      {name: 'JOG', value:0},
      {name: 'TEACHIN', value:1},
      {name: 'MDA', value:2},
      {name: 'AUTO', value:3},
      {name: 'REPOS', value:4},
      {name: 'REFPOINT', value:5},
      {name: 'VAR', value:6},
      {name: 'INC', value:7},
      {name: 'OTHER', value:8},
    ],
    cnc_runstatus: [
      {name: 'RESET', value:0},
      {name: 'STOP', value:1},
      {name: 'HOLD', value:2},
      {name: 'START', value:3},
      {name: 'SPENDLE_CW_CCW', value:4},
      {name: 'Others', value:5},
    ],
  },
    "ipusercategory": [
  {
    "value": 1,
    "title": "网关",
    "code": null
  },
  {
    "value": 2,
    "title": "用户",
    "code": null
  },
  {
    "value": 3,
    "title": "机床",
    "code": null
  }
],
    "logaction": [
  {
    "value": 1,
    "title": "增加",
    "code": null
  },
  {
    "value": 2,
    "title": "删除",
    "code": null
  },
  {
    "value": 3,
    "title": "修改",
    "code": null
  }
],
    "cutterstatus": [
  {
    "value": 1,
    "title": "闲置",
    "code": null
  },
  {
    "value": 2,
    "title": "使用中",
    "code": null
  }
],
    "machinetoolstatus": [
  {
    "value": 1,
    "title": "正常",
    "code": "fanuc"
  },
  {
    "value": 2,
    "title": "预警",
    "code": "fanuc"
  },
  {
    "value": 3,
    "title": "待机",
    "code": "fanuc"
  }
],
    "machinetoolcategory": [
  {
    "value": 1,
    "title": "法那科",
    "code": "fanuc"
  },
  {
    "value": 2,
    "title": "三菱CNC",
    "code": "mitsubishi"
  },
  {
    "value": 3,
    "title": "西门子CNC",
    "code": "siemens_cnc"
  },
  {
    "value": 4,
    "title": "哈斯",
    "code": "haas"
  },
  {
    "value": 5,
    "title": "凯恩帝",
    "code": "knd"
  },
  {
    "value": 6,
    "title": "广数",
    "code": "gsk"
  },
  {
    "value": 7,
    "title": "西铁城",
    "code": "citizen"
  },
  {
    "value": 8,
    "title": "兄弟",
    "code": "brother"
  },
  {
    "value": 9,
    "title": "海德汉",
    "code": "heidenhain"
  },
  {
    "value": 10,
    "title": "马扎克",
    "code": "mazak"
  },
  {
    "value": 11,
    "title": "新代",
    "code": "syntec"
  }
]

}

export { baseURL, baseDict, baseWsUrl }
