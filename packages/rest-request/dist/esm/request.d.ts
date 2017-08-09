import "es6-promise/auto";
import "isomorphic-fetch";
import { FormData } from "./utils/encode-form-data";
export { FormData };
export interface IAuthenticationManager {
    getToken(url: string): Promise<string>;
}
/**
 * HTTP methods used by the ArcGIS REST API.
 */
export declare type HTTPMethods = "GET" | "POST";
/**
 * Valid response formats for the `f` parameter.
 */
export declare type ResponseFormats = "json" | "text" | "html" | "image" | "zip";
export interface IParams {
    f?: ResponseFormats;
    [key: string]: any;
}
/**
 * Options for the [`request()`](/api/arcgis-core/request/) method.
 */
export interface IRequestOptions {
    /**
     * The HTTP method to send the request with.
     */
    httpMethod?: HTTPMethods;
    /**
     * The instance of `IAuthenticationManager` to use to authenticate this request.
     */
    authentication?: IAuthenticationManager;
}
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
export declare function request(url: string, requestParams?: IParams, requestOptions?: IRequestOptions): Promise<any>;
