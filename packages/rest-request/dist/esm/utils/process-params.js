/**
 * Converts parameters to the proper respresnetation to send to the ArcGIS REST API.
 * @param params The object whose keys will be encoded.
 * @return A new object with properly encoded values.
 */
export function processParams(params) {
    var newParams = {};
    Object.keys(params).forEach(function (key) {
        var param = params[key];
        var type = Object.prototype.toString.call(param);
        var value;
        // properly encodes objects, arrays and dates for arcgis.com and other services.
        // ported from https://github.com/Esri/esri-leaflet/blob/master/src/Request.js#L22-L30
        // also see https://github.com/ArcGIS/rest-js/issues/18
        switch (type) {
            case "[object Array]":
                value =
                    Object.prototype.toString.call(param[0]) === "[object Object]"
                        ? JSON.stringify(param)
                        : param.join(",");
                break;
            case "[object Object]":
                value = JSON.stringify(param);
                break;
            case "[object Date]":
                value = param.valueOf();
                break;
            case "[object Function]":
                value = null;
                break;
            case "[object Boolean]":
                value = param + "";
                break;
            default:
                value = param;
                break;
        }
        if (value) {
            newParams[key] = value;
        }
    });
    return newParams;
}
//# sourceMappingURL=process-params.js.map