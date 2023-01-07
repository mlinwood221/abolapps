import {StyleSheet} from 'react-native'
import {systemWeights} from 'react-native-typography'
import {Colors} from '@commons'

export default StyleSheet.create({
    item_product:{
        width:35,
        height:35,
        resizeMode:"contain"
    },
    productName:{
        ...systemWeights.regular,
        flexWrap:"wrap"
    },
    productPrice:{
        ...systemWeights.semibold
    },
    cartIn:{
        paddingHorizontal:5, 
        paddingVertical:5, 
        borderRadius:5, 
        backgroundColor:Colors.white, 
        elevation:2
    }
})