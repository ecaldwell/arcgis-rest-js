"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rest_request_1 = require("@esri/rest-request");
function fetchToken(url, params) {
    return rest_request_1.request(url, params).then(function (response) {
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
exports.fetchToken = fetchToken;
//# sourceMappingURL=fetchToken.js.map