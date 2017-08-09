import * as FormData from "isomorphic-form-data";
import { processParams } from "./process-params";
/**
 * Encodes parameters in a [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object in browsers or in a [FormData](https://github.com/form-data/form-data) in Node.js
 *
 * @param params An object to be encoded.
 * @returns The complete [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.
 */
export function encodeFormData(params) {
    var formData = new FormData();
    var newParams = processParams(params);
    Object.keys(newParams).forEach(function (key) {
        formData.append(key, newParams[key]);
    });
    return formData;
}
export { FormData };
//# sourceMappingURL=encode-form-data.js.map