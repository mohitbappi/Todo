/**
 * Middleware created for the redux actions and listens for the error returned from the
 * API response is due to auth token, then it checks if the user is logged in or not,
 * It handles error for the logged in user case and does nothing for non-logged in user
 *
 * @param store the store object.
 */

import LogoutHandler from "../../../App/src/Logout/LogoutHandler";
import APIError from "./APIError";
import UserTokenUtil from "../../../App/src/widgets/AsyncStorage/UserTokenUtil";

const inspectIfTokenError = (error) => {
    let code = error.code;

    switch (code) {
        case "ACCOUNT_BLOCKED":
        case "UNAUTHORIZE":
        case "INVALID_TOKEN":
        case "UNAUTHORIZE_ACCESS":
        case "INVALID_ACCESS":
            return true;
        default:
            return false;
    }

};

const responseAuthErrorInterceptor = store => next => action => {

    const payload = action.payload;

    if (payload && payload instanceof APIError && inspectIfTokenError(payload)) {

        const userTokenUtil = new UserTokenUtil();

        // check if the user is not already logged in
        userTokenUtil.isLoggedIn(isLoggedIn => {
            // if the user is already logged in then
            // the user needs to be logged out of the
            // current session.
            if (isLoggedIn) {
                let logoutHandler = new LogoutHandler();
                logoutHandler.logout(store.dispatch);
            } else {
                // if the user is not already logged in
                // then this error might have happened due to
                // some non-authenticated action example on the
                // login screen.
                next(action);
            }
        });
    }else {
        next(action);
    }
};

export default responseAuthErrorInterceptor;