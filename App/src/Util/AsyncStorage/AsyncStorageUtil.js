import AsyncStorage from '@react-native-community/async-storage';

class AsyncStorageUtil {

    constructor(dataKey) {
        this.key = dataKey;
    }

    async saveData(value) {
        try {            
            return await AsyncStorage.setItem(this.key, value);
        }
        catch(e){          
            console.log(e)  
        }
    }

    async retreiveData() {
        try {
            return await AsyncStorage.getItem(this.key);
        }
        catch(e){          
            console.log(e)  
        }
    }

    async removeData() {
        try {
            
            return await AsyncStorage.removeItem(this.key);
        }
        catch(e){            
            console.log(e)
        }
    }
}

export default AsyncStorageUtil;