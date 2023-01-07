import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {dataUser:null, dataCookie:null}, action){
    switch (action.type) {
        /** LOGIN */
        case ActionTypes.AUTH.LOGIN.PENDING:
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                isLogedin:false,
                message:""
            }
        case ActionTypes.AUTH.LOGIN.SUCCESS : {
            return{
                ...state,
                type:action.type,
                isRequesting:false,
                isLogedin: action.is_verified,
                message:"Login success",
                userInfo : action.userInfo,
                otp:action.otp
            }
        }
        case ActionTypes.AUTH.LOGIN.VERIFY_PENDING : {
            return{
                ...state,
                type:action.type,
                isRequesting:false,
                isLogedin: false,
                message:"Loading...",
            }
        }
        case ActionTypes.AUTH.LOGIN.VERIFY_SUCCESS : {
            return{ 
                ...state,
                type:action.type,
                isRequesting:false,
                isLogedin: true,
                otp:null,
                message:"Login success",
            }
        }
        case ActionTypes.AUTH.LOGIN.VERIFY_FAIL : {
            return{
                ...state,
                type:action.type,
                isRequesting:false,
                isLogedin: true,
                message:action.message,
            }
        }
        case ActionTypes.AUTH.LOGIN.FAIL : {
            return{
                ...state,
                type:action.type,
                isRequesting:false,
                message:action.message,
                isLogedin: false,
            }
        }
        /** FORGOT PASSWORD */
        case ActionTypes.AUTH.FORGOT_PASSWORD.PENDING:
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                message:""
            }
        case ActionTypes.AUTH.FORGOT_PASSWORD.SUCCESS : {
            return{
                ...state,
                type:action.type,
                isRequesting:false,
                message:action.message,
            }
        }
        case ActionTypes.AUTH.FORGOT_PASSWORD.FAIL : {
            return{
                ...state,
                type:action.type,
                isRequesting:false,
                message:action.message,
            }
        }

        /** SIGN UP */
        case ActionTypes.AUTH.SIGN_UP.PENDING:
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                message:""
            }
        case ActionTypes.AUTH.SIGN_UP.SUCCESS : {
            return{
                ...state,
                type:action.type,
                isRequesting:false,
                isLogedin: false,
                message:action.message,
                // userInfo : action.userInfo
            }
        }
        case ActionTypes.AUTH.SIGN_UP.FAIL : {
            return{
                ...state,
                type:action.type,
                isRequesting:false,
                message:action.message,
                isLogedin: false,
            }
        }
        /** LOGOUT */
        case ActionTypes.AUTH.LOGOUT : {
            return{
                ...state,
                type:action.type,
                isRequesting:false,
                isLogedin: false,
                logedOut:null,
                message:"Logout",
                userInfo : null
            }
        }

        case ActionTypes.PROFILE.GET.PENDING:
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                message:""
            }
        case ActionTypes.PROFILE.GET.SUCCESS : {
            return{
                ...state,
                type:action.type,
                isRequesting:false,
                message:"User load successful",
                userInfo : action.userInfo
            }
        }
        case ActionTypes.PROFILE.GET.FAIL : {
            return{
                ...state,
                type:action.type,
                isRequesting:false,
                message:action.message,
            }
        }

        case ActionTypes.PROFILE.UPDATE.PENDING:
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                message:""
            }
        case ActionTypes.PROFILE.UPDATE.SUCCESS : {
            return{
                ...state,
                type:action.type,
                isRequesting:false,
                message:action.message,
                logedOut : action.logedOut,
                userInfo : action.userInfo
            }
        }
        case ActionTypes.PROFILE.UPDATE.FAIL : {
            return{
                ...state,
                type:action.type,
                isRequesting:false,
                message:action.message,
            }
        }
        case ActionTypes.PROFILE.UPLOAD.PENDING:
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                message:"Uplaoding"
            }
        case ActionTypes.PROFILE.UPLOAD.SUCCESS : {
            return{
                ...state,
                type:action.type,
                isRequesting:false,
                message:action.message,
                image_url : action.image_url
            }
        }
        case ActionTypes.PROFILE.UPLOAD.FAIL : {
            return{
                ...state,
                type:action.type,
                isRequesting:false,
                message:action.message,
            }
        }
        default:
            return state
    }
}