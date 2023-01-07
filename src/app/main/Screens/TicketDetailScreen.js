import React, {Component} from 'react'
import {TicketDetail} from '@pages'

class TicketDetailScreen extends Component{
    render(){
        const {route, navigation} = this.props
        return(
            <TicketDetail navigation={navigation} params={route.params}/>
        )
    }
}


export default TicketDetailScreen