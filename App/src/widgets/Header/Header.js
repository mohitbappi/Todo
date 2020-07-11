import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import * as colors from './../../../assests/colors';
import normalize, { normalScale, verticalScale } from './../../config/device/normalize';
import fonts from './../../../assests/fonts';
import { iconHeaderArrowBack } from '../../../assests/Images/iconHeaderArrowBack/index';

class Header extends Component {
    render() {
        return(
            <View style={styles.container}>                
                <TouchableOpacity onPress={this.props.navigation} activeOpacity={0.5}>
                    <Image source={iconHeaderArrowBack}  style={this.props.isArrowShow ? styles.arrowShow : styles.arrowHide} />
                </TouchableOpacity>
                <Text style={styles.text}>{this.props.text}</Text>    
                <Text></Text>                        
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.headerColor,
        flexDirection: 'row',
        height: verticalScale(58),
        justifyContent: 'space-between',
        paddingHorizontal: normalScale(20),
        alignItems: 'center',
        shadowColor: colors.headerShadowColor,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 4,
        shadowOpacity: 4,
        elevation: 4
    },
    arrowShow: {
        display: 'flex'
    },
    arrowHide: {
        display: 'none'
    },
    text: {
        color: colors.headerTextColor,
        fontFamily: fonts.RobotoMedium,
        lineHeight: verticalScale(28),
        fontSize: normalize(16),
        fontWeight: 'bold'        
    }
})

export default Header;