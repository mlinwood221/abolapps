import React, {useEffect, useState} from 'react'
import {View, Text, Button} from 'react-native-ui-lib'
import {Image, TouchableOpacity} from 'react-native'
import styles from './style'
import {Colors} from '@commons'
import {StandardButton} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'
import Icon from 'react-native-vector-icons/Feather'


const ProductItem = (props) => {
    const [itemCart, setItemCart] = useState(null);
    const {item} = props

    useEffect(() => {
        const isOnCart = () => {
            if(props.cart_items){
                const idx = props.cart_items.findIndex((itm) => itm.id === item.id)
                if(idx > -1){
                    setItemCart(props.cart_items[idx])
                }else{
                    setItemCart(null)
                }
            }else{
                setItemCart(null)
            }
        }
        return () => isOnCart()
    },[props.cart_type, props.cart_items])

    
    
    return(
        <View style={styles.product_thumb}>
            <View style={styles.imageContainer}>
                <Image source={{uri:item.image}} style={styles.imgProduct}/>
            </View>
            <View flex paddingH-5 paddingV-10>
                <Text style={styles.productName} numberOfLines={2}>{item.name} {item.size && "("+item.size+")"}</Text>
                <Text style={styles.productPrice} marginT-2>{item.price} BIR</Text>
                {!itemCart ? 
                <View center marginT-10>
                    <Button label={"Add"} onPress={() => props.addItem(item)} style={{height:20}} center  size={Button.sizes.xSmall} labelStyle={{fontSize:11}} backgroundColor={Colors.primary}/>
                </View>
                : <View center marginT-10>
                    <View row centerH >
                        <TouchableOpacity style={styles.cartIn}  activeOpacity={.9} onPress={() => props.cartDecrease(item)}>
                            <Icon name="minus-circle" size={16} color={Colors.gray}/>
                        </TouchableOpacity>
                            <Text text80 marginH-10 >{itemCart.qty.toString()}</Text>
                        <TouchableOpacity style={styles.cartIn} activeOpacity={.9} onPress={() => props.addItem(item)}>
                            <Icon name="plus-circle" size={16} color={Colors.gray}/>
                        </TouchableOpacity>
                    </View>
                </View>
                }
            </View>
        </View>
    )
}

function mapStateToProps({cartReducers}){
    return {
        cart_type:cartReducers.type,
        cart_items:cartReducers.cart_items
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)
