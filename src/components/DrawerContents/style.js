import {StyleSheet, Dimensions} from 'react-native'
import {Colors, Constants} from '@commons'
import { robotoWeights } from 'react-native-typography';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
    drawerContainer :{
        // width:width,
        marginTop:Constants.STATUS_BAR_HEIGHT,
    },
    drawerDivider:{
        marginVertical:16,
        height:5,
        backgroundColor:Colors.lightGray
    },
    profileName:{
        ...robotoWeights.medium,
        textTransform:"uppercase",
        color:Colors.primary,
        letterSpacing:.5
    }
})