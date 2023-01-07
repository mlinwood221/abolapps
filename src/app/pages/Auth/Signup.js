import React, {useState, useEffect, useRef} from 'react'
import { View, Text, Button, Avatar } from 'react-native-ui-lib'
import {Image, StatusBar, TouchableOpacity, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Validation} from '@helpers' 

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'

import {PageContent, InputForm, AuthPage, Spinner, AlertContainer, InputGroup} from '@components' 
import {Icons, Colors} from '@commons'
import styles from './style'

const Signup = (props) =>{
    
    const fields = ["name","phone", "email", "password", "retype", 'country_code']

    const [fieldError, setFieldError] = useState({})
    const [fieldValue, setFieldValue] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isRequestig, setIsRequesting] = useState(false)
    const [errMessage, setErrMessage] = useState(null)

    const form = {}
    fields.map((v) => {
        form[v] = useRef(null)
    })

    useEffect(() => {
     
        const fErr = {}
        fields.map(v =>{
            fErr[v] = null
        })
        setFieldError(fErr)
        setFieldValue({...fErr, phone_code:"251", country_code:"ET"})
        setErrMessage(null)
        setIsRequesting(false)
    },[])

   const isValid = () => {
       let valid = true
       let errors = {}
        fields.map((key, i) => {
            errors[key] =  handleValidation(key, fieldValue[key])
            if(errors[key]){
                valid = false;
            }
        })

        setFieldError(errors)
        return valid;
   }

   const handleValidation = (field, value) => {
            const errors = {}
            if(field !== 'retype'){
                errors [field] = Validation(field, value)
            }else{
                errors [field] = Validation("confirmPassword", {password:fieldValue.password, confirmPassword:value},
                {
                    confirmPassword:{
                        presence:{
                            allowEmpty:false,
                            message:"^Cannot be blank"
                        },
                        equality:"password"
                    }
                })
            }
        return errors[field] 
   }

    const handleChangeText = (field, value) => {
        const values = {}
        values[field] = value
        setFieldValue({...fieldValue, ...values})
        fieldError[field] = handleValidation(field, value)
    }
   

    const onSubmit = () =>{
        const checkValid = isValid()
        if(checkValid){
            props.signUp(fieldValue)
        }
    }

    useEffect(() => {
        console.log(props.type)
        if(props.type === ActionTypes.AUTH.SIGN_UP.PENDING){
            setIsLoading(true)
            setIsRequesting(true)
            setErrMessage(null);
        }
        if(props.type !==  ActionTypes.AUTH.SIGN_UP.PENDING){
            setIsLoading(false)
            
            //setIsRequesting(false)
            if(props.type === ActionTypes.AUTH.SIGN_UP.FAIL){
                if(isRequestig) setErrMessage(props.message);
            }else{
                if(isRequestig) props.navigation.replace("LoginScreen", {register_message:props.message, email : fieldValue.email })
            }
        }
    },[props.type])

    return(
        <AuthPage flex={0}>
            <Spinner visible={isLoading} color={Colors.white} overlayColor={"rgba(0,0,0,.3)"}/> 
            <Text style={styles.containerTitle} marginT-25 >{__("Sign Up")}</Text>
            <Text center marginV-16 marginH-30 text80 color={Colors.dark}>
            {__("You will receive an otp to your registered Mobile Number")}
            </Text>

            <View flex paddingH-25 paddingV-49 marginT-10 marginH-30 flexG-1>
                <View center marginB-20>
                    <Avatar source={Icons.person_profile} size={80} containerStyle={{elevation:5}} />
                </View>
                {
                    (errMessage && isRequestig) && 
                    <AlertContainer success={props.type === ActionTypes.AUTH.SIGN_UP.SUCCESS} text={errMessage}/>
                }

                <InputForm 
                    icon={<Icon name="user" size={20} color={Colors.primary}/>}
                    placeholder={__("Name")}
                    returnKeyType={"next"}
                    onSubmitEditing={() => form.phone.current.focus()}
                    onChangeText={v => handleChangeText("name", v) }
                    error={fieldError.name && __(fieldError.name)}
                />
                <InputGroup
                    icon={<Icon name="phone" size={20} color={Colors.primary}/>}
                    placeholder={__("Mobile Number")}
                    returnKeyType={"next"}
                    textContentType={"telephoneNumber"}
                    keyboardType={"number-pad"}
                    formRef={form.phone}
                    onSubmitEditing={() => form.email.current.focus()}
                    onChangeText={v => handleChangeText("phone", v) }
                    error={fieldError.phone && __(fieldError.phone)}
                    onPhoneCodeSelect={(country_code, phone_code) => {
                        setFieldValue({...fieldValue, country_code, phone_code})
                    }}
                    setCountry={{country_code:fieldValue.country_code, phone_code:fieldValue.phone_code}}
                />
                <InputForm 
                    icon={<Icon name="mail" size={20} color={Colors.primary}/>}
                    placeholder={__("Email Address")}
                    returnKeyType={"next"}
                    textContentType={"emailAddress"}
                    keyboardType={"email-address"}
                    formRef={form.email}
                    onSubmitEditing={() => form.password.current.focus()} 
                    onChangeText={v => handleChangeText("email", v) }
                    error={fieldError.email && __(fieldError.email)}
                />
                <InputForm 
                    icon={<Icon name="lock" size={20} color={Colors.primary}/>}
                    placeholder={__("Password")}
                    returnKeyType={"next"}
                    textContentType={"password"}
                    secureTextEntry
                    formRef={form.password}
                    onSubmitEditing={() => form.retype.current.focus()}
                    onChangeText={v => handleChangeText("password", v) }
                    error={fieldError.password && __(fieldError.password)}
                /> 
                <InputForm 
                    icon={<Icon name="lock" size={20} color={Colors.primary}/>}
                    placeholder={__("Retype Password")}
                    returnKeyType={"send"}
                    secureTextEntry
                    formRef={form.retype}
                    onChangeText={v => handleChangeText("retype", v) }
                    error={fieldError.retype && __(fieldError.retype)}
                />
                <View center>
                    <Button style={{width:35,height:35}} backgroundColor={Colors.primary} onPress={() => onSubmit()}>
                        <Icon name="arrow-right" color={Colors.white} size={15}/>
                    </Button>
                </View>
            </View>
            <View style={{...styles.footer, marginTop:-30, height:160}}>
                <Image source={Icons.login_bg} style={styles.footBg} resizeMethod="scale" resizeMode="cover"/>
                <View flex center paddingV-16 style={{justifyContent:"flex-end"}} >
                    <View row marginB-10>
                        <Text color={Colors.white} text80 marginB-16>{__("Already have an account?")} </Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate("LoginScreen")}>
                            <Text color={Colors.white} text80 marginB-16 style={{textDecorationLine:"underline"}}>{__("Sign In")}</Text>
                        </TouchableOpacity>
                        
                    </View>
                
                </View>
            </View>
        </AuthPage>
    )
}

function mapStateToProps({authReducers}){
    return {
        type:authReducers.type,
        isLogedin:authReducers.isLogedin,
        userInfo:authReducers.userInfo,
        message:authReducers.message
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Signup)