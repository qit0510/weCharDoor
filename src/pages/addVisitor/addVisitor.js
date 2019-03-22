import Taro, {Component} from '@tarojs/taro'
import {View,Picker} from '@tarojs/components'
import {AtForm,AtInput,AtButton,AtTextarea,AtMessage,Canvas} from 'taro-ui'
import '@tarojs/async-await'
import {connect} from '@tarojs/redux'
import drawQrcode from 'weapp-qrcode'
import http_date from '../../service/http'
import './addVisitor.less'

const term= [1, 3, 6, 8, 12, 24, 36, 48, 72]

class AddVisitor extends Component {
  config = {
    navigationBarTitleText: '添加授权'
  }
  constructor() {
    super(...arguments)
    this.state = {
      data: {
        name: '',
        idcard: '',
        phone: '',
        reason: '',
        lockid: {
          id: '',
          content: '请选择要授权锁具'
        },
        timeSel: 1,
        isShow: false,
        qure:false
      },
      AllLockId: [],
    }
  }
  componentWillMount() {
    if (this.props.user.user.userInfo.type !== 0) {
      this.getLockInfo();
    } else {
      this.getAllLockList();
    }
  }
  componentDidMount() {
    this.onCreateQRCode()
  }
  //获取所有锁具信息
  getAllLockList() {
    http_date.postDate('lock/getLockList', {
      currentPage: 1,
      pageSize: 1000000000,
      searchContent: ''
    }).then((res) => {
      this.setState({
        AllLockId: res.data
      })
    })
  }
  //获取个人锁具信息
  getLockInfo() {
    http_date.getDate('lock/getLocksByUid?uid=' + this.props.user.user.userInfo.id).then((res) => {
      this.setState({
        AllLockId: res.data
      })
    })
  }
  handleChangeLock(e) {
    let value = this.state.AllLockId[e.detail.value];
    this.setState({
      data: {
        ...this.state.data,
        lockid: {
          ...this.state.lockid,
          id: value.id,
          content: value.buildingNumber + '[' + value.devId + ']'
        }
      }
    })
  }
  handleNameChange(value) {
    this.setState({
      data: {
        ...this.state.data,
        name: value
      }
    })
  }
  handleIdCardChange(value) {
    this.setState({
      data: {
        ...this.state.data,
        idcard: value
      }
    })
  }
  handlePhoneChange(value) {
    this.setState({
      data: {
        ...this.state.data,
        phone: value
      }
    })
  }
  handleReasonChange(event) {
    this.setState({
      data: {
        ...this.state.data,
        reason: event.target.value
      }
    })
  }
  onTimeChange(e) {
    this.setState({
      data: {
        ...this.state.data,
        timeSel: term[e.detail.value]
      }
    })
  }
  async saveQRCode() {
    if(this.state.qure){
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
    }else{
      Taro.showModal({
        title: '错误',
        content: '此图片不能保存'
      })
    }

  }
  // 提示框
  faceBackBox(message, type) {
    //1.普通，2.成功，3.错误，4。警告
    if (type === 1) {
      type = ''
    } else if (type === 2) {
      type = 'success'
    } else if (type === 3) {
      type = 'error'
    } else {
      type = 'warning'
    }
    Taro.atMessage({
      'message': message,
      'type': type,
    })
  }
  onCreateQRCode(data) {
    // let url = 'http://192.168.10.120/smartOpenDoor/lock/visitorOpenDoor?vid='
    let url='https://bstar.js-equipment.cn/smartOpenDoor/lock/visitorOpenDoor?vid='
    console.log(url+this.state.qure)
    drawQrcode({
      width: 150,
      height: 150,
      canvasId: 'myCanvas',
      text: url+data
    })
  }
  onSubmit() {
    http_date.postDate('lock/addVisitorAuthorityLock',{uid:this.props.user.user.userInfo.id,...this.state.data,lockid:this.state.data.lockid.id}).then((res)=>{
    if(res.data.result===0){
      this.faceBackBox('二维码生成成功',2)
      this.setState({
        qure:true
      },()=>{
        this.onCreateQRCode(res.data.describe)
      })
      }else{
        this.faceBackBox('二维码生成失败',3)
      }
    })
  }
  render() {
    return (
    <View className='FormPro' >
    <AtMessage />
    <Canvas style='width: 150px; height: 150px;margin:10px auto;' canvas-id='myCanvas'  onLongTap={this.saveQRCode.bind(this)}></Canvas>
    {/* <Canvas style='width: 150px; height: 150px;margin:0 auto;' canvasId='myCanvas' onLongTap={this.saveQRCode.bind(this)} />  */}
    <View className='text'>{this.state.qure?'二维码长按保存':'此二维码无效请重新生成二维码'}</View>
      <AtForm onSubmit={this.onSubmit.bind(this)}>
        <AtInput name='name' title='访客姓名' type='name' placeholder='访客姓名' value={this.state.name} onChange={this.handleNameChange.bind(this)} />
        <AtInput name='idcard' title='身份证：' type='idcard' placeholder='身份证号码' value={this.state.idcard} onChange={this.handleIdCardChange.bind(this)} />
        <AtInput name='phone' title='手机号码' type='phone' placeholder='访客联系方式' value={this.state.phone} onChange={this.handlePhoneChange.bind(this)} />
        <Picker mode='selector' range={this.state.AllLockId} rangeKey='devId' onChange={this.handleChangeLock.bind(this)} >
          <View className='picker' >
            <View className='picker_btn' > 锁具: </View> <View className='picker_tool' > {this.state.data.lockid.content} </View>
          </View>
        </Picker>
        <Picker mode='selector' range={term} onChange={this.onTimeChange.bind(this)} >
          <View className='picker' >
            <View className='picker_btn' > 期限: </View>
            <View className='picker_tool' > {this.state.data.timeSel+'小时'} </View>
          </View>
        </Picker>
        <AtTextarea className='reason' value={this.state.reason} onChange={this.handleReasonChange.bind(this)} maxLength={200} placeholder='请填写事由...' />
        <AtButton formType='submit' > 生成二维码 </AtButton>
      </AtForm>
    </View>
    )
  }
}

export default connect(({
  user
}) => ({
  user
}))(AddVisitor)
