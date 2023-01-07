import React from 'react'
import {Verification} from '@pages'


class VerificationScreen extends React.Component{
    render(){
        const {route, navigation} = this.props
        return(
            <Verification navigation={navigation} params={route.params}/>
        )
    }
}

export default VerificationScreen