import React, { useEffect, useState } from 'react'
import {ActivityIndicator, FlatList} from 'react-native'
import {View, Text, TouchableOpacity} from 'react-native-ui-lib'
import {PageContent} from '@components'
import {Colors} from '@commons'
import { robotoWeights} from 'react-native-typography'
import AwesomeAlert from 'react-native-awesome-alerts'
import moment from 'moment'
import messaging from '@react-native-firebase/messaging'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'

const Notification = (props) => {
    const [isLoad, setIsLoad] = useState(true)
    const [isOpened, setIsOpen] = useState(false)
    const [isRefresh, setIsRefresh] = useState(false)
    const [contentPopup, setContentPopup] = useState({})
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        props.resetNotification()
        setIsRefresh(false)
        setIsOpen(false)
        setIsLoad(true)
        setNotifications([])
        props.getNotificationHistory()

        
    },[])

    useEffect(() => {
        const unsubs = messaging().onMessage(async message => {
            const idxExists = notifications.findIndex(item => item.id === message.data.id)
            if(idxExists < 0){
                message.data.is_unread = true
                const old_data = [message.data, ...notifications];
                setNotifications(old_data)
                props.resetNotification()
            }
        })

        return unsubs
    },[notifications])

    useEffect(() => {
        if(props.type !== ActionTypes.NOTIFICATION.HISTORY.PENDING){
            setIsRefresh(false)
            setIsLoad(false)
          
        }
        if(props.type === ActionTypes.NOTIFICATION.HISTORY.SUCCESS){
           
            setNotifications(props.notifications)
        }
    },[props.type])

    const load_refresh = () => {
        setIsRefresh(true)
        props.getNotificationHistory()
    }

    return(
        <PageContent statusBarColor={Colors.primary} navigation={props.navigation} title={__("Notifications")}
            refreshable={true}
            isRefreshing={isRefresh}
            onRefresh={load_refresh}
        >
            <View flex bg-white>
                {isLoad ?
                 <View center>
                    <ActivityIndicator color={Colors.primary} size={"small"}/>
                </View> 
                :<FlatList
                    data={notifications}
                    keyExtractor={(item, index) => `notification-item-${item.id}-${index}`}
                    renderItem={({item}) => <NotificationItem data={item} onPress={() => {
                        setContentPopup(item)
                        setIsOpen(true)
                        const getIndex = notifications.findIndex(itm => itm.id === item.id)
                        notifications[getIndex].is_unread = false;
                    }}/> }
                />} 
                <AwesomeAlert
                    show={isOpened}
                    customView={<ModalContent content={contentPopup} dismiss={() => setIsOpen(false)}/>}  
                    contentContainerStyle={{width:"100%",margin:0,padding:0,backgroundColor:Colors.white, borderRadius:10}}
                    contentStyle={{width:"100%",margin:0,padding:0, }}
                    onDismiss={() => setIsOpen(false)}
                />
            </View>
        </PageContent>
    )
}


const NotificationItem = (props) => {
    const {data} = props
    
    const times = (notif_time) => {
        const a = moment(notif_time)
        const b = moment()
        
        const days = b.diff(a, 'days')
        const hours = b.diff(a, "hours")
        const minutes = b.diff(a, 'minutes')
        
        if(days >= 2){           
            return a.format('DD/MM/YYYY')
        }else if(days === 1){
            return __("Yesterday")+" "+ a.format("HH:mm")
        }else if(hours > 5 ){
            return a.format("HH:mm")
        }else if(hours >= 1){
            return hours + " "+__("hours ago") 
        }else if(minutes >= 3){
            return minutes + " "+__("minutes ago")
        }else{
            return __("Just now")
        }
        
    }
    return(
       
        <TouchableOpacity activeOpacity={.6} onPress={() => props.onPress()}>
            <View paddingT-5 bg-grey70={data.is_unread}>
                <View paddingH-20 paddingV-10>
                    <View row marginB-10 style={{justifyContent:"space-between", alignItems:"center"}}>
                        <Text style={{...robotoWeights.medium, maxWidth:"65%"}} text80 >
                            {data.title}
                        </Text>
                        <Text text90 marginT-5 style={{alignSelf:"flex-start", color:Colors.primary,...robotoWeights.medium}}> 
                            {times(data.timestamp)}
                        </Text> 
                    </View>
                    
                    <Text numberOfLines={4} text90BL dark20> 
                        {data.description}
                    </Text>
                    
                </View>
                <View height={1} width={"100%"} backgroundColor={Colors.lightGray2} marginT-10/>
            </View>
        </TouchableOpacity>
    )
}

const ModalContent = (props) => {
    return(
        <View  style={{width:"100%",borderTopLeftRadius:10,borderTopRightRadius:10}}>
            <View center paddingV-10 backgroundColor={Colors.primary} style={{borderTopLeftRadius:10,borderTopRightRadius:10}}>
                <Text white style={{...robotoWeights.medium}} text70>{__("Notification")}</Text>
            </View>
            <View paddingH-20 paddingV-20 >
                <Text center dark30>{props.content.description} </Text>

                <TouchableOpacity marginT-10 padding-10 onPress={() => props.dismiss()}>
                    <Text color={Colors.primary} center>{__("Back To Home")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function mapStateToProps({notificationReducers}){
    return {
        type: notificationReducers.type,
        notifications : notificationReducers.notifications
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Notification)