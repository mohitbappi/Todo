import * as ActionTypes from './ActionType';

const initialState = {
    email: '',
    password : '',
    error: '',
    errorStatus: false,
    loader: false,
    success: false,
    authToken: null
}

const SignInScreenReducer = (state = initialState, action) => {
    switch(action.type) {
        case  ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
                success: true,
                loader: false,
                error: '',
                errorStatus: false
            }
        case ActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                loader: true
            }
        case ActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                success: false,
                errorStatus: true,
                error: action.payload,
                loader: false,
                email: '',
                password: ''
            }
        case ActionTypes.RESET_STATE:
            return {
                ...state,
                email: '',
                password : '',
                error: '',
                errorStatus: false,
                loader: false,
                success: false                
            }
        case ActionTypes.SET_TOKEN:
            return {
                ...state,
                authToken: action.payload
            }
        case ActionTypes.RESET_TOKEN:
            return {
                ...state,
                authToken: null
            }
    }
    return state;
}

export default SignInScreenReducer;