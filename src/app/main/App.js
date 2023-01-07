import React, {Component} from 'react'
import {View, AppState, Text} from 'react-native'
import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-community/async-storage'


import Router from './Router'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'
import {ActionCreators} from '@actions'
import {I18nLocalize, i18n, withLanguage} from 'react-native-i18n-localize'
import {Spinner} from '@components'
import {Colors} from '@commons'

import {am, en} from '@commons/lang'

I18nLocalize.initialLanguage({en, am})

class App extends Component{
    constructor(props){
        super(props)
        this.setupLanguage()
        this.state = {
            isLoading : false,
            appState: AppState.currentState,
        }
        this.navigation_ref = null
    }

    render(){
        return (<View style={{ flex:1 }}>
                <Spinner visible={this.state.isLoading} color={Colors.white} overlayColor={"rgba(0,0,0,.3)"}/> 
             <Router setReff={(refs) => {
                 if(!this.navigation_ref ){
                    this.navigation_ref = refs
                    this.initOnOpenNotif();
                 }
             }}/>
        </View>)
    }

    setupLanguage () {
        if(!this.props.lang){
            const checkLocale = I18nLocalize.getLocale();
            if(checkLocale === 'am' || checkLocale === 'en'){
                this.props.setInitLang(checkLocale)
                I18nLocalize.setLanguage(checkLocale)
            }else{
                this.props.setInitLang('en')
                I18nLocalize.setLanguage('en')
            } 
        }else{
            I18nLocalize.setLanguage(this.props.lang) 
        }
    }

    async initOnOpenNotif(){
        messaging().onNotificationOpenedApp(remoteMessage => {
            this.navigation_ref.navigate("NotificationScreen")
        })
    }

    componentDidMount(){
        
        this.props.getToken()
        this.props.sync_notification();
        //messaging().subscribeToTopic("")
        messaging().onMessage(async remoteMessage => {
           this.props.newNotification()
        })
        AppState.addEventListener("change", this._handleAppStateChange);
        
        global.__ = i18n.t 
        // ActionCreators.setContext(this)
   
    }

    componentWillUnmount(){
        AppState.removeEventListener("change", this._handleAppStateChange);
    }

    componentWillReceiveProps(nextProps, nexState){ 
        if(nextProps.type === ActionTypes.SETTING.LANGUAGE_PREPARE){
            this.setState({isLoading:true})
        }
        if(nextProps.type === ActionTypes.SETTING.LANGUAGE_CHANGED){
            I18nLocalize.setLanguage(nextProps.lang)
            this.setState({isLoading:false})
        }

        if(nextProps.auth_type === ActionTypes.AUTH.LOGOUT){
            // messaging().deleteToken().then(() => {
            //     this.props.getToken() 
            // })
            
        }
       
    }

    _handleAppStateChange = nextAppState => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
            this.props.sync_notification();
        }
        this.setState({ appState: nextAppState });
      };
}

function mapStateToProps({settingReducers, authReducers}){
    return {
        type:settingReducers.type,
        lang : settingReducers.lang,
        deviceToken : settingReducers.token,
        auth_type : authReducers.type
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators,dispatch) 
}

export default connect(mapStateToProps, mapDispatchToProps)(App)