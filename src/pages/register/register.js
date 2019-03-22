import Taro, { Component } from '@tarojs/taro'
import { View ,Button} from '@tarojs/components'
import { AtForm, AtInput, AtButton,Picker} from 'taro-ui'
import http_date from '../../service/http'
import './register.less'

export default class Information extends Component {
  config = {
    navigationBarTitleText: '用户注册'
  }
  constructor () {
    super(...arguments)
    this.state = {
      wxUserInfo:{},
      userInfo:{
        name:'',
        idcard:'',
        phone:'',
        room:'',
      },
      lockId:{
        id:'',
        content:'请选择锁具'
      },
      AllLockId:'',
    }
  }
  componentWillMount(){
    this.getAllLockList();
  }
  componentDidMount () {
    let _this = this;
    //通过微信获取信息
    Taro.getUserInfo({
      success(res) {
        _this.wxLogin();
        _this.setState({
          isWxSQ:true,
          wxUserInfo:res.userInfo
        })
      },
    })
  }
  //获取所有锁具信息
  getAllLockList() {
    http_date.postDate('lock/getLockList',{currentPage:1,pageSize:1000000000, searchContent:''}).then((res)=>{
      this.setState({
        AllLockId:res.data
      })
    })
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
  handleChangeLock (e){
    let value = this.state.AllLockId[e.detail.value];
    this.setState({
      lockId:{
        ...this.state.lockId,
        id:value.id,
        content:value.buildingNumber+'['+value.devId+']'
      }
    })
  }
  wxLogin(){
    Taro.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          http_date.getDate('user/getOpenId?code='+res.code).then((result)=>{
            Taro.setStorageSync('openid', result.data.openid)
          })
        } 
      }
    })
  }
  onSubmit(){
    let openid = Taro.getStorageSync('openid')
    let data = {...this.state.userInfo,lockId:this.state.lockId.id,openId:openid,type:1, relation:1,...this.state.wxUserInfo}
    http_date.postDate('user/editUser',data).then((res)=>{
      if(res.data.result===0){
        Taro.navigateTo({
          url: '/pages/login/login'
        })
      }else{
        Taro.showModal({
          title: '注册失败',
          content: '原因:'+res.data.describe
        })
      }
    })
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
          value={this.state.wxUserInfo.nickName}
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
          value={this.state.wxUserInfo.gender? '男':'女'}
          // onChange={this.handleChangePhone.bind(this)}
        />
        <Picker mode='selector' range={this.state.AllLockId} rangeKey='devId' onChange={this.handleChangeLock.bind(this)}>
          <View className='picker'>
            <View className='picker_btn'>锁具:</View>
            <View className='picker_tool'>
              {this.state.lockId.content}
            </View>
          </View>
        </Picker>
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

