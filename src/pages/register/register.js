import Taro, { Component } from '@tarojs/taro'
import { View ,Button} from '@tarojs/components'
import http_date from '../../service/http'
import Inform from '../../components/Inform/Inform';

export default class Information extends Component {
  config = {
    navigationBarTitleText: '用户注册'
  }
  constructor () {
    super(...arguments)
    this.state = {
      wxUserInfo:{}
    }
  }
  componentDidMount () {
    let _this = this;
    //通过微信获取信息
    Taro.getUserInfo({
      success(res) {
        _this.setState({
          wxUserInfo:res.userInfo
        })
      }
    })
  }
  onSubmitRegister(userInfo){
    let qur = this.$router.params
    let openid = Taro.getStorageSync('openid')
    let date = {...userInfo, ...this.state.wxUserInfo, devId: qur.devid, openId:openid, type:1, relation:1}
    http_date.postDate('user/editUser',date).then((res)=>{
      if(res.data.result){
        Taro.navigateTo({
          url: '/pages/login/login'
        })
      }
    })
  }

  render () {
    return (
      <View className='register'>
       <Button open-type='getUserInfo'>授权信息</Button>
      <Inform wxUserInfo={this.state.wxUserInfo} onSubmitRegister={this.onSubmitRegister.bind(this)} />
    </View>
    )
  }
}

