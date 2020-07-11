import * as ActionTypes from './ActionType';

export const onSetBookData = (data) => {
    console.log("data", data)
    return {
        type: ActionTypes.SET_BOOK_DATA,
        payload: data
    }
}

export const onResetBookData = () => {
    return {
        type: ActionTypes.RESET_BOOK_DATA
    }
}