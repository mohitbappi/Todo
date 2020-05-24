import * as ActionTypes from './ActionType';

const initialState = {
    name: '',
    email: '',
    password : '',
    error: '',
    errorStatus: false,
    loader: false,
    success: false
}

const SignUpScreenReducer = (state = initialState, action) => {
    switch(action.type) {
        case  ActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                name: '',
                email: '',
                password: '',
                success: true,
                loader: false,
                error: '',
                errorStatus: false
            }
        case ActionTypes.SIGNUP_LOADER:
            console.log("loader")
            return {
                ...state,
                loader: true
            }
        case ActionTypes.SIGNUP_FAILURE:
            console.log("failure", action.payload)
            return {
                ...state,
                success: false,
                errorStatus: true,
                error: action.payload,
                loader: false,
                name: '',
                email: '',
                password: ''
            }
        case ActionTypes.RESET_SIGNUP_STATE:
            return {
                ...state,
                name: '',
                email: '',
                password : '',
                error: '',
                errorStatus: false,
                loader: false,
                success: false
            }
    }
    return state;
}

export default SignUpScreenReducer;