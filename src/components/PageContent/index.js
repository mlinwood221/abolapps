import React, { useEffect, useRef, useState } from 'react'
import {View, Text, LoaderScreen, TouchableOpacity} from 'react-native-ui-lib'
import {StatusBar} from 'react-native'
import PropTypes from 'prop-types'
import messaging from '@react-native-firebase/messaging'

import {Constants, Colors} from '@commons'
import {ActionBar} from '@components'
import styles from './style'
import {PullToRefreshView} from 'react-native-smooth-pull-to-refresh'
import {robotoWeights} from 'react-native-typography'
import {Toast} from 'react-native-toast-with-button'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'


const PageContent = (props) => {

    const [refreshLabel, setRefreshLabel] = useState(null)
    const [pullish, setPullish] = useState({distance:0, anim:0})

    const toasts = useRef(null)


    useEffect(() => {
        if(props.toast === ActionTypes.TOAST.SHOW){
            toasts.current.show(
                <ToastView onAction={ () => {
                    props.navigation.navigate('LoginScreen')
                }}/>,  
                6500)
        }
        
    },[props.toast])

    const onTrigger = () =>{
        setRefreshLabel(__("Release to refresh"))
    }

    const onRefresh = (__calback) =>{
        setRefreshLabel(__("Loading")+"...")
        __calback()
    }


    return(
        <View flex>
            <View style={{ height: Constants.STATUS_BAR_HEIGHT}}>
                <StatusBar translucent backgroundColor={props.statusBarColor} barStyle={props.barStyle} />
            </View>
            {props.actionBar && <ActionBar isTopPage={props.isTopPage} navigation={props.navigation} title={props.title}/>}
            {props.refreshable 
            ?
            <PullToRefreshView minPullDistance={70} pullAnimHeight={80}
                    pullAnimYValues={{from:-50, to:10}}
                    isRefreshing={props.isRefreshing}
                    onRefresh={() => onRefresh(props.onRefresh)}
                    onTriggerToRefresh={onTrigger}
                    contentComponent={props.children}>
                        <View style={{width:Constants.DOCUMENT_WIDTH}} center >
                            {props.isRefreshing && <View width={30} marginB-5 height={30} center style={{borderRadius:50, elevation:5, backgroundColor:Colors.white}}>
                                    <LoaderScreen center size={20}/>
                            </View>}
                            <Text center style={{...robotoWeights.light}} text90>{refreshLabel}</Text>
                        </View>
                </PullToRefreshView> 
            :props.children}  
            <Toast ref={toasts} opacity={1} style={{padding:0}}/>
        </View>
    )
}

const ToastView = (props) => {
    return(
        <View row paddingH-20 center paddingV-10 flex bg-dark10 style={{justifyContent:"space-between"}}> 
            <Text white flex text90L>{__("You must Login or Registered")}</Text>
            <TouchableOpacity paddingV-5 paddingH-16 bg-red10 style={{borderRadius:5}} onPress={() => props.onAction()}>
                <Text white text90>{__("Sign In")}</Text>
            </TouchableOpacity>
        </View>
    )
}

PageContent.propTypes = {
    barStyle:PropTypes.string,
    statusBarColor:PropTypes.string,
    refreshable:PropTypes.bool,
    actionBar:PropTypes.bool,
    isTopPage:PropTypes.bool
}

PageContent.defaultProps = {
    barStyle:"light-content" ,
    statusBarColor:"#fff",
    refreshable:false,
    actionBar:true,
    isTopPage:false
}

function mapStateToProps({toastReducers}){
    return {
        toast:toastReducers.type,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(PageContent)