import React, { useEffect, useRef, useState } from 'react'
import {PageContent, StandardButton, Spinner} from '@components'
import {View, Text, Incubator, Button, Colors as Color2} from 'react-native-ui-lib'
import {TextInput, Alert} from 'react-native'
import {Colors} from '@commons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AwesomeAlert from 'react-native-awesome-alerts'
import Icon from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import {Validation} from '@helpers' 

import {robotoWeights} from 'react-native-typography'

import styles from './style'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'

const {TextField} = Incubator
const Deposit = (props) => {

    const [showAlert, setShowAlert] = useState(false)
    const [fieldVal, setFieldVal] = useState({card_number:"", pin_number:""})
    const [fieldErr, setFieldErr] = useState({card_number:null, pin_number:null})
    const [isLoading, setIsLoading] = useState(false)
    const [showError, setShowError] = useState(false)
    const [successAlert, setAlertSuccess] = useState(false)
    const cardInfo = useRef(null)
    const pinNumber = useRef(null)

    useEffect(() => {
        setFieldVal({card_number:"", pin_number:""})
        setFieldErr({card_number:null, pin_number:null})
        setShowAlert(false)
        setShowError(false)
        setAlertSuccess(false) 
        
    },[])

    const onSubmit = () => {
        const card_number = Validation('card_number', fieldVal.card_number)
        const pin_number = Validation('pin_number', fieldVal.pin_number)
        setFieldErr({card_number, pin_number})
        if(!card_number && !pin_number){
            
            setShowAlert(true)
        }
    }

    useEffect(() => {
        
        if(props.type === ActionTypes.CREDIT.ADD.PENDING){
            setIsLoading(true)
            setShowAlert(false)
        }else{
            if(isLoading){
                
                if(props.type === ActionTypes.CREDIT.ADD.SUCCESS){
                    setAlertSuccess(true)
                    props.getUser()
                    setIsLoading(false)
                }
                
                if(props.type === ActionTypes.CREDIT.ADD.FAIL){
                    
                     setShowError(true)
                    
                    setIsLoading(false)  
                }
            }
            
        }
    },[props.type])

    return(
        <PageContent statusBarColor={Colors.primary} navigation={props.navigation} title={__("Add Money")}>
            
            <View flex bg-white >
                <Spinner visible={isLoading} color={Colors.white} overlayColor={"rgba(0,0,0,.3)"}/> 
                <KeyboardAwareScrollView contentContainerStyle={{paddingBottom:25}}>
                    <View paddingH-20 paddingV-20>
                        <Text style={styles.pageTitle} marginB-30 text70>{__("Card Info")} </Text>
                        <TextField 
                            floatOnFocus 
                            floatingPlaceholder 
                            floatingPlaceholderStyle={styles.floatingPlaceholder}
                            keyboardType={"numeric"}
                            returnKeyType={"next"}
                            onSubmitEditing={() => pinNumber.current.focus()}
                            fieldStyle={styles.formStyle}
                            underlineColor={{default:Colors.lightGray2, focus:Colors.primary}}
                            showCharCounter
                            containerStyle={styles.containerForm}
                            // validate={"required"}
                            // validationMessage={"Required"}
                            validateOnChange
                            validateOnBlur
                            validate={(val) => {
                                return false
                            }}
                            enableErrors
                            maxLength={16}
                            underlineColorAndroid={Colors.lightGray2}
                            onChangeText={value => {
                                setFieldVal({...fieldVal,card_number: value.trim()})
                                setFieldErr({...fieldErr,card_number: Validation('card_number', value.trim())})
                            }}
                            validationMessage={fieldErr.card_number && __(fieldErr.card_number)}
                            value={fieldVal.card_number}
                            placeholder={__("Card Info")}/> 
                        <TextField 
                            ref={pinNumber}
                            floatOnFocus 
                            floatingPlaceholder 
                            floatingPlaceholderStyle={styles.floatingPlaceholder}
                            keyboardType={"numeric"}
                            fieldStyle={styles.formStyle}
                            underlineColor={{default:Colors.lightGray2, focus:Colors.primary}}
                            showCharCounter
                            containerStyle={styles.containerForm}
                            validateOnChange
                            validateOnBlur
                            validate={(val) => {
                                return false
                            }}
                            enableErrors
                            onChangeText={value => {
                                setFieldVal({...fieldVal,pin_number: value.trim()})
                                setFieldErr({...fieldErr,pin_number: Validation('pin_number', value.trim())})
                            }}
                            maxLength={4}
                            validationMessage={fieldErr.pin_number && __(fieldErr.pin_number)}
                            underlineColorAndroid={Colors.lightGray2}
                            value={fieldVal.pin_number}
                            placeholder={__("Pin Number")}/>
                        <View flex center marginT-20 paddingV-15 >
                            <StandardButton  label={__("Charge")} onClick={() => onSubmit()}  style={{width:200, paddingVertical:5, elevation:5 }}/>
                        </View>
                    </View>    
                </KeyboardAwareScrollView>
                <AwesomeAlert show={showAlert} closeOnTouchOutside={false} 
                    customView={<ModalConfirm
                        onCancel={setShowAlert}
                        onConfirm={() => props.addCredit(fieldVal)}
                    />}
                    
                    contentContainerStyle={{padding:0, width:"70%"}}
                    onDismiss={() => setShowAlert(false)}
                    />
                <AwesomeAlert
                    show={showError}
                    contentContainerStyle={{padding:0}}
                    customView={<ErrorView message={props.message} />}
                    closeOnTouchOutside={false}
                    contentContainerStyle={{padding:0, width:"70%"}}
                    showCancelButton
                    cancelText={__("CLOSE")}
                    onCancelPressed={() => setShowError(false)}
                    actionContainerStyle={{padding:0, marginTop:-10}}
                    cancelButtonStyle={{backgroundColor:"transparent", alignSelf:"flex-end"}}
                    cancelButtonTextStyle={{color:Colors.red}}
                    onDismiss={() => setShowError(false)}
                />
                <AwesomeAlert
                    show={successAlert}
                    contentContainerStyle={{padding:0}}
                    customView={<ErrorView message={props.message} success />}
                    closeOnTouchOutside={false}
                    contentContainerStyle={{padding:0, width:"70%"}}
                    showCancelButton
                    cancelText={__("BACK TO HOME")}
                    onCancelPressed={() => {
                        setAlertSuccess(false)
                        props.navigation.popToTop()
                    }}
                    actionContainerStyle={{padding:0, marginTop:-10}}
                    cancelButtonStyle={{backgroundColor:"transparent", alignSelf:"flex-end"}}
                    cancelButtonTextStyle={{color:Colors.primary}}
                    onDismiss={() => setAlertSuccess(false)}
                />
            </View>
            
        </PageContent>
    )
}

const ModalConfirm = (props) => {
    return(
        <View paddingV-5 paddingH-20>
            <View row style={{alignItems:"center"}}>
                {/* <View marginR-10 center style={{width:20, height:20, borderRadius:50}} backgroundColor={Colors.primary}>
                    <Icon name={"help-circle"} size={20} color={Colors.white}/>
                </View>
                <Text style={{...robotoWeights.regular}}>Credit Charge</Text> */}
            </View>
            <View center marginT-10>
                <FontAwesome name="money-check-alt" size={35} color={Colors.primary}/>
                <Text marginT-5 style={{...robotoWeights.condensedBold}}>{__("Are you sure?")}</Text>
                <View marginT-10 paddingH-20 bg-grey70 paddingV-5 style={{borderRadius:3}}>
                    <Text center style={{...robotoWeights.light}} text100>{__("Confirm your card number and pin number is correct")}</Text>
                </View>
                
            </View>
            <View height={1} bg-grey50 marginT-15 style={{marginHorizontal:-16}}/>
            <View row center marginT-15>
                <Button label={__("Cancel")} onPress={() => props.onCancel(false)} marginH-5 enableShadow style={{height:30}}  labelStyle={{fontSize:12}} bg-grey40/>
                <Button label={__("Confirm")} onPress={() =>  props.onConfirm()} marginH-5 enableShadow style={{height:30, padding:0, backgroundColor:Colors.primary}} labelStyle={{fontSize:12}}/>
            </View>
        </View>
    )
}

const ErrorView = (props) => {
    const {success} = props
    return(
        <View paddingT-5 marginB-10 paddingH-10 style={{alignSelf:"flex-start"}}>
            {success 
            ? <View style={{alignItems:"center"}} >
                    <Icon name="check-circle" color={Color2.green10} size={40}/>
                    <Text marginT-15 center text80 dark30 style={{...robotoWeights.regular}} grey20>{props.message}</Text>
                </View>
            : <View row style={{alignItems:"center"}} >
                    <Icon name="alert-circle" color={Colors.red} size={15}/>
                    <Text marginL-5 text90 dark30 style={{...robotoWeights.medium}}>Credit charge failed</Text>
                </View>
            }
            
            {!success && <Text marginT-15 marginB-5 grey20 style={{...robotoWeights.light}} text90>{props.message}</Text> }
        </View>
    )
}

function mapStateToProps({creditReducers}){
    return {
        type:creditReducers.type,
        message:creditReducers.message
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Deposit)

