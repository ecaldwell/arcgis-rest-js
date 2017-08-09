import { request } from "@esri/rest-request";
export function fetchToken(url, params) {
    return request(url, params).then(function (response) {
        var r = {
            token: response.access_token,
            username: response.username,
            expires: new Date(Date.now() + (response.expires_in * 60 * 1000 - 60 * 1000))
        };
        if (response.refresh_token) {
            r.refreshToken = response.refresh_token;
        }
        return r;
    });
}
//# sourceMappingURL=fetchToken.js.map