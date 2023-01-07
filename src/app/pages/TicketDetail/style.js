import {StyleSheet} from 'react-native'
import {Colors} from '@commons'
import {systemWeights} from 'react-native-typography'

export default StyleSheet.create({
    foodItemQTY:{
        width:30,
        height:30,
        borderWidth:1,
        borderColor:Colors.lightGray2,
        borderRadius:2
    },
    qtyText:{
        ...systemWeights.semibold,
        color:Colors.primary
    }
})