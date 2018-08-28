'use strict'
// 本地环境
let serveUrl;

switch(process.env.BUILD_ENV){
    //sit
    case "sit":
        serveUrl = 'http://172.31.231.193'
        break
    
    //开发环境
    default:
        serveUrl = 'http://172.31.231.193'
}

// get请求配置
let getConfig = {
    url: '',
    baseURL: serveUrl,
    headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  paramsSerializer(params) {
    return Qs.stringify(params, {
      arrayFormat: 'brackets'
    })
  },
  timeout: 5000
}

// post请求配置
let postConfig = {
    url: '',
    baseURL: serveUrl,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    transformRequest: [function (data) {
      return JSON.stringify(data.params || {})
    }],
    timeout: 5000
}

export {
    serveUrl,
    getConfig,
    postConfig,
  }