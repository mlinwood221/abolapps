import React, {useState, useEffect}from 'react'
import {View, Text, LoaderScreen} from 'react-native-ui-lib'
import {Colors} from '@commons'
import { robotoWeights} from 'react-native-typography'
import { ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import {PageContent} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'

const ContactUs = (props) =>{
    const [isRefresh, setIsRefresh] = useState(false)
    const [isLoad, setIsLoad] = useState(true)
    
    const load_refresh = () =>{
        props.contactUs()
        setIsRefresh(true)
    }

    useEffect(() => {
        if(props.type === ActionTypes.CONTENT.CONTACT.SUCCESS){ 
            setIsLoad(false)
            setIsRefresh(false)

        }
    }, [props.type]) 

    useEffect(() => {
        setIsLoad(true)
        props.contactUs()
    },[])

    return(
        <PageContent statusBarColor={Colors.primary} title={__("Contact Us")} navigation={props.navigation}
            refreshable={true}
            isRefreshing={isRefresh}
            onRefresh={load_refresh}>
                <View flex bg-white  paddingH-20 paddingV-20>
                    {isLoad && <LoaderScreen color={Colors.primary}/>}
                    {!isLoad && 
                        <ScrollView>
                            <View paddingT-10>
                                <Text text80T grey20>{props.data.introduction}</Text>
                                <View height={1} bg-grey50 marginV-16 flex/>
                                <View row marginV-8>
                                    <Icon name="mail" color={Colors.gray} size={20}/>
                                    <Text marginH-10 text80 grey20>{props.data.email}</Text>
                                </View>
                                <View row marginV-8>
                                    <Icon name="mobile" color={Colors.gray} size={20}/>
                                    <Text marginH-10 text80 grey20>{props.data.mobile}</Text>
                                </View>
                                <View row marginV-8>
                                    <Icon name="phone" size={20} color={Colors.gray}/>
                                    <Text marginH-10 text80 grey20>{props.data.telephone}</Text>
                                </View>
                            </View>
                        </ScrollView>
                    }
                </View>
        </PageContent>
    )
}

function mapStateToProps({contentReducers}){
    return {
        type:contentReducers.type,
        data : contentReducers.data
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactUs)