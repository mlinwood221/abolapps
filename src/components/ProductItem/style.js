import {StyleSheet} from 'react-native'
import {Colors} from '@commons'
import {systemWeights} from 'react-native-typography'

export default StyleSheet.create({
    product_thumb : {
        padding:3,
        //borderWidth:.4,
      //  borderColor:Colors.lightGray2,
        borderRadius:5,
        marginHorizontal:8,
        elevation:3,
        backgroundColor:Colors.white,
        marginVertical:5,
        width:113,
    },
    imgContainer:{
        width:110,
        height:95,
    },
    imgProduct:{
        width:110,
        height:95,
        resizeMode:"contain"
    },
    productName:{
        ...systemWeights.regular,
        fontSize:12,
        marginBottom:3,
        flex:1,
        flexWrap:'wrap',
        flexShrink: 1
    }, 
    productPrice:{
        ...systemWeights.semibold,
        color:Colors.primary,
        fontSize:14
    },
    cartIn:{
        paddingHorizontal:5, 
        paddingVertical:5, 
        borderRadius:5, 
        backgroundColor:Colors.white, 
        elevation:2
    }
})