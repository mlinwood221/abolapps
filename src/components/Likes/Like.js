import React, {useState, useRef, useEffect} from 'react'
import {TouchableOpacity} from 'react-native'
import {View, Text} from 'react-native-ui-lib'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import {Colors} from '@commons'
import * as Animatable from 'react-native-animatable';

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'

const Like = (props) => {
    const [firstInit, setFirstInit] = useState(true)
    const [isLiked, setLiked] = useState(props.isLiked)
    const [likeCount, setLikeCount] = useState(props.count)
    const likekRef = useRef(null)

    const {ids} = props

    useEffect(() => {
        setFirstInit(true)
        
        setLikeCount(props.count)
        setLiked(props.isLiked)
        
        setFirstInit(false)
    },[])

    useEffect(() => {
        setLikeCount(props.count)
        setLiked(props.isLiked)
    },[props.isLiked])

    const bounce = () => likekRef.current.bounce(300).then(endState => {
        if(endState.finished){
            if(isLiked){
                setLiked(false)
                props.likeMovie(false, ids)
                if(likeCount > 0) setLikeCount(likeCount-1)
            }else{
                setLiked(true) 
                props.likeMovie(true, ids)
                setLikeCount(likeCount+1)
            }
        }
    });

    useEffect(() => {
        if(!firstInit){
            if(ids === props.m_id && props.type === ActionTypes.UNLIKE_MOVIE.PENDING){
                if(props.updated_unlike && isLiked){
                    setLiked(false)
                    if(likeCount > 0) setLikeCount(likeCount-1)  
                }
            }
        }
        
    },[props.type, props.updated_unlike])

    return( 
        <View row style={{alignItems:"center", ...props.style}}>
            <Text marginR-5 color={Colors.primary}>{likeCount}</Text>
            <TouchableOpacity activeOpacity={.5} style={{paddingHorizontal:3}} onPress={() => {
                if(props.isLoggedin) bounce();
                else props.showToast();
            }}>
                <Animatable.View ref={likekRef}>
                    <FontAwesome name={"thumbs-up"} color={Colors.primary} size={15} backgroundColor={Colors.primary} solid={isLiked} />
                </Animatable.View>
            </TouchableOpacity>
        </View>
    )
}

Like.defaultProps = {
    isLiked : false,
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


export default connect(mapStateToProps, mapDispatchToProps)(Like)