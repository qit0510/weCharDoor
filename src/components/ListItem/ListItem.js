import Taro, { Component } from '@tarojs/taro'
import { View , Text} from '@tarojs/components'
import { AtList,AtListItem,AtFloatLayout,AtMessage } from "taro-ui"
import { connect } from '@tarojs/redux'
import http_date from '../../service/http'
import {onSaveFriendInfo} from '../../store/actions/user'
import {onDelectLock} from '../../store/actions/list'
import './ListItem.less'

const rela = ['户主','子女','父母','妻子','朋友']
const idden = ['管理员','户主','家庭成员']
class ListItem extends Component {
  constructor () {
    super(...arguments);
    this.state = {
      info:false,
      current:{},
      lockInfo:{},
      currentPage:'',
    }
  }
  componentWillMount() {
    let qur = Taro.getCurrentPages()
    this.setState({
      currentPage:qur[qur.length-1].route
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
  //描述显示
  handleClick (item) {
    (item.lockid) && this.getLock(item.lockid)
    this.setState({
      current:item
    },()=>{
      this.setState({
        info:!this.state.info
      })
    })
  }
  //描述关闭
  handleClose () {
      this.setState({
        info:!this.state.info
      })
  }
  //删除锁具信息
  handleDelect(target,index){
    http_date.postDate('lock/delLock',{id:target.id}).then((res)=>{
      if(res.data.result===0){
        this.props.onDelectLock(index)
        //删除成功
        this.faceBackBox(res.data.describe,2)
      }else{
        this.faceBackBox(res.data.describe,3)
      }
    })
  }
  //编辑锁具信息
  editLockInfo(target,index){
    Taro.navigateTo({
      url: '/pages/addlock/addlock?lockId='+target.id+'&index='+index
    })
  }
   //获取单个锁具信息
   getLock(id){
    http_date.getDate('lock/getLockByid?lockid='+id).then((res)=>{
      this.setState({
        lockInfo:res.data
      })
    })
  }
   //编辑用户信息
  editTendUser(target){
    this.props.onSaveFriendInfo(target);
    Taro.navigateTo({
      url: '/pages/addTenant/addTenant?id='+target.id
    })
  }
  //用户授权
  authorisedUSer(target){
    this.props.onAuthorisedUSer(target);
  }
  //删除用户授权
  refuseUser(target){

  }
 

  render () {
    return (
      <View className='lock_list'>
      <AtMessage />
      <AtList>
        {/* 用户管理 */}
        {
          (this.state.currentPage === 'pages/tenant/tenant') && (this.props.list.list.tendList.map((item) => (
            <View key={item.id} className='tenant_li'>
              <AtListItem  className='list' title={item.name} onClick={this.handleClick.bind(this,item)} />
              <View className='list_btn'>
                <Text className='yes_btn' onClick={this.editTendUser.bind(this,item)}>编辑</Text>
              </View>
            </View>)
          ))
        }
        {/* 授权管理 */}
        {
          (this.state.currentPage === 'pages/authorize/authorize') && (this.props.list.list.authList.map((item) => (
          <View key={item.id} className='tenant_li'>
            <AtListItem  className='list' title={item.name} onClick={this.handleClick.bind(this,item)} />
            <View className='list_btn'>
              <Text className='yes_btn' onClick={this.authorisedUSer.bind(this,item)}>{(item.authority===1)?'已授权':'授权'}</Text>
              {item.authority!==1 && <Text className='no_btn' onClick={this.refuseUser.bind(this,item)}>删除</Text>}
            </View>
          </View>)
        ))
      }
      {/* 锁具管理 */}
        {
          (this.state.currentPage === 'pages/lockmanagement/lockmanagement') && (this.props.list.list.lockList.map((item,index) => (
            <View key={item.id} className='tenant_li'>
              <AtListItem className='list' title={item.devId} onClick={this.handleClick.bind(this,item)} />
              <View className='list_btn'>
                <Text className='yes_btn' onClick={this.editLockInfo.bind(this,item,index)}>编辑</Text>
                <Text className='no_btn' onClick={this.handleDelect.bind(this,item,index)}>移除</Text>
              </View>
          </View>)
          ))
        }
         {/* 我的门锁 */}
         {
         (this.state.currentPage === 'pages/myLock/myLock') && (this.props.list.list.myLockList.map((item) => (
            <View key={item.id} className='tenant_li'>
              <AtListItem className='list' title={item.devId} onClick={this.handleClick.bind(this,item)} />
              <View className='list_btn'>
                <Text className='no_btn' onClick={this.editLockInfo.bind(this,item)}>解除</Text>
              </View>
          </View>)
          ))
        }
      </AtList>
      <AtFloatLayout className='extraInfo' isOpened={this.state.info} title='详情信息' onClose={this.handleClose.bind(this)} >
        {/* 授权管理 */}
        {
          (this.state.currentPage === 'pages/authorize/authorize') && (
            <View className='content'>
              <View>
                <Text className='title'>姓名:</Text><Text  className='des'>{this.state.current.name}</Text>
              </View>
              <View>
                <Text className='title'>昵称:</Text><Text  className='des'>{this.state.current.nickName}</Text>
              </View>
              <View>
                <Text className='title'>性别:</Text><Text  className='des'>{this.state.current.gender?'男':'女'}</Text>
              </View>
              <View>
                <Text className='title'>手机号码：</Text><Text  className='des'>{this.state.current.phone}</Text>
              </View>
              <View>
                <Text className='title'>房间号: </Text><Text  className='des'>{this.state.current.room}</Text>
              </View>

              <View>
                <Text className='title'>请求锁具信息:</Text><Text  className='des'>{this.state.lockInfo.location+'区'+this.state.lockInfo.buildingNumber+'栋'}</Text>
              </View>
              <View>
                <Text className='title'>到期时间:</Text><Text  className='des'>{this.state.current.expireAt}</Text>
              </View>
            </View>
          )
        }
        {/* 我的门锁 */}
        {
          (this.state.currentPage === 'pages/myLock/myLock') && (
            <View className='content'>
            <View>
              <Text className='title'>锁型号：</Text><Text  className='des'>{this.state.current.devId}</Text>
            </View>
            <View>
              <Text className='title'>所在地址:</Text><Text  className='des'>{this.state.current.location+'区'+this.state.current.buildingNumber}</Text>
            </View>
            <View>
              <Text className='title'>创建时间:</Text><Text  className='des'>{this.state.current.createAt}</Text>
            </View>
            <View>
              <Text className='title'>锁状态：</Text><Text  className='des'>{this.state.current.status}</Text>
            </View>
          </View>
          )
        }
        {/* 锁具管理 */}
        {
          (this.state.currentPage === 'pages/lockmanagement/lockmanagement') && (
            <View className='content'>
              <View>
                <Text className='title'>锁型号：</Text><Text  className='des'>{this.state.current.devId}</Text>
              </View>
              <View>
                <Text className='title'>所在地址:</Text><Text  className='des'>{this.state.current.location+'区'+this.state.current.buildingNumber}</Text>
              </View>
              <View>
                <Text className='title'>创建时间:</Text><Text  className='des'>{this.state.current.createAt}</Text>
              </View>
              <View>
                <Text className='title'>锁状态：</Text><Text  className='des'>{this.state.current.status}</Text>
              </View>
            </View>
          )
        }
        {/* 用户管理 */}
        {
          (this.state.currentPage === 'pages/tenant/tenant') && (
            <View className='content'>
              <View>
                <Text className='title'>姓名:</Text><Text className='des'>{this.state.current.name}</Text>
              </View>
              <View>
                <Text className='title'>昵称:</Text><Text className='des'>{this.state.current.nickName}</Text>
              </View>
              <View>
                <Text className='title'>手机号码:</Text><Text className='des'>{this.state.current.phone}</Text>
              </View>
              <View>
                <Text className='title'>房间号:</Text><Text className='des'>{this.state.current.room}</Text>
              </View>
              <View>
                <Text className='title'>与您关系:</Text><Text className='des'>{rela[this.state.current.relation]}</Text>
              </View>
              <View>
                <Text className='title'>用户身份:</Text><Text className='des'>{idden[this.state.current.type]}</Text>
              </View>
            </View>
          )
        }
      </AtFloatLayout>
    </View>
    )
  }
}
export default connect (({ user,list }) => ({
  user,list
 }), (dispatch) => ({
  onSaveFriendInfo (data) {
   dispatch(onSaveFriendInfo(data))
  },
  onDelectLock(data) {
    dispatch(onDelectLock(data))
  }
 }))(ListItem)
