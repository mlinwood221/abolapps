import {StyleSheet} from 'react-native'
import { robotoWeights } from 'react-native-typography'
import {Colors} from '@commons'

export default StyleSheet.create({
    sectionTitle :{
        ...robotoWeights.medium,
        color:Colors.primary,
        fontSize:16
    },
    dateSelect:{
        width:200,
        backgroundColor:Colors.light_bg,
        borderRadius:10,
        alignSelf:"center",
        borderColor:Colors.lightGray
    },
    optionlabel:{
        ...robotoWeights.medium,
        color:Colors.primary,
        fontSize:14,
    },
    group_title:{
        ...robotoWeights.medium,
        color:Colors.primary,
        fontSize:16
    }
})