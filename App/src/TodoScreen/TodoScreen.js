import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import Header from '../widgets/Header/Header';
import en from '../../assests/Strings/en';
import styles from './TodoScreenStyle';

class TodoScreen extends Component {

    state = {
        loader: false
    }

    render() {
        const data = this.props.route.params.data
        console.log(data)
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
                <Header text={en.TODO} isArrowShow= {true} navigation={() => this.props.navigation.goBack()} />
                <View style={styles.container}>
                    <FlatList 
                        showsVerticalScrollIndicator={false}                        
                        data={data}
                        renderItem={({item}) => 
                            <View style={styles.innerContainer}>
                                <View style={styles.card} activeOpacity={0.5}>                                                                        
                                    <Text style={styles.name}>Heading: <Text style={styles.nameInner}>{item.heading}</Text></Text>    
                                    <Text style={styles.author}>Reason: <Text style={styles.authorInner}>{item.reason}</Text></Text>                                        
                                </View>                          
                            </View>                            
                        }
                    />     
                </View>   
            </View>
        );
    }
}

export default TodoScreen;