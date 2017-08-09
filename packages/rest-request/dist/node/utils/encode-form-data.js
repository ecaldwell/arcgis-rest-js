"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormData = require("isomorphic-form-data");
exports.FormData = FormData;
var process_params_1 = require("./process-params");
/**
 * Encodes parameters in a [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object in browsers or in a [FormData](https://github.com/form-data/form-data) in Node.js
 *
 * @param params An object to be encoded.
 * @returns The complete [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.
 */
function encodeFormData(params) {
    var formData = new FormData();
    var newParams = process_params_1.processParams(params);
    Object.keys(newParams).forEach(function (key) {
        formData.append(key, newParams[key]);
    });
    return formData;
}
exports.encodeFormData = encodeFormData;
//# sourceMappingURL=encode-form-data.js.map