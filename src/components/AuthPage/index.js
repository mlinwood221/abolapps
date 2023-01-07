import React, {useState, useEffect} from 'react'
import {Keyboard} from 'react-native'
import {View} from 'react-native-ui-lib'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {PageContent} from '@components'
import styles from './style'
import {Colors, Constants} from '@commons'

const AuthPage = (props) => {
    const [scrollGrowth, setScrollGrow] = useState({flex:props.flex})
    const [isKeyboardShow, setKeyboardShow] = useState(false)

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    
        // cleanup function
        return () => {
          Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
          Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
      }, []);
    
      const _keyboardDidShow = () => {
        setKeyboardShow(true);
        setScrollGrow({flex:0})
      };
    
      const _keyboardDidHide = () => {
        setKeyboardShow(false); 
        
    };

    const layoutHeightChanged = (evt) => {
        var {height} = evt.nativeEvent.layout;
        if(Constants.DOCUMENT_HEIGHT < height){
            setScrollGrow({flex:0})
        }else{
            
            if(!isKeyboardShow){
                setScrollGrow({flex:1})
            } 
        }
    }

    return (
        <PageContent barStyle="dark-content" statusBarColor={Colors.white} actionBar={false}>
            <KeyboardAwareScrollView contentContainerStyle={{...scrollGrowth,backgroundColor:Colors.white}} > 
                <View flexG-1 style={styles.container} onLayout={layoutHeightChanged} >
                    {props.children}
                </View>
                <View paddingH-20 paddingV-16 marginH-30 marginT-150 flexG-1 style={styles.containerShadow}  />
            </KeyboardAwareScrollView>
        </PageContent>
    )
}

export default AuthPage