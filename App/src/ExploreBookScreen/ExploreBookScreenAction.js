import * as ActionTypes from './ActionType';

export const onSetData = (data) => {
    return {
        type: ActionTypes.SET_DATA,
        payload: data
    }
}

export const onResetData = () => {
    return {
        type: ActionTypes.RESET_DATA
    }
}