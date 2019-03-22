import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtToast } from "taro-ui"
import http_date from '../../service/http'

export default class VisitorLogin extends Component {

  config = {
    navigationBarTitleText: '访客开锁'
  }
  constructor(){
    super(...arguments)
    this.state = {
      isOpened:true,
      hasMask:true,
      status:'loading',
      text:'开锁中...',
    }
  }
  componentDidMount(){
  let qur = this.$router.params;
  http_date.getDate('lock/visitorOpenDoor?vid='+qur.vid).then((res)=>{
    if(res.data.result===0){
      this.setState({
        status:'success',
        text:'开锁成功...',
        isOpened:true,
      })
    }else{
      this.setState({
        status:'error',
        text:'开锁失败...',
        isOpened:true
      })
      console.log('失败')
    }
  })
  }
  render () {
    return (
      <View className='setting'>
        <AtToast isOpened={this.state.isOpened} text={this.state.text} status={this.state.status} hasMask={this.state.hasMask} ></AtToast>
      </View>
    )
  }
}

