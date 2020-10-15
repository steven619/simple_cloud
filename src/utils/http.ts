// @ts-ignore
import axios from '@/common/request'
// @ts-ignore
import service from '../service'
import { baseURL } from './config'
import store from '../store'
/**
 * 请求接口日志记录
 */
function _reqlog(req:any) {
    if (process.env.NODE_ENV === 'development') {
        console.log("请求地址：" + req.url, req.data || req.params)
    }
    //TODO 调接口异步写入日志数据库
}

/**
 * 响应接口日志记录
 */
function _reslog(res:any) {
    if (process.env.NODE_ENV === 'development') {
        // console.log(`${res.config.url}响应结果：`, res)
    }
}

// 创建自定义接口服务实例
const http = axios.create({
    baseURL: baseURL,
    timeout: 6000,  // 不可超过 manifest.json 中配置 networkTimeout的超时时间
    // #ifdef H5
    withCredentials: true,
    // #endif
    headers: {
        'Content-Type': 'application/json'
    },
})

// 拦截器 在请求之前拦截
http.interceptors.request.use((config:any) => {
  if(!config.url.startsWith('http')){
    config.url = config.baseURL + config.url
  }
    // code...
    // 获取本地存储的Cookie
    // const cookie = uni.getStorageSync('cookie')
    // 设置Cookie
    config.headers.jwt = service.getToken()
    _reqlog(config)
  config.data && Object.keys(config.data).forEach((k:string)=>{
      if(config.data[k] === null || config.data[k] === undefined){
        delete config.data[k]
      }
    })
    return config
})

// 拦截器 在请求之后拦截
http.interceptors.response.use((response:any) => {
    _reslog(response)
    if(response.data && response.data.code >=400 ){
        uni.showToast({
            icon: 'none',
            title: response.data.message
        });
        let code = response.data.code
        if(code === 401){
          uni.reLaunch({
              url: '../login/login',
          });
        } else if(code === 497){
          uni.navigateTo({
            url: `../index/index?page=personal-center&code=${code}&msg=${response.data.message}`
          });
      }
        return Promise.reject(code)
    }
    return response.data
}, (error:any) => {
    uni.showToast({
        icon: 'none',
        title: `系统繁忙:${error.message}`
    });
    return Promise.reject(error.message)
})

export default http
