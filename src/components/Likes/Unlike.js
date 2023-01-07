import React, {useEffect, useRef, useState} from 'react'
import {TouchableOpacity} from 'react-native'
import {View, Text} from 'react-native-ui-lib'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import {Colors} from '@commons'

import * as Animatable from 'react-native-animatable';

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'

const Unlike = (props) => {
    const [isUnliked, _setIsUnliked] = useState(props.isUnliked)
    const [unLikedCount, setUnlikedCount] = useState(props.count) 
    const unlikeRef = useRef(null)

    const {ids} = props

    useEffect(() => {
        setUnlikedCount(props.count)
        _setIsUnliked(props.isUnliked) 
    },[])

    const bounce = () => unlikeRef.current.bounceInDown(300).then(endState => {
        if(endState.finished){
            if(isUnliked){
                _setIsUnliked(false)
                props.unLikeMovie(false, ids)
                if(unLikedCount > 0) setUnlikedCount(unLikedCount-1)
            }else{
                _setIsUnliked(true) 
                props.unLikeMovie(true, ids)
                setUnlikedCount(unLikedCount+1)
            }
        }
    });

    useEffect(() => {
        setUnlikedCount(props.count)
        _setIsUnliked(props.isUnliked)
    },[props.isUnliked])
    
    useEffect(() => {
        if(ids === props.m_id && props.type === ActionTypes.LIKE_MOVIE.PENDING){
           
            if(props.updated_like && isUnliked){
                _setIsUnliked(false)
                if(unLikedCount > 0) setUnlikedCount(unLikedCount-1)   
            }
        }
    },[props.type, props.updated_like])
    return(
        <View row style={{alignItems:"center",...props.style}}>
            <Text marginR-5 color={Colors.primary}>{unLikedCount}</Text> 
            <TouchableOpacity activeOpacity={.5} style={{paddingHorizontal:3}} onPress={() => {
               
                if(props.isLoggedin) bounce();
                else props.showToast()
            }}>
                <Animatable.View ref={unlikeRef}>
                    <FontAwesome name={"thumbs-down"} color={Colors.primary} solid={isUnliked} size={16} backgroundColor={Colors.primary}  />
                </Animatable.View>
            </TouchableOpacity>
        </View>
    )
}

Unlike.defaultProps = {
    isUnliked : false,
    count:0,
}

function mapStateToProps({like_unlike, authReducers}){
    return {
        type:like_unlike.type,
        updated_like:like_unlike.isLiked,
        updated_unlike : like_unlike.isUnliked,
        m_id:like_unlike.actionId,
        isLoggedin : authReducers.isLogedin
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Unlike)