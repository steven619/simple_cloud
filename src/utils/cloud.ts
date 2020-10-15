import http from './http'
import Base from './base'


export default class Cloud extends Base{
  constructor(){
    super('/api/v1')
  }

  public getTreeNode(params:any){
    return http({
      url: `${this.url}/organization/machine_tool`,
      method: 'get',
      params
    })
  }
  public getDevice(params:any){
    return http({
      url: `${this.url}/project/project`,
      method: 'get',
      params
    })
  }
  public getTask(params:any){
    return http({
      url: `${this.url}/schedule_management/task`,
      method: 'get',
      params
    })
  }
  public getCargo(params:any){
    return http({
      url: `${this.url}/schedule_management/cargo`,
      method: 'get',
      params
    })
  }
  public getVariable(params:any){
    return http({
      url: `${this.url}/schedule_management/variable`,
      method: 'get',
      params
    })
  }

}
