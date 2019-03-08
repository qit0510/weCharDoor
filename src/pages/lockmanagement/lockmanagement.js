import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {AtLoadMore, AtButton , AtSearchBar } from "taro-ui"
import http_date from '../../service/http'
import {onSaveLockList,onSaveNectLockList} from '../../store/actions/list'
import ListItem from '../../components/ListItem/ListItem'

const pageSizes = 10;
class Lockmanagement extends Component {

  config = {
    navigationBarTitleText: '门锁管理'
  }
  constructor () {
    super(...arguments);
    this.state = {
      keyword: '',
      count:1,
      status: 'more'
    }
  }
  componentWillMount () {
    http_date.postDate('lock/getLockList',{currentPage:this.state.count,pageSize:pageSizes, searchContent:this.state.keyword}).then((res)=>{
      this.props.onSaveLockList(res.data)
      this.setState({count:this.state.count+1})
    })
  }
  //添加
  addLock() {
    Taro.navigateTo({
      url: '/pages/addlock/addlock'
    })
  }
  //获取list
  getList() {
    http_date.postDate('lock/getLockList',{currentPage:this.state.count,pageSize:pageSizes, searchContent:this.state.keyword}).then((res)=>{
      if(res.data.length===0){
        this.setState({
          status: 'noMore'
        })
      }else{
        this.props.onSaveNectLockList(res.data)
        this.setState({count:this.state.count+1})
      }
    }).then(()=>{
      if(this.state.status!=='noMore'){
        this.setState({
          status: 'more'
        })
      }
    })
  }
  onChange (value) {
    this.setState({
      keyword: value
    })
  }
  onActionClick () {
    this.setState({
      count:1
    },()=>{
      this.getList();
    })
  }
  handleMoreClick () {
    // 开始加载
    this.setState({
      status: 'loading'
    })
    this.getList();
      // 没有更多了
  }
  render () {
    return (
      <View className='lock'>
        <View className='add_lock'>
          <AtButton className='add_btn' onClick={this.addLock.bind(this)}>添加门锁</AtButton>
        </View>
        <View className='search_btn'>
          <AtSearchBar
            value={this.state.keyword}
            onChange={this.onChange.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
          />
        </View>
        <ListItem />
        {
          (this.props.list.list.lockList.length === 0) ? (
            <View style='text-align:center ; padding-top:60px'>暂无数据.....</View>
          ):(
            <AtLoadMore onClick={this.handleMoreClick.bind(this)} status={this.state.status} />
          )
        }
      </View>
    )
  }
}
export default connect (({ list }) => ({
 list
}), (dispatch) => ({
  onSaveLockList (data) {
    dispatch(onSaveLockList(data))
  },
  onSaveNectLockList(data) {
    dispatch(onSaveNectLockList(data))
  }
}))(Lockmanagement)

