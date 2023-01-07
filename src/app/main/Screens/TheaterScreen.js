import React from 'react'
import {TheaterList} from '@pages'


class TheaterScreen extends React.Component{
    render(){
        const {route, navigation} = this.props
        return(
            <TheaterList navigation={navigation} params={route.params}/>
        )
    }
}

export default TheaterScreen