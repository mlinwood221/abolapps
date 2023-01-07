import {StyleSheet} from 'react-native'
import {Colors} from '@commons'
export default StyleSheet.create({
    searchContainer:{
        width:"100%",
        backgroundColor: Colors.lightGray,
        borderRadius:30,
        height:40,
        elevation:4,
        alignItems:"center"
    },
    searchInput :{
        backgroundColor:Colors.white,
        paddingHorizontal:20,
        borderRadius:30,
        borderTopRightRadius:0,
        borderBottomRightRadius:0,
        width:"83%",
        color:Colors.dark,
    }
})