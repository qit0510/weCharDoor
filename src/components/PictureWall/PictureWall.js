import Taro, { Component } from '@tarojs/taro'
import { View ,Text  ,Image} from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import Pic from '../../assets/image/pic.jpeg'
import wall from '../../assets/image/gerenzhongxin_bg.png'
import './picturewall.less'

export default class PictureWall extends Component {
  render () {
    return (
      <View className='pic_wall'>
          <AtAvatar circle image={Pic} size='large'></AtAvatar>
          <Text>{(this.props.userInfo.type===0)?'管理员:':'用户:'}{this.props.userInfo.nickName}</Text>
          <Image className='bg' src={wall} />
      </View>
    )
  }
}

