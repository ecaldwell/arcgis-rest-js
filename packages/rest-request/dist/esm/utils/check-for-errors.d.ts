/**
 * Checks a JSON response from the ArcGIS REST API for errors. If there are no errors this will return the `data` it is passed in. If there is an error it will throw. With a [`ArcGISRequestError`](/api/arcgis-core/ArcGISRequestError/) or [`ArcGISAuthError`](/api/arcgis-core/ArcGISAuthError/).
 *
 * @param data The response JSON to check for errors.
 * @returns The data that was passed in the `data` parameter
 */
export declare function checkForErrors(data: any): any;
