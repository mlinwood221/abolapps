import React, {useState, useEffect} from 'react'
import {View, Text, Image, Button} from 'react-native-ui-lib'
import {TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import {InputForm, AuthPage, Spinner, AlertContainer} from '@components'
import {Validation} from '@helpers' 
import {Colors, Icons} from '@commons'
import styles from './style'
import {robotoWeights} from 'react-native-typography'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'

const ForgotPassword = (props) =>{
    const [loginField, setLoginField] = useState({email:""})
    const [fieldError, setFieldError] = useState({email:null})

    const [onSubmit, setOnSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [isRequestig, setIsRequesting] = useState(null)

    useEffect(() => {
        setOnSubmit(false)
        setIsRequesting(false)
        setMessage(null)
        
    },[])

    useEffect(() => {
        const onSubmitted = () => {
            setOnSubmit(false);
            
            if(!fieldError.email){
               props.forgotPassword(loginField);
            } 
        }

        if(onSubmit) onSubmitted();
        
    }, [fieldError])
    
    useEffect(() => {
       
        if(props.type === ActionTypes.AUTH.FORGOT_PASSWORD.PENDING){
            setIsLoading(true)
            setIsRequesting(true)
            setMessage(null);
        }
        if(props.type !==  ActionTypes.AUTH.FORGOT_PASSWORD.PENDING){
            setIsLoading(false)
            if(isRequestig) setMessage(props.message);
           if(props.type !==  ActionTypes.AUTH.FORGOT_PASSWORD.PENDING){
               setLoginField({email:""})
           }
            //setIsRequesting(false)
           
        }
    },[props.type])

    const loginSubmit = () => {
        setFieldError({
            email:Validation('email', loginField.email)
        })
        setOnSubmit(true);
    }

    return(
        <AuthPage flex={1}>
            <Spinner visible={isLoading} color={Colors.white} overlayColor={"rgba(0,0,0,.3)"}/> 
            <Image source={Icons.abol_logo} style={styles.imageLogo}/>
            <View paddingH-20 marginH-30 paddingT-10 flexG-1>
                <Text style={styles.containerTitle} marginT-25 >{__("Forgot Password")}</Text>
                <Text center marginV-16 marginH-20 text90 color={Colors.dark}>
                    {__("Input your email to reset your password")}
                </Text>
                {
                    (message && isRequestig) && 
                    <AlertContainer success={props.type === ActionTypes.AUTH.FORGOT_PASSWORD.SUCCESS}  text={message}/>
                }
                <InputForm 
                    icon={<Icon name="mail" size={20} color={Colors.primary}/>}
                    placeholder={__("Email Address")}
                    returnKeyType={"next"}
                    textContentType={"emailAddress"}
                    keyboardType={"email-address"}
                    value={loginField.email}
                    onChangeText={value => {
                        setLoginField({...loginField,email: value.trim()})
                        setFieldError({...fieldError,email: Validation('email', value.trim())})
                    }}
                    error={fieldError.email && __(fieldError.email)}
                />
                <View center >
                    <Button 
                        onPress={() => loginSubmit()}
                        marginT-10
                        style={{width:35,height:35}} 
                        backgroundColor={Colors.primary}>
                        <Icon name="arrow-right" color={Colors.white} size={15}/>
                    </Button>
                    <View  marginT-20 center >
                        <TouchableOpacity onPress={() => props.navigation.navigate('LoginScreen')} >
                            <Text center text80 color={Colors.dark}>{__("Back to Login")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <Image source={Icons.login_bg} style={styles.footBg} resizeMethod="scale" resizeMode="cover"/>
               
            </View>
            
        </AuthPage>
    )
}

function mapStateToProps({authReducers}){
    return {
        type:authReducers.type,
        message:authReducers.message
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)