import * as ActionTypes from './ActionType';

const initialState = {
    data: []
}

const ExploreBookScreenReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.SET_DATA:
            return {
                ...state,
                data: action.payload
            }
        case ActionTypes.RESET_DATA:
            return {
                ...state,
                data: []
            }
    }
    return state;
}

export default ExploreBookScreenReducer;