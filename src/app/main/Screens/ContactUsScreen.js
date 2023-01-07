import React, {Component} from 'react'
import {ContactUs} from '@pages'

class ContactUsScreen extends Component{
    render(){
        const {navigation} = this.props
        return(
            <ContactUs navigation={navigation}/>
        )
    }
}


export default ContactUsScreen