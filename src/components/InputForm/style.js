import {StyleSheet} from 'react-native'
import {Colors} from '@commons'
import {robotoWeights} from 'react-native-typography'

export default StyleSheet.create({
    fieldIcon : {
        width:50,
        height:50,
        borderWidth:0.7,
        borderColor:Colors.primary,
        borderRadius:40,
        backgroundColor: Colors.white,
        zIndex:1,
    },
    inputBox:{
        backgroundColor:Colors.primary,
        flex:1,
        borderRadius:40,
        height:40,
        marginLeft:-30,
    },
    input:{
        ...robotoWeights.light,
        fontSize:14,
        flex:1,
        zIndex:2,
        color:Colors.white,
        backgroundColor:"transparent",
    }
})