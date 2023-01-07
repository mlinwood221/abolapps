import React, { useEffect, useState } from 'react'
import {TouchableOpacity} from 'react-native'
import {View, Text} from 'react-native-ui-lib'
import Animated from 'react-native-reanimated';
import {Colors} from '@commons' 
import {robotoWeights} from 'react-native-typography'
const TabBarItem = (
    {state, navigation, position, route, label, index, isFocused, descriptors}
) => {

    const { options } = descriptors[route.key];
    const inputRange = state.routes.map((_, i) => i);
    const opacity = Animated.interpolate(position, {
        inputRange,
        outputRange: inputRange.map(i =>  (i === index ? Colors.primary : Colors.primary)),
    });
 
    const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

    const onLongPress = () => {
    navigation.emit({
        type: 'tabLongPress',
        target: route.key,
    });
    };
    const [bgColor, setBg] = useState(Colors.primary)
    useEffect(() => {
        if(isFocused) setBg(Colors.primary)
        else setBg(Colors.gray);
    },[isFocused])
    

    return(
        <TouchableOpacity
            activeOpacity={.6}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            style={{flex:1, marginHorizontal:10}}
            onPress={onPress}
            onLongPress={onLongPress}
            >
            <Animated.View style={{ justifyContent:"center", backgroundColor: bgColor, paddingVertical:5, borderRadius:50, elevation:5  }}>
                    <Text center color={Colors.white} text80 style={{...robotoWeights.regular}} >{label}</Text>
            </Animated.View>
            
        </TouchableOpacity>
    )
}

export default TabBarItem