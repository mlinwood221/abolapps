import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {movies:null}, action){
    switch (action.type) { 
        /** LOGIN */
        case ActionTypes.HOME_MOVIES.PENDING:
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                message:""
            }
        case ActionTypes.HOME_MOVIES.SUCCESS : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                message:"",
                now_showing:action.now_showing,
                coming_soon:action.coming_soon
            }
        }
        case ActionTypes.HOME_MOVIES.FAIL : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                message:action.message
            }
        }
        case ActionTypes.MOVIE.DETAIL_PENDING : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                is_released:action.released,
                movie_detail:{},
                message:action.message
            }
        }
        case ActionTypes.MOVIE.DETAIL_SUCCESS : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                movie_detail : action.movie_detail,
                message:action.message
            }
        }
        case ActionTypes.MOVIE.DETAIL_FAIL : {
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