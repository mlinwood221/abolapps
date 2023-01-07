import React, { useEffect, useRef, useState } from 'react'
import {Image, TouchableOpacity} from 'react-native'
import {View, Text,ProgressiveImage} from 'react-native-ui-lib'
import Icon from 'react-native-vector-icons/FontAwesome5'

import * as Animatable from 'react-native-animatable';
import {Likes} from '@components'
import moment from 'moment'

import {Colors, Constants} from '@commons'
import styles from './style'
import PropTypes from 'prop-types'

const toDate = (date) => {
   
    if(date){
        return moment(date, "MM/DD/YYYY HH:mm A").format('DD-MM-YYYY')
    }
    return "";
 }

const calculateRatio = (screenWidth, column) => {
    const RWidth = 21
    const RHeight = 34
    const PDG = 30*column;
    screenWidth = screenWidth-PDG;
    const KeepWidth = (screenWidth/column);
    
    return {
        width:KeepWidth,
        height:(KeepWidth/RWidth)*RHeight
    }

}

const MovieItem = (props)=> {
    const {data} = props 
    const [imageWidth, setImageWidth] = useState({
        width:150,height:235
    })
    useEffect(() => {
        setImageWidth(calculateRatio(props.screenWidth,props.numOfColumn))
        
    },[])
    
   
    return(
        <View paddingH-10 marginB-20 >
            <TouchableOpacity onPress={() => props.onClickItem()} activeOpacity={.8}>
            <View style={{...styles.imgContainer, width:imageWidth.width, height:imageWidth.height}}>
                <View style={{...styles.shadowDiv, height:imageWidth.height+6}}/>
                <Image
                    style={{...styles.image, height:imageWidth.height}}
                    source={{uri: props.mode === "theater" ? data.cover : data.image , cache: 'reload'}}/>
            </View>
            </TouchableOpacity>
            {props.mode === "movie" && 
                <TouchableOpacity onPress={() => props.onClickItem()} activeOpacity={.8}>
                    <Text center marginT-10 style={styles.movieTitle}>{data.name} </Text>
                </TouchableOpacity>
            }
            {props.mode === "unreleased" && 
                <TouchableOpacity onPress={() => props.onClickItem()} activeOpacity={.8}>
                    <Text center marginT-10 style={styles.movieTitle}>{data.name}</Text>
                    <Text center marginT-5  style={{...styles.movieTitle, color:Colors.gray, fontSize:12}} text90>{toDate(data.release_date)}</Text>
                </TouchableOpacity>
            }

            {props.mode === "liked_movie" && 
                <MovieWithLiked name={data.name} data={data}/>
            }

            {props.mode === 'theater' && 
                <TheaterLabel title={data.name} ids={data.id} onBell={(id, status) => props.onBell(id, status)} is_notify={data.is_notify}/>
            }
        </View>
    )
}

const MovieWithLiked = (props) =>{
    const [currLiked, setCurrLiked] = useState(false) 
    useEffect(() => {
        setCurrLiked(props.data.isLiked) 
    },[])
    return( 
        <View flex>
            <Text center marginT-10 style={styles.movieTitle}>{props.name}</Text>
            <Text center  grey20 text90 marginT-5>{toDate(props.data.release_date)}</Text>
            <View row style={{justifyContent:"center", alignItems:"center"}} marginT-5 paddingH-10>
                <Likes isLiked={props.data.isLiked} ids={props.data.id} count={props.data.likes}/>
                <View row marginH-10 style={{alignItems:"center"}}>
                    <Text marginR-5 color={Colors.primary}>{props.data.views}</Text>
                    <Icon name={"eye"} size={15} color={Colors.gray}/> 
                </View>
            </View>
        </View>
    )
}

const TheaterLabel = (props) => {
    const [isNotify, setIsnotify] = useState(props.is_notify) 
    const bellRef = useRef(null)
    const bounce = () => bellRef.current.bounce(300).then(endState => {
        if(endState.finished){
            isNotify ? setIsnotify(false):setIsnotify(true)
            props.onBell(props.ids, isNotify );
        }
    });

    return(
        <View row style={{justifyContent:"space-between", alignItems:"flex-start"}} marginT-10 paddingH-10>
            <Text  style={styles.movieTitle}>{props.title}</Text>
            <TouchableOpacity style={{paddingVertical:0, paddingHorizontal:5}} onPress={bounce}>
                <Animatable.View ref={bellRef}>
                    <Icon name="bell" size={18} color={Colors.primary} solid={isNotify}/>
                </Animatable.View>
            </TouchableOpacity> 
        </View>
    )
}

MovieItem.defaultProps = {
    mode:"movie"
}
export default MovieItem