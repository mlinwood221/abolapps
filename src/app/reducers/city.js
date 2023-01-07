import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {cities:null}, action){
    switch (action.type) { 
        /** LOGIN */
        case ActionTypes.CITIES.PENDING:
            return {
                ...state,
                type:action.type,
                isRequesting:true,
                message:""
            }
        case ActionTypes.CITIES.SUCCESS : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                message:"",
                cities:action.cities
            }
        }
        case ActionTypes.CITIES.FAIL : {
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                message:action.message
            }
        }
        case ActionTypes.CITIES.SELECTED :{
            return {
                ...state,
                type:action.type,
                isRequesting:false,
                selectedCity : action.selectedCity,
                message:"City Changed"
            }
        }
        default:
            return state
    }
}