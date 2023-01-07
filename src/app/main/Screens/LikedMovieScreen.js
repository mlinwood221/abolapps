import React, {Component} from 'react'
import {LikedMovie} from '@pages'

class LikedMovieScreen extends Component{
    render(){
        const {navigation} = this.props
        return(
            <LikedMovie navigation={navigation}/>
        )
    }
}


export default LikedMovieScreen