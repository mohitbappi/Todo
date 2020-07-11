import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList, BackHandler } from 'react-native';
import Header from './../widgets/Header/Header';
import en from '../../assests/Strings/en';
import styles from './ExploreBookScreenStyle';
import axios from 'axios'
import Config from 'react-native-config';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { bindActionCreators } from 'redux';
import { onSetData } from './ExploreBookScreenAction';
import { NavigationAction } from '@react-navigation/native';
import { onResetBookData } from '../MyBookScreen/MyBookScreenAction';
import UserTokenUtil from '../Util/AsyncStorage/UserTokenUtil';

class ExploreBookScreen extends Component {

    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    } 

    state = {
        loader: true,
        data: []
    }    

    handleBackButtonClick = () => {        
        BackHandler.exitApp();
        return true;
    }

    onGetApiResponse = () => {
        this.setState({
            loader: true
        })
        const url = Config.SERVER_URL
        axios.get(`${url}/books`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            this.props.setData(response.data)
            this.setState({                
                loader: false
            })
        })
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);       
        this.onGetApiResponse()
        this.willFocusListener = this.props.navigation.addListener(
            "tabPress",
            () => {
                this.onGetApiResponse();
                this.props.resetData();            
            }
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);    
        this.willFocusListener.remove();        
    }

    onAddToCollection = (bookId) => {
        const url = Config.SERVER_URL
        return new Promise((resolve, reject) => {            
            let userTokenUtil = new UserTokenUtil();            
            userTokenUtil.getUserToken(
                authToken => {                                                               
                    axios.post(`${url}/profile/addbook`, {                                        
                        bookId: bookId                 
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token' : authToken
                        }
                    })        
                    .then(response => {                  
                        if(response.data === 'OK')
                        {
                            Toast.show(en.SUCCESSFULLY_ADDED)
                        }
                        else
                        {
                            Toast.show(response.data)
                        }
                    })  
                }
            )
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
                <Header text={en.EXPLORE_BOOKS} />
                <View style={styles.container}>
                    <FlatList 
                        showsVerticalScrollIndicator={false}                        
                        data={this.props.data}
                        renderItem={({item}) => 
                            <View style={styles.innerContainer}>
                                <View style={styles.card} activeOpacity={0.5}>
                                    <Image source={{ uri: `${item.imageUrl}` }} style={styles.image} />  
                                    <View style={styles.detail}>
                                        <Text style={styles.name}>Book Name: <Text style={styles.nameInner}>{item.bookName}</Text></Text>    
                                        <Text style={styles.author}>Author Name: <Text style={styles.authorInner}>{item.authorName}</Text></Text>    
                                        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => this.onAddToCollection(item._id)}>
                                            <Text style={styles.buttonText}>{en.ADD_TO_COLLECTION}</Text>
                                        </TouchableOpacity>
                                    </View>                          
                                </View>
                            </View>
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
        data: state.ExploreBookScreenReducer.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setData: bindActionCreators(onSetData, dispatch),
        resetData: bindActionCreators(onResetBookData, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreBookScreen);