import {StyleSheet} from 'react-native'
import {Colors} from '@commons'

export default StyleSheet.create({
    container:{
        zIndex:2, 
        backgroundColor:"transparent", 
        elevation:6,
    },
    containerShadow:{
        elevation:5,
        backgroundColor:Colors.white,
        borderRadius:5,
        position:"absolute",
        zIndex:1,
        right:0,
        left:0,
        top:0,
        bottom:20,
        minHeight:300
    },
})