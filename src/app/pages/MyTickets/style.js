import {StyleSheet} from 'react-native'
import {Colors} from '@commons'
import { robotoWeights } from 'react-native-typography'

export default StyleSheet.create({
    theater:{
        ...robotoWeights.condensedBold,
    },
    location:{
        ...robotoWeights.regular,
        color:Colors.gray
    },
    movieName:{
        ...robotoWeights.medium,
        color:Colors.primary,
    }
})