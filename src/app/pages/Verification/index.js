import React, {useEffect, useRef, useState} from 'react'
import {PageContent, StandardButton, Spinner, AlertContainer} from '@components'
import {View, Text, Button} from 'react-native-ui-lib'
import {Colors, Icons} from '@commons'
import { Image, TextInput} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './style'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'
import { robotoWeights } from 'react-native-typography'

const numberCount = 6
let timer2 = 25;
const Verification = (props) => {
    const [codes, setCodes] = useState([])
    const [timer, setTimer] = useState(25)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [isRequestig, setIsRequesting] = useState(null)
    const [timesVar, setTimerVar] = useState(null)
    const [errorVerify, setErrorVerify] = useState(null)

    const refs = Array(numberCount).fill(numberCount).map((_,i) => useRef(null)) 

    const timerFunc = () => {
        
        if(timer > 0 ) {
            setTimer(timer-1)
        }
    }

    useEffect(() => {
        const _codes = Array(numberCount).fill(numberCount).map((_,i) => null)
        setCodes(_codes)
        setIsRequesting(false)
        setErrorMessage(null)
        setIsLoading(false)
        console.log(props.otp)
        setTimer(25)
        clearTimeout(timesVar)
    },[])

    useEffect(() => {
        const xTimer = setTimeout(timerFunc, 1000); 
        return () => clearTimeout(xTimer)
    },[timer])
    

    const onSubmit = () => {
        const {form_data} = props.params
        const code = codes.join("")
        
        if(code === props.otp){
            props.setVerify()
        }else{
            setErrorVerify("Verification code is doesn't match")
        }
        //props.signIn({...form_data, code});
    }

    const resendOTP = () => {
        const {form_data} = props.params
        props.signIn(form_data);
    }

    useEffect(() => {
        if(props.type === ActionTypes.AUTH.LOGIN.PENDING){
            setIsLoading(true)
            setIsRequesting(true)
            setErrorMessage(null);
           // setErrorVerify("Verification code is doesn't match")
        }
        if(props.type !==  ActionTypes.AUTH.LOGIN.PENDING){
            setIsLoading(false)
           
            if(props.type === ActionTypes.AUTH.LOGIN.FAIL){
                if(isRequestig) setErrorMessage(props.message);
            }else if(props.type === ActionTypes.AUTH.LOGIN.SUCCESS){
                console.log(props.otp)
                setTimer(25)
                setIsRequesting(false)
            }
        }

        if(props.type === ActionTypes.AUTH.LOGIN.VERIFY_PENDING){
            setIsLoading(true)
        }

        if(props.type === ActionTypes.AUTH.LOGIN.VERIFY_SUCCESS){
            setIsLoading(false)
        }
    },[props.type])

    return(
        <PageContent statusBarColor={Colors.primary}  navigation={props.navigation}>
            <View flex bg-white>
                <KeyboardAwareScrollView>
                    <View flex center paddingV-16>
                        <Spinner visible={isLoading} color={Colors.white} overlayColor={"rgba(0,0,0,.3)"}/>
                        <Image source={Icons.abol_logo} style={{width:110, height:110}}/>
                        <Text center marginH-30 style={{...robotoWeights.regular}} grey20 marginT-10>{__("Please enter OTP we send have you to your registerd Mobile number")} {props.userInfo.phone_code && `(+${props.userInfo.phone_code})`} {props.userInfo.phone}</Text>
                        
                        <Text style={{...robotoWeights.bold}} text70 marginT-20>{__("Verification")}</Text>
                        
                        {errorVerify && 
                        <View center style={{marginHorizontal:30, marginTop:20}}>
                            <AlertContainer text={errorVerify}/>
                        </View>}
                        

                        <View row marginT-10>
                            {Array(numberCount).fill(numberCount).map((_,i) => 
                                <NumberInput getRef={refs[i]} 
                                    key={"numberInput"+i} 
                                    onSubmitEditing={() => i < numberCount-1 && refs[i+1].current.focus()} 
                                    onKeyPress={(({nativeEvent}) => {
                                        if(nativeEvent.key === 'Backspace'){
                                            i > 0 && refs[i-1].current.focus()
                                        }else{
                                            i < numberCount-1 && refs[i+1].current.focus()
                                        }
                                    })}
                                    onChangeText={(val) => {
                                        codes[i] = val
                                    }}
                                />
                            )}
                            
                        </View>
                        <View row style={{justifyContent:"center"}}>
                            <Text style={{...robotoWeights.medium}} dark10 marginV-16>00</Text>
                            <Text style={{...robotoWeights.medium}} dark10 marginV-16>:</Text>
                                <Text style={{...robotoWeights.medium}} dark10 marginV-16>{timer < 10 ? "0"+timer : timer}</Text>
                        </View> 
                        
                        <Button label={__("Resend")} onPress={resendOTP} labelStyle={{...robotoWeights.regular}} disabled={timer>0} enableShadow backgroundColor={Colors.white} dark20 text90/>
                        <View flex marginT-50>
                            <StandardButton label={__("Submit")} style={{elevation:5, paddingVertical:8, paddingHorizontal:50}} onClick={onSubmit}/>
                        </View>
                        
                    </View>
                </KeyboardAwareScrollView> 
            </View>
        </PageContent>
    )
}

const NumberInput = (props) => {
    return(
        <View marginH-5>
            <TextInput
                {...props}
                ref={props.getRef}
                maxLength={1}
                keyboardType={"numeric"}
                style={styles.inputNumber}
                returnKeyType={"next"}
                
            />
        </View>
    )
}

function mapStateToProps({authReducers}){
    return {
        type:authReducers.type,
        isLogedin:authReducers.isLogedin,
        userInfo:authReducers.userInfo,
        message:authReducers.message,
        otp : authReducers.otp
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Verification)

