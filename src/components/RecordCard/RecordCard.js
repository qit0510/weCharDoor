import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCard  } from "taro-ui"
import './RecordCard.less'

export default class UnverifiedBox extends Component {
  
  render () {
    return (
      <View className='box'>
       {
          this.props.list.map((item,index)=>(
            <View className='record_card' key={index} >
              <AtCard
                note={item.createAt}
                extra='详情如下'
                // (item.type===0?'自己开锁':(item.type===1?'远程开锁':'授权开锁'))
                title={item.userName}
              >
              <view>
                锁具编号：{item.devId}
              </view>
              <view>
                地址：{item.location?item.location+item.buildingNumber:'为获取详细信息'}
              </view>
              </AtCard>
            </View>
          ))
        }
       
      </View>
    )
  }
}

