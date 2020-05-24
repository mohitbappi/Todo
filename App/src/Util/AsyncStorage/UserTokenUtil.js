import AsyncStorageUtil from "./AsyncStorageUtil";

class UserTokenUtil extends AsyncStorageUtil {

    static USER_TOKEN_DATA_KEY = "user";

    constructor() {
        super(UserTokenUtil.USER_TOKEN_DATA_KEY);
    }

    async saveUserToken(userToken, successCallback, errorCallback) {
        
        try {
            await super.saveData(userToken);
            if (successCallback) {
                successCallback();
            }
        } catch (error) {
            if (errorCallback) {
                errorCallback(error.message);
            }
        }
    }

    async getUserToken(successCallback, errorCallback) {
        
        try {
            const value = await super.retreiveData();            
            if (value !== null && value !== undefined) {
                if (successCallback) {
                    successCallback(value)
                }
            } else {
                if (errorCallback) {
                    errorCallback('No Data Found');
                }
            }
        } catch (error) {
            if (errorCallback) {
                errorCallback(error.message);
            }
        }
    }

    isLoggedIn(resolve) {
        
        this.getUserToken(() => {
            resolve(true);
        }, () => {
            resolve(false);
        });
    }
}

export default UserTokenUtil;