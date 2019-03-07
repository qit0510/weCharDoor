import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import RecordCard from '../../components/RecordCard/RecordCard'

export default class Openrecord extends Component {

  config = {
    navigationBarTitleText: '开门记录'
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

