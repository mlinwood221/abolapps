import {StyleSheet} from 'react-native'
import {Colors} from '@commons'
import { robotoWeights } from 'react-native-typography'

export default StyleSheet.create({
    itemContainer:{
        backgroundColor:Colors.light_bg,
        borderRadius:10,
        marginBottom:16,
    },
    image:{
        width:100,
        height:100,
        resizeMode:"cover",
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
    },
    movieTitle:{
        ...robotoWeights.medium,
        color:Colors.primary,
    }
})