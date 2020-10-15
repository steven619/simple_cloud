import http from './http'
import Base from './base'

export default class General extends Base{
  constructor(){
    super('/api/v1')
  }

  Rad(d:number){
    return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
  }

  getDistance(lat1:number,lng1:number,lat2:number,lng2:number){
    var radLat1 = this.Rad(lat1);
    var radLat2 = this.Rad(lat2);
    var a = radLat1 - radLat2;
    var  b = this.Rad(lng1) - this.Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
        Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; //输出为公里
    //s=s.toFixed(4);
    return s;
  }

  // public login(data:{phone:string,smscode:string}){
  //   return http({
  //     url: `${this.url}/user/login/`,
  //     method: 'post',
  //     data
  //   })
  // }
  //
  // public logout(data?:{type?:string}){
  //   return http({
  //     url: `${this.url}/user/login`,
  //     method: 'delete',
  //     data
  //   })
  // }
  //
  // public smsCode(params:{type:string,phone?:string}){
  //   return http({
  //     url: `${this.url}/tools/sms/`,
  //     method: 'get',
  //     params
  //   })
  // }
  //
  // public getUserInfo(params?:any){
  //   return http({
  //     url: `${this.url}/user/info`,
  //     method: 'get',
  //     params
  //   })
  // }
  //
  // public patchUserInfo(data:any){
  //   return http({
  //     url: `${this.url}/user/info`,
  //     method: 'PUT',
  //     data
  //   })
  // }
  //
  //
  // public wxLogin(data:{code:string}){
  //   return http({
  //     url: `${this.url}/user/login`,
  //     method: 'post',
  //     data
  //   })
  // }
  //
  // public getCompanyInfo(id:string|number){
  //   return http({
  //     url: `${this.url}/company/${id}`,
  //     method: 'get'
  //   })
  // }
  //
  // public wxgetUserInfo(params?:any){
  //   return http({
  //     url: `${this.url}/user/info`,
  //     method: 'get',
  //     params
  //   })
  // }
  //
  //
  // public getCaptcha(){
  //   return http({
  //     url: `${this.url}/tools/captcha`,
  //     method: 'get'
  //   })
  // }
  //
  // public loginUsername(data:{username:string,password:string}){
  //   return http({
  //     url: `${this.url}/user/login`,
  //     method: 'post',
  //     data
  //   })
  // }
  //
  //
  // public wxpostUserInfo(data?:any){
  //   return http({
  //     url: `${this.url}/user/info`,
  //     method: 'post',
  //     data
  //   })
  // }


  public postLocation(data:any){
    return http({
      url: `${this.url}/position`,
      method: 'POST',
      data
    })
  }




}
