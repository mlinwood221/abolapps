import * as ActionTypes from './ActionTypes'
import * as Services from '@services'

import AsyncStorage from '@react-native-community/async-storage'
import {I18nLocalize } from 'react-native-i18n-localize'
//import * as lang from '@commons/lang'

import messaging from '@react-native-firebase/messaging'

export const setInitLang = (lang = en) => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.SETTING.LANGUAGE_CHANGED, lang:lang})
    }
}
export const switchLanguage = (lang = null) => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.SETTING.LANGUAGE_PREPARE, lang:lang})
        const currentLocale = I18nLocalize.getLocale();
        let lang = null;
        if(currentLocale === 'en'){
            lang = 'am'
        }else{
            lang = 'en'
        }

        setTimeout(() => {
            dispatch({type:ActionTypes.SETTING.LANGUAGE_CHANGED, lang:lang})
        }, 1000);
        
    }
}

export const getToken = () => {
    return async (dispatch, getState) => {
        // const test = await messaging().deleteToken() 
        // console.log("INI TESTING", test);
        messaging().getToken().then(token => {
            dispatch({type: ActionTypes.TOKEN.SAVE, token})
        })
    }
}

export const sync_notification = () => {
    return async (dispatch, getState) => {
        const { settingReducers } = getState()
        const hasNotif = await AsyncStorage.getItem("notifBadgeCount")
        if(hasNotif){
            const bgCount = parseInt(hasNotif)
            const rdxCount = settingReducers.notif_count ? settingReducers.notif_count : 0
            
            const notif_count = rdxCount+bgCount
            await AsyncStorage.removeItem("notifBadgeCount")

            dispatch({type:ActionTypes.NOTIFICATION.SYNC, notif_count})
        }
    }
}

export const newNotification = () => {
    return (dispatch,getState) => {
        const { settingReducers } = getState()
        const notif_count = settingReducers.notif_count ? settingReducers.notif_count+1 : 1

        dispatch({type:ActionTypes.NOTIFICATION.NEW, notif_count})
    }
}

export const resetNotification = () => {
    return (dispatch,getState) => {
        dispatch({type:ActionTypes.NOTIFICATION.RESET})
    }
}
