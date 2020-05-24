import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { bottomLineGrey, silverGrey } from './../../../assests/colors';
import fonts from './../../../assests/fonts';
import normalize, { verticalScale } from './../../config/device/normalize';
import * as colors from '../../../assests/colors';

class Input extends Component {
    render(){
        return(
            <View style={this.props.containerStyle}>
                <TextInput 
                    secureTextEntry={this.props.secureTextEntry}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    value={this.props.value}
                    style={[styles.inputText, this.props.style]}
                    onChangeText={this.props.onChangeText}
                    placeholder={this.props.placeholder}
                    editable = {this.props.editable}
                    ref={this.props.refs} 
                    blurOnSubmit={this.props.blur} 
                    onSubmitEditing={this.props.submit} 
                    maxLength={this.props.maxLength}
                    keyboardType = {this.props.keyboard}
                    placeholderTextColor={this.props.placeholderTextColor}  
                    onKeyPress={this.props.onKeyPress} 
                    editable={this.props.editable}
                    secureTextEntry={this.props.secureTextEntry}                    
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputText: {
        fontSize: normalize(16),
        lineHeight: verticalScale(24), 
        paddingBottom: verticalScale(9),      
        color: colors.silver,
        borderBottomWidth: 3,
        borderBottomColor: bottomLineGrey,
        fontFamily: fonts.SFProTextRegular,
        marginTop: verticalScale(12)    
    }
})

export default Input;