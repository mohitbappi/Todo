import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import normalize, { normalScale, verticalScale } from './../../config/device/normalize';
import * as colors from './../../../assests/colors';
import fonts from './../../../assests/fonts';

class ButtonComponent extends Component {
    render() {
        return(
            <TouchableOpacity style={[styles.signUpButton, this.props.style]} onPress={this.props.onPress} activeOpacity={0.5}>
                <Text style={[styles.signUpText, this.props.textStyle]}>{this.props.text}</Text>
            </TouchableOpacity>   
        )
    }
}

const styles = StyleSheet.create({
    signUpButton: {        
        borderRadius: 10,
        justifyContent: 'center',    
        paddingVertical: verticalScale(14),
        backgroundColor: colors.green
     },
     signUpText: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        fontFamily: fonts.SFProTextSemibold
     },
})

export default ButtonComponent;