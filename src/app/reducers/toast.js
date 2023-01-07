import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {dataUser:null, dataCookie:null}, action){
    switch (action.type) {
        /** LOGIN */
        case ActionTypes.TOAST.SHOW:
            return {
                ...state,
                type:action.type,
                message:""
            }
        case ActionTypes.TOAST.DISMISS:
            return {
                ...state,
                type:action.type,
                message:""
            }
        default:
            return state
    }

}