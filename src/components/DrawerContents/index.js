import React, {useState, useEffect} from 'react'
import {TouchableOpacity} from 'react-native'
import {View, Text, Avatar} from 'react-native-ui-lib'
import Icon from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import {StandardButton} from '@components'
import {
    DrawerContentScrollView,
    DrawerItem,
    useIsDrawerOpen
} from '@react-navigation/drawer'

import {connect, useSelector} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'

import {Colors, Icons} from '@commons'
import styles from './style'


const DrawerContent = (props) => {
    
    const isOpened = useIsDrawerOpen();
    useEffect(() =>{
        if(props.type === ActionTypes.AUTH.LOGOUT && isOpened){
            props.navigation.closeDrawer()
        }        
    },[props.type])
    
    useEffect(() => {
        if(props.settingType === ActionTypes.SETTING.LANGUAGE_CHANGED){
            props.navigation.closeDrawer()
            props.getCities() 
           // props.navigation.push('Home') 
        }
    }, [props.settingType])

    return (
        <View flex paddingV-16 style={{...styles.drawerContainer}}>
            <View  paddingH-16 marginB-10>
                <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}> 
                    <Icon name={"x"} size={20} color={Colors.gray}/>
                </TouchableOpacity>
            </View>
            {!props.isLogedin 
                ? <View row style={{justifyContent:"center"}} paddingV-10 marginH-16>
                    <StandardButton style={{marginHorizontal:5}} 
                        onClick={() => { 
                                props.navigation.navigate('LoginScreen') 
                                props.navigation.closeDrawer()
                            }
                        } label={__("Sign In")}/>
                    <StandardButton style={{marginHorizontal:5}} onClick={() => props.navigation.navigate('SignupScreen')} label={__("Sign Up")}/>
                    </View>
                : <View  center marginH-80>
                    {props.userInfo.photo ? 
                        <Avatar source={{uri:props.userInfo.photo, cache:'reload'}} size={70}/>
                    : <Avatar source={Icons.person_profile} size={70}/>}
                    
                    <Text marginT-15 style={styles.profileName} >{props.userInfo.balance} BIR</Text>
                    <Text marginT-5 style={styles.profileName}>{props.userInfo.name}</Text>
                </View>
            }
            
            <View style={styles.drawerDivider}/>
            <DrawerContentScrollView>
                {props.isLogedin &&
                    <>
                    <DrawerItem label={__('Profile')} activeTintColor={Colors.primary} icon={() => <Icon name="user" size={20}/>} onPress={() => props.navigation.navigate('ProfileScreen')}/>
                    <DrawerItem label={__('Liked Movies')} onPress={() => props.navigation.navigate('LikedMovieScreen')} activeTintColor={Colors.primary} icon={() => <Icon name="play" size={20}/>}/>
                    </>
                }
                <DrawerItem label={__('Contact Us')} onPress={() => props.navigation.navigate('ContactUsScreen')}  activeTintColor={Colors.primary} icon={() => <Icon name="file-plus" size={20}/>}/>
                {props.isLogedin &&
                    <>
                    <DrawerItem label={__("My Tickets")} onPress={() => props.navigation.navigate('MyTicketScreen')}  activeTintColor={Colors.primary} icon={() => <FontAwesome name="ticket-alt" size={20} color={Colors.gray}/>}/>
                    <DrawerItem label={__("Add Money")} onPress={() => props.navigation.navigate('DepositScreen')}  activeTintColor={Colors.primary} icon={() => <FontAwesome name="money-check-alt" size={20} color={Colors.gray}/>}/>
                    </>
                }
                <DrawerItem label={__("Switch Language")} onPress={() => props.switchLanguage() } activeTintColor={Colors.primary} icon={() => <Icon name="globe" size={20}/>}/>
                <DrawerItem label={__('How it works')}  activeTintColor={Colors.primary} onPress={() => props.navigation.navigate('AboutUsScreen')} icon={() => <Icon name="info" size={20}/>}/>
                
                {props.isLogedin && <DrawerItem label={__('Logout')}  onPress={() => props.signOut({
                    device_token:props.device_token
                })} activeTintColor={Colors.primary} icon={() => <Icon name="arrow-right" size={20}/>}/>}
            </DrawerContentScrollView> 
            
            
        </View>
    )
}

function mapStateToProps({authReducers, settingReducers}){
    return {
        type : authReducers.type,
        isLogedin:authReducers.isLogedin,
        userInfo:authReducers.userInfo,
        settingType : settingReducers.type,
        lang:settingReducers.lang,
        device_token: settingReducers.token
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
