import RequestInterceptor from "../../libapi/interceptors/RequestInterceptor";
import UserTokenUtil from "../../../src/Util/AsyncStorage/UserTokenUtil";
import NoAuthTokenFoundError from "./NoAuthTokenFoundError";

class AuthenticationHeaderInterceptor extends RequestInterceptor {
    intercept(request) {

        return new Promise((resolve, reject) => {
            let userTokenUtil = new UserTokenUtil();
            userTokenUtil.getUserToken(
                authToken => {
                    request.headers.append("Authorization", authToken || "");
                    resolve(request);
                },
                error => {
                    let err = new NoAuthTokenFoundError("Error retrieving Authentication token");
                    err.actualError = error;
                    reject(err);
                }
            );
        });
    }
}


export default AuthenticationHeaderInterceptor;