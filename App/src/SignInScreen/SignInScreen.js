import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './SignInScreenStyle';
import Input from '../widgets/InputField/TextInput';
import ButtonComponent from '../widgets/Button/ButtonComponent';
import * as colors from '../../assests/colors';
import Header from '../widgets/Header/Header';
import en from './../../assests/Strings/en';
import axios from 'axios';
import Config from 'react-native-config';
import Toast from 'react-native-simple-toast';
import { onResetState, onSetToken } from './SignInScreenAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserTokenUtil from '../Util/AsyncStorage/UserTokenUtil';

class SignInScreen extends Component {

    state = {
        focusEmail: false,
        focusPassword: false,
        email: '',
        password: '' ,
        loader: false       
    }

    onFocusEmail = () => {
        this.setState({
            focusEmail: true
        })
    }

    onBlurEmail = () => {
        this.setState({
            focusEmail: false
        })
    }

    onFocusPassword = () => {
        this.setState({
            focusPassword: true
        })
    }

    onBlurPassword = () => {
        this.setState({
            focusPassword: false
        })
    }

    onSetEmail = (text) => {
        this.setState({
            email: text
        })
    }

    onSetPassword = (text) => {
        this.setState({
            password: text
        })
    }

    onSubmit = () => {   
        const url = Config.SERVER_URL;
        this.setState({
            loader: true
        })                
        axios.post(`${url}/auth`, {                                        
                email: this.state.email,
                password: this.state.password                     
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )        
        .then(response => {                        
            this.props.setToken(response.data.token)
            this.props.resetState()            
            this.setState({
                loader: false
            })
            let userToken = new UserTokenUtil();
            userToken.saveUserToken(response.data.token, function () {
                // success.
            }, function (error) { console.log(error) })
            this.props.navigation.navigate(en.BOTTOM_NAVIGATION)                        
        })
        .catch(error => {
            Toast.show(en.USER_DOES_NOT_EXIST)           
            this.setState({
                loader: false
            })
        })        
    }

    render() {
        if(this.state.loader)
        {
            return(
                <ActivityIndicator
                    color = "#009688"
                    size = "large"
                    style = { styles.indicator }
                />
            )
        }
        return(
            <View style={styles.mainContainer}>
                <Header text={en.SIGN_IN} />
                <View  style={styles.container}>                
                    <Input  
                        value={this.state.email}                       
                        placeholder={en.ENTER_YOUR_EMAIL} 
                        placeholderTextColor={colors.silverGrey}                    
                        blur={false} 
                        submit={() => this.email.focus()}                               
                        onFocus={() => this.onFocusEmail()}
                        onBlur={() => this.onBlurEmail()}   
                        onChangeText={this.onSetEmail}
                        style={this.state.focusEmail ? styles.activeField : this.state.email !== '' ? styles.filledField : styles.inactiveField }    
                    />
                    <Input 
                        value={this.state.password}                          
                        placeholder={en.ENTER_YOUR_PASSWORD}                         
                        refs={(input) => {this.email = input;}}
                        blur={true}              
                        placeholderTextColor={colors.silverGrey}   
                        submit={() => this.onSubmit()} 
                        secureTextEntry={true}      
                        onFocus={() => this.onFocusPassword()}
                        onBlur={() => this.onBlurPassword()} 
                        onChangeText={this.onSetPassword}
                        style={this.state.focusPassword ? styles.activeField : this.state.password !== '' ? styles.filledField : styles.inactiveField }    
                    />                    
                    <ButtonComponent text={en.LOGIN} style={styles.button} onPress={this.onSubmit} />                                    
                    <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate(en.SIGNUP_NAVIGATION)}>
                        <Text style={styles.account}>{en.NEED_AN_ACCOUNT}<Text style={styles.accountBold}> {en.SIGN_UP_TEXT}</Text></Text>
                    </TouchableOpacity>
                </View>      
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetState: bindActionCreators(onResetState, dispatch),
        setToken: bindActionCreators(onSetToken, dispatch)        
    }
}

export default connect(null, mapDispatchToProps)(SignInScreen);