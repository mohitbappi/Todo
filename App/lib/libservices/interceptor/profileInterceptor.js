import { MY_ACCOUNT_SCREEN_API_SUCCESS } from "../../../App/src/MyAccountScreen/ActionTypes";
import AsyncStorageUtil from '../../../App/src/widgets/AsyncStorage/AsyncStorageUtil';
import {MK_APPT_GET_USER_PROFILE_SUCCESS} from "../../../App/src/Appointments/AppointmentBooking/MakeApptReducer";

const confirmProfileAction = (type) => {
    switch (type) {
        case MY_ACCOUNT_SCREEN_API_SUCCESS:
        case MK_APPT_GET_USER_PROFILE_SUCCESS:
            return true;
        default:
            return false;
    }
};

const profileResponseInterceptor = store => next => action => {
    const payload = action.payload;
    const userDataKey = "userdata";
    if (payload && confirmProfileAction(action.type)) {
        let asyncStorage = new AsyncStorageUtil(userDataKey);
        const patientDetails = { ...payload };
        asyncStorage.saveData(JSON.stringify(patientDetails));
        next(action);
    } else {
        next(action);
    }
};

export default profileResponseInterceptor;