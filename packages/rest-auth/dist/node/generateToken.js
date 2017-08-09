"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rest_request_1 = require("@esri/rest-request");
function generateToken(url, params) {
    /* istanbul ignore else */
    if (typeof window !== "undefined" &&
        window.location &&
        window.location.host) {
        params.referer = window.location.host;
    }
    else {
        params.referer = "@esri.rest-auth";
    }
    return rest_request_1.request(url, params);
}
exports.generateToken = generateToken;
//# sourceMappingURL=generateToken.js.map