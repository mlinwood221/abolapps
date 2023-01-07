import React, { useEffect, useRef, useState } from 'react'
import {View, Text, Badge} from 'react-native-ui-lib'
import {TouchableOpacity, TouchableHighlight, Image} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable';

import { Colors, Icons } from '@commons'
import styles from './style'

import ModalDropdown from 'react-native-modal-dropdown'; 
import { robotoWeights } from 'react-native-typography'

import {connect, useSelector} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'

const ActionBar = (props) => { 
    const dropdown = useRef(null)
    const badgeRef = useRef(null)
    const [cities, setCities] = useState([])

    const all_cities = {id:0, city:__("All Cities")}
    useEffect(() => {
        if(props.cities){
            if(props.cities.length > 0 ){
                setCities([all_cities,...props.cities])
            }
        }

    },[props.cities])

    // const bounce = () => badgeRef.current.bounce(300).then(endState => {

    // }) 

    useEffect(() => {
        if(props.notifType === ActionTypes.NOTIFICATION.NEW){
            badgeRef.current.bounce(300)
        }
    },[props.notifType, props.notif_count])

      function  _dropdown_2_renderRow(rowData, rowID, highlighted) {
        let evenRow = rowID % 2;
        return (
            <View style={[styles.dropdown_2_row, highlighted && {backgroundColor:Colors.lightGray}]} paddingH-10 center paddingV-10>
              <Text center style={[styles.dropdown_2_row_text, highlighted && {...robotoWeights.medium}]}>
                {`${rowData.city}`}
              </Text>
            </View>
        );
      }
    return(
        <View row style={{...styles.container}}>
            <TouchableOpacity activeOpacity={.4} onPress={() => props.isTopPage ? props.navigation.toggleDrawer() : props.navigation.goBack()}>
                <View style={styles.leftIcon}>
                    {props.isTopPage 
                     ? <Image source={ Icons.ic_menu } style={{width:28, height:28, tintColor:Colors.white}}/> //<Icon name="menu" size={25} color={Colors.white}/>
                     : <Icon name="arrow-left" size={25} color={Colors.white}/>}
                </View>
            </TouchableOpacity>
            <View style={styles.centerTitle}>
                <Text style={styles.actionTitle}>{props.title}</Text>
            </View>
            <View row style={styles.rightContainer}>
                <TouchableOpacity activeOpacity={.4} onPress={() => props.navigation.navigate('NotificationScreen')}>
                    <View style={styles.rightIcon} >
                        <FontAwesome name="bell" size={25} solid color={Colors.white}/>
                        {props.notif_count && 
                            <Animatable.View ref={badgeRef} style={styles.badge}>
                                <Badge size={'default'} label={props.notif_count.toString()} backgroundColor={Colors.badge} labelStyle={{fontSize: props.notif_count > 9 ? 9:12}} />
                            </Animatable.View>
                        }
                    </View>
                </TouchableOpacity>
                <View>
                    <ModalDropdown ref={dropdown}
                        style={{marginHorizontal:5}} 
                        dropdownStyle={styles.dropdown_2_dropdown}
                        options={cities}
                        onSelect={(index, value) => props.setSelectedCity(value) }
                        renderRow={_dropdown_2_renderRow.bind(this)} 
                        defaultIndex={0}
                    >
                        <View style={styles.rightIcon} paddingH-10>
                            <FontAwesome name="map-marker-alt" solid size={25} color={Colors.white}/>
                        </View>
                    </ModalDropdown>
                </View>
            </View>
        </View>
    )
}




ActionBar.propTypes = {
    isTopPage:PropTypes.bool,
    title:PropTypes.string
}

ActionBar.defaultProps = {
    isTopPage:false,
    title:"Cinema Bet"
}

function mapStateToProps({cityReducers, settingReducers}){
    return {
        type : cityReducers.type,
        cities:cityReducers.cities,
        notifType : settingReducers.type,
        notif_count: settingReducers.notif_count
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionBar)