import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {benners:null}, action){
    switch (action.type) { 
        case ActionTypes.CONTENT.ABOUT.PENDING:
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                message:""
            }
        case ActionTypes.CONTENT.ABOUT.SUCCESS : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                message:"",
                data:action.data
            }
        }
        case ActionTypes.CONTENT.ABOUT.FAIL : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                message:action.message
            }
        }
        case ActionTypes.CONTENT.CONTACT.PENDING:
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                message:""
            }
        case ActionTypes.CONTENT.CONTACT.SUCCESS : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                message:"",
                data:action.data
            }
        }
        case ActionTypes.CONTENT.CONTACT.FAIL : {
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