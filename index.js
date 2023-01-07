/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging'
import Root from './src/app/main/Root';
import {name as appName} from './app.json';

import AsyncStorage from '@react-native-community/async-storage'

messaging().setBackgroundMessageHandler(async remoteMessage => {
    try {
        const hasCounted = await AsyncStorage.getItem('notifBadgeCount');
        
        if(hasCounted){
            const total = parseInt(hasCounted)+1;
            console.log("BG_NOTIF COUNTED 1", total.toString());
        
            await AsyncStorage.setItem('notifBadgeCount', total.toString());
        }else{
            console.log("BG_NOTIF COUNTED 2"); 
            await AsyncStorage.setItem('notifBadgeCount', "1");
        }
    } catch (err) {
        console.log("STG_BG_NOTIF", err);
    }
})

AppRegistry.registerComponent(appName, () => Root);
