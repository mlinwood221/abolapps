import React, {useRef} from 'react'
import {View, Text} from 'react-native-ui-lib'
import {Image, TouchableOpacity} from 'react-native'
import {Colors} from '@commons'
import * as Animatable  from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Feather'

import styles from './style'

const ItemCart = (props) => {
    const viewRef = useRef(null)
    const hideList = () => {
        return new Promise((resolve, reject) => {
            viewRef.current.transitionTo({
                opacity: 0,
                scaleY: 0,
              }, 300)
            setTimeout(() => {
                resolve();
            }, 300) 
        })
        
    }

    const decreaseLocal = (item) => {
        if(item.qty > 1){
            props.onDecrease(item)
        }else{
            hideList().then(() => {
                props.onDecrease(item) 
            })
        }
    }

    return(
        <View flex>
        <Animatable.View ref={viewRef} animation="slideInDown" duration={500} style={{flex:1, flexDirection:"row",justifyContent:"space-between", borderBottomWidth:1, borderBottomColor:Colors.lightGray, paddingVertical:10}} center>
            <Image style={styles.item_product} source={{uri:props.item.image}}/>
            <View flex marginL-10>
            <Text style={styles.productName} numberOfLines={2} text90 grey10>{props.item.name} {props.item.size && "("+props.item.size+")"}</Text>
                <Text style={styles.productPrice} marginT-5 color={Colors.primary} text90>{props.item.price.toString()} BIR</Text> 
            </View>
            <View row centerV>
                <View row center width={95} >
                    <TouchableOpacity style={styles.cartIn}  activeOpacity={.9} onPress={() => decreaseLocal(props.item)}>
                        <Icon name="minus-circle" size={16} color={Colors.gray}/>
                    </TouchableOpacity>
                        <Text text80 marginH-10 >{props.item.qty.toString()}</Text>
                    <TouchableOpacity style={styles.cartIn} activeOpacity={.9} onPress={() => props.onIncrease(props.item)}>
                        <Icon name="plus-circle" size={16} color={Colors.gray}/>
                    </TouchableOpacity>
                </View>
                <View width={75} >
                    <Text style={{textAlign:"right"}} text80>
                        {props.item.price*props.item.qty} BIR
                    </Text>
                </View>
                
            </View>
            
        </Animatable.View>
        </View>
    )
}

export default ItemCart