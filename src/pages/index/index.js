import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {onSaveUserInfo} from '../../store/actions/user'
import Modular from '../../components/Modular/Modular'
import http_date from '../../service/http'
import bg from '../../assets/image/bg.png'
import logo from '../../assets/image/door.png'
import './index.less'

class Index extends Component {
  config = {
    navigationBarTitleText: '微信开门'
  }
  componentWillMount () {
    //扫码登陆
    let qur = this.$router.params
    let openid = Taro.getStorageSync('openid')
    if(qur.devid){
      http_date.getDate('lock/openDoor?type=0&openid='+openid+'&devid='+qur.devid).then((res)=>{
        if(res.data.result===0){
          console.log('扫码登陆')
          this.props.onSaveUserInfo(res.data.describe)
          Taro.redirectTo({
            url: '/pages/index/index?type=2'
          })
        }else{
          console.log('失败')
        }
      })
    }
  }
  getIsUser(){
    //通过openid查询可有此人
    http_date.postDate('user/getUser',{openId: Taro.getStorageSync('openid')}).then((res)=>{
      if(!res.data.result){
        this.props.onSaveUserInfo(res.data)
      }
    })
  }
  render () {
    return (
      <View className='index'>
        <View className='modular'>
          <Image className='logo' src={logo} />
          <Modular className='block' userInfo={this.props.user.user.userInfo}  />
        </View>
        <Image className='bg' src={bg} />
      </View>
    )
  }
}

export default connect (({ user }) => ({
  user
 }), (dispatch) => ({
  onSaveUserInfo (data) {
   dispatch(onSaveUserInfo(data))
  },
 }))(Index)
