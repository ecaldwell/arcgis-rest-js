"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process_params_1 = require("./process-params");
/**
 * Encodes the passed object as a query string.
 *
 * @param params An object to be encoded.
 * @returns An encoded query string.
 */
function encodeQueryString(params) {
    var newParams = process_params_1.processParams(params);
    return Object.keys(newParams)
        .map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(newParams[key]);
    })
        .join("&");
}
exports.encodeQueryString = encodeQueryString;
//# sourceMappingURL=encode-query-string.js.map