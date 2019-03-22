import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import { AtToast } from "taro-ui"
import { connect } from '@tarojs/redux'
import {onSetUserInfo} from '../../store/actions/user'
import Modular from '../../components/Modular/Modular'
import http_date from '../../service/http'
import bg from '../../assets/image/bg.png'
import logo from '../../assets/image/door.png'
import './index.less'

class Index extends Component {
  config = {
    navigationBarTitleText: '微信开门'
  }
  constructor(){
    super(...arguments)
    this.state = {
      isOpened:false,
      hasMask:true,
      status:'loading',
      text:'开锁中...',
    }
  }
  componentWillMount () {
    //扫码登陆
    let qur = this.$router.params
    let openid = Taro.getStorageSync('openid')
    console.log(this.$router)
    if(qur.devid){
      this.setState({
        status:'loading',
        text:'开锁中...',
        isOpened:true,
      })
      http_date.getDate('lock/openDoor?type=0&openid='+openid+'&devid='+qur.devid).then((res)=>{
        if(res.data.result===0){
          this.setState({
            status:'success',
            text:'开锁成功...',
            isOpened:true,
          })
          this.props.onSetUserInfo(res.data.describe)
          
        }else{
          this.setState({
            status:'error',
            text:'开锁失败...',
            isOpened:true
          })
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
        <AtToast isOpened={this.state.isOpened} text={this.state.text} status={this.state.status} hasMask={this.state.hasMask} ></AtToast>
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
   dispatch(onSetUserInfo(data))
  },
 }))(Index)
