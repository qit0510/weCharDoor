import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtModal } from "taro-ui"

export default class UnverifiedBox extends Component {
  handleToBack () {
    this.props.onCloseBox();
  }
  handleClose () {
    this.props.onCloseBox();
  }
  handleConfirm(){
    Taro.redirectTo({
      url: '/pages/login/login'
    })
  }
  render () {
    return (
      <View className='box'>
        <AtModal
          isOpened={this.props.isOpen}
          title='权限不足'
          cancelText='返回'
          confirmText='去申请'
          onClose={this.handleClose.bind(this)}
          onCancel={this.handleToBack.bind(this)}
          onConfirm={this.handleConfirm.bind(this)}
          content='你未获得管理身份请到管理员申请身份'
        />
      </View>
    )
  }
}

