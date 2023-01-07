import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {}, action){
    switch (action.type) {
        case ActionTypes.TICKET.BUY.PENDING : {
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                message:"Loading"
            }
        }
        case ActionTypes.TICKET.BUY.SUCCESS : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                ticket_id:action.ticket_id,
                message:action.message,
            }
        }

        case ActionTypes.TICKET.BUY.FAIL : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                message:action.message,
            }
        }

        case ActionTypes.TICKET.LIST.PENDING : {
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                message:"LOADING",
            }
        }
        case ActionTypes.TICKET.LIST.SUCCESS : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                tickets:action.tickets,
                message:action.message,
            }
        }
        case ActionTypes.TICKET.LIST.FAIL : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                message:action.message,
            }
        }

        case ActionTypes.TICKET.DETAIL.PENDING : {
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                message:"LOADING",
            }
        }
        case ActionTypes.TICKET.DETAIL.SUCCESS : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                ticket:action.ticket,
                message:action.message,
            }
        }
        case ActionTypes.TICKET.DETAIL.FAIL : {
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