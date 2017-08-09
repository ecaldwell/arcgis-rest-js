// TypeScript 2.1 no longer allows you to extend built in types. See https://github.com/Microsoft/TypeScript/issues/12790#issuecomment-265981442
// and https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
//
// This code is from MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types.
var ArcGISAuthError = (function () {
    /**
     * Create a new `ArcGISAuthError`  object.
     *
     * @param message - The error message from the API
     * @param code - The error code from the API
     * @param originalResponse - The original response from the API that caused the error
     */
    function ArcGISAuthError(message, code, originalResponse) {
        if (message === void 0) { message = "AUTHENTICATION_ERROR"; }
        if (code === void 0) { code = "AUTHENTICATION_ERROR_CODE"; }
        this.name = "ArcGISAuthError";
        this.message =
            code === "AUTHENTICATION_ERROR_CODE" ? message : code + ": " + message;
        this.originalMessage = message;
        this.code = code;
        this.originalResponse = originalResponse;
    }
    return ArcGISAuthError;
}());
export { ArcGISAuthError };
ArcGISAuthError.prototype = Object.create(Error.prototype);
ArcGISAuthError.prototype.constructor = ArcGISAuthError;
//# sourceMappingURL=ArcGISAuthError.js.map