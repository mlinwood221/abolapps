import React from 'react'
import {View, Text} from 'react-native-ui-lib'
import {robotoWeights} from 'react-native-typography'

const AlertContainer = (props) => {
    
    return(
        <>
        {props.success 
            ? <View row marginB-16 bg-green70 style={{borderRadius:3}}> 
                <View width={5} bg-green10/>
                <View flex paddingH-10 paddingV-5 >
                    <Text green10  text100 style={{...robotoWeights.regular}}>{props.text} </Text>
                </View>
            </View>
            : <View row marginB-16 bg-red70 style={{borderRadius:3}}> 
                <View width={5} bg-red20/>
                <View flex paddingH-10 paddingV-5 >
                    <Text red10 text100 style={{...robotoWeights.regular}}>{props.text} </Text>
                </View>
            </View>
            }
        </>
    );
}

export default AlertContainer