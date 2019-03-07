import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import FormPro from '../../components/FormPro/FormPro';

export default class Addlock extends Component {

  config = {
    navigationBarTitleText: '添加住客'
  }
  render () {
    return (
      <View className='ten'>
       <FormPro />
      </View>
    )
  }
}

