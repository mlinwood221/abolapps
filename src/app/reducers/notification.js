import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {}, action){
    switch (action.type) { 
        /** LOGIN */
        case ActionTypes.NOTIFICATION.HISTORY.PENDING :{
            return {
                ...state,
                type:action.type,
                isRequesting: true,
                message:"Loading..."
            }
        }
        case ActionTypes.NOTIFICATION.HISTORY.SUCCESS :{
            return {
                ...state,
                type:action.type,
                isRequesting: false,
                notifications:action.notifications,
                message:action.message
            }
        }
        case ActionTypes.NOTIFICATION.HISTORY.FAIL : {
            return {
                ...state,
                type:action.type,
                isRequesting: false,
                message:action.message
            }
        }
        default:
            return state
    }
}