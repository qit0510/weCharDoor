import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtForm, AtInput, AtButton,Picker,AtMessage} from 'taro-ui'
import { connect } from '@tarojs/redux'
import {onAddFriendInfo,onEditFriendInfo} from '../../store/actions/list'
import http_date from '../../service/http'
import './FormPro.less'

const rela = ['管理员','户主','子女','父母']
const idden = ['管理员','户主','普通用户']
class FormPro extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      relationType:[],
      relationText:'请选择关系',
      identity:[],
      typeText:'请选择身份',
      lockId:{
        id:'',
        content:'请选择锁具'
      },
      AllLockId:'',
      userInfo:{
        nickName:'',
        name:'',
        idcard:'',
        phone:'',
        room:'',
        gender:true,
        type:'',
        openId:'',
        relation:'0',
        parentId:'',
        expireAt:'2018-04-22'
      },
    }
  }
  componentWillMount () {
    let userType = this.props.user.user.userInfo.type
    //管理员
    if(userType===0){
      this.setState({
        relationType:rela,
        identity:idden,
      })
    }else if(userType===1){
      let relaArr = [];
      rela.map((item,index)=>{
        index!==0 &&  relaArr.push(item)
      })
      let iddenArr = [];
      idden.map((item,index)=>{
        if(index>=2){
          iddenArr.push(item)
        }
      })
      this.setState({
        relationType:relaArr,
        identity:iddenArr,
        userInfo:{
          ...this.state.userInfo,
          type:'1'
        }
      })
    }
  }
  componentDidMount () {
    //获取锁具
    if(this.props.user.user.userInfo.type!==0){
      this.getLockInfo();
    }else{
      this.getAllLockList();
    }
    //初始化
    let friend = this.props.user.user.friendInfo
    if(this.props.isEdit){
      //编辑
      this.setState({
        userInfo:friend,
        relationText:rela[friend.relation],
        typeText:idden[friend.type],
      },()=>{
        this.setState({
          userInfo:{
            ...this.state.userInfo,
            openId:Taro.getStorageSync('openid'),
            parentId:this.props.user.user.userInfo.id
            }
        })
      })
    }else{
      //添加
      this.setState({
        userInfo:{
          ...this.state.userInfo,
          openId:Taro.getStorageSync('openid'),
          parentId:this.props.user.user.userInfo.id
        }
      })
    }
  }
  //获取所有锁具信息
  getAllLockList() {
    http_date.postDate('lock/getLockList',{currentPage:1,pageSize:1000000000, searchContent:''}).then((res)=>{
      this.setState({
        AllLockId:res.data
      })
    })
  }
  //获取个人锁具信息
  getLockInfo(){
    http_date.getDate('lock/getLocksByUid?uid='+this.props.user.user.userInfo.id).then((res)=>{
      this.setState({
        AllLockId:res.data
      })
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
  //用户添加
  onSubmit () {
    http_date.postDate('user/editUser',{...this.state.userInfo,openId:'000000000000000000000000000000000000000000000',lockId:this.state.lockId.id}).then((res)=>{
      if(res.data.result===0){
        // 成功
        if(this.props.isEdit){
          //编辑
          this.props.onEditFriendInfo({...this.state.userInfo, lockId:this.state.lockId.id})
        }else{
          //添加
          this.props.onAddFriendInfo({...this.state.userInfo, lockId:this.state.lockId.id})
        }
        Taro.navigateBack(Taro.getCurrentPages().length-1)
      }else{
        //失败
        this.faceBackBox(res.data.describe,3)
      }
    })
  }
  //nickname
  handleChangeNikeName (value) {
    this.setState({
      userInfo:{
        ...this.state.userInfo,
        nickName:value
      }
    })
  }
  //name
  handleChangeName (value) {
    this.setState({
      userInfo:{
        ...this.state.userInfo,
        name:value
      }
    })
  }
//idcard
  handleChangeIdCard (value) {
    this.setState({
      userInfo:{
        ...this.state.userInfo,
        idcard:value
      }
    })
  }
  //phone
  handleChangePhone (value) {
    this.setState({
      userInfo:{
        ...this.state.userInfo,
        phone:value
      }
    })
  }
//room
  handleChangeRoom(value) {
    this.setState({
      userInfo:{
        ...this.state.userInfo,
        room:value
      }
    })
  }
  handleChangeSex (e) {
    let value = e.detail.value;
    if(value!=='男'){
      value = false
    }else{
      value = true
    }
    this.setState({
      userInfo:{
        ...this.state.userInfo,
        gender:value
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
  //用户身份
  handleChangeIdentity(e){
    let value = e.detail.value;
    let userType = this.props.user.user.userInfo.type

    if(userType===0){
      this.setState({
        typeText:idden[parseInt(value)],
        userInfo:{
          ...this.state.userInfo,
          type:value
        }
      })
    }else if(userType===1){
      console.log(parseInt(value))
      this.setState({
        typeText:idden[parseInt(value)+2],
        userInfo:{
          ...this.state.userInfo,
          type:(parseInt(value)+2)
        }
      })
    }
  }
  //用户关系
  handleChangeRelation(e){
    let value = e.detail.value;
    let userType = this.props.user.user.userInfo.type
    if(userType === 0){
      this.setState({
        relationText:rela[parseInt(value)],
        userInfo:{
          ...this.state.userInfo,
          relation:parseInt(value)
        }
      })
    }else{
      this.setState({
        relationText:rela[parseInt(value)+1],
        userInfo:{
          ...this.state.userInfo,
          relation:(parseInt(value)+1)
        }
      })
    }
  }
  onDateChange (e) {
    this.setState({
      userInfo:{
        ...this.state.userInfo,
        expireAt:e.detail.value
      }
    })
  }
  render () {
    return (
      <View className='FormPro'>
        <AtMessage />
       {/* <Button open-type='getUserInfo'>授权信息</Button> */}
      <AtForm
        className='login_form'
        onSubmit={this.onSubmit.bind(this)}
      >
        <AtInput
          className='inp_btn'
          name='nickName'
          title='用户'
          type='text'
          placeholder='用户名'
          value={this.state.userInfo.nickName}
          onChange={this.handleChangeNikeName.bind(this)}
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
            name='room'
            title='房间号'
            type='text'
            placeholder='房间号'
            value={this.state.userInfo.room}
            onChange={this.handleChangeRoom.bind(this)}
          />
        <Picker mode='selector' range={['男','女']} onChange={this.handleChangeSex.bind(this)}>
          <View className='picker'>
            <View className='picker_btn'>性别:</View>
            <View className='picker_tool'>
              {this.state.userInfo.gender?'男':'女'}
            </View>
          </View>
        </Picker>
        <Picker mode='selector' range={this.state.relationType} onChange={this.handleChangeRelation.bind(this)}>
          <View className='picker'>
            <View className='picker_btn'>关系:</View>
            <View className='picker_tool'>
              {this.state.relationText}
            </View>
          </View>
        </Picker>
        <Picker mode='selector' range={this.state.identity} onChange={this.handleChangeIdentity.bind(this)}>
          <View className='picker'>
            <View className='picker_btn'>身份:</View>
            <View className='picker_tool'>
              {this.state.typeText}
            </View>
          </View>
        </Picker>
        {
          (this.state.userInfo.type !== 0 && this.state.typeText!=='请选择身份')&&(
            <Picker mode='selector' range={this.state.AllLockId} rangeKey='devId' onChange={this.handleChangeLock.bind(this)}>
              <View className='picker'>
                <View className='picker_btn'>锁具:</View>
                <View className='picker_tool'>
                  {this.lockId.content}
                </View>
              </View>
            </Picker>
          )
        }
        {
          (this.state.lockId.id !== ''&& this.state.userInfo.type!==0 )&&(
            <Picker mode='date' range={this.state.AllLockId} rangeKey='devId' onChange={this.onDateChange.bind(this)}>
              <View className='picker'>
                <View className='picker_btn'>到期:</View>
                <View className='picker_tool'>
                  {this.state.userInfo.expireAt}
                </View>
              </View>
            </Picker>
          )
        }
        <AtButton className='btn' type='primary' formType='submit'>确定提交</AtButton>
      </AtForm>
    </View>
    )
  }
}

export default connect (({ user,list }) => ({
  user,list
}), (dispatch) => ({
  onAddFriendInfo (data) {
    dispatch(onAddFriendInfo(data))
  },
  onEditFriendInfo (data) {
    dispatch(onEditFriendInfo(data))
  },
}))(FormPro)
