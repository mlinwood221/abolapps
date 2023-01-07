import React from 'react'
import {MovieDetail} from '@pages'


class MovieDetailScreen extends React.Component{
    render(){
        const {route,navigation} = this.props
        return(
            <MovieDetail navigation={navigation} params={route.params}/>
        )
    }
}

export default MovieDetailScreen