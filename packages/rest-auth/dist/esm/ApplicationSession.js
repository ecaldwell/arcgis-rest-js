import { fetchToken } from "./fetchToken";
var ApplicationSession = (function () {
    function ApplicationSession(options) {
        this.clientId = options.clientId;
        this.clientSecret = options.clientSecret;
        this.token = options.token;
        this.expires = options.expires;
        this.portal = "https://www.arcgis.com/sharing/rest";
        this.duration = options.duration || 20160;
    }
    ApplicationSession.prototype.getToken = function (url) {
        if (this.token && this.expires && this.expires.getTime() > Date.now()) {
            return Promise.resolve(this.token);
        }
        return this.refreshToken();
    };
    ApplicationSession.prototype.refreshToken = function () {
        var _this = this;
        return fetchToken(this.portal + "/oauth2/token/", {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            grant_type: "client_credentials"
        }).then(function (response) {
            _this.token = response.token;
            _this.expires = response.expires;
            return response.token;
        });
    };
    ApplicationSession.prototype.refreshSession = function () {
        var _this = this;
        return this.refreshToken().then(function () { return _this; });
    };
    return ApplicationSession;
}());
export { ApplicationSession };
//# sourceMappingURL=ApplicationSession.js.map