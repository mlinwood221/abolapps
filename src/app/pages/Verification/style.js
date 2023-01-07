import {StyleSheet} from 'react-native'
import {Colors} from '@commons'
import { robotoWeights } from 'react-native-typography'

export default StyleSheet.create({
    inputNumber:{
        ...robotoWeights.bold,
        backgroundColor:Colors.lightGray,
        borderRadius:10,
        width:25,
        paddingVertical:5,
        textAlign:"center",
        fontSize:18,
    }
})