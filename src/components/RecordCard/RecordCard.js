import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCard  } from "taro-ui"
import './RecordCard.less'

export default class UnverifiedBox extends Component {
  
  render () {
    return (
      <View className='box'>
        <View className='record_card'>
          <AtCard
            note='2018-06-01 3:30'
            extra='本人'
            title='北京'
            thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
          >
            北京省达拉斯技能大赛觉得内疚啊
        </AtCard>
        </View>
        <View className='record_card'>
          <AtCard
            note='2018-06-01 3:30'
            extra='本人'
            title='北京'
            thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
          >
            北京省达拉斯技能大赛觉得内疚啊
          </AtCard>
        </View>
        <View className='record_card'>
          <AtCard
            note='2018-06-01 3:30'
            extra='本人'
            title='北京'
            thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
          >
            北京省达拉斯技能大赛觉得内疚啊
          </AtCard>
        </View>
      </View>
    )
  }
}

