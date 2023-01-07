import React from 'react'
import {TextInput, TouchableOpacity, Alert} from 'react-native'
import {View, Text} from 'react-native-ui-lib'
import PropTypes from 'prop-types'; 
import Icon from 'react-native-vector-icons/Feather'
import { Colors } from '@commons'
import styles from './style'
import CountryPicker from 'react-native-country-picker-modal'

class InputGroup extends React.Component{
    constructor(props){ 
        super(props)
        const {country_code, phone_code} = props.setCountry
        this.state = {
            country_code:country_code,
            phone_code:phone_code, 
            pickerShow:false
        }
    }
    render(){
        
        return (
            <View marginB-16>
                <View row centerV >
                    <View style={styles.fieldIcon} center>
                    {this.props.icon}
                    </View>
                    <View style={styles.inputBox} paddingL-30>
                        <TouchableOpacity onPress={() => this.setState({pickerShow:true})} 
                        style={{alignItems:"center",flexDirection:"row", width:65, justifyContent:"space-between", borderRightWidth:.5, borderRightColor:Colors.lightGray, paddingHorizontal:5, marginRight:5}}>
                                <Text white text90 paddingH-5>{this.state.phone_code && `(+${this.state.phone_code})`}</Text>
                                <Icon name="chevron-down" color={Colors.gray} size={20}/>
                        </TouchableOpacity>
                        <TextInput style={styles.input} 
                            {...this.props}
                            disableFullscreenUI={false}
                            placeholderTextColor={Colors.lightGray2}
                            ref={this.props.formRef}
                        />
                    </View>
                </View>
                {this.props.error && <Text marginL-50 red30 text90>{this.props.error}</Text>}
                <CountryPicker visible={this.state.pickerShow}
                    countryCode={this.state.country_code}
                    withCloseButton
                    withFilter
                    withFlag
                    withCallingCode
                    withModal
                    withFlagButton={false}
                    placeholder={null}
                    onSelect={(country) => {
                        this.setState({pickerShow:false})
                        const phone_code = Array.isArray(country.callingCode) ? country.callingCode[0] : country.callingCode
                        this.setState({
                            phone_code,
                            country_code:country.cca2
                        })
                        this.props.onPhoneCodeSelect(country.cca2, phone_code)
                    }}
                    onClose={() => this.setState({pickerShow:false})}
                />
            </View>
        )
    }

    componentDidMount(){
        this.setState(this.props.setCountry)
    }

    componentWillReceiveProps(nextProps){
        this.setState(nextProps.setCountry)
    }
}

InputGroup.propTypes = {
    icon: PropTypes.element.isRequired
}

export default InputGroup;