import * as ActionTypes from './ActionType';

export const onResetState = () => {
    return {
        type: ActionTypes.RESET_STATE
    }
}

export const onSetToken = (token) => {
    return {
        type: ActionTypes.SET_TOKEN,
        payload: token
    }
}

export const onResetToken = () => {
    return {
        type: ActionTypes.RESET_TOKEN
    }
}