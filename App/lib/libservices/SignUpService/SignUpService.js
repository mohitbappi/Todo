import UrlBuilder from "../../libapi/rest/request/UrlBuilder";
import POSTRequest from "../../libapi/rest/request/POSTRequest";
import { BaseUrl } from '../BaseUrl';

export default class SignUpService extends POSTRequest {

    getUrl(props) {
        return new UrlBuilder(BaseUrl())
            .addPath("users")
            .build();
    }

    getBody(props) {
        return {
            "name": props.name,
            "email": props.email,
            "password": props.password
        }
    }
}