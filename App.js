import React, { Component } from 'react';
import HomeStackScreen from './App/src/config/routes/index';
import { Provider } from "react-redux";
import store from "./App/src/config/store";
import UserTokenUtil from './App/src/Util/AsyncStorage/UserTokenUtil';

let userToken = new UserTokenUtil();

class App extends Component {

    state = {
        isSignin: false,
        loader: false
    }

    componentDidMount() {
        this.setState({
            loader: true
        })
        userToken.isLoggedIn((isLoggedin) => {
            this.setState({
                isSignin: isLoggedin,
                loader: false
            })
        })
    }

    render() {       
        if(this.state.loader)
        {
            return null
        }                
        return (		
            <Provider store = {store}>                        
                <HomeStackScreen isSignin={this.state.isSignin} />                                             
            </Provider>		
        );
    }
};

export default App;
