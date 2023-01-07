import React, {Component} from 'react'
import {Home} from '@pages'

class HomeScreen extends Component{
    render(){
        const {navigation} = this.props
        return(
            <Home navigation={navigation}/>
        )
    }
}


export default HomeScreen