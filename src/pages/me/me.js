import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtList, AtListItem } from "taro-ui"
import http_date from "../../service/http"
import PictureWall from '../../components/PictureWall/PictureWall'

const nalList = [
  // {title:'开门记录',url:'/pages/openRecord/openRecord',icon:'credit-card'},
  // {title:'访客记录',url:'/pages/tenantRecord/tenantRecord',icon:'calendar'},
  // {title:'管理门锁',url:'/pages/lockmanagement/lockmanagement',icon:'shopping-bag-2'},
  // {title:'设置中心',url:'/pages/setting/setting',icon:'settings'}
]
class Me extends Component {
  config = {
    navigationBarTitleText: '个人中心'
  }
  constructor () {
    super(...arguments)
    this.state = {
    }
  }
  componentWillMount () {
    // this.props.user.user.userInfo
    if(this.props.user.user.userInfo.type==='0'){
    }
  }
  toNext (addres) {
    Taro.navigateTo({
      url: addres
    })
  }
  logout(){
    http_date.getDate('user/logout?uid='+this.props.user.user.userInfo.id).then((res)=>{
      console.log(res)
      if(res.statusCode===200){
        Taro.redirectTo({
          url:'/pages/login/login?type:5'
        })
      }else{
        Taro.atMessage({
          title:'',
          'message': '失败',
          'type': 'error',
        })
      }
    })
  }
  render () {
    return (
    <View className='me'>
      <PictureWall userInfo={this.props.user.user.userInfo} />
      <AtList>
      <AtListItem title='个人信息'arrow='right' onClick={this.toNext.bind(this,'/pages/information/information')} iconInfo={{ size:21, color: '#6190E8', value: 'user' }} />
      {
        (this.props.user.user.userInfo.type<=1) &&(
          <AtListItem title={this.props.user.user.userInfo.type=== 0 ?'用户管理':'家庭成员'} arrow='right' onClick={this.toNext.bind(this,'/pages/tenant/tenant')} iconInfo={{ size:21, color: '#6190E8', value: 'bell' }} />
        )
      }
      {
        (this.props.user.user.userInfo.type<1) &&(
        <AtListItem title='授权管理'arrow='right' onClick={this.toNext.bind(this,'/pages/authorize/authorize')} iconInfo={{ size:21, color: '#6190E8', value: 'lightning-bolt' }} />
        )
      }
      {/* {
        nalList.map((item,index)=>(
          <AtListItem key={index} title={item.title} arrow='right' onClick={this.toNext.bind(this,item.url)} iconInfo={{ size:21, color: '#6190E8', value: item.icon }} />
        ))
      } */}
        <AtListItem title='注销' onClick={this.logout.bind(this)} iconInfo={{ size:21, color: '#6190E8', value: 'reload' }} />
      </AtList>
    </View>
    )
  }
}

export default connect (({ user }) => ({
  user
 }))(Me)
