import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import http_date from '../../service/http'
import ListItem from '../../components/ListItem/ListItem'
import {onSaveAuthList} from "../../store/actions/list";

class Authorize extends Component {

  constructor(){
    super(...arguments)
    this.state = {
      auth_list:[]
    }
  }
  config = {
    navigationBarTitleText: '授权管理'
  }

  componentWillMount () {
    this.getList();
  }
  //获取用户列表
  getList() {
    let uid = this.props.user.user.userInfo.id;
    http_date.getDate('lock/getAuthorityList?uid='+uid).then((res)=>{
      this.props.onSaveAuthList(res.data)
    })
  }
  //授权
  authorisedUSer(target){
    let suid = this.props.user.user.userInfo.id;
    http_date.getDate('lock/authorityLock?uid='+target.id+'&suid='+suid+'&lockid='+target.controllerId).then((res)=>{
      if(res.data.result===0){
        //授权成功
        console.log(res.data.describe)
      }else{
        //授权失败
      }
    })
  }
  render () {
    return (
    <View className='authorize'>
      <ListItem auth_list={this.state.auth_list} onAuthorisedUSer={this.authorisedUSer.bind(this)} />
    </View>
    )
  }
}
export default connect (({user,list }) => ({
  user,list
}), (dispatch) => ({
  onSaveAuthList (data) {
    dispatch(onSaveAuthList(data))
  },
}))(Authorize)

