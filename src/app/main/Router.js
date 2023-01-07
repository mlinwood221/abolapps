import React,{Component, useState, useEffect, createContext} from 'react'
import {Dimensions} from 'react-native'
import {iOSColors, robotoWeights} from 'react-native-typography'
//import {Constants} from '@commons'
import {NavigationContainer, useNavigation} from '@react-navigation/native'
import {createStackNavigator, TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
import messaging from '@react-native-firebase/messaging'

import {DrawerContent} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'

import SplashScreen from './Screens/SplashScreen'

import HomeScreen from './Screens/HomeScreen'
import LoginScreen from './Screens/LoginScreen'
import SignupScreen from './Screens/SignupScreen'
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen'
import TheaterScreen from './Screens/TheaterScreen'
import TheaterDetailScreen from './Screens/TheaterDetailScreen'
import MovieDetailScreen from './Screens/MovieDetailScreen'

import ProfileScreen from './Screens/ProfileScreen'
import LikedMovieScreen from './Screens/LikedMovieScreen'
import NotificationScreen from './Screens/NotificationScreen'
import AboutUsScreen from './Screens/AboutUsScreen'
import ContactUsScreen from './Screens/ContactUsScreen'
import VerificationScreen from './Screens/VerificationScreen'
import BuyTicketScreen from './Screens/BuyTicketScreen'
import DepositScreen from './Screens/DepositScreen'
import MyTicketScreen from './Screens/MyTicketScreen'
import TicketDetailScreen from './Screens/TicketDetailScreen'



const Stack = createStackNavigator();
const screenWidth = Dimensions.get('window').width
const Drawer = createDrawerNavigator();
export const AuthContext = createContext(null)

const stackScreenOpt = {
    headerShown:false,
    transitionSpec:{
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
}

const DrawerView = () => {
    const [isInitialRender, setIsInitialRender] = useState(false);
    
    if (!isInitialRender) {
        setTimeout(() => setIsInitialRender(true), 1);
    } 
    
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>} drawerStyle={{width:isInitialRender? null:0}}> 
                <Drawer.Screen name="HomeScreen" component={HomeScreen}  
                    options={stackScreenOpt}/>
                 
        </Drawer.Navigator>
    )
}

// export const AuthContext = createContext(null)
const Router = (props) => {
  
    const [isLoading, setLoading] = useState(true);
    const  [isLoggedin, setIsLogin] = useState(null)
   
 
    useEffect(() => {
        setTimeout(() => {
            setLoading(false) 
        },1500);
       
    }, [])

    useEffect(() => {
        if(props.isLogedin){
            setIsLogin(true)
        }else{
            setIsLogin(false)
        }
    },[props.isLogedin])

    if(isLoading){
        return <SplashScreen/>
    }
    
    return (
        <AuthContext.Provider value={props.userInfo}>
            <NavigationContainer ref={ref => props.setReff(ref)}>
                <Stack.Navigator >
                    <Stack.Screen name="Home" component={DrawerView} 
                        options={stackScreenOpt}/>
                    {!isLoggedin && 
                        <>
                        <Stack.Screen name="LoginScreen" component={LoginScreen} 
                            options={stackScreenOpt}/>
                        <Stack.Screen name="SignupScreen" component={SignupScreen} 
                            options={stackScreenOpt}/>
                        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} 
                            options={stackScreenOpt}/>
                        <Stack.Screen name="VerificationScreen" component={VerificationScreen} 
                            options={stackScreenOpt}/>
                        </>
                    }
                    <Stack.Screen name="TheaterScreen" component={TheaterScreen} 
                        options={stackScreenOpt}/>
                    <Stack.Screen name="LikedMovieScreen" component={LikedMovieScreen} options={stackScreenOpt} />
                    <Stack.Screen name="TheaterDetailScreen" component={TheaterDetailScreen}
                        options={stackScreenOpt}/>
                    <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} options={stackScreenOpt}/>
                    <Stack.Screen name="ProfileScreen" component={ProfileScreen}
                        options={stackScreenOpt}/>
                    <Stack.Screen name="NotificationScreen" component={NotificationScreen}
                        options={stackScreenOpt}/>
                    <Stack.Screen name="AboutUsScreen" component={AboutUsScreen}
                        options={stackScreenOpt}/>
                    <Stack.Screen name="ContactUsScreen" component={ContactUsScreen}
                        options={stackScreenOpt}/>
                    <Stack.Screen name="BuyTicketScreen" component={BuyTicketScreen}
                        options={stackScreenOpt}/>
                    <Stack.Screen name="DepositScreen" component={DepositScreen}
                        options={stackScreenOpt}/>
                    <Stack.Screen name="MyTicketScreen" component={MyTicketScreen}
                        options={stackScreenOpt}/>
                    <Stack.Screen name="TicketDetailScreen" component={TicketDetailScreen}
                        options={stackScreenOpt}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    )
}

function mapStateToProps({authReducers}){
    return {
        isLogedin:authReducers.isLogedin,
        userInfo:authReducers.userInfo
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Router);  