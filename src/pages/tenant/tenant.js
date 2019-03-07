import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import { AtButton } from "taro-ui"
import http_date from '../../service/http'
import {onSaveTendList} from '../../store/actions/list'
import ListItem from '../../components/ListItem/ListItem'

class Tenant extends Component {

  config = {
    navigationBarTitleText: '管理中心'
  }

  componentWillMount () {
    this.getList();
  }
  getList() {
    let uid = this.props.user.user.userInfo.id;
    http_date.getDate('user/getMemberOfFamily?uid='+uid).then((res)=>{
      this.props.onSaveTendList(res.data)
    })
  }
  //添加
  addLock() {
    Taro.navigateTo({
      url: '/pages/addTenant/addTenant'
    })
  }
  // 授权用户
  authorisedUSer(target){
    console.log(target)
    let suid = this.props.user.user.userInfo.id;
    http_date.getDate('lock/authorityLock?uid='+target.id+'&suid='+suid+'&lockid').then((res)=>{
      console.log(res)
    })
  }
  render () {
    return (
      <View className='lock'>
        <View className='add_lock'>
          <AtButton className='add_btn' onClick={this.addLock.bind(this)}>{(this.props.user.user.userInfo.type===0)?'添加用户':'添加家庭成员'}</AtButton>
        </View>
        <ListItem onAuthorisedUSer={this.authorisedUSer.bind(this)} />
      </View>
    )
  }
}

export default connect (({user,list }) => ({
  user,list
}), (dispatch) => ({
  onSaveTendList (data) {
    dispatch(onSaveTendList(data))
  },
}))(Tenant)

