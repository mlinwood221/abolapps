import {StyleSheet} from 'react-native'
import {Colors} from '@commons'
import { robotoWeights } from 'react-native-typography'

export default StyleSheet.create({
    shadowDiv:{
        position:"absolute",
        backgroundColor:Colors.lightGray2,
        maxHeight:276,
        width:"85%",
        alignSelf:"center",
        borderRadius:20,
    },  
    movieTitle:{
        ...robotoWeights.medium,
        fontSize:14,
        color:Colors.primary,
        flex:1,
        flexWrap:"wrap"
    },  
    imgContainer:{
        position:"relative",
        maxHeight:276,
        maxWidth:160,
    }, 
    image:{
        top:0,
        bottom:0,
        left:0,
        right:0,
        width:null,
        maxHeight:270,
        position:"absolute",
        borderRadius:15,
        resizeMode:"cover"
    }
})