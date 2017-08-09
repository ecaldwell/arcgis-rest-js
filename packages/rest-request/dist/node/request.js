"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("es6-promise/auto");
require("isomorphic-fetch");
var check_for_errors_1 = require("./utils/check-for-errors");
var encode_form_data_1 = require("./utils/encode-form-data");
exports.FormData = encode_form_data_1.FormData;
var encode_query_string_1 = require("./utils/encode-query-string");
/**
 * Generic method for making HTTP requests to ArcGIS REST API endpoints.
 *
 * ```js
 * import { request } from 'arcgis-core';
 *
 * request('https://www.arcgis.com/sharing/rest')
 *   .then((response) => {
 *     console.log(response.currentVersion); // => 5.2
 *   });
 * ```
 *
 * ```js
 * import { request, HTTPMethods } from 'arcgis-core';
 *
 * request('https://www.arcgis.com/sharing/rest', {}, {
 *   httpMethod: "GET"
 * }).then((response) => {
 *   console.log(response.currentVersion); // => 5.2
 * });
 * ```
 *
 * ```js
 * import { request, HTTPMethods } from 'arcgis-core';
 *
 * request('https://www.arcgis.com/sharing/rest/search', {
 *   q: 'parks'
 * }).then((response) => {
 *   console.log(response.total); // => 78379
 * });
 * ```
 *
 * @param url - The URL of the ArcGIS REST API endpoint.
 * @param params - The parameters to pass to the endpoint.
 * @param requestOptions - Options for the request.
 * @returns A Promise that will resolve with the data from the request.
 */
function request(url, requestParams, requestOptions) {
    if (requestParams === void 0) { requestParams = { f: "json" }; }
    var _a = tslib_1.__assign({ httpMethod: "POST" }, requestOptions), httpMethod = _a.httpMethod, authentication = _a.authentication;
    var params = tslib_1.__assign({ f: "json" }, requestParams);
    var options = {
        method: httpMethod
    };
    var tokenRequest = authentication
        ? authentication.getToken(url)
        : Promise.resolve("");
    return tokenRequest.then(function (token) {
        if (token.length) {
            params.token = token;
        }
        if (httpMethod === "GET") {
            url = url + "?" + encode_query_string_1.encodeQueryString(params);
        }
        if (httpMethod === "POST") {
            options.body = encode_form_data_1.encodeFormData(params);
        }
        return fetch(url, options)
            .then(function (response) {
            switch (params.f) {
                case "json":
                    return response.json();
                /* istanbul ignore next blob responses are difficult to make cross platform we will just have to trust the isomorphic fetch will do its job */
                case "image":
                    return response.blob();
                case "html":
                    return response.text();
                case "text":
                    return response.text();
                /* istanbul ignore next blob responses are difficult to make cross platform we will just have to trust the isomorphic fetch will do its job */
                case "zip":
                    return response.blob();
            }
        })
            .then(function (data) {
            if (params.f === "json") {
                check_for_errors_1.checkForErrors(data);
                return data;
            }
            else {
                return data;
            }
        });
    });
}
exports.request = request;
//# sourceMappingURL=request.js.map