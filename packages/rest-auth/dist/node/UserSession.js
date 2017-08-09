"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rest_request_1 = require("@esri/rest-request");
var generateToken_1 = require("./generateToken");
var fetchToken_1 = require("./fetchToken");
function defer() {
    var deferred = {
        promise: null,
        resolve: null,
        reject: null
    };
    deferred.promise = new Promise(function (resolve, reject) {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });
    return deferred;
}
/**
 * Used to manage the authentication of ArcGIS Online and ArcGIs Enterprise users
 * in [`request`](/api/rest-request/request/). This class also includes several
 * helper methods for authenticating users with OAuth 2.0 in both browser and
 * server applications.
 */
var UserSession = (function () {
    function UserSession(options) {
        this.clientId = options.clientId;
        this._refreshToken = options.refreshToken;
        this._refreshTokenExpires = options.refreshTokenExpires;
        this.username = options.username;
        this.password = options.password;
        this._token = options.token;
        this._tokenExpires = options.tokenExpires;
        this.portal = options.portal || "https://www.arcgis.com/sharing/rest";
        this.tokenDuration = options.tokenDuration || 20160;
        this.redirectUri = options.redirectUri;
        this.refreshTokenDuration = options.refreshTokenDuration || 20160;
        this.trustedServers = {};
    }
    Object.defineProperty(UserSession.prototype, "token", {
        /**
         * The current ArcGIS Online or ArcGIS Enterprise `token`.
         */
        get: function () {
            return this._token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserSession.prototype, "tokenExpires", {
        /**
         * The expiration time of the current `token`.
         */
        get: function () {
            return this._tokenExpires;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserSession.prototype, "refreshToken", {
        /**
         * The current token to ArcGIS Online or ArcGIS Enterprise.
         */
        get: function () {
            return this._refreshToken;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserSession.prototype, "refreshTokenExpires", {
        /**
         * The expiration time of the current `refreshToken`.
         */
        get: function () {
            return this._refreshTokenExpires;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Begins a new browser-based OAuth 2.0 sign in. If `options.popup` is true the
     * authentication window will open in a new tab/window otherwise the user will
     * be redirected to the authorization page in their current tab.
     *
     * @browserOnly
     */
    UserSession.beginOAuth2 = function (options, 
        /* istanbul ignore next */ win) {
        /* istanbul ignore next */ if (win === void 0) { win = window; }
        var _a = tslib_1.__assign({
            portal: "https://arcgis.com/sharing/rest",
            duration: 20160,
            popup: true
        }, options), portal = _a.portal, clientId = _a.clientId, duration = _a.duration, redirectUri = _a.redirectUri, popup = _a.popup;
        var url = portal + "/oauth2/authorize?client_id=" + clientId + "&response_type=token&expiration=" + duration + "&redirect_uri=" + encodeURIComponent(redirectUri);
        if (!popup) {
            win.location.href = url;
            return;
        }
        var session = defer();
        win["__ESRI_REST_AUTH_HANDLER_" + clientId] = function (error, oauthInfo) {
            if (error) {
                session.reject(error);
                return;
            }
            session.resolve(new UserSession({
                clientId: clientId,
                portal: portal,
                token: oauthInfo.token,
                tokenExpires: oauthInfo.expires,
                username: oauthInfo.username
            }));
        };
        win.open(url, "oauth-window", "height=400,width=600,menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes");
        return session.promise;
    };
    /**
     * Completes a browser-based OAuth 2.0 sign if `options.popup` is true the user
     * will be returned to the previous window. Otherwise a new `UserSession`
     * will be returned.
     *
     * @browserOnly
     */
    UserSession.completeOAuth2 = function (options, 
        /* istanbul ignore next*/ win) {
        /* istanbul ignore next*/ if (win === void 0) { win = window; }
        var _a = tslib_1.__assign({ portal: "https://arcgis.com/sharing/rest", duration: 20160 }, options), portal = _a.portal, clientId = _a.clientId, duration = _a.duration, redirectUri = _a.redirectUri;
        function completeSignIn(error, oauthInfo) {
            if (win.opener && win.opener.parent) {
                win.opener.parent["__ESRI_REST_AUTH_HANDLER_" + clientId](error, oauthInfo);
                win.close();
                return;
            }
            if (win.parent) {
                win.parent["__ESRI_REST_AUTH_HANDLER_" + clientId](error, oauthInfo);
                win.close();
                return;
            }
            if (error) {
                throw error;
            }
            return new UserSession({
                clientId: clientId,
                portal: portal,
                token: oauthInfo.token,
                tokenExpires: oauthInfo.expires,
                username: oauthInfo.username
            });
        }
        var match = win.location.href.match(/access_token=(.+)&expires_in=(.+)&username=(.+)/);
        if (!match) {
            var errorMatch = win.location.href.match(/error=(.+)&error_description=(.+)/);
            var error = errorMatch[1];
            var errorMessage = decodeURIComponent(errorMatch[2]);
            return completeSignIn(new rest_request_1.ArcGISRequestError(errorMessage, error), null);
        }
        var token = match[1];
        var expires = new Date(Date.now() + parseInt(match[2], 10) * 1000 - 60 * 1000);
        var username = match[3];
        return completeSignIn(null, {
            token: token,
            expires: expires,
            username: username
        });
    };
    /**
     * Begins a new server-based OAuth 2.0 sign in. This will redirect the user to
     * the ArcGIS Online or ArcGIS Enterprise authorization page.
     *
     * @nodeOnly
     */
    UserSession.authorize = function (options, response) {
        var _a = tslib_1.__assign({ portal: "https://arcgis.com/sharing/rest", duration: 20160 }, options), portal = _a.portal, clientId = _a.clientId, duration = _a.duration, redirectUri = _a.redirectUri;
        response.writeHead(301, {
            Location: portal + "/oauth2/authorize?client_id=" + clientId + "&duration=" + duration + "&response_type=code&redirect_uri=" + encodeURIComponent(redirectUri)
        });
        response.end();
    };
    /**
     * Completes the server-based OAuth 2.0 sign in process by exchanging the `authorizationCode`
     * for a `access_token`.
     *
     * @nodeOnly
     */
    UserSession.exchangeAuthorizationCode = function (options, authorizationCode) {
        var _a = tslib_1.__assign({ portal: "https://www.arcgis.com/sharing/rest", duration: 20160 }, options), portal = _a.portal, clientId = _a.clientId, duration = _a.duration, redirectUri = _a.redirectUri;
        return fetchToken_1.fetchToken(portal + "/oauth2/token", {
            grant_type: "authorization_code",
            client_id: clientId,
            redirect_uri: redirectUri,
            code: authorizationCode
        }).then(function (response) {
            return new UserSession({
                clientId: clientId,
                portal: portal,
                redirectUri: redirectUri,
                refreshToken: response.refreshToken,
                refreshTokenDuration: duration,
                refreshTokenExpires: new Date(Date.now() + (duration - 60) * 1000),
                token: response.token,
                tokenExpires: response.expires,
                username: response.username
            });
        });
    };
    UserSession.deserialize = function (str) {
        var options = JSON.parse(str);
        return new UserSession({
            clientId: options.clientId,
            refreshToken: options.refreshToken,
            refreshTokenExpires: new Date(options.refreshTokenExpires),
            username: options.username,
            password: options.password,
            token: options.token,
            tokenExpires: new Date(options.tokenExpires),
            portal: options.portal,
            tokenDuration: options.tokenDuration,
            redirectUri: options.redirectUri,
            refreshTokenDuration: options.refreshTokenDuration
        });
    };
    /**
     * Gets a appropriate token for the given URL. If `portal` is ArcGIS Online and
     * the request is to an ArcGIS Online domain `token` will be used. If the request
     * is to the current `portal` the current `token` will also be used. However if
     * the request is to an unknown server we will validate the server with a request
     * to our current `portal`.
     */
    UserSession.prototype.getToken = function (url) {
        if (this.portal === "https://www.arcgis.com/sharing/rest" &&
            /^https?:\/\/\S+\.arcgis\.com.+/.test(url)) {
            return this.getFreshToken();
        }
        else if (new RegExp(this.portal).test(url)) {
            return this.getFreshToken();
        }
        else {
            return this.getTokenForServer(url);
        }
    };
    UserSession.prototype.toJSON = function () {
        return {
            clientId: this.clientId,
            refreshToken: this.refreshToken,
            refreshTokenExpires: this.refreshTokenExpires,
            username: this.username,
            password: this.password,
            token: this.token,
            tokenExpires: this.tokenExpires,
            portal: this.portal,
            tokenDuration: this.tokenDuration,
            redirectUri: this.redirectUri,
            refreshTokenDuration: this.refreshTokenDuration
        };
    };
    UserSession.prototype.serialize = function () {
        return JSON.stringify(this);
    };
    /**
     * Manually refreshes the current `token` and `tokenExpires`.
     */
    UserSession.prototype.refreshSession = function () {
        if (this.username && this.password) {
            return this.refreshWithUsernameAndPassword();
        }
        if (this.clientId && this.refreshToken) {
            return this.refreshWithRefreshToken();
        }
        return Promise.reject(new Error("Unable to refresh token."));
    };
    /**
     * Validates that a given URL is properly federated with our current `portal`.
     * Attempts to use the internal `trustedServers` cache first.
     */
    UserSession.prototype.getTokenForServer = function (url) {
        var _this = this;
        var root = url.split("/rest/services/")[0];
        var existingToken = this.trustedServers[root];
        if (existingToken && existingToken.expires.getTime() > Date.now()) {
            return Promise.resolve(existingToken.token);
        }
        return rest_request_1.request(root + "/rest/info")
            .then(function (response) {
            return response.owningSystemUrl;
        })
            .then(function (owningSystemUrl) {
            /**
             * if this server is not owned by this portal bail out with an error
             * since we know we wont be able to generate a token
             */
            if (!new RegExp(owningSystemUrl).test(_this.portal)) {
                throw new rest_request_1.ArcGISAuthError(url + " is not federated with " + _this.portal + ".", "NOT_FEDERATED");
            }
            return rest_request_1.request(owningSystemUrl + "/sharing/rest/info");
        })
            .then(function (response) {
            return response.authInfo.tokenServicesUrl;
        })
            .then(function (tokenServicesUrl) {
            return generateToken_1.generateToken(tokenServicesUrl, {
                token: _this.token,
                serverUrl: url,
                expiration: _this.tokenDuration
            });
        })
            .then(function (response) {
            _this.trustedServers[root] = {
                expires: new Date(response.expires),
                token: response.token
            };
            return response.token;
        });
    };
    /**
     * Returns an unexpired token for the current `portal`.
     */
    UserSession.prototype.getFreshToken = function () {
        if (this.token &&
            this.tokenExpires &&
            this.tokenExpires.getTime() > Date.now()) {
            return Promise.resolve(this.token);
        }
        return this.refreshSession().then(function (session) { return session.token; });
    };
    /**
     * Refreshes the current `token` and `tokenExpires` with `username` and
     * `password`.
     */
    UserSession.prototype.refreshWithUsernameAndPassword = function () {
        var _this = this;
        return generateToken_1.generateToken(this.portal + "/generateToken", {
            username: this.username,
            password: this.password,
            expiration: this.tokenDuration
        }).then(function (response) {
            _this._token = response.token;
            _this._tokenExpires = new Date(response.expires);
            return _this;
        });
    };
    /**
     * Refreshes the current `token` and `tokenExpires` with `refreshToken`.
     */
    UserSession.prototype.refreshWithRefreshToken = function () {
        var _this = this;
        if (this.refreshToken &&
            this.refreshTokenExpires &&
            this.refreshTokenExpires.getTime() < Date.now()) {
            return this.refreshRefreshToken();
        }
        return fetchToken_1.fetchToken(this.portal + "/oauth2/token", {
            client_id: this.clientId,
            refresh_token: this.refreshToken,
            grant_type: "refresh_token"
        }).then(function (response) {
            _this._token = response.token;
            _this._tokenExpires = response.expires;
            return _this;
        });
    };
    /**
     * Exchanges an expired `refreshToken` for a new one also updates `token` and
     * `tokenExpires`.
     */
    UserSession.prototype.refreshRefreshToken = function () {
        var _this = this;
        return fetchToken_1.fetchToken(this.portal + "/oauth2/token", {
            client_id: this.clientId,
            refresh_token: this.refreshToken,
            redirect_uri: this.redirectUri,
            grant_type: "exchange_refresh_token"
        }).then(function (response) {
            _this._token = response.token;
            _this._tokenExpires = response.expires;
            _this._refreshToken = response.refreshToken;
            _this._refreshTokenExpires = new Date(Date.now() + (_this.refreshTokenDuration - 1) * 60 * 1000);
            return _this;
        });
    };
    return UserSession;
}());
exports.UserSession = UserSession;
//# sourceMappingURL=UserSession.js.map