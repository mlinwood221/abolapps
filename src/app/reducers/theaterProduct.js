import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {products:null}, action){
    switch (action.type) { 
        case ActionTypes.THEATER_PRODUCT.PENDING:
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                message:""
            }
        case ActionTypes.THEATER_PRODUCT.SUCCESS:
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                products:action.products,
                message:""
            }
        case ActionTypes.THEATER_PRODUCT.FAIL:
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                products:null,
                message:""
            }
        default :
            return state
    }
}