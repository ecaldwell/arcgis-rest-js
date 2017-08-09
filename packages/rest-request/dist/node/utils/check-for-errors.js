"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArcGISRequestError_1 = require("./ArcGISRequestError");
var ArcGISAuthError_1 = require("./ArcGISAuthError");
/**
 * Checks a JSON response from the ArcGIS REST API for errors. If there are no errors this will return the `data` it is passed in. If there is an error it will throw. With a [`ArcGISRequestError`](/api/arcgis-core/ArcGISRequestError/) or [`ArcGISAuthError`](/api/arcgis-core/ArcGISAuthError/).
 *
 * @param data The response JSON to check for errors.
 * @returns The data that was passed in the `data` parameter
 */
function checkForErrors(data) {
    // this is an error message from billing.arcgis.com backend
    if (data.code >= 400) {
        var message = data.message, code = data.code;
        throw new ArcGISRequestError_1.ArcGISRequestError(message, code, data);
    }
    // error from ArcGIS Online or an ArcGIS Portal or server instance.
    if (data.error) {
        var _a = data.error, message = _a.message, code = _a.code, messageCode = _a.messageCode;
        var errorCode = messageCode || code || "UNKNOWN_ERROR_CODE";
        if (code === 498 || code === 499 || messageCode === "GWM_0003") {
            throw new ArcGISAuthError_1.ArcGISAuthError(message, errorCode, data);
        }
        throw new ArcGISRequestError_1.ArcGISRequestError(message, errorCode, data);
    }
    // error from a status check
    if (data.status === "failed") {
        var message = void 0;
        var code = "UNKNOWN_ERROR_CODE";
        try {
            message = JSON.parse(data.statusMessage).message;
            code = JSON.parse(data.statusMessage).code;
        }
        catch (e) {
            message = data.statusMessage;
        }
        throw new ArcGISRequestError_1.ArcGISRequestError(message, code, data);
    }
    return data;
}
exports.checkForErrors = checkForErrors;
//# sourceMappingURL=check-for-errors.js.map