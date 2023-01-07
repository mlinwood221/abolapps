import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {benners:null}, action){
    switch (action.type) { 
        /** LOGIN */
        case ActionTypes.BANNERS.PENDING:
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                message:""
            }
        case ActionTypes.BANNERS.SUCCESS : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                message:"",
                banners:action.banners
            }
        }
        case ActionTypes.BANNERS.FAIL : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                message:action.message
            }
        }
        default:
            return state
    }
}