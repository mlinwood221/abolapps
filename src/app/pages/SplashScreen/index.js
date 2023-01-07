import React from 'react'
import {Image} from 'react-native'
import {View, Text} from 'react-native-ui-lib'
import {PageContent} from '@components'
import {Icons, Colors} from '@commons'
import styles from './style'
import {robotoWeights} from 'react-native-typography'

const SplashScreen = (props) => {
    return(<PageContent barStyle="dark-content" actionBar={false} statusBarColor={Colors.white}>
        
            <View flex center backgroundColor={Colors.white}>
                <Image source={Icons.splash_bg} style={styles.background}/>
                <Image source={Icons.abol_logo} style={styles.logo}/>
                <View center>
                    <Text marginB-50 center text50 color={Colors.primary} style={robotoWeights.medium}>ሲኒማ ቤት</Text>
                </View>
                
                <View centerH style={{position:"absolute", bottom:16}}> 
                    <Text white text90>From</Text>
                    <Text white text80 marginT-5 marginB-20 style={{...robotoWeights.medium}}>FETAN TECHNOLOGY</Text>
                </View> 
            </View>
            
       
    </PageContent>)
}

export default SplashScreen