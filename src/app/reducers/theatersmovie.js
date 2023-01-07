import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {theaters:null}, action){
    switch (action.type) { 
        case ActionTypes.THEATER.MOVIES.PENDING:
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                message:""
            }
        case ActionTypes.THEATER.MOVIES.SUCCESS : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                message:"",
                theaters:action.theaters
            }
        }
        case ActionTypes.THEATER.MOVIES.FAIL : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                message:action.message
            }
        }

        case ActionTypes.THEATER.DETAIL.PENDING:
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                message:""
            }
        case ActionTypes.THEATER.DETAIL.SUCCESS : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                message:"",
                theater_movies:action.theater_movies
            }
        }
        case ActionTypes.THEATER.DETAIL.FAIL : {
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