import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import en from '../../assests/Strings/en';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onResetToken } from '../SignInScreen/SignInScreenAction';
import UserTokenUtil from '../Util/AsyncStorage/UserTokenUtil';
import { onResetBookData } from '../MyBookScreen/MyBookScreenAction';
import { onResetData } from '../ExploreBookScreen/ExploreBookScreenAction';

class LogoutScreen extends Component {

    onAlert = () => {
        Alert.alert(
            en.LOGOUT,
            en.LOGOUT_MESSAGE,
            [
                {
                    text: en.CANCEL                
                },
                { 
                    text: en.OK, 
                    onPress: () => {
                        const userTokenUtil = new UserTokenUtil();
                        userTokenUtil.removeData();
                        this.props.navigation.navigate(en.SIGNIN_NAVIGATION);
                    } 
                }
            ],
            { cancelable: false }
        )
    }

    componentDidMount() {        
        this.onAlert();        
        this.willFocusListener = this.props.navigation.addListener(
            "tabPress",
            () => {
                this.onAlert();
                this.props.resetBookData();      
                this.props.resetData();            
            }
        );
    }

    componentWillUnmount() {        
        this.willFocusListener.remove();        
    }

    render() {
        return(
            <View>                
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetBookData: bindActionCreators(onResetBookData, dispatch),
        resetData: bindActionCreators(onResetData, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(LogoutScreen);