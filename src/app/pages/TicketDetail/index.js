import React, { useEffect, useState } from 'react'
import {PageContent, AlertContainer} from '@components'
import {View, Text} from 'react-native-ui-lib'
import {Colors} from '@commons'
import Icon from 'react-native-vector-icons/FontAwesome5'
import QRCode from 'react-native-qrcode-svg'
import {FlatList} from 'react-native'

import styles from './style'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'
import { robotoWeights } from 'react-native-typography'


const TicketDetail = (props) => {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isRefresh, setIsRefresh] = useState(false)

    const {message, ticket_id} = props.params ? props.params : {}

    useEffect(() => {
        setData({})
        setIsLoading(false)
        props.getTicketDetail(ticket_id)
    },[])

    useEffect(() => {
        if(props.type === ActionTypes.TICKET.DETAIL.PENDING){
            setIsLoading(true)
        }
        if(props.type === ActionTypes.TICKET.DETAIL.SUCCESS && isLoading){
            setData(props.data)
            setIsLoading(false)
            setIsRefresh(false)
        }
    },[props.type])
    
    const load_refresh = () => {
        setIsRefresh(true)
        props.getTicketDetail(ticket_id)
    }
    return(
        <PageContent statusBarColor={Colors.primary} navigation={props.navigation}
            refreshable={true}
            isRefreshing={isRefresh}
            onRefresh={load_refresh}
        >
            <View flex bg-white >
                
                <View style={{borderBottomWidth:1, borderBottomColor:Colors.lightGray}} paddingV-20 paddingH-16>
                    { message && 
                        <AlertContainer success text={message} />
                    }
                    <View row style={{alignItems:"center"}} >
                        <Text style={{...robotoWeights.condensedBold}} grey20 text80 marginR-10>{data.theater_name}</Text>
                        <View row style={{alignItems:"center"}}>
                            <Icon name={"map-marker-alt"} color={Colors.lightGray2} size={12}/>
                            <Text style={styles.location} marginL-5 text90 dark10>{data.city}</Text> 
                        </View>
                    </View>
                    <Text marginT-10 style={{...robotoWeights.medium, color:Colors.primary}} text80 dark10>{data.city}</Text>
                    <Text text90 grey20 style={{...robotoWeights.regular}} marginT-5>{data.screen_name}</Text>
                </View>
                <View paddingV-20 paddingH-16>
                    <View row center marginB-10>
                        <Text style={{...robotoWeights.medium, width:60}} text80 dark20>{__("Date")}</Text>
                        <Text flex style={{...robotoWeights.regular}} text80 dark20>: {data.show_time}</Text>
                    </View>
                    <View row center marginB-10>
                        <Text style={{...robotoWeights.medium, width:60}} text80 dark20>{__("Ticket")}</Text>
                        <Text flex style={{...robotoWeights.medium,color:Colors.primary}} text80>: {data.ticket}</Text>
                        <Text text80 style={{...robotoWeights.medium}} dark20>{data.ticket_price}</Text>
                    </View> 
                    {data.foods && 
                        <View marginB-10 marginT-5>
                            <FlatList
                                data={data.foods}
                                keyExtractor={item => item.id+"purchased"}
                                renderItem={({item}) => <FoodItem
                                    item={item}
                                />}
                            />
                        </View>
                    }
                    
                    
                </View>
                {data.qr_string && 
                <View center marginT-20>
                   <QRCode value={data.qr_string}
                        size={135}
                   />
                   <Text marginV-20 grey20>{__("Show this QR Code at the Entrance")}</Text> 
                </View>}
            </View>
        </PageContent>
    )
}

const FoodItem = (props) =>{
    return(
        <View row paddingV-5>
            <View style={styles.foodItemQTY} center>
                <Text color={Colors.primary} style={styles.qtyText} text90>{props.item.qty}x</Text>
            </View>
            <View flex marginL-16>
                <Text>{props.item.name}</Text>
                {props.item.size && 
                    <Text text100 grey20>Size: { props.item.size}</Text>
                }
                
            </View>
            <View>
                <Text>
                    {props.item.price_total} BIR
                </Text>
            </View>
            
        </View>
    )
}

function mapStateToProps({ticketReducers}){
    return {
        type:ticketReducers.type,
        data : ticketReducers.ticket,
        message : ticketReducers.message
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(TicketDetail)

