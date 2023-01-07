import {StyleSheet} from 'react-native'
import {Colors, Constants} from '@commons'
import {robotoWeights} from 'react-native-typography'

export default StyleSheet.create({
    container:{
        zIndex:2, 
        backgroundColor:"transparent", 
        elevation:6,
    },
    containerTitle:{
        ...robotoWeights.bold,
        color:Colors.dark,
        fontSize:18,
        textAlign:"center",
        width:"100%"
    },  
    imageLogo:{
        marginVertical:20,
        marginTop:15,
        width:120,
        height:120,
        resizeMode:"contain",
        alignSelf:"center",
    },
    containerShadow:{
        elevation:5,
        backgroundColor:Colors.white,
        borderRadius:5,
        position:"absolute",
        zIndex:1,
        right:0,
        left:0,
        top:0,
        bottom:20,
        minHeight:300
    },
    footer:{
        height:180,
        width:"100%",
        // position:"absolute",
        bottom:0,
        zIndex:0,
        // flexGrow: 1
    },
    footBg:{
        height:"100%",
        width:"100%",
        position:"absolute",
        bottom:0,
        zIndex:0,
        flex:1,
    }
})