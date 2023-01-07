import * as ActionTypes from './ActionTypes'
import * as Services from '@services'

import {AsyncStorage} from '@react-native-community/async-storage'


export const aboutUs = () => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.CONTENT.ABOUT.PENDING})
        Services.aboutUs()
        .then(response => {
            
            dispatch({type:ActionTypes.CONTENT.ABOUT.SUCCESS, data:response.data})
        }).catch(err => {
            if(!err){
                dispatch({type:ActionTypes.CONTENT.ABOUT.FAIL, message:"Cannot connect to server"})
                console.log("Cannot connect to server");    
                return;
            }
            dispatch({type:ActionTypes.CONTENT.ABOUT.FAIL, message:err.message})
        })
    }
}

export const contactUs = () => {
    return(dispatch, getState) => { 
        dispatch({type:ActionTypes.CONTENT.CONTACT.PENDING})
        Services.contactUs()
        .then(response => {
            dispatch({type:ActionTypes.CONTENT.CONTACT.SUCCESS, data:response.data})
        }).catch(err => {
            if(!err){
                dispatch({type:ActionTypes.CONTENT.CONTACT.FAIL, message:"Cannot connect to server"})
                console.log("Cannot connect to server");    
                return;
            }
            dispatch({type:ActionTypes.CONTENT.CONTACT.FAIL, message:err.message})
        })
    }
}

