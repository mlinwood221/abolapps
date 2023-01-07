import React, {useEffect, useState} from 'react'
import {View, Text} from 'react-native-ui-lib'
import {TouchableOpacity, FlatList} from 'react-native'
import {ItemCart} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'

const Cart = (props) => {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        return () => props.clearCart()
    },[])
    useEffect(() => {
        
        if(props.cart_type === ActionTypes.CART.ADD || props.cart_type === ActionTypes.CART.REMOVE){
          setCartItems(props.items)
        }
    },[props.cart_type, props.items]) 

    return(
        <View flex>
            {cartItems && 
                <FlatList
                    keyExtractor={item => item.id+"_cart"}
                    data={cartItems}
                    renderItem={({item}) => <ItemCart item={item} 
                        onIncrease={props.addItem}
                        onDecrease={props.cartDecrease}/>}
                />
            }
        </View>
    )
}

function mapStateToProps({cartReducers}){
    return {
        cart_type:cartReducers.type,
        added_item:cartReducers.added_item,
        items:cartReducers.cart_items
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart)