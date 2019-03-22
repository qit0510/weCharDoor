import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem ,AtToast, AtModal} from "taro-ui"
import { connect } from '@tarojs/redux'
import http_date from '../../service/http'
// import regeneratorRuntime from '../../regenerator-runtime/runtime.js';
import './remoteDoor.less'

class RemoteDoor extends Component {
  config = {
    navigationBarTitleText: '远程开门'
  }
  constructor() {
    super(...arguments)
    this.state = {
      list:[],
      isOpened:false,
      status:'loading',
      text:'开锁中...',
      duration:3000,
      isShow:false,
      currentItem:{},
    }
  }
  componentWillMount(){
     //获取锁具
     if(this.props.user.user.userInfo.type!==0){
      this.getLockInfo();
    }else{
      this.getAllLockList();
    }
  }
  //获取所有锁具信息
  getAllLockList() {
    http_date.postDate('lock/getLockList',{currentPage:1,pageSize:1000000000, searchContent:''}).then((res)=>{
      this.setState({
        list:res.data
      })
    })
  }
  //获取个人锁具信息
  getLockInfo(){
    http_date.getDate('lock/getLocksByUid?uid='+this.props.user.user.userInfo.id).then((res)=>{
      this.setState({
        list:res.data
      })
    })
  }
  initIsStart(){
    this.setState({
      isShow:false,
      isOpened:false,
      status:'loading',
      text:'开锁中...',
      duration:0
    },()=>{
      //
    })
  }
  handleConfirm(){
    this.setState({
      isShow:false,
      isOpened:true,
      status:'loading',
      text:'开锁中...',
    },()=>{
      let _this=this;
      setTimeout(function () {
        _this.openDoor()
      }, 1000)
    })
  }
  openDoor(){
    let openid = Taro.getStorageSync('openid')
    http_date.getDate('lock/openDoor?type=0&openid='+openid+'&devid='+this.state.currentItem.devId).then((res)=>{
      if(res.data.result===0){
        this.setState({
          status:'success',
          text:'成功...',
        },()=>{
          let _this=this;
          setTimeout(function () {
            _this.initIsStart()
          }, 1000)
        })
        this.props.onSetUserInfo(res.data.describe)
      }else{
        this.setState({
          status:'error',
          text:res.data.describe,
        },()=>{
          let _this=this;
          setTimeout(function () {
            _this.initIsStart()
          }, 1000)
        })
      }
    }
    )
  }
  handleCancel(){
    //按钮
    this.setState({
      isShow:false
    })
  }
  handleClose(){
    //外部
    this.setState({
      isShow:false
    })
  }
  handleClick(item){
    this.setState({
      currentItem:item
    },()=>{
      this.setState({
        isShow:true
      })
    })
  }
  render () {
    return (
    <View className='remote'>
      <AtModal
        isOpened={this.state.isShow}
        title='远程开门'
        cancelText='取消'
        confirmText='确认'
        onClose={this.handleClose.bind(this)}
        onCancel={this.handleCancel.bind(this)}
        onConfirm={this.handleConfirm.bind(this)}
        content='尊敬的用户，你确定要远程开此'
      />
      <AtToast isOpened={this.state.isOpened} duration={this.state.duration} text={this.state.text} status={this.state.status} hasMask={this.state.hasMask} ></AtToast>
      <AtList>
        {
          (this.state.list.length!==0)&&(
            this.state.list.map((item)=>(
              // +item.devId
              <AtListItem className='test' key={item.id} title={item.location+item.buildingNumber} onClick={this.handleClick.bind(this,item)} />
            ))
          )
        }
      </AtList>
    </View>
    )
  }
}
export default connect (({user,list }) => ({
  user,list
}))(RemoteDoor)

