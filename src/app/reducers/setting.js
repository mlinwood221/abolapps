import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {}, action){
    switch (action.type) { 
        /** LOGIN */
        case ActionTypes.SETTING.LANGUAGE_PREPARE :{
            return {
                ...state,
                type:action.type,
            }
        }
        case ActionTypes.SETTING.LANGUAGE_CHANGED :{
            return {
                ...state,
                type:action.type,
                lang : action.lang
            }
        }
        case ActionTypes.TOKEN.SAVE : {
            return {
                ...state,
                type:action.type,
                token:action.token
            }
        }
        case ActionTypes.TOKEN.REFRESH.PENDING : {
            return {
                ...state,
                type : action.type,
                message : ""
            }
        }
        case ActionTypes.TOKEN.REFRESH.SUCCESS : {
            return {
                ...state,
                type : action.type,
                token : action.token,
                message : action.messsage
            }
        }
        case ActionTypes.TOKEN.REFRESH.PENDING : {
            return {
                ...state,
                type : action.type,
                message : ""
            }
        }
        case ActionTypes.NOTIFICATION.SYNC : {
            return {
                ...state,
                type: action.type,
                notif_count : action.notif_count
            }
        }
        case ActionTypes.NOTIFICATION.NEW : {
            return {
                ...state,
                type: action.type,
                notif_count : action.notif_count
            }
        }
        case ActionTypes.NOTIFICATION.RESET : {
            return {
                ...state,
                type: action.type,
                notif_count : null
            }
        }
        default:
            return state
    }
}