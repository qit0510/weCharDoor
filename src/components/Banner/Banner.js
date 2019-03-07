import Taro, { Component } from '@tarojs/taro'
import { View,Image, Swiper, SwiperItem } from '@tarojs/components'
import Banner1 from '../../assets/image/banner1.png'
import Banner2 from '../../assets/image/banner2.png'

export default class Banner extends Component {

  render () {
    return (
      <View>
        <Swiper className='test-h' indicatorColor='#999' indicatorActiveColor='#333' circular indicatorDots autoplay>
          <SwiperItem>
            <Image style='width: 100%;height: 300px' src={Banner1} />
          </SwiperItem>
          <SwiperItem>
            <Image style='width: 100%;height: 300px' src={Banner2} />
          </SwiperItem>
          <SwiperItem>
            <Image style='width: 100%;height: 300px' src={Banner1} />
          </SwiperItem>
        </Swiper>
      </View>
    )
  }
}

