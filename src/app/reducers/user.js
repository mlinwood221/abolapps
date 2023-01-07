import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {}, action){
    switch (action.type) {
        /** GET USER */
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
                message:"User load successful",
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
       
        default:
            return state
    }
}