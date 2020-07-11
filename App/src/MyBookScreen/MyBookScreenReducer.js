import * as ActionTypes from './ActionType';

const initialState = {
    data: []
}

const MyBookScreenReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.SET_BOOK_DATA:
            return {
                ...state,
                data: [...state.data, action.payload],                    
            }
        case ActionTypes.RESET_BOOK_DATA:
            return {
                ...state,
                data: []
            }
    }
    return state;
}

export default MyBookScreenReducer;