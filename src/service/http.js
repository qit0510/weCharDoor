import Taro from '@tarojs/taro'

export default {
  getDate(url){
    return this.requestAll(url,'','GET')
  },
  postDate(url, data) {
    return this.requestAll(url, data, 'POST')
  },
  requestAll (url, data,method){
    return Taro.request({
      url: 'http://211.144.114.47/' + url,
      data: data,
      method: method,
      header: {
        "content-type": "application/json;charset=UTF-8",
        "Set-Cookie": "JSESSIONID=1nwps0lm1fd4rami4hy2sm3io;Path=/"
      },
    })
  }
}
// Trao.request({xxx:xx, xx:xx}).then(res=>res.json()).then(res => res);
