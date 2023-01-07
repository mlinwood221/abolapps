import React, { useEffect, useRef, useState } from 'react'
import {PageContent, StandardButton} from '@components'
import {View, Text, Card, TouchableOpacity} from 'react-native-ui-lib'
import {FlatList} from 'react-native'
import {Colors} from '@commons'
import Feather from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/FontAwesome5'
import styles from './style'


import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'
import { robotoWeights } from 'react-native-typography'

import {TicketItemsPlaceHolder} from '@components/Placeholder'

const dummies = Array(5).fill(5);

const MyTickets = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isRefresh, setIsRefresh] = useState(false)
    const listView = useRef(null)
    useEffect(() => {
        setIsLoading(true)
        setIsRefresh(false)
        
        props.getTicketList()
    }, [])

    useEffect(() => {
        if(props.type === ActionTypes.TICKET.LIST.SUCCESS){
            setIsRefresh(false)
            setIsLoading(false) 
        }

        if(props.type === ActionTypes.TICKET.LIST.FAIL){
            setIsRefresh(false)
            setIsLoading(false)
            
        }
    }, [props.type])

    const load_refresh = () => {
        setIsRefresh(true)
        props.getTicketList()
    }

    return(
        <PageContent statusBarColor={Colors.primary} navigation={props.navigation} title={__("My Tickets")}
            refreshable={true}
            isRefreshing={isRefresh}
            onRefresh={load_refresh}
        >
            
            <FlatList
                ref={listView}
                data={props.tickets}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <TicketItem  data={item} onPress={() => props.navigation.navigate('TicketDetailScreen', {ticket_id:item.id})}/>}
                style={{
                    backgroundColor:Colors.white,
                    paddingVertical:16
                }}
            /> 
           
        </PageContent>
    )
}

const TicketItem = (props) => {
    const {data} = props
    return(
        <Card  marginB-20 marginH-10 elevation={5} borderRadius={5} blurOptions={{blurType:"dark"}} containerStyle={{
            borderTopWidth:3,
            borderTopColor:Colors.primary
        }}>
            
            <View paddingH-16 paddingV-10 backgroundColor={"rgba(104,82,154,.09)"} style={{borderBottomColor:Colors.lightGray, borderBottomWidth:1}}>
                <View row style={{alignItems:"center"}}>
                    <Text style={styles.theater} grey20 text90 marginR-10>{data.theater_name} {data.id}</Text>
                    <View row style={{alignItems:"center"}}>
                        <Icon name={"map-marker-alt"} color={Colors.lightGray2} size={12}/>
                        <Text style={styles.location} marginL-5 text90 dark10>{data.city}</Text> 
                    </View>
                </View>
                <Text marginT-10 style={styles.movieName} text80 >{data.movie_name}</Text>
                <Text text90 grey20 style={{...robotoWeights.light}} marginT-5>{data.screen_name}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.4} onPress={() => props.onPress() }>
            <View row paddingH-16 paddingV-10 center>
                <View flex>
                    <View row marginV-3 style={{alignItems:"center"}}>
                        <Text text90 dark30 marginR-5 style={{...robotoWeights.regular,width:70}} >{__("Ticket")}</Text>
                        <Text text90 dark10 flex style={{...robotoWeights.medium}}>: {data.ticket}</Text>
                    </View>
                    <View row marginV-3> 
                        <Text text90 dark30 marginR-5 style={{...robotoWeights.regular,width:70}} width={100}>{__("Show Time")}</Text>
                        <Text text90 dark20 flex style={{...robotoWeights.medium}}>: {data.show_time}</Text>
                    </View>
                </View>
                <StandardButton label={__("QR Code")} style={{elevation:4}} onClick={props.onPress}/>
                {/* <Feather name={"chevron-right"} size={20} color={Colors.gray}/> */}
            </View>
            </TouchableOpacity>
        </Card>
    )
}

function mapStateToProps({ticketReducers}){
    return {
        type: ticketReducers.type,
        tickets : ticketReducers.tickets
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(MyTickets)

