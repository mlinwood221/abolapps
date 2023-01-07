import React, {Component} from 'react'
//import {View, Text} from 'react-native'
import {View, Text} from 'react-native-ui-lib'

import {Login} from '@pages'

class LoginScreen extends Component{
    render(){
        const {route,navigation} = this.props
        return(
            <Login navigation={navigation} params={route.params}/>
        )
    }
}


export default LoginScreen