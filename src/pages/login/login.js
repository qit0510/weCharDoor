import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image } from '@tarojs/components'
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
        console.log('账号密码登陆')
        this.props.onSaveUserInfo(res.data.describe)
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
    let qur = this.$router.params
    // if(qur.devid){
      Taro.navigateTo({
        // url: '/pages/register/register?devid='+qur.devid
        url: '/pages/register/register'
      })
    // }else{
    //   //不跳
    // }
  }
  //openid进入
  componentWillMount () {
    http_date.postDate('user/login',{openid:Taro.getStorageSync('openid'),type:2}).then((res)=>{
      if(res.data.result===0){
        this.props.onSaveUserInfo(res.data.describe)
        Taro.redirectTo({
          url: '/pages/index/index?type=2'
        })
      }else{
        //失败
      }
    })
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
          <Text onClick={this.toRegister.bind(this)}>立即注册</Text>
        </View>
        <View className='at-col at-col-5 bad_url'>
          <Text>忘记密码</Text>
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
