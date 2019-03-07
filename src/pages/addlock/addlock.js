import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View , Text} from '@tarojs/components'
import { AtButton,AtTextarea,AtMessage} from 'taro-ui'
import http_date from '../../service/http'
import {onAddLock,onEditLock} from '../../store/actions/list'
import './addlock.less'

class Addlock extends Component {

  config = {
    navigationBarTitleText: '门锁编辑'
  }
  constructor(){
    super(...arguments);
    this.state = {
      devId:'',
      location:'',
      buildingNumber:''
    }
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
  //提交
  handlerSubmit(){
    let id = this.$router.params.lockId
    http_date.postDate('lock/addLock',this.state).then((res)=>{
      if(res.data.result===0){
        if(id){
          //编辑
          this.props.onEditLock({data:this.state,index:this.$router.params.index})
        }else {
          //添加
          this.props.onAddLock(this.state)
        }
        // 成功
        this.faceBackBox(res.data.describe,2)
        Taro.navigateBack(Taro.getCurrentPages().length-1)
      }else{
        //失败
        this.faceBackBox(res.data.describe,3)
      }
    })
  }
  handleChangeVersion (e) {
    this.setState({
      devId:e.target.value
    })
  }
  handleChangeAddress (e) {
    this.setState({
      location:e.target.value
    })
  }
  handleChangeUtil (e) {
    this.setState({
      buildingNumber:e.target.value
    })
  }
  componentWillMount () {
    let id = this.$router.params.lockId
    if(id){
      http_date.getDate('lock/getLockByid?lockid='+id).then((res)=>{
        this.setState({
          devId:res.data.devId,
          location:res.data.location,
          buildingNumber:res.data.buildingNumber,
        })
      })
    }
  }
  render () {
    return (
      <View className='lock'>
        <AtMessage />
        <View  className='lock_form'>
          <Text className='title'>锁型号信息</Text>
          <AtTextarea
            value={this.state.devId}
            onChange={this.handleChangeVersion.bind(this)}
            maxLength={200}
            placeholder='锁型号信息...'
          />
        </View>
        <View className='lock_form'>
          <Text  className='title'>所处地址信息</Text>
          <AtTextarea
            value={this.state.location}
            onChange={this.handleChangeAddress.bind(this)}
            maxLength={200}
            placeholder='所处地址信息...'
          />
        </View>
        <View className='lock_form'>
          <Text  className='title'>所处单元信息</Text>
          <AtTextarea
            value={this.state.buildingNumber}
            onChange={this.handleChangeUtil.bind(this)}
            maxLength={200}
            placeholder='所处单元...'
          />
        </View>
        <AtButton className='btn' type='primary' onClick={this.handlerSubmit.bind(this)}>确定提交</AtButton>
      </View>
    )
  }
}
export default connect (({ list }) => ({
  list
}), (dispatch) => ({
  onAddLock (data) {
    dispatch(onAddLock(data))
  },
  onEditLock(data) {
    dispatch(onEditLock(data))
  }
}))(Addlock)
