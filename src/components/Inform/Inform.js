import Taro, { Component } from '@tarojs/taro'
import { View ,Button} from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'

export default class Inform extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      userInfo:{
        name:'',
        idcard:'',
        phone:'',
        room:'',
      },
    }
  }
  componentDidMount () { 
   
  }
  
  handleChangeName (value) {
    this.setState({
      userInfo:{
        ...this.state.userInfo,
        name:value,
      }
    })
  }
 
  handleChangeIdCard (value) {
    this.setState({
      userInfo:{
        ...this.state.userInfo,
        idcard:value
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
    this.props.onSubmitRegister(this.state.userInfo)
    

  }
  render () {
    return (
      <View className='register'>
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
          value={this.props.wxUserInfo.nickName}
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
          value={this.props.wxUserInfo.gender? '男':'女'}
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

