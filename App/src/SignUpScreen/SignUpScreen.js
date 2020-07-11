import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './SignUpScreenStyle';
import Input from '../widgets/InputField/TextInput';
import ButtonComponent from '../widgets/Button/ButtonComponent';
import * as colors from '../../assests/colors';
import Header from '../widgets/Header/Header';
import en from './../../assests/Strings/en';
import { connect } from 'react-redux';
import { onResetSignUpState } from './SignUpScreenAction';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Config from 'react-native-config';
import Toast from 'react-native-simple-toast';

class SignUpScreen extends Component {

    state = {
        focusName: false,
        focusEmail: false,
        focusPassword: false,
        focusConfirmPassword: false,
        name: '',
        email: '',
        password: '',  
        confirmPassword: '',
        loader: false
    }

    onFocusName = () => {
        this.setState({
            focusName: true
        })
    }

    onBlurName = () => {
        this.setState({
            focusName: false
        })
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

    onFocusConfirmPassword = () => {
        this.setState({
            focusConfirmPassword: true
        })
    }

    onBlurConfirmPassword = () => {
        this.setState({
            focusConfirmPassword: false
        })
    }

    onSetName = (text) => {
        this.setState({
            name: text
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

    onSetConfirmPassword = (text) => {
        this.setState({
            confirmPassword: text
        })
    }

    onSubmit = () => {   
        const expression=/^[a-zA-Z]+[0-9.]*[a-zA-Z0-9]+@[a-zA-Z]+[0-9]*[a-zA-Z]+\.[A-Za-z]{2,10}$/;    
        if(this.state.password !== this.state.confirmPassword)
        {
            Toast.show(en.PASSWORD)
        }  
        else if(!expression.test(String(this.state.email).toLowerCase()))
        {   
            Toast.show(en.ENTER_VALID_EMAIL)
        }   
        else if(this.state.password.length < 8)
        {
            Toast.show(en.PASSWORD_VALIDATION)
        }
        else
        {
            const url = Config.SERVER_URL;
            this.setState({
                loader: true
            })                
            axios.post(`${url}/users`, {                        
                    name: this.state.name,
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
                this.props.resetState()
                this.setState({
                    loader: false
                })
                this.props.navigation.navigate(en.SIGNIN_NAVIGATION)                        
            })
            .catch(error => {
                Toast.show(en.USER_ALREADY_EXIST)                
                this.setState({
                    loader: false
                })
            })        
        }
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
                <Header text={en.SIGN_UP_TEXT} isArrowShow={true} navigation={() => this.props.navigation.goBack()} />
                <View  style={styles.container}> 
                    <Input  
                        value={this.state.name}                       
                        placeholder={en.ENTER_YOUR_NAME} 
                        placeholderTextColor={colors.silverGrey}            
                        blur={false} 
                        submit={() => this.name.focus()}                       
                        onFocus={() => this.onFocusName()}
                        onBlur={() => this.onBlurName()}   
                        onChangeText={this.onSetName}
                        style={this.state.focusName ? styles.activeField : this.state.name !== '' ? styles.filledField : styles.inactiveField}    
                    />               
                    <Input  
                        value={this.state.email}                       
                        placeholder={en.ENTER_YOUR_EMAIL} 
                        placeholderTextColor={colors.silverGrey}
                        refs={(input) => {this.name = input;}}                        
                        blur={false} 
                        submit={() => this.email.focus()}                        
                        onFocus={() => this.onFocusEmail()}
                        onBlur={() => this.onBlurEmail()}   
                        onChangeText={this.onSetEmail}
                        style={this.state.focusEmail ? styles.activeField : this.state.email !== '' ? styles.filledField : styles.inactiveField}    
                    />
                    <Input 
                        value={this.state.password}                          
                        placeholder={en.ENTER_YOUR_PASSWORD}                         
                        refs={(input) => {this.email = input;}}
                        submit={() => this.password.focus()}
                        blur={false}              
                        placeholderTextColor={colors.silverGrey}    
                        secureTextEntry={true}      
                        onFocus={() => this.onFocusPassword()}
                        onBlur={() => this.onBlurPassword()} 
                        onChangeText={this.onSetPassword}
                        style={this.state.focusPassword ? styles.activeField : this.state.password !== '' ? styles.filledField : styles.inactiveField}    
                    />
                    <Input 
                        value={this.state.confirmPassword}                          
                        placeholder={en.CONFIRM_YOUR_PASSWORD}                         
                        refs={(input) => {this.password = input;}}
                        blur={true}              
                        placeholderTextColor={colors.silverGrey}    
                        secureTextEntry={true}      
                        submit={() => this.onSubmit()}
                        onFocus={() => this.onFocusConfirmPassword()}
                        onBlur={() => this.onBlurConfirmPassword()} 
                        onChangeText={this.onSetConfirmPassword}
                        style={this.state.focusConfirmPassword ? styles.activeField : this.state.password !== '' ? styles.filledField : styles.inactiveField}    
                    />                    
                    <ButtonComponent text={en.SIGN_UP} style={styles.button} onPress={this.onSubmit} />                                    
                    <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate(en.SIGNIN_NAVIGATION)}>
                        <Text style={styles.account}>{en.ALREADY_HAVE_AN_ACCOUNT}<Text style={styles.accountBold}> {en.SIGN_IN}</Text></Text>
                    </TouchableOpacity>                    
                </View>                    
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        signup: state.SignUpScreenReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetState: bindActionCreators(onResetSignUpState, dispatch)        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);