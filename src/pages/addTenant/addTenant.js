import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import FormPro from '../../components/FormPro/FormPro';

class AddTenant extends Component {

  config = {
    navigationBarTitleText: '添加住客'
  }
  constructor(){
    super(...arguments)
    this.state = {
      isEdit:false
    }
  }
  componentWillMount(){
    if(this.$router.params.id){
      this.setState({
        isEdit:true
      })
    }else{
      this.setState({
        isEdit:false
      })
    }
  }
  render () {
    return (
      <View className='ten'>
       <FormPro isEdit={this.state.isEdit} />
      </View>
    )
  }
}

export default connect (({user }) => ({
  user
}))(AddTenant)

