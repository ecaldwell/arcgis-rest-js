"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TypeScript 2.1 no longer allows you to extend built in types. See https://github.com/Microsoft/TypeScript/issues/12790#issuecomment-265981442
// and https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
//
// This code is from MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types.
var ArcGISRequestError = (function () {
    /**
     * Create a new `ArcGISRequestError`  object.
     *
     * @param message - The error message from the API
     * @param code - The error code from the API
     * @param originalResponse - The original response from the API that caused the error
     */
    function ArcGISRequestError(message, code, originalResponse) {
        if (message === void 0) { message = "UNKNOWN_ERROR"; }
        if (code === void 0) { code = "UNKNOWN_ERROR_CODE"; }
        this.name = "ArcGISRequestError";
        this.message =
            code === "UNKNOWN_ERROR_CODE" ? message : code + ": " + message;
        this.originalMessage = message;
        this.code = code;
        this.originalResponse = originalResponse;
    }
    return ArcGISRequestError;
}());
exports.ArcGISRequestError = ArcGISRequestError;
ArcGISRequestError.prototype = Object.create(Error.prototype);
ArcGISRequestError.prototype.constructor = ArcGISRequestError;
//# sourceMappingURL=ArcGISRequestError.js.map