import { baseURL, baseDict } from './config'
import service from "@/service";
import http from "@/utils/http";

const TOKEN = 'TOKEN';

export default  class Base {
  url: string | undefined
  baseUrl:string = baseURL
  baseDict:any = baseDict

  constructor(url: string) {
    if(url){
      this.url = url
    }
  }

  public secondsToDhms(seconds:number) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + "天" : "";
    var hDisplay = h > 0 ? h + "时" : "";
    var mDisplay = m > 0 ? m + "分" : "";
    var sDisplay = s > 0 ? s + "秒" : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }

  public secondsTohm(seconds:number) {
    seconds = Number(seconds);
    var h = Math.floor(seconds % (3600*24) / 60);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    var hDisplay = h > 0 ? h + "时" : "";
    var mDisplay = m > 0 ? m + "分" : "";
    var sDisplay = s > 0 ? s + "秒" : "";
    // return hDisplay + mDisplay
    return mDisplay + sDisplay
  }


  public login(data:{phone:string,smscode:string}){
    return http({
      url: `${this.url}/user/login`,
      method: 'post',
      data
    })
  }

  public loginUsername(data:{username:string,password:string}){
    return http({
      url: `${this.url}/user/login`,
      method: 'post',
      data
    })
  }

  public smsCode(params:{type:string,phone?:string}){
    return http({
      url: `${this.url}/tools/sms`,
      method: 'get',
      params
    })
  }


  public getUserInfo(params?:any){
    return http({
      url: `${this.url}/user/info`,
      method: 'get',
      params
    })
  }

  public patchUserInfo(data:any){
    return http({
      url: `${this.url}/user/info/`,
      method: 'PUT',
      data
    })
  }

  public getDictValue(obj:any,is:any, value:any):any {
    if (typeof is == 'string')
      return this.getDictValue(obj,is.split('.'), value);
    else if (is.length==1 && value!==undefined)
      return obj[is[0]] = value;
    else if (is.length==0)
      return obj;
    else if (obj[is[0]])
      return this.getDictValue(obj[is[0]],is.slice(1), value);
    else
      return ''
  }

  public getParameterByName(name:string, url:string) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  public callPhone(phone:string){
    uni.showModal({
      title: '提示',
      content: `确定要拨打${phone}号码吗?`,
      success: (res)=> {
        if (res.confirm) {
          console.log('用户点击确定');
          uni.makePhoneCall({
            phoneNumber: phone
          });
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
  }

  public viewImage(url:string) {
    url = this.getBaseUrl(url)
    uni.previewImage({
      urls: [url],
      current: url
    });
  }

  public getToken() {
    let ret = '';
    ret = uni.getStorageSync(TOKEN);
    if (!ret) {
      ret = '';
    }
    return ret;
  }

  public setToken(token:string) {
    uni.setStorageSync(TOKEN, token);
  }


  public uploadFile(path:string){
    return new Promise((resolve, reject)=> {
      uni.uploadFile({
        url: `${this.baseUrl}/api/v1/driver/tools/upload/`,
        filePath: path,
        name: 'file',
        header:{jwt:service.getToken()},
        formData: {
          'user': 'test'
        },
        success: (uploadFileRes) => {
          resolve(uploadFileRes.data)
        }
      });
    });
  }

  public getBaseUrl(url:string):string{
    if(!url)return '/static/logo.png'
    if(url.startsWith('http'))return url
    return `${this.baseUrl}${url}`
  }

  public getImgUrl(url:string):string{
    if(!url)return 'https://cdn.woody.vip/img/logo.png'
    if(url.startsWith('http'))return url
    return `${this.baseUrl}${url}`
  }

  public getImgUrlList(url:string){
    if(!url)return []
    if(url.startsWith('http'))return [url]
    return [`${this.url}${url}`]
  }

  public getBigDictName(key:string, id:number) {
    if(typeof id === "string"){
      return id
    }
      let q:any[] = baseDict[key].filter((e:any)=>{return e.id === id || e.value === id})
      if(q.length>0){
        return q[0].title
      }else {
        return ''
      }
  }


  public validatorForm(formData:any, validatorRule:any):boolean{
    let flag:boolean = true
    Object.keys(formData).forEach((k:string)=>{
      if(flag && validatorRule[k]){
        console.log(formData[k], !formData[k], k)
        if(validatorRule[k].required && !formData[k]){
          uni.showToast({
            icon: 'none',
            title: `${validatorRule[k].name}填写不正确`,
            duration: 2000
          });
          flag = false
        }
        if(validatorRule[k].reg && !validatorRule[k].reg.test(formData[k])){
          uni.showToast({
            icon: 'none',
            title: `${validatorRule[k].name}不符合要求`,
            duration: 2000
          });
          flag = false
        }
      }
    })
    return flag
  }

  public commonRequest(url:string,op:string = 'GET',query?:Object,data?:Object){
    return http({
      url: `${this.url}${url}`,
      method: op,
      params: query,
      data: data
    })
  }


  public getConfigByKey(key:string){
    return http({
      url: `${this.url}/system/config_by_key?key=${key}`,
      method: 'get'
    })
  }

  colorList = [
    {
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    },
  ]
}
