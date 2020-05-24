import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Dimensions, Text } from 'react-native';
import ExploreBookScreen from '../../ExploreBookScreen/ExploreBookScreen';
import MyBookScreen from '../../MyBookScreen/MyBookScreen';
import en from '../../../assests/Strings/en';
import normalize, { normalScale, verticalScale } from './../../config/device/normalize';
import * as colors from './../../../assests/colors';
import fonts from '../../../assests/fonts';
import LinearGradient from 'react-native-linear-gradient';
import LogoutScreen from '../../LogoutScreen/LogoutScreen';

const Tab = createBottomTabNavigator();

class BottomNavigator extends Component {  

    state = {
        orientation: '',
        focused: false
    }   

    getOrientation = () =>
    {        
        if( Dimensions.get('window').width < Dimensions.get('window').height )
        {
            this.setState({ orientation: 'portrait' });
        }
        else
        {
            this.setState({ orientation: 'landscape' });
        }        
    }

    componentDidMount()
    {
        this.getOrientation();
        Dimensions.addEventListener( 'change', () =>
        {
            this.getOrientation();
        });
    }

    render() {
        return (        
            <Tab.Navigator 
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {                                                
                        if (route.name === en.EXPOLREBOOK_NAVIGATION) {                              
                            return (
                                <LinearGradient colors={focused ? [colors.white, colors.gradientGreen] : [colors.white, colors.white]} style={focused ? styles.activeGradient : styles.inactiveGradient}>                                    
                                    <Text style={focused ? styles.activeLabelText : styles.inactiveLabelText}>{en.EXPLORE_BOOKS}</Text>                                    
                                </LinearGradient>
                            )
                        } 
                        else if (route.name === en.MYBOOK_NAVIGATION) {                        
                            return (
                                <LinearGradient colors={focused ? [colors.white, colors.gradientGreen] : [colors.white, colors.white]} style={focused ? styles.activeGradient : styles.inactiveGradient}>                                    
                                    <Text style={focused ? styles.activeLabelText : styles.inactiveLabelText}>{en.MY_BOOKS}</Text>
                                </LinearGradient>
                            )
                        }   
                        else if (route.name === en.LOGOUT_NAVIGATION) {                        
                            return (
                                <LinearGradient colors={focused ? [colors.white, colors.gradientGreen] : [colors.white, colors.white]} style={focused ? styles.activeGradient : styles.inactiveGradient}>                                    
                                    <Text style={focused ? styles.activeLabelText : styles.inactiveLabelText}>{en.LOGOUT}</Text>
                                </LinearGradient>
                            )
                        }                        
                    },
                })}
                initialRouteName={en.EXPOLREBOOK_NAVIGATION}
                tabBarOptions={{
                    showLabel: false,
                    style: styles.container
                }}
            >
                <Tab.Screen name={en.EXPOLREBOOK_NAVIGATION} component={ExploreBookScreen} />
                <Tab.Screen name={en.MYBOOK_NAVIGATION} component={MyBookScreen} />
                <Tab.Screen name={en.LOGOUT_NAVIGATION} component={LogoutScreen} />
            </Tab.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: verticalScale(46)
    },
    activeGradient: {
        width: '100%', 
        height: verticalScale(46), 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderTopWidth: 3, 
        borderTopColor: colors.green       
    },
    inactiveGradient: {
        width: '100%', 
        height: verticalScale(46), 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderTopWidth: 3, 
        borderTopColor: colors.transparent
    },
    activeLabelText: {
        fontSize: normalize(12),         
        fontFamily: fonts.SFProTextRegular,
        fontWeight: 'bold',
        color: colors.black        
    },
    inactiveLabelText: {
        fontSize: normalize(12),       
        fontFamily: fonts.SFProTextRegular,
        fontWeight: 'bold',
        color: colors.silverGrey        
    },
    activeTabStyle: {
        flexDirection: 'column', 
        borderTopColor: colors.green, 
        borderTopWidth: 2
    },
    inactiveTabStyle: {        
        flexDirection: 'column', 
        borderTopColor: colors.white, 
        borderTopWidth: 2
    }
})

export default BottomNavigator;