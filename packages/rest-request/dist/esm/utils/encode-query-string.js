import { processParams } from "./process-params";
/**
 * Encodes the passed object as a query string.
 *
 * @param params An object to be encoded.
 * @returns An encoded query string.
 */
export function encodeQueryString(params) {
    var newParams = processParams(params);
    return Object.keys(newParams)
        .map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(newParams[key]);
    })
        .join("&");
}
//# sourceMappingURL=encode-query-string.js.map