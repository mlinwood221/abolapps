import React, {Component} from 'react'
import {Notification} from '@pages'

class NotificationScreen extends Component{
    render(){
        const {navigation} = this.props
        return(
            <Notification navigation={navigation}/>
        )
    }
}


export default NotificationScreen