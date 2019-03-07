import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Login from './pages/login/login'
import Index from './pages/index/index'
import configStore from './store'
import './app.less'

if (process.env.TARO_ENV === "weapp") {
  require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
  require("taro-ui/dist/h5/css/index.css")
}

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/login/login',
      'pages/index/index',
      'pages/register/register',
      'pages/me/me',
      'pages/myLock/myLock',
      'pages/information/information',
      'pages/tenant/tenant',
      'pages/openRecord/openRecord',
      'pages/authorize/authorize',
      'pages/tenantRecord/tenantRecord',
      'pages/lockmanagement/lockmanagement',
      'pages/addlock/addlock',
      'pages/addTenant/addTenant'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
  wxLogin(){
    Taro.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          Taro.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx47beebe011f84f24&secret=0671ec766695f8ec79c36d074ccb7f5b&js_code='+res.code+'&grant_type=authorization_code',
            header: {
              'content-type': 'application/json'
            },
            success: function(result) {
              Taro.setStorageSync('openid', result.data.openid)
            },
            fail: function(error) {
                console.log(error);
            }
          })
        } 
      }
    })
  }
  componentDidMount () {
    this.wxLogin()
  }


  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
    <Provider store={store}>
      <Login />
      <Index />
    </Provider> 
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
