import React, {Component} from 'react'
import {ForgotPassword} from '@pages'

class ForgotPasswordScreen extends Component{
    render(){
        const {navigation} = this.props
        return(
            <ForgotPassword navigation={navigation}/>
        )
    }
}


export default ForgotPasswordScreen