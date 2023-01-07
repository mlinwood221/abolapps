import React, {Component} from 'react'
import {MyTickets} from '@pages'

class MyTicketScreen extends Component{
    render(){
        const {navigation} = this.props
        return(
            <MyTickets navigation={navigation}/>
        )
    }
}


export default MyTicketScreen