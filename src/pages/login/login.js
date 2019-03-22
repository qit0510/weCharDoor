import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtForm, AtInput, AtButton,AtMessage } from 'taro-ui'
import {onSaveUserInfo} from '../../store/actions/user'
import http_date from '../../service/http'
import logo from '../../assets/image/door.png'
import bg from '../../assets/image/bg.png'
import './login.less'

class Login extends Component {

  config = {
    navigationBarTitleText: '登陆'
  }

  constructor () {
    super(...arguments)
    this.state = {
      name: '',
      idcard:'',
    }
  }
  handleChangeName (value) {
    this.setState({
      name:value
    })
  }
  handleChangePassWord (value) {
    this.setState({
      idcard:value
    })
  }
  // 提示框
  faceBackBox (message,type)
  {
    //1.普通，2.成功，3.错误，4。警告
    if(type===1){
      type = ''
    }else if(type===2){
      type = 'success'
    }else if(type===3){
      type = 'error'
    }else {
      type = 'warning'
    }
    Taro.atMessage({
      'message': message,
      'type': type,
    })
  }
  //登陆进入
  onSubmit () {
    http_date.postDate('user/login',{name:this.state.name,idcard:this.state.idcard,openid:Taro.getStorageSync('openid'),type:1}).then((res)=>{
      if(res.data.result===0){
        this.props.onSaveUserInfo(res.data.describe)
         //成功
         this.faceBackBox('成功',3)
        Taro.redirectTo({
          url: '/pages/index/index?type=1'
        })
      }else{
        //失败
        this.faceBackBox(res.data.describe,3)
      }
    })
  }
  toRegister () {
    Taro.navigateTo({
      // url: '/pages/register/register?devid='+qur.devid
      url: '/pages/register/register'
    })
  }
  //openid进入
  componentWillMount () {
    Taro.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          Taro.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              Taro.startRecord()
            }
          })
        }
      }
    })
    let qur = this.$router.params;
    console.log(qur)
    if(qur.vid){
      Taro.redirectTo({
        url: '/pages/visitorLogin/visitorLogin?type=4&vid='+qur.vid
      })
    }else{
      http_date.postDate('user/login',{openid:Taro.getStorageSync('openid'),type:2}).then((res)=>{
        if(res.data.result===0){
          this.props.onSaveUserInfo(res.data.describe)
          if(qur.devid===undefined){
            Taro.redirectTo({
              url: '/pages/index/index?type=2'
            })
          }else{
            Taro.redirectTo({
              url: '/pages/index/index?type=2&devid='+qur.devid
            })
          }
        }else{
          //失败
        }
      })
    }
  }

  render () {
    return (
      <View className='login'>
        <AtMessage />
      <View className='at-row at-row__justify--center'>
        <Image className='logo' src={logo} />
    </View>
      <View className='at-row at-row__justify--center'>
        <AtForm
          className='login_form'
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            className='inp_btn'
            name='name'
            title='用户'
            type='text'
            placeholder='请输入您的用户名'
            value={this.state.name}
            onChange={this.handleChangeName.bind(this)}
          />
          <AtInput
            className='inp_btn'
            name='idcard'
            title='身份证'
            type='idcard'
            placeholder='请输入你的身份证'
            value={this.state.idcard}
            onChange={this.handleChangePassWord.bind(this)}
          />
          <AtButton className='btn' type='primary' formType='submit'>提交</AtButton>
        </AtForm>
      </View>
      <View className='at-row at-row__justify--around'>
        <View className='at-col at-col-5 bad_url'>
          <AtButton  type='secondary' openType='getUserInfo' onClick={this.toRegister.bind(this)} >立即注册 </AtButton >
        </View>
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
  }
 }))(Login)
