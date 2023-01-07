import React from 'react'
import {SplashScreen} from '@pages'

class SplashScreens extends React.Component{
    render(){
        const {navigation} = this.props
        return(
            <SplashScreen navigation={navigation}/>
        )
    }
}


export default SplashScreens