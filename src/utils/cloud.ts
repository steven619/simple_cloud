import http from './http'
import Base from './base'


export default class Cloud extends Base{
  constructor(){
    super('/api/v1')
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
  public getRuku(params:any){
    return http({
      url: `${this.url}/schedule_management/ruku`,
      method: 'get',
      params
    })
  }
  public getChuku(params:any){
    return http({
      url: `${this.url}/schedule_management/chuku`,
      method: 'get',
      params
    })
  }
  public getMingxi(params:any){
    return http({
      url: `${this.url}/schedule_management/mingxi`,
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
