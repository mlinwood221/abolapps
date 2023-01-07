import React from 'react'
import {Signup} from '@pages'

class SignupScreen extends React.Component{
    render(){
        const {navigation} = this.props
        return(
            <Signup navigation={navigation}/>
        )
    }
}


export default SignupScreen