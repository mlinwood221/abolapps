import React from 'react'
import Carousel, {Pagination} from 'react-native-snap-carousel'
import {View} from 'react-native-ui-lib'
import {Colors} from '@commons'

const BannerPagination = (props) =>{
    
    return (
        <Pagination
              dotsLength={props.data.length}
              activeDotIndex={props.activeSlide}
              containerStyle={{ backgroundColor: "transparent", paddingVertical:5}}
              dotElement={<View width={10} height={10} backgroundColor={Colors.primary} marginH-2 style={{borderRadius:6}}></View>}
              inactiveDotElement={<View width={8} height={8} marginH-2 style={{opacity:0.4,borderRadius:5}} backgroundColor={Colors.primary}></View>}
              
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
    )
}

export default BannerPagination