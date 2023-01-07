import React, {Component} from 'react'
import {Profile} from '@pages'

class ProfileScreen extends Component{
    render(){
        const {navigation} = this.props
        return(
            <Profile navigation={navigation}/>
        )
    }
}


export default ProfileScreen