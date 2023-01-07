import React, { useEffect, useState } from 'react'
import {View, Text} from 'react-native-ui-lib'
import {TabBarItem, NowShowingTab, ComingSoonTab, BannerPagination} from '@components'
import {ActivityIndicator} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Animated from 'react-native-reanimated';

import {connect, useSelector} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'
import { Colors } from '@commons';

const Tab = createMaterialTopTabNavigator();

const EmptyElement = () => {
  return(
    <View centerH bg-white padding-16 paddingT-50>
        <ActivityIndicator size={25} color={Colors.gray} animating/>
    </View>
  )
}

const TabBar = (props) => {
    const {banners, bannerIndex} = props
    const [menuList, setMenuList] = useState([__("Now Showing"), __("Coming Soon")])
    const [tabActive, setTabActive] = useState("NOW_SHOWING")
    useEffect(() => {
      setMenuList([__("Now Showing"), __("Coming Soon")]);
    },[props.lang])

    useEffect(() => {
      return () => {setTabActive('NOW_SHOWING')}
    },[])
    return (
          <Tab.Navigator tabBar={props => <TabNavigation {...props} labels={menuList} banners={banners} bannerIndex={bannerIndex}/>}>
            <Tab.Screen name="Now Showing" component={tabActive === "NOW_SHOWING" ? NowShowingTab : EmptyElement}
              listeners={{'focus' : () => {
                setTabActive('NOW_SHOWING')
              }}} />
            <Tab.Screen name="Coming Soon"  component={tabActive === "COMING_SOON" ? ComingSoonTab : EmptyElement}
             listeners={{'focus' : () => {
              setTabActive('COMING_SOON')
            }}}/>
          </Tab.Navigator>
      );
}


const TabNavigation = (props) => {
    const { state, descriptors, navigation, position } = props
    const {banners, bannerIndex} = props
  return (
    <View 
        row 
        style={{justifyContent:"space-between", alignItems:"center"}} 
        paddingH-16 
        paddingV-10>
        <TabBarItem label={props.labels[0]} navigation={navigation} state={state} descriptors={descriptors} position={position} route={state.routes[0]} index={0} isFocused={state.index === 0}/>
        {/* <View flex style={{maxWidth:50}}>
            <BannerPagination data={banners} activeSlide={bannerIndex}/>
        </View> */}
        <TabBarItem label={props.labels[1]} navigation={navigation} state={state} descriptors={descriptors} position={position} route={state.routes[1]} index={1} isFocused={state.index === 1}/>

    </View>
  );
}


function mapStateToProps({settingReducers}){
  return {
      settingType : settingReducers.type,
      lang:settingReducers.lang
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TabBar)