import React, {Component} from 'react'
import {AboutUs} from '@pages'

class AboutUsScreen extends Component{
    render(){
        const {navigation} = this.props
        return(
            <AboutUs navigation={navigation}/>
        )
    }
}


export default AboutUsScreen