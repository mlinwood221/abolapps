import * as ActionTypes from '@actions/ActionTypes'

export default function base(state = {item:{}, cart_items:[]}, action){
    switch (action.type) { 
        case ActionTypes.CART.REMOVE_ALL:
            return{
                ...state,
                type:action.type,
                cart_items:[],
                added_item:null
            }
        case ActionTypes.CART.PENDING:
            return{
                ...state,
                type:action.type
            }
        case ActionTypes.CART.ADD : 
            const itemExists = state.cart_items.findIndex(itm => itm.id == action.item.id)
            if(itemExists > -1){
                state.cart_items = state.cart_items.map((eItem) => {
                    if(eItem.id === action.item.id){
                        eItem.qty = eItem.qty+1;
                    }
                    return eItem
                })
            }else{
                action.item.qty = 1;
                state.cart_items.push(action.item)
            }
            return {
                ...state,
                type:action.type,
               // cart_items:action.cart_items,
                added_item:action.item
            }
        case ActionTypes.CART.REMOVE : {
            const itemExists = state.cart_items.findIndex(itm => itm.id == action.item.id)
            if(itemExists > -1){
                if(state.cart_items[itemExists].qty > 1){
                    state.cart_items = state.cart_items.map((eItem) => {
                        if(eItem.id === action.item.id){
                            eItem.qty = eItem.qty-1;
                        }
                        return eItem
                    })
                }else{
                    state.cart_items.splice(itemExists, 1)
                }
                
            }
            return {
                ...state,
                type:action.type,
                added_item:null
            }
        }
        default:
            return state
    }
}