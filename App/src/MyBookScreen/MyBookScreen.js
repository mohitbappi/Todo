import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native';
import Header from './../widgets/Header/Header';
import en from '../../assests/Strings/en';
import styles from './MyBookScreenStyle';
import axios from 'axios'
import Config from 'react-native-config';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import UserTokenUtil from '../Util/AsyncStorage/UserTokenUtil';
import { bindActionCreators } from 'redux';
import { onResetData } from '../ExploreBookScreen/ExploreBookScreenAction';
import { onSetBookData, onResetBookData } from './MyBookScreenAction';

class MyBookScreen extends Component {

    state = {
        loader: true,
        data: [],
        dataLength: 0
    }

    onGetApiResponse = () => {        
        this.setState({
            loader: true
        })
        const url = Config.SERVER_URL    
        return new Promise((resolve, reject) => {            
            let userTokenUtil = new UserTokenUtil();            
            userTokenUtil.getUserToken(
                authToken => {                                                       
                    axios.get(`${url}/profile/me`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token' : authToken
                        }
                    })
                    .then(response => {                        
                        this.setState({
                            dataLength: response.data.currentBooks.length
                        })
                        response.data.currentBooks.map(item => {            
                            axios.get(`${url}/books/${item.currentBookId}`, {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                            .then(response => {                                      
                                this.props.setData(response.data)
                                console.log(this.props.data.length, this.state.dataLength)                           
                                if(this.props.data.length === this.state.dataLength)       
                                {    
                                    this.setState({                
                                        loader: false
                                    })
                                }                                
                            })
                        })                   
                    })
                }
            )
        });
    }

    componentDidMount() {     
        this.onGetApiResponse()
        this.willFocusListener = this.props.navigation.addListener(
            "tabPress",
            () => {          
                this.props.resetBookData();            
                this.onGetApiResponse();                              
            }
        );        
    }       

    componentWillUnmount() {        
        this.willFocusListener.remove();
        this.props.resetData();
        this.setState({
            count: 0
        })
    }

    render() {      
        this.props.resetData();
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
                <Header text={en.MY_BOOKS} />
                <View style={styles.container}>
                    <FlatList 
                        showsVerticalScrollIndicator={false}                        
                        data={this.props.data}
                        renderItem={({item}) =>                            
                            <TouchableOpacity style={styles.innerContainer} activeOpacity={0.7} onPress={() => this.props.navigation.navigate(en.TODO_NAVIGATION, { data: item.steps })}>
                                <View style={styles.card}>
                                    <Image source={{ uri: `${item.imageUrl}` }} style={styles.image} />  
                                    <View style={styles.detail}>
                                        <Text style={styles.name}>Book Name: <Text style={styles.nameInner}>{item.bookName}</Text></Text>    
                                        <Text style={styles.author}>Author Name: <Text style={styles.authorInner}>{item.authorName}</Text></Text>                                            
                                    </View>                          
                                </View>
                            </TouchableOpacity>
                        }
                    />     
                </View>          
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        authToken: state.SignInScreenReducer.authToken,
        data: state.MyBookScreenReducer.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetData: bindActionCreators(onResetData, dispatch),
        setData: bindActionCreators(onSetBookData, dispatch),
        resetBookData: bindActionCreators(onResetBookData, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBookScreen);