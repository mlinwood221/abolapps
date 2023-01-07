import {StyleSheet, Dimensions} from 'react-native'
import {Colors} from '@commons'

const screenWidth = Dimensions.get('window').width

export default StyleSheet.create({
    drawer :{
        width:screenWidth
    },  
    btnContainer:{
        paddingVertical:5,
        borderRadius:50,
        minWidth:50,
        minHeight:30,
        paddingHorizontal:30
    },
    btnLabel : {
        color:Colors.white,
        textAlign:"center",
        fontSize:14,
    }
})