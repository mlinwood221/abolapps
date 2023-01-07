import React, {useState, useEffect, useRef} from 'react'
import { View, Text, Button } from 'react-native-ui-lib'
import {Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
//import Spinner from 'react-native-loading-spinner-overlay'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'

import {InputForm, AuthPage, Spinner, AlertContainer} from '@components'
import {Icons, Colors,Constants} from '@commons' 
import {Validation} from '@helpers' 

import styles from './style'
import { robotoWeights } from 'react-native-typography'

const Login = (props) => {
    const [loginField, setLoginField] = useState({email:"",password:""})
    const [fieldError, setFieldError] = useState({email:null,password:null})
    const [onSubmit, setOnSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [isRequestig, setIsRequesting] = useState(null)

    const usernameInput = useRef(null)
    const passwordInput = useRef(null) 
    const { register_message , email} = props.params ? props.params : {} 
    useEffect(() => {
        setOnSubmit(false)
        setIsRequesting(false)
        setErrorMessage(null)
        setIsLoading(false)
        if(email){
            setLoginField({...loginField, email})
        }
        
    },[])

    useEffect(() => {
        const onSubmitted = () => {
            setOnSubmit(false);
            
            if(!fieldError.email && !fieldError.password){
            
               props.signIn({...loginField, device_token:props.device_token});
               
            } 
        }

        if(onSubmit) onSubmitted();
        
    }, [fieldError])

    useEffect(() => {
        if(props.type === ActionTypes.AUTH.LOGIN.PENDING){
           setIsLoading(true)
            setIsRequesting(true)
            setErrorMessage(null);
        }
        if(props.type !==  ActionTypes.AUTH.LOGIN.PENDING){
            setIsLoading(false)
           
            if(props.type === ActionTypes.AUTH.LOGIN.FAIL){
                if(isRequestig) setErrorMessage(props.message);
            }else if(props.type === ActionTypes.AUTH.LOGIN.SUCCESS){  
                setIsRequesting(false)
               if(isRequestig && !props.isLogedin){
                props.navigation.navigate("VerificationScreen", {form_data:loginField})
               } 
            }
        }
    },[props.type])
    
    const loginSubmit = () => {
        setFieldError({
            email:Validation('email', loginField.email),
            password:Validation('password', loginField.password)
        })
        setOnSubmit(true);
    }

    return(
        <AuthPage flex={1}>
            <Spinner visible={isLoading} color={Colors.white} overlayColor={"rgba(0,0,0,.3)"}/> 
            <Image source={Icons.abol_logo} style={styles.imageLogo}/>
            <View paddingH-20 marginH-30 paddingT-10 flexG-1>

                <Text style={styles.containerTitle}marginT-16 marginB-20>
                    {__("Sign In")}
                </Text>
                {
                    (errorMessage && isRequestig) ? 
                    <AlertContainer text={errorMessage}/>
                    : <></>
                }

                {register_message && <AlertContainer success text={register_message}/>}
                
                <InputForm 
                    icon={<Icon name="mail" size={20} color={Colors.primary}/>}
                    placeholder={__("Email Address")}
                    returnKeyType={"next"}
                    textContentType={"emailAddress"}
                    keyboardType={"email-address"}
                    onSubmitEditing={() => passwordInput.current.focus()}
                    value={loginField.email}
                    formRef={usernameInput}
                    onChangeText={value => {
                        setLoginField({...loginField,email: value.trim()})
                        setFieldError({...fieldError,email: Validation('email', value.trim())})
                    }}
                    error={fieldError.email && __(fieldError.email)}
                />
                <InputForm
                    icon={<Icon name="lock" size={20} color={Colors.primary}/>}
                    placeholder={__("Password")}
                    secureTextEntry={true}
                    returnKeyType={"send"}
                    textContentType={"password"}
                    formRef={passwordInput}
                    onChangeText={value => {
                        setLoginField({...loginField,password: value.trim()})
                        setFieldError({...fieldError,password: Validation('password', value.trim())})
                    }}
                    error={fieldError.password && __(fieldError.password)}
                />

                <View center style={{marginBottom:-5}}>
                    <Button 
                        onPress={() => 
                            loginSubmit()
                        }
                        marginT-10
                        style={{width:35,height:35}} 
                        backgroundColor={Colors.primary}>
                        <Icon name="arrow-right" color={Colors.white} size={15}/>
                    </Button>
                    <View  marginT-10 center >
                        <TouchableOpacity style={{paddingVertical:5}} onPress={() => props.navigation.navigate('ForgotPasswordScreen')} >
                            <Text center text80 color={Colors.dark}>{__("Forgot Password?")}</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>

            <View style={styles.footer}>
                <Image source={Icons.login_bg} style={styles.footBg} resizeMethod="scale" resizeMode="cover"/>
                <View flex center paddingV-16 style={{justifyContent:"flex-end"}} >
                    <View row>
                        <Text color={Colors.white} text80 marginB-16>{__("Don't have an account?")} </Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate("SignupScreen")}>
                            <Text color={Colors.white} text80 marginB-16 style={{textDecorationLine:"underline"}}>{__("Signup")}</Text>
                        </TouchableOpacity>
                        
                    </View>
                    {/* <View row marginB-10>
                        <View center style={{backgroundColor:Colors.white,borderRadius:50 ,width:35, height:35}} paddingV-5 paddingH-10 marginH-10>
                            <FontAwesome name="facebook" solid color={Colors.primary} size={15}/>
                        </View>
                        <View center style={{backgroundColor:Colors.white,borderRadius:50 ,width:35, height:35}} paddingV-16>
                            <Text style={{...robotoWeights.bold}} center color={Colors.primary}>{__("OR")}</Text>
                        </View>
                        <View center style={{backgroundColor:Colors.white,borderRadius:50 ,width:35, height:35}} paddingV-5 paddingH-10 marginH-10>
                            <FontAwesome name="google" solid color={Colors.primary} size={15}/>
                        </View>
                    </View> */}
                
                </View>
            </View>
        </AuthPage>
        
    )
}

function mapStateToProps({authReducers, settingReducers}){
    
    return {
        type:authReducers.type,
        isLogedin:authReducers.isLogedin,
        userInfo:authReducers.userInfo,
        message:authReducers.message,
        device_token : settingReducers.token
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)