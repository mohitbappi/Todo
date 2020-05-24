import ResponseInterceptor from "../../libapi/interceptors/ResponseInterceptor";

/**
 * This is responsible to extract the data part of the success response.
 * If no such data key is found in the response it raises an error.
 */
export default class SuccessResponseInterceptor extends ResponseInterceptor {

    intercept(response){
        return response.then((payload) => {
            if (payload.hasOwnProperty("data")) {
                return payload.data;
            } else {
                let error = new Error("The success response has no data property");
                error.response = response;
                throw error;
            }
        });
    }

}