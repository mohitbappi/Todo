import ErrorInterceptor from "./ErrorInterceptor";
import SuccessResponseInterceptor from "./SuccessResponseInterceptor";
import APIRequest from "../../libapi/rest/request/APIRequest";
import VersionHeaderInterceptor from "./VersionHeaderInterceptor";

/**
 * Use this to add the interceptors to the API requests,
 * optionally you can use the APIRequest.makeRequest method to make the request directly without
 * interceptors.
 * @param requestObj This should be instance of APIRequest
 * @param props these props would be provided to the url, header and body of the rest request.
 * @returns nothing, just makes the api request.
 */
export default function makeInterceptedRequest(requestObj, props) {
    if (!(requestObj instanceof APIRequest)) {
        throw new Error("The requestObj should be instance of the class APIRequest");
    }
    addBasicInterceptors(requestObj);
    return requestObj.makeRequest(props);
};

/**
 * @function - This method is used to add necessary interceptors to make api service working. It adds VersionHeaderInterceptor, ErrorInterceptor and SuccessResponseInterceptor.
 * @param {APIRequest} request - The service call object which have addRequestInterceptor method.
 */
export function addBasicInterceptors(request) {
    // adds the version header to the request
    request.addRequestInterceptor(new VersionHeaderInterceptor());
    // delivers the API errors to the reducers via the Error objects.
    request.addResponseInterceptor(new ErrorInterceptor());
    // delivers the data part of the Success response as that is only required.
    request.addResponseInterceptor(new SuccessResponseInterceptor());
}
