import React from 'react'
import {TextInput, TouchableOpacity} from 'react-native'
import {View, Text} from 'react-native-ui-lib'
import PropTypes from 'prop-types'; 
import Icon from 'react-native-vector-icons/Feather'
import { Colors } from '@commons'
import styles from './style'

class InputForm extends React.Component{
    constructor(props){ 
        super(props)
    }
    render(){
        
        return (
            <View marginB-16>
                <View row centerV >
                    <View style={styles.fieldIcon} center>
                    {this.props.icon}
                    </View>
                    <View style={styles.inputBox} paddingL-35>
                        <TextInput style={styles.input} 
                            {...this.props}
                            disableFullscreenUI={false}
                            placeholderTextColor={Colors.lightGray2}
                            ref={this.props.formRef}
                        />
                    </View>
                </View>
                {this.props.error && <Text marginL-50 red30 text90>{this.props.error}</Text>}
                
            </View>
        )
    }
}

InputForm.propTypes = {
    icon: PropTypes.element.isRequired
}

export default InputForm;