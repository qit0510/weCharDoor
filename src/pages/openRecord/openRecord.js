import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import RecordCard from '../../components/RecordCard/RecordCard'
import http_date from '../../service/http'

class Openrecord extends Component {

  config = {
    navigationBarTitleText: '开门记录'
  }
  constructor(){
    super(...arguments)
    this.state = {
      list:[]
    }
  }
  componentWillMount () {
    http_date.getDate('lock/getUnlockLog?uid='+this.props.user.user.userInfo.id).then((res)=>{
      this.setState({
        list:res.data
      })
    })
  }
 
  render () {
    return (
    <View className='me'>
      <RecordCard list={this.state.list} />
    </View>
    )
  }
}
export default connect (({user }) => ({
  user
}))(Openrecord)


