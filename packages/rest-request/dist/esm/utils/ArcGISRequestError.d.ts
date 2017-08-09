export declare class ArcGISRequestError {
    /**
     * The name of this error. Will always be `"ArcGISRequestError"` to conform with the [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) class.
     */
    name: string;
    /**
     * Formatted error message. See the [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) class for more details.
     */
    message: string;
    /**
     * The errror message return from the request.
     */
    originalMessage: string;
    /**
     * The error code returned from the request.
     */
    code: string | number;
    /**
     * The original JSON response the caused the error.
     */
    originalResponse: any;
    /**
     * Create a new `ArcGISRequestError`  object.
     *
     * @param message - The error message from the API
     * @param code - The error code from the API
     * @param originalResponse - The original response from the API that caused the error
     */
    constructor(message?: string, code?: string, originalResponse?: any);
}
