import React, {Component} from 'react'
import {Deposit} from '@pages'

class DepositScreen extends Component{
    render(){
        const {navigation} = this.props
        return(
            <Deposit navigation={navigation}/>
        )
    }
}


export default DepositScreen