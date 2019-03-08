import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import http_date from '../../service/http'
import {onSaveMyLocklist} from '../../store/actions/list'
import ListItem from '../../components/ListItem/ListItem'

class myLock extends Component {

  config = {
    navigationBarTitleText: '我的门锁'
  }
  componentDidMount () {
    this.getList();
  }
  getList() {
    //初始化list
    http_date.getDate('lock/getLocksByUid?uid='+this.props.user.user.userInfo.id).then((res)=>{
      console.log(res)
      this.props.onSaveMyLocklist(res.data)
    })
  }
  render () {
    return (
    <View className='me'>
      <ListItem />
    </View>
    )
  }
}

export default connect (({ user,list }) => ({
  user,list
}), (dispatch) => ({
  onSaveMyLocklist (data) {
    dispatch(onSaveMyLocklist(data))
  },
}))(myLock)

