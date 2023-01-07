import React from 'react'
import {TheaterDetail} from '@pages'


class TheaterDetailScreen extends React.Component{
    render(){
        const {route ,navigation} = this.props
        
        return(
            <TheaterDetail navigation={navigation} params={route.params} />
        )
    }
}

export default TheaterDetailScreen