import React, { useEffect, useState, useRef } from 'react'
import {ScrollView, TextInput, TouchableOpacity, Platform} from 'react-native'
import {View, Text, Avatar, ActionSheet, LoaderScreen} from 'react-native-ui-lib'
import {PageContent, ActionBar, InputForm, StandardButton, Spinner, AlertContainer, InputGroup} from '@components'

import Icon from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import {Colors ,Icons} from '@commons'
import { robotoWeights } from 'react-native-typography'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Validation} from '@helpers'
import ImagePicker from 'react-native-image-picker'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'

const Profile = (props) =>{
    const fields = ["name","phone", "email", "password", "retype", "retype", 'country_code', 'phone_code']

    const [fieldError, setFieldError] = useState({})
    const [fieldValue, setFieldValue] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isRequestig, setIsRequesting] = useState(false)
    const [errMessage, setErrMessage] = useState(null)
    const [sheetShow, setSheetShow] = useState(false)
    const [tmpUpload, setTmpUpload] = useState(null)
    const [tmpUploaded, setTmpUploaded] = useState(null)

    const [user, setUser] = useState({})

    const form = {}
    fields.map((v) => {
        form[v] = useRef(null) 
    })

    useEffect(() => {
        setUser(props.userInfo) 
        const fErr = {}
        const fVal = {}
        fields.map(v =>{
            fErr[v] = null
            fVal[v] = props.userInfo[v] ? props.userInfo[v] : null
        })
        setTmpUpload(null)
        setTmpUploaded(null)
        setFieldError(fErr)
        setFieldValue(fVal)
        setErrMessage(null)
        setIsRequesting(false)
        setSheetShow(false)
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
                if(field === "password"){
                    
                    if(value){
                        errors [field] = Validation(field, value)
                    }else{
                        errors [field] = null
                    }
                }else{
                    errors [field] = Validation(field, value)
                }
                
            }else{
                if(fieldValue.password || value){
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
            const profile_pic = tmpUploaded ? tmpUploaded : props.userInfo.photo
           // console.log({...fieldValue, profile_pic})
            props.updateUser({...fieldValue, profile_pic})
        }
    }

    useEffect(() => {
        
        if(props.userType === ActionTypes.PROFILE.UPDATE.PENDING){
            setIsLoading(true)
            setIsRequesting(true)
            setErrMessage(null);
        }
        if(props.userType !==  ActionTypes.PROFILE.UPDATE.PENDING){
            if(isRequestig) setErrMessage(props.message);
            if(props.userType ===  ActionTypes.PROFILE.UPDATE.SUCCESS){ 
                //if(isLoading) setFieldValue(props.userInfo)
                
                if(props.logedOut){
                    props.signOut();
                }
            }
            setIsLoading(false)
        }
        
        if(props.userType === ActionTypes.AUTH.LOGOUT){
          
            props.navigation.replace('LoginScreen', {register_message:__("Your phone number has been changed, please login") , email:fieldValue.email})
        }

        if(props.userType === ActionTypes.PROFILE.UPLOAD.SUCCESS){
            if(tmpUpload){
               
                setTmpUploaded(props.tmp_uploaded)
                setTmpUpload(null)
            }
        }
    },[props.userType])

    const pickerResponse = (response) => {
        if(response.path && response.fileName && response.type){
            const UriPath = Platform.OS === 'android' ? 'file://'+response.path:''+response.path
            const imgData = {
                uri:UriPath,
                type:response.type,
                name:response.fileName
            }
            setTmpUploaded(null)
            setTmpUpload(UriPath)
            props.profileUpload(imgData)
        }
    }
 
    const pick = {
        camera : () =>{
            ImagePicker.launchCamera({
                mediaType:'photo',
                includeBase64 : false,
            },pickerResponse)
        },
        gallery : () => {
            ImagePicker.launchImageLibrary({
                mediaType:'photo',
                includeBase64 : false,
            },pickerResponse)
        }
    }

    const AvatarView = () => {
       try {
           return (
               <>
               {tmpUpload && <Avatar source={{uri:tmpUpload}} size={90} /> }
                {tmpUploaded && <Avatar source={{uri:tmpUploaded}} size={90} /> }
                {props.userInfo && (!tmpUpload && !tmpUploaded) && props.userInfo.photo && <Avatar source={{uri:props.userInfo.photo}} size={90} />}
                {(!tmpUpload && !tmpUploaded) && !props.userInfo.photo && <Avatar source={Icons.person_profile} size={90} />}
               </>
           )
       } catch (error) {
           return(<Avatar source={Icons.person_profile} size={90} />)
       }
    }

    return(
        <PageContent statusBarColor={Colors.primary} navigation={props.navigation} title={"Edit Profile"}>
            <Spinner visible={isLoading} color={Colors.white} overlayColor={"rgba(0,0,0,.3)"}/>
                <View flex backgroundColor={Colors.white}>
                    <KeyboardAwareScrollView contentContainerStyle={{paddingBottom:25}}>
                    <View  flex  paddingH-16 paddingV-20>
                    <View center marginB-30 >
                        <TouchableOpacity activeOpacity={0.7} style={{position:"relative", width:90, height:90, elevation:5}} onPress={() => setSheetShow(true)}>
                            <AvatarView/>
                           
                            {props.userType === ActionTypes.PROFILE.UPLOAD.PENDING && 
                                <View center style={{width:90,height:90,position:"absolute", backgroundColor:"rgba(0,0,0,.3)", borderRadius:50}}>
                                    <LoaderScreen center size={80} color={Colors.lightGray}/> 
                                </View>
                            }
                            <View center bg-white style={{width:30,height:30, borderWidth:1, borderColor:Colors.primary, position:"absolute", left:-10,bottom:15,zIndex:1, borderRadius:50}}>
                                <Icon name="camera" size={15} color={Colors.primary}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View paddingH-25> 
                    {
                        (errMessage && isRequestig && props.userType !== ActionTypes.PROFILE.UPDATE.PENDING) && 
                        <AlertContainer success={props.userType === ActionTypes.PROFILE.UPDATE.SUCCESS || props.userType === ActionTypes.PROFILE.UPLOAD.SUCCESS} text={errMessage}/>
                    }
                    </View>
                    <View flex paddingH-30 marginB-16>
                        <InputForm
                            icon={<Icon name="user" size={20} color={Colors.primary}/>}
                            placeholder={__("Name")}
                            returnKeyType={"next"}
                            onSubmitEditing={() => form.phone.current.focus()}
                            onChangeText={v => handleChangeText("name", v) }
                            error={fieldError.name && __(fieldError.name)}
                            value={fieldValue.name} 
                        />
                        <InputGroup
                            icon={<Feather name="phone" size={20} color={Colors.primary}/>}
                            placeholder={__("Mobile Number")}
                            returnKeyType={"next"}
                            textContentType={"telephoneNumber"}
                            keyboardType={"number-pad"}
                            formRef={form.phone}
                            onSubmitEditing={() => form.email.current.focus()}
                            onChangeText={v => handleChangeText("phone", v) }
                            error={fieldError.phone && __(fieldError.phone)}
                            value={fieldValue.phone}
                            onPhoneCodeSelect={(country_code, phone_code) => {
                                setFieldValue({...fieldValue, country_code, phone_code})
                            }}
                            setCountry={{country_code:fieldValue.country_code,phone_code:fieldValue.phone_code}}
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
                            value={fieldValue.email}
                        />
                        <InputForm
                            icon={<Icon name="lock" size={20} color={Colors.primary}/>} 
                            placeholder={__("Password")}
                            textContentType={"password"}
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
                            textContentType={"password"}
                            returnKeyType={"send"}
                            secureTextEntry
                            formRef={form.retype}
                            onChangeText={v => handleChangeText("retype", v) }
                            error={fieldError.retype && __(fieldError.retype)}
                        />
                        <View flex marginT-25 >
                            <StandardButton label={__("Edit")} style={{ paddingVertical:10, paddingHorizontal:80, elevation:5}} onClick={() => onSubmit()}/>
                        </View>
                        
                    </View>
                </View>
                </KeyboardAwareScrollView>

                <ActionSheet
                    visible={sheetShow}
                    options={[{label : __("Camera"), onPress: pick.camera},{label : __("Gallery"), onPress: pick.gallery} ]}
                    onDismiss={() => setSheetShow(false)}
                />

            </View>
            
        </PageContent>
    )
}


function mapStateToProps({authReducers}){
    return {
        isLogedin:authReducers.isLogedin,
        userInfo:authReducers.userInfo,
        userType : authReducers.type,
        message:authReducers.message,
        logedOut : authReducers.logedOut,
        tmp_uploaded : authReducers.image_url
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile)

