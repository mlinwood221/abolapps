import React from 'react'
import {TextInput, TouchableOpacity} from 'react-native'
import {View, Text} from 'react-native-ui-lib'
import Icon from 'react-native-vector-icons/Feather'

import {Colors} from '@commons'
import styles from './style'

const Search = (props) =>{
    return (
        <View row style={styles.searchContainer}>
            <TextInput 
                placeholder={__("Search Theater Name")}
                style={styles.searchInput} {...props}/>
            <TouchableOpacity style={{flex:1, justifyContent:"center"}}>
                <Icon name="search" size={20} style={{alignSelf:"center"}} color={Colors.dark}/>
            </TouchableOpacity>
        </View>
    )
}

export default Search