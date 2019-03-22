import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import { AtToast } from "taro-ui"
import http_date from '../../service/http'
import sweepCode from '../../assets/image/saomakaimen.png'
import apply from '../../assets/image/shouquanfangke.png'
import remote from '../../assets/image/yuanchengkaimen.png'
import lock from '../../assets/image/mensuoguanli.png'
import me from '../../assets/image/wode.png'
import './modular.less'

export default class Modular extends Component {

  constructor(){
    super(...arguments)
    this.state = {
      isOpened:false,
      hasMask:true,
      status:'loading',
      text:'开锁中...',
    }
  }

  onSanCode(){
    Taro.navigateTo({
      url:'/pages/openRecord/openRecord'
    })
    // if (process.env.TARO_ENV === "weapp") {
    //   this.setState({
    //     status:'loading',
    //     text:'开锁中...',
    //     isOpened:true,
    //   })
    //   Taro.scanCode({
    //     success: (res) => {
    //       console.log(res)
    //       if(res.devid){
    //         http_date.getDate('lock/openDoor?devid='+'869467046561107'+'&openid='+Taro.getStorageSync('openid')).then((http_res)=>{
    //           if(http_res.data.result===0){
    //             console.log(http_res)
    //             this.setState({
    //               status:'success',
    //               text:'开锁成功...',
    //               isOpened:true,
    //             })
    //           }else{
    //             // describe
    //             this.setState({
    //               status:'error',
    //               text:'开锁失败...',
    //               isOpened:true
    //             })
    //           }
    //         })
    //       }else{
    //         Taro.atMessage({
    //           'message': '二维码错误,无可用锁具信息',
    //           'type': 'error',
    //         })
    //       }
    //     },
    //     fail: (err) => {
    //       console.log(err)
    //     }
    //   })
    // } else if (process.env.TARO_ENV === "h5") {

    // }
  }
  onAboutMe(){
    Taro.navigateTo({
      url: '/pages/me/me'
    })
  }
  onMyLock(){
    if(this.props.userInfo.type===0){
      Taro.navigateTo({
        url: '/pages/lockmanagement/lockmanagement'
      })
    }else{
      Taro.navigateTo({
        url: '/pages/myLock/myLock'
      })
    }
  }
  onVisitor(){
    Taro.navigateTo({
      url: '/pages/visitor/visitor'
    })
  }
  RemoteDoor(){
    Taro.navigateTo({
      url: '/pages/remoteDoor/remoteDoor'
    })
  }
  render () {
    return (
      <View className='at-row at-row__justify--center modular'>
      <AtToast isOpened={this.state.isOpened} text={this.state.text} status={this.state.status} hasMask={this.state.hasMask} ></AtToast>
        <View className='left'>
          <View className='model SweepCode' onClick={this.onSanCode.bind(this)}>
            <View className='content'>
              <Image className='icon' src={remote} />
              <Text>开门记录</Text>
            </View>
          </View>
          <View className='model remote'>
            <View className='content' onClick={this.RemoteDoor.bind(this)}>
            <Image className='icon' src={sweepCode} />
              <Text>远程开门</Text>
            </View>
          </View>
        </View>
        <View className='right'>
          <View className='model apply' onClick={this.onVisitor.bind(this)}>
            <View className='content'>
              <Image className='icon' src={apply} />  
              <Text>授权访客</Text>
            </View>
          </View>
          <View className='model explain' onClick={this.onMyLock.bind(this)} >
            <View className='content'>
              <Image className='icon' src={lock} />
              <Text>{this.userInfo.type===0?'门锁管理':'我的门锁'}</Text>
            </View>
          </View>
          <View className='at-row at-row__justify--between model me'  onClick={this.onAboutMe.bind(this)}>
            <View className='at-col at-col-5'>
              <Image className='icon' src={me} />
            </View>
            <View className='at-col at-col-5'>
              <Text>设置</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

