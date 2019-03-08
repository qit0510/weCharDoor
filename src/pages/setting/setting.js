import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

export default class Setting extends Component {

  config = {
    navigationBarTitleText: '设置中心'
  }
  render () {
    return (
      <View className='setting'>
        SETTING
      </View>
    )
  }
}

