import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import RecordCard from '../../components/RecordCard/RecordCard'

export default class TenantRecord extends Component {

  config = {
    navigationBarTitleText: '访客记录'
  }
 
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
 
  render () {
    return (
    <View className='me'>
      <RecordCard />
    </View>
    )
  }
}

