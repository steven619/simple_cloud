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
let temp = 1

export const getOperatorList = (req: Request, res: Response) => {
  const { keywords, page = 1, limit = 20 } = req.query

  let alarm:any[] = []
  for (let i =1; i < faker.random.number(7);i++){
    alarm.push({
      alarm_no: faker.random.number(1000),
      alarm_type: '设备告警',
      alarm_msg: faker.name.lastName()
    })
  }

  let mockList = [
      {
        "id": 107,
        "name": "cnc_type",
        "name_zh": "CNC型号",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": "FANUC 0i MF",
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 108,
        "name": "cnc_id",
        "name_zh": "CNC标识ID号",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": "--",
          "ts": "2020-05-28 13:03:56"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 109,
        "name": "cnc_ip",
        "name_zh": "CNC的IP地址",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": "fanuc.cnc.woody.vip",
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 112,
        "name": "cnc_mainproname",
        "name_zh": "执行的NC主程序号",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": "SAMPLE",
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 113,
        "name": "cnc_seq",
        "name_zh": "当前加工程序语句号",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": 0,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 114,
        "name": "cnc_currentpro",
        "name_zh": "当前加工程序内容",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": "G01 X2.810 Y10.902 Z-6.500 \nX0.986 Y3.951 \nG17G03X1.114Y11.822R63.3\nX-1.019Y11.313R63.3\nG01X-.97Y4.03\nX-.111Y.43\nY-.6\nY-.15Z1.277\nY-.751Z1.261\nY-.902Z1.003\nY-1.155Z.787\nY-2.357Z.809\nY-1.971Z.454\nY-4.437Z.473\nY-3.943Z.102\nY-4.436Z-.215\nY-3.451Z-.44\nY-2.957",
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 115,
        "name": "cnc_products",
        "name_zh": "加工零件数",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": 3005,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 116,
        "name": "cnc_mode",
        "name_zh": "当前所处操作模式",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": faker.random.number(7),
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 117,
        "name": "cnc_runstatus",
        "name_zh": "当前所处运行模式",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": 3,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 118,
        "name": "cnc_emer",
        "name_zh": "是否急停",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": 0,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 119,
        "name": "cnc_alarm",
        "name_zh": "当前报警",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": alarm,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 120,
        "name": "cnc_toolnum",
        "name_zh": "当前刀具号",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": 0,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 121,
        "name": "cnc_tooloffsetnum",
        "name_zh": "当前刀补编号",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": 0,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 122,
        "name": "cnc_srate",
        "name_zh": "主轴倍率",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": 50,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 123,
        "name": "cnc_rapidfeed",
        "name_zh": "快速移动倍率",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": 100,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 124,
        "name": "cnc_frate",
        "name_zh": "切削倍率",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": 1,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 125,
        "name": "cnc_setspeed",
        "name_zh": "主轴设定速度S",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": 0,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 126,
        "name": "cnc_actspeed",
        "name_zh": "主轴实际转速S",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": faker.random.number(1000),
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 127,
        "name": "cnc_setfspeed",
        "name_zh": "进给设定转速S",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": 4000,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 128,
        "name": "cnc_actfspeed",
        "name_zh": "进给实际转速S",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": faker.random.number(1000),
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 129,
        "name": "cnc_sload",
        "name_zh": "主轴负载",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": 0,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 130,
        "name": "cnc_fload",
        "name_zh": "进给轴负载",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": [
            {
              "axis": "X",
              "value": faker.random.number(100)
            },
            {
              "axis": "Y",
              "value": faker.random.number(100)
            },
            {
              "axis": "Z",
              "value": faker.random.number(100)
            }
          ],
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 131,
        "name": "cnc_alivetime",
        "name_zh": "开机时间",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": 2821680 + temp,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 132,
        "name": "cnc_runtime",
        "name_zh": "运行时间",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": 1486128 + temp,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 133,
        "name": "cnc_cuttime",
        "name_zh": "切削时间",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": 1470928 + temp,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 134,
        "name": "cnc_cycletime",
        "name_zh": "循环时间",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": 178538 + temp,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 135,
        "name": "cnc_stemper",
        "name_zh": "主轴温度",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": 0,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 136,
        "name": "cnc_ftemper",
        "name_zh": "伺服温度",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": [
            {
              "axis": "X",
              "value": faker.random.number(100)
            },
            {
              "axis": "Y",
              "value": faker.random.number(100)
            },
            {
              "axis": "Z",
              "value": faker.random.number(100)
            }
          ],
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 137,
        "name": "cnc_gcode",
        "name_zh": "G代码",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": `/G${faker.random.number(100)}/G91/G22/G${faker.random.number(100)}/G21/G${faker.random.number(100)}/G49/G80/G${faker.random.number(100)}/G50/G${faker.random.number(100)}/G97/G${faker.random.number(100)}/G64/G69/G15/G40.1/G${faker.random.number(100)}/G160/G13.1/G50.1/G54.2/G80.5/`,
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 138,
        "name": "cnc_mecpos",
        "name_zh": "机械坐标",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": [
            {
              "axis": "X",
              "value": faker.random.number(100000)/1000
            },
            {
              "axis": "Y",
              "value": faker.random.number(100000)/1000
            },
            {
              "axis": "Z",
              "value": faker.random.number(100000)/1000
            }
          ],
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 139,
        "name": "cnc_relpos",
        "name_zh": "相对坐标",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": [
            {
              "axis": "X",
              "value": faker.random.number(100000)/1000
            },
            {
              "axis": "Y",
              "value": faker.random.number(100000)/1000
            },
            {
              "axis": "Z",
              "value": faker.random.number(100000)/1000
            }
          ],
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 140,
        "name": "cnc_ablpos",
        "name_zh": "绝对坐标",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": [
            {
              "axis": "X",
              "value": faker.random.number(100000)/1000
            },
            {
              "axis": "Y",
              "value": faker.random.number(100000)/1000
            },
            {
              "axis": "Z",
              "value": faker.random.number(100000)/1000
            }
          ],
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      },
      {
        "id": 141,
        "name": "cnc_respos",
        "name_zh": "剩余坐标",
        "unit": "",
        "rate": 1,
        "value_type": 1,
        "readable": true,
        "writeable": false,
        "function_code": null,
        "address": null,
        "sub_address": null,
        "category": null,
        "interval": null,
        "description": null,
        "create_time": "2019-12-30 10:27:09",
        "compute_rule": null,
        "variable_type": 1,
        "alarm": false,
        "switch": null,
        "last_value": {
          "value": [
            {
              "axis": "X",
              "value": faker.random.number(100000)/1000
            },
            {
              "axis": "Y",
              "value": faker.random.number(100000)/1000
            },
            {
              "axis": "Z",
              "value": faker.random.number(100000)/1000
            }
          ],
          "ts": "2020-09-02 14:32:00"
        },
        "device": {
          "name": "d003",
          "id": "3",
          "type": "fanuc",
          "model": "all"
        },
        "gateway": {
          "id": 1,
          "name": "巫迪001"
        }
      }
    ]

  let extra_data = {
      "id": 3,
      "name": "d003",
      "latitude": null,
      "longitude": null,
      "area": 587,
      "address": "d003",
      "description": null,
      "department": {
        "id": 1,
        "name": "总车间"
      },
      "create_time": "2019-12-30 11:36:08",
      "today_products": 2,
      "week_products": 8,
      "status": "运行",
      "screen_template": null
    }
  temp+=1

  const pageList = mockList.filter((_, index) => index < + limit *  + page && index >= + limit * ( + page - 1))
  return res.json(
    {
      'code': 200,
      'message': 'OK',
      'count': mockList.length,
      'start': 0,
      'limit': 10,
      'previous': '',
      'extra_data': extra_data,
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
