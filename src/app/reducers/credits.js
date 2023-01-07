import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {}, action){
    switch (action.type) {
        case ActionTypes.CREDIT.ADD.PENDING : {
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                message:"Loading"
            }
        }
        case ActionTypes.CREDIT.ADD.SUCCESS : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                message:action.message,
            }
        }

        case ActionTypes.CREDIT.ADD.FAIL : {
            return {
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