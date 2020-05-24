import RequestInterceptor from "../../libapi/interceptors/RequestInterceptor";

/**
 * This is responsible for adding the version header for the API.
 */
export default class VersionHeaderInterceptor extends RequestInterceptor {

    intercept(request) {
        request.headers.append("accept-version", "1.0.2");
        return request;
    }
}