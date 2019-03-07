import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import sweepCode from '../../assets/image/saomakaimen.png'
import apply from '../../assets/image/shouquanfangke.png'
import remote from '../../assets/image/yuanchengkaimen.png'
import lock from '../../assets/image/mensuoguanli.png'
import me from '../../assets/image/wode.png'
import './modular.less'

export default class Modular extends Component {

  onSanCode(){
    if (process.env.TARO_ENV === "weapp") {
      Taro.scanCode({
        success: (res) => {
          console.log(res)
        },
        fail: (err) => {
          console.log(err)
        }
      })
    } else if (process.env.TARO_ENV === "h5") {

    }
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
  render () {
    return (
      <View className='at-row at-row__justify--center modular'>
        <View className='left'>
          <View className='model SweepCode' onClick={this.onSanCode.bind(this)}>
            <View className='content'>
              <Image className='icon' src={sweepCode} />
              <Text>扫码开门</Text>
            </View>
          </View>
          <View className='model remote'>
            <View className='content'>
            <Image className='icon' src={remote} />
              <Text>远程开门</Text>
            </View>
          </View>
        </View>
        <View className='right'>
          <View className='model apply'>
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

