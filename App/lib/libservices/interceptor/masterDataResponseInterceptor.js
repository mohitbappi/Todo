import {SEARCH_DENTIST_SET_MASTER_DATA} from "../../../App/src/MasterData/MasterDataReducer";
import MasterDataStore from "../../../App/src/widgets/AsyncStorage/MasterDataStore";

const inspectIfMasterData = (type) => {
    switch (type) {
        case SEARCH_DENTIST_SET_MASTER_DATA:
            return true;
        default:
            return false;
    }
};

const masterDataResponseInterceptor = store => next => action => {
    const payload = action.payload;

    if (payload && inspectIfMasterData(action.type)) {
        // save the master data into the async storage.
        let dataStore = new MasterDataStore();
        dataStore.saveMasterData({...action.payload.data}, () => {
            // The records have been saved, so move to next now.
            next(action)
        }, () => {
            // move to next as it might be due to some
            // error in saving the records.
            next(action)
        });
    } else {
        next(action);
    }


};

export default masterDataResponseInterceptor;