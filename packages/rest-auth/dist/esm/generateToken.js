import { request } from "@esri/rest-request";
export function generateToken(url, params) {
    /* istanbul ignore else */
    if (typeof window !== "undefined" &&
        window.location &&
        window.location.host) {
        params.referer = window.location.host;
    }
    else {
        params.referer = "@esri.rest-auth";
    }
    return request(url, params);
}
//# sourceMappingURL=generateToken.js.map