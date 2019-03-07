import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { AtForm, AtInput, AtButton,AtMessage} from 'taro-ui'
import { View } from '@tarojs/components'
import {onSetUserInfo} from '../../store/actions/user'
import http_date from '../../service/http'

class Information extends Component {

  config = {
    navigationBarTitleText: '个人信息'
  }
  constructor () {
    super(...arguments)
    this.state = {
      userInfo:{},
    }
  }
  componentDidMount () {
    this.setState({
      userInfo:this.props.user.user.userInfo
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
  handleChangeName (value) {
    this.setState({
      userInfo:{
        ...this.state.userInfo,
        name:value
      }
    })
  }
  handleChangeIdCard (value) {
    this.setState({
      userInfo:{
        ...this.state.userInfo,
        idCard:value
      }
    })
  }
  handleChangePhone (value) {
    this.setState({
      userInfo:{
        ...this.state.userInfo,
        phone:value
      }
    })
  }
  handleChangeRoom(value) {
    this.setState({
      userInfo:{
        ...this.state.userInfo,
        room:value
      }
    })
  }
  onSubmit () {
    http_date.postDate('user/editUser',{...this.state.userInfo, openId:Taro.getStorageSync('openid')}).then((res)=>{
      if(res.data.result===0){
        this.props.onSetUserInfo(this.state.userInfo)
        this.faceBackBox(res.data.describe,2)
      }else{
        this.faceBackBox(res.data.describe,3)
      }
    })
  }
  render () {
    return (
      <View className='register'>
       {/* <Button open-type='getUserInfo'>授权信息</Button> */}
       <AtMessage />
      <AtForm
        className='login_form'
        onSubmit={this.onSubmit.bind(this)}
      >
        <AtInput
          disabled
          className='inp_btn'
          name='nickName'
          title='用户'
          type='text'
          placeholder='用户名'
          value={this.state.userInfo.nickName}
          // onChange={this.handleChangeNikeName.bind(this)}
        />
        <AtInput
          className='name'
          name='name'
          title='真实姓名'
          type='text'
          placeholder='真实姓名'
          value={this.state.userInfo.name}
          onChange={this.handleChangeName.bind(this)}
        />
        <AtInput
          name='iadcard'
          title='身份证'
          type='idcard'
          placeholder='身份证号码'
          value={this.state.userInfo.idcard}
          onChange={this.handleChangeIdCard.bind(this)}
        />
        <AtInput
          name='phone'
          title='手机号码'
          type='phone'
          placeholder='手机号码'
          value={this.state.userInfo.phone}
          onChange={this.handleChangePhone.bind(this)}
        />
        <AtInput
          disabled
          name='gender'
          title='性别'
          type='phone'
          value={this.state.userInfo.gender? '男':'女'}
          // onChange={this.handleChangePhone.bind(this)}
        />
        <AtInput
          name='room'
          title='房间号'
          type='text'
          placeholder='房间号'
          value={this.state.userInfo.room}
          onChange={this.handleChangeRoom.bind(this)}
        />
        <AtButton className='btn' type='primary' formType='submit'>确定提交</AtButton>
      </AtForm>
    </View>
    )
  }
}

export default connect (({ user }) => ({
  user
 }), (dispatch) => ({
  onSetUserInfo (data) {
   dispatch(onSetUserInfo(data))
  }
 }))(Information)
