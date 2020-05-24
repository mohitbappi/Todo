import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../../SignInScreen/SignInScreen';
import en from '../../../assests/Strings/en';
import SignUpScreen from '../../SignUpScreen/SignUpScreen';
import BottomNavigator from '../routes/BottomNavigator';
import { connect } from 'react-redux';
import TodoScreen from '../../TodoScreen/TodoScreen';

const HomeStack = createStackNavigator();

class HomeStackScreen extends React.Component {        
    render() {            
        const isSignin = this.props.isSignin        
        return (
            <NavigationContainer>
                <HomeStack.Navigator
                    initialRouteName={isSignin ? en.BOTTOM_NAVIGATION : en.SIGNIN_NAVIGATION}
                >                
                    <HomeStack.Screen name={en.SIGNIN_NAVIGATION} component={SignInScreen} options={{ header: () => null }} />                
                    <HomeStack.Screen name={en.SIGNUP_NAVIGATION} component={SignUpScreen} options={{ header: () => null }} />                
                    <HomeStack.Screen name={en.BOTTOM_NAVIGATION} component={BottomNavigator} options={{ header: () => null }} />
                    <HomeStack.Screen name={en.TODO_NAVIGATION} component={TodoScreen} options={{ header: () => null }} />
                </HomeStack.Navigator>
            </NavigationContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        authToken: state.SignInScreenReducer.authToken
    }
}

export default connect(mapStateToProps, null)(HomeStackScreen);