import {StyleSheet} from 'react-native'
import {Colors} from '@commons'
import { robotoWeights } from 'react-native-typography'

export default StyleSheet.create({
    bannerContainer:{
        marginHorizontal:16,
        marginVertical:16,
        position:"relative",
        height:150,
        flex:1,
        borderRadius:20,
        elevation:5,
        backgroundColor:Colors.lightGray2
    },
    bannerImg:{
        width:"100%",
        height:"100%",
        resizeMode:"cover",
        borderRadius:20,
    },
    titleContentBoxes:{
        backgroundColor:Colors.light_bg,
        paddingVertical:10,
        paddingHorizontal:16,
        marginVertical:10,
        maxWidth:"50%",
        borderRadius:5
    },
    titleContent:{
        ...robotoWeights.medium,
        color:Colors.primary,
    },
    labelTitle:{
        ...robotoWeights.medium,
        color:Colors.primary
    }
})