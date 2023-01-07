import {StyleSheet} from 'react-native'
import {Colors} from '@commons'
import { robotoWeights } from 'react-native-typography'

export default StyleSheet.create({
    pageTitle : {
        ...robotoWeights.medium,
        fontSize:18
    },
    floatingPlaceholder : {
        ...robotoWeights.light,
        color:Colors.gray,
        fontSize:12,
        marginBottom:0,
    },
    formStyle:{
        ...robotoWeights.regular,
        fontSize:16,
        borderBottomWidth:1,
        borderBottomColor:Colors.lightGray2
        // backgroundColor:"#ddd"
    },
    containerForm:{
        marginBottom:16
    }
})