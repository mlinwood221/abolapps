import React, {Component} from 'react'
import {BuyTicket} from '@pages'

class BuyTicketScreen extends Component{
    render(){
        const {route, navigation} = this.props
        return(
            <BuyTicket navigation={navigation} params={route.params}/>
        )
    }
}


export default BuyTicketScreen