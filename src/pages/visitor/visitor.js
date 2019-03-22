import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton,AtCard,AtFloatLayout,Canvas } from 'taro-ui'
import { connect } from '@tarojs/redux'
import '@tarojs/async-await'
import drawQrcode from 'weapp-qrcode'
import http_date from '../../service/http'
import './visitor.less'
// import drawQrcode from '../../utils/weapp.qrcode.esm.js'

class Visitor extends Component {

  config = {
    navigationBarTitleText: '授权访客'
  }
  constructor(){
    super(...arguments)
    this.state = {
      list:[],
      time:'',
      isOpened:false
    }
  }
  componentWillMount() {
    let v2 =  (new Date()).valueOf();
    this.setState({
      time:v2
    })
    http_date.getDate('user/getVisitorList?uid='+this.props.user.user.userInfo.id).then((res)=>{
      this.setState({
        list:res.data
      })
    })
  }

  addVisitor(){
    Taro.navigateTo({
      url:'/pages/addVisitor/addVisitor'
    })
  }
  async saveQRCode() {
      try {
        const res = await Taro.canvasToTempFilePath({
          canvasId: 'myCanvas',
          quality: 1
        }, this.$scope)
        await Taro.saveImageToPhotosAlbum({
          filePath: res.tempFilePath
        })
        Taro.showToast({
          title: '保存成功'
        })
      } catch (e) {
        Taro.showModal({
          title: '错误',
          content: '图片保存失败'
        })
      }
  }
  onHanderClick(item){
    this.setState({
      isOpened:true
    },()=>{
      this.onCreateQRCode(item.vid)
    })
  }
  onCreateQRCode(data) {
    // let url = 'http://192.168.10.120/smartOpenDoor/lock/visitorOpenDoor?vid='
    let url='https://bstar.js-equipment.cn/smartOpenDoor/lock/visitorOpenDoor?vid='
    drawQrcode({
      width: 150,
      height: 150,
      canvasId: 'myCanvas',
      text: url+data
    })
  }
  handleClose(){
    this.setState({
      isOpened:false
    })
  }
  render () {
    return (
      <View className='visitor'>
          <AtButton className='add_btn' onClick={this.addVisitor.bind(this)}>添加授权</AtButton>
         { this.state.list.map((item,index)=>(
            <View className='record_card' key={index} onClick={this.onHanderClick.bind(this,item)}>
              <AtCard
                note={'过期时间:'+item.outdate}
                extra={(new Date(item.outdate)).valueOf()>this.state.time?'未过期':'已过期'}
                title={item.name}
              >
              <view>
                手机号码：{item.phone}
              </view>
              <view>
                来访事由：{item.reason}
              </view>
              <view>
                手机号码：{item.phone}
              </view>
              <view>
                请求地址：{item.location+'地区'+item.buildingNumber}
              </view>
              </AtCard>
            </View>
          ))
        }
        <AtFloatLayout className='test' isOpened={this.state.isOpened} title='二维码' onClose={this.handleClose.bind(this)}>
          <Canvas style='width: 150px; height: 150px;margin:10px auto;' canvas-id='myCanvas'  onLongTap={this.saveQRCode.bind(this)}></Canvas>
          <View className='text'>长按保存二维码</View>
        </AtFloatLayout>
      </View>
    )
  }
}

export default connect (({user }) => ({
  user
}))(Visitor)


