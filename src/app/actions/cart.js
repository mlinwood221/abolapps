import * as ActionTypes from './ActionTypes'

export const addItem = (item) => {
    return(dispatch, getState) => {
        
       // item.qty = 1
        // const {cartReducers} = getState()
        // console.log("OLD ITEM",cartReducers)
        dispatch({type:ActionTypes.CART.PENDING}) 
        // const newItems = cartReducers.cart_items ?? []
        
        // const existItem = newItems.findIndex(itm => itm.id == item.id)
        
        // if(existItem > -1){
        //     console.log("test", newItems[existItem])
        //     newItems[existItem].qty++
        // }else{
        //     newItems.push(item)
        // }
        
        setTimeout(() => {
         //  console.log("NEW ITEM",newItems)
            dispatch({type:ActionTypes.CART.ADD, item}) 
        }, 50);
        
    }
}

export const cartDecrease = (item) => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.CART.PENDING}) 
        setTimeout(() => {
               dispatch({type:ActionTypes.CART.REMOVE, item}) 
        }, 50);
    }
}

export const clearCart = () => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.CART.REMOVE_ALL}) 
    }
}