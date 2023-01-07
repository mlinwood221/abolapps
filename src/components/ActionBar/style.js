import {StyleSheet} from 'react-native'
import {Colors, Constants} from '@commons'
import { robotoWeights } from 'react-native-typography'

export default StyleSheet.create({
    container:{
        height:Constants.HEADER_HEIGHT,
        backgroundColor:Colors.primary,
        justifyContent:"space-between",
        alignItems:"center",
        zIndex:1
    },
    innerColor:{
        color:Colors.white
    },
    leftIcon:{
        padding:10,
        margin:5,
    },
    rightContainer:{
        marginRight:5, 
    },
    rightIcon:{
        marginHorizontal:2,
        padding:10,
    },
    innerText:{
        color:Colors.white
    },
    centerTitle:{
        flex:1,
        paddingVertical:15,
    },
    actionTitle:{
        ...robotoWeights.medium,
        fontSize:18,
        color:Colors.white
    },
    badge:{
        position:"absolute",
        right:4,
        top:2
    },

    dropdown_2: {
        alignSelf: 'flex-end',
        width: 150,
        marginTop: 32,
        right: 8,
        borderWidth: 0,
        borderRadius: 3,
        backgroundColor: 'cornflowerblue',
      },
      dropdown_2_text: {
        marginVertical: 10,
        marginHorizontal: 6,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
      },
      dropdown_2_dropdown: {
        width: 150,
        maxHeight: 250,
        borderColor: Colors.lightGray,
        borderRadius: 3,
        elevation:50,
        marginTop:-10,
      },
      dropdown_2_row: {
        flexDirection: 'row',
        // height: 40,
        alignItems: 'center',
      },
      
      dropdown_2_row_text: {
        ...robotoWeights.regular,
        marginHorizontal: 4,
        fontSize: 14,
        color: Colors.primary,
      },
      dropdown_2_separator: {
        height: 2,
        backgroundColor: Colors.primary,
      },
})