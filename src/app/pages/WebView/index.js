import React from 'react'
import {PageContent, ActionBar} from 'react-native'
import {Colors} from '@commons'

const WebView = (props) =>{
    return(
        <PageContent statusBarColor={Colors.primary}>
            <ActionBar navigation={props.navigation} />
        </PageContent>
    )
}

export default WebView