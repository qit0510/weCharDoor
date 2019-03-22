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
    this.props.onConfirmBox();
  }
  render () {
    return (
      <View className='box'>
        <AtModal
          isOpened={this.props.isOpen}
          title='删除'
          cancelText='取消'
          confirmText='确定'
          onClose={this.handleClose.bind(this)}
          onCancel={this.handleToBack.bind(this)}
          onConfirm={this.handleConfirm.bind(this)}
          content='确定要删除此项'
        />
      </View>
    )
  }
}

