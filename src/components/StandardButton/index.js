import React from 'react'
import {TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {View, Text} from 'react-native-ui-lib'
import styles from './style'

const StandardButton = (props) => {

    return (
        <TouchableOpacity onPress={() => props.onClick()}>
            <LinearGradient start={{x:1,y:0}} end={{x:0, y:1}} colors={["#563f86","#70599d"]} style={{...styles.btnContainer,...props.style}}>
                <Text style={{...styles.btnLabel, ...props.labelStyle}}>{props.label}</Text>
            </LinearGradient> 
        </TouchableOpacity>
    )
}

export default StandardButton