import Taro, { Component } from '@tarojs/taro'
import { View ,Text  ,Image} from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import Pic from '../../assets/image/pic.jpeg'
import wall from '../../assets/image/gerenzhongxin_bg.png'
import './picturewall.less'

export default class PictureWall extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      nikeId:'普通用户:'
    }
  }
  componentDidMount (){
    if(this.props.userInfo.type===0){
      this.setState({
        nikeId:'管理员:'
      })
    }else if(this.props.userInfo.type===1){
      this.setState({
        nikeId:'户主:'
      })
    }else{
      this.setState({
        nikeId:'普通用户:'
      })
    }
  }
  render () {
    return (
      <View className='pic_wall'>
          <AtAvatar circle image={Pic} size='large'></AtAvatar>
          <Text>{this.state.nikeId}{this.props.userInfo.nickName}</Text>
          <Image className='bg' src={wall} />
      </View>
    )
  }
}

