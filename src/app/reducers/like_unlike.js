import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {}, action){
    switch (action.type) { 
        case ActionTypes.LIKE_MOVIE.PENDING : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                message:"Loading",
                actionId : action.ids,
                isLiked:action.isLiked,
            }
        }
        case ActionTypes.LIKE_MOVIE.SUCCESS : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                actionId : action.ids,
                isLiked:action.isLiked,
                message:action.message
            }
        }
        case ActionTypes.LIKE_MOVIE.FAIL : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                message:action.message
            }
        }
        case ActionTypes.UNLIKE_MOVIE.PENDING : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                actionId : action.ids,
                isUnliked:action.isUnliked,
                message:"Loading"
            }
        }
        case ActionTypes.UNLIKE_MOVIE.SUCCESS : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                actionId : action.ids,
                isUnliked:action.isUnliked,
                message:action.message
            }
        }
        case ActionTypes.UNLIKE_MOVIE.FAIL : {
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