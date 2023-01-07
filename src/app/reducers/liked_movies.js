import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {}, action){
    switch (action.type) { 
        case ActionTypes.LIKED_MOVIES.GET_PENDING : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                message:"Loading"
            }
        }
        case ActionTypes.LIKED_MOVIES.GET_SUCCESS : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                liked_movies : action.liked_movies,
                message:action.message
            }
        }
        case ActionTypes.LIKED_MOVIES.GET_FAIL : {
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