import React, {useState, useEffect}from 'react'
import {View, Text, LoaderScreen} from 'react-native-ui-lib'
import {Colors} from '@commons'

import {PageContent} from '@components'
import { robotoWeights} from 'react-native-typography'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'
import { ScrollView } from 'react-native'

const AboutUs = (props) =>{
    const [isRefresh, setIsRefresh] = useState(false)
    const [isLoad, setIsLoad] = useState(true)
    
    const load_refresh = () =>{
        props.aboutUs()
        setIsRefresh(true)
    }

    useEffect(() => {
        if(props.type === ActionTypes.CONTENT.ABOUT.SUCCESS){
            setIsLoad(false)
            setIsRefresh(false)

        }
    }, [props.type])

    useEffect(() => {
        setIsLoad(true)
        props.aboutUs()
    },[])

    return(
        <PageContent statusBarColor={Colors.primary}  title={__("How it works")} navigation={props.navigation}
            refreshable={true}
            isRefreshing={isRefresh}
            onRefresh={load_refresh}>
                <View flex bg-white paddingH-16 paddingV-20>
                    {isLoad && <LoaderScreen color={Colors.primary}/>}
                    {!isLoad && 
                        <ScrollView>
                            <View>
                                <Text text90T grey20>{props.data.introduction}</Text>
                                <View height={1} bg-grey50 marginV-16 flex/>
                                <Text text70T marginV-10 style={{...robotoWeights.medium}}>{__("Company")}</Text>
                                <Text text90T grey20>{props.data.company}</Text>
                                <View height={1} bg-grey50 marginV-16 flex/>
                                <Text text70T marginV-10 style={{...robotoWeights.medium}}>{__("About")}</Text>
                                <Text text90T grey20>{props.data.about}</Text>
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


export default connect(mapStateToProps, mapDispatchToProps)(AboutUs)