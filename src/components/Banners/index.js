import React from 'react'
import {Image, Linking} from 'react-native'
import {View, Text, ProgressiveImage, TouchableOpacity} from 'react-native-ui-lib'
import {Constants, Icons} from '@commons'
import Carousel from 'react-native-snap-carousel';

import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade, Progressive,
    Shine, ShineOverlay
  } from "rn-placeholder"

import styles from './style'
 
const Banners = (props) => {
    return (
        <>
        {props.isLoad
        ? <Placeholder Animation={Shine} style={{
            paddingHorizontal:16,
            paddingVertical:16,
            flex:1,
        }}>
                <PlaceholderMedia style={{
                    borderRadius:10,
                    height: 170,
                    width:"100%",
                }}/>
            </Placeholder>
        : <Carousel
                data={props.data}
                itemWidth={Constants.DOCUMENT_WIDTH}
                sliderWidth={Constants.DOCUMENT_WIDTH}
                onSnapToItem={(index) => props.onSnap(index)}
                renderItem={_renderItem}
                autoplay
                enableMomentum={false}
                lockScrollWhileSnapping
                autoplayDelay={500}
                autoplayInterval={5000}
                loop
            />}
        </>
    )
}

const _renderItem = ({item, index}) => {
    const onPressed = () => {
        const url = item.url;
        if(url){
            Linking.canOpenURL(url).then(supported => {
                if(supported){
                    Linking.openURL(url)
                }
            })
        }
        
    }
    return(<TouchableOpacity activeOpacity={0.7} onPress={onPressed} style={styles.bannerContainer}>
        <Image
            style={styles.imgBanner}
            resizeMode={"cover"}
            source={{uri: item.image || item, cache: 'reload'}} 
            // thumbnailSource={Icons.progressive}
          />
    </TouchableOpacity>)
}

export default Banners