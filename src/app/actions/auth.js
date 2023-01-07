import * as ActionTypes from './ActionTypes'
import * as Services from '@services'

import {AsyncStorage} from '@react-native-community/async-storage'

export const signIn = (data) => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.AUTH.LOGIN.PENDING})
        console.log(data);
        Services.signIn(data)
        .then(response => {
            const isVerified = response.opt ? false : true;
            dispatch({type:ActionTypes.AUTH.LOGIN.SUCCESS, userInfo:response.data, otp:response.opt, is_verified:isVerified})
        })
        .catch(err => {
            /** demo */
            
        //    return dispatch({type:ActionTypes.AUTH.LOGIN.SUCCESS, userInfo:{
        //        name:'eko',
        //        email:'aa@mail.com',
        //        secret:'adasd-asdser-asddd',
        //        balance:0
        //    }, otp:null, is_verified:true});
            if(!err){
                dispatch({type:ActionTypes.AUTH.LOGIN.FAIL, message:"Cannot connect to server"})
                console.log("Cannot connect to server");    
                return;
            }
           dispatch({type:ActionTypes.AUTH.LOGIN.FAIL, message:err.message})
        })
    }
}

export const setVerify = () => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.AUTH.LOGIN.VERIFY_PENDING})
        Services.setVerify()
        .then(response => {
            console.log(response) 
            dispatch({type:ActionTypes.AUTH.LOGIN.VERIFY_SUCCESS})
        })
        .catch(err => {
            if(!err){
                dispatch({type:ActionTypes.AUTH.LOGIN.VERIFY_SUCCESS, message:"Cannot connect to server"})
                console.log("Cannot connect to server");    
                return;
            }
           dispatch({type:ActionTypes.AUTH.LOGIN.VERIFY_SUCCESS, message:err.message})
        })
    }
}


export const signUp = (data) => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.AUTH.SIGN_UP.PENDING})
       
        Services.signUp(data) 
        .then(response => {
            dispatch({type:ActionTypes.AUTH.SIGN_UP.SUCCESS, message:response.message})
        })
        .catch(err => {
            if(!err){
                dispatch({type:ActionTypes.AUTH.SIGN_UP.FAIL, message:"Cannot connect to server"})
                
                return; 
            }
            dispatch({type:ActionTypes.AUTH.SIGN_UP.FAIL, message:err.message})
        })
    }
}



export const forgotPassword = (data) => {
    return (dispatch, getState) => {
        dispatch({type:ActionTypes.AUTH.FORGOT_PASSWORD.PENDING})

        Services.forgotPassword(data)
        .then(response => {
            dispatch({type:ActionTypes.AUTH.FORGOT_PASSWORD.SUCCESS, message:response.message})
        })
        .catch(err => {
            if(!err){
                dispatch({type:ActionTypes.AUTH.FORGOT_PASSWORD.FAIL, message:"Cannot connect to server"})
                console.log("Cannot connect to server");    
                return;
            }
            dispatch({type:ActionTypes.AUTH.FORGOT_PASSWORD.FAIL, message:err.message})
        })
    }
}

export const signOut = (data) => {
    return (dispatch, getState) => {
        dispatch({type:ActionTypes.AUTH.LOGOUT})
        Services.logout(data)
        .then(response => { })
        .catch(err => {
            if(!err){
                console.log("Cannot connect to server");    
                return;
            }
        })
    }
}

export const getUser = () => {
    return (dispatch, getState) => {
        dispatch({type:ActionTypes.PROFILE.GET.PENDING})

        Services.getUser()
        .then(response => {
            dispatch({type:ActionTypes.PROFILE.GET.SUCCESS, userInfo:response.data, message:response.message})
        })
        .catch(err => {
            if(!err){
                dispatch({type:ActionTypes.PROFILE.GET.FAIL, message:"Cannot connect to server"})
                console.log("Cannot connect to server"); 
                return;
            }
            dispatch({type:ActionTypes.PROFILE.GET.FAIL, message:err.message})
        })
    }
}


export const updateUser = (data) => {
    return (dispatch, getState) => {
        dispatch({type:ActionTypes.PROFILE.UPDATE.PENDING})
     
        Services.updateUser(data)
        .then(response => {
            const logedOut = !response.smsverify ? true : false
            dispatch({type:ActionTypes.PROFILE.UPDATE.SUCCESS,userInfo:response.data, message:response.message, logedOut})
        })
        .catch(err => {
            if(!err){
                dispatch({type:ActionTypes.PROFILE.UPDATE.FAIL, message:"Cannot connect to server"})
                console.log("Cannot connect to server");    
                return;
            }
            dispatch({type:ActionTypes.PROFILE.UPDATE.FAIL, message:err.message})
        })
    }
}

export const profileUpload = (data) => {
    return (dispatch, getState) => {
        dispatch({type:ActionTypes.PROFILE.UPLOAD.PENDING})
     
        Services.profileUpload(data)
        .then(response => {
            const {image_url} = response.data
           dispatch({type:ActionTypes.PROFILE.UPLOAD.SUCCESS,image_url, message:response.message})
        })
        .catch(err => {
            if(!err){
                dispatch({type:ActionTypes.PROFILE.UPLOAD.FAIL, message:"Cannot connect to server"})
                console.log("Cannot connect to server");    
                return;
            }
            dispatch({type:ActionTypes.PROFILE.UPLOAD.FAIL, message:err.message})
        })
    }
}
