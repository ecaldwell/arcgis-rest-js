/// <reference types="node" />
import * as http from "http";
import { IAuthenticationManager } from "@esri/rest-request";
/**
 * Options for static OAuth 2.0 helper methods on `UserSession`.
 */
export interface IOauth2Options {
    /**
     * Client ID of your application. Can be obtained by registering an application
     * on [ArcGIS for Developers](https://developers.arcgis.com/documentation/core-concepts/security-and-authentication/signing-in-arcgis-online-users/#registering-your-application),
     * [ArcGIS Online](http://doc.arcgis.com/en/arcgis-online/share-maps/add-items.htm#ESRI_SECTION1_0D1B620254F745AE84F394289F8AF44B) or on your instance of ArcGIS Enterprise.
     */
    clientId: string;
    /**
     * A valid URL to redirect to after a user authorizes your application. Can be set on [ArcGIS for Developers](https://developers.arcgis.com/documentation/core-concepts/security-and-authentication/signing-in-arcgis-online-users/#registering-your-application),
     * [ArcGIS Online](http://doc.arcgis.com/en/arcgis-online/share-maps/add-items.htm#ESRI_SECTION1_0D1B620254F745AE84F394289F8AF44B) or on your instance of ArcGIS Enterprise.
     */
    redirectUri: string;
    /**
     * Determines wether to open the authorization window in a new tab/window or in the current window.
     *
     * @browserOnly
     */
    popup?: boolean;
    /**
     * The ArcGIS Online or ArcGIS Enterprise portal you want to use for authentication. Defaults to `https://www.arcgis.com/sharing/rest` for the ArcGIS Online portal.
     */
    portal?: string;
    /** Default duration you would to obtain tokens for in minutes. Defaults to 20160 minutes (two weeks). */
    duration?: number;
}
/**
 * Options for the `UserSession` constructor.
 */
export interface IUserSessionOptions {
    /**
     * Client ID of your application. Can be obtained by registering an application
     * on [ArcGIS for Developers](https://developers.arcgis.com/documentation/core-concepts/security-and-authentication/signing-in-arcgis-online-users/#registering-your-application),
     * [ArcGIS Online](http://doc.arcgis.com/en/arcgis-online/share-maps/add-items.htm#ESRI_SECTION1_0D1B620254F745AE84F394289F8AF44B) or on your instance of ArcGIS Enterprise.
     */
    clientId?: string;
    /**
     * A valid URL to redirect to after a user authorizes your application. Can be set on [ArcGIS for Developers](https://developers.arcgis.com/documentation/core-concepts/security-and-authentication/signing-in-arcgis-online-users/#registering-your-application),
     * [ArcGIS Online](http://doc.arcgis.com/en/arcgis-online/share-maps/add-items.htm#ESRI_SECTION1_0D1B620254F745AE84F394289F8AF44B) or on your instance of ArcGIS Enterprise.
     */
    redirectUri?: string;
    /**
     * OAuth 2.0 refresh token from a previous user session.
     */
    refreshToken?: string;
    /**
     * Expiration date of the `refreshToken`
     */
    refreshTokenExpires?: Date;
    /**
     * The authenticated users username. Guaranteed to be unique across ArcGIS Online or your instance of ArcGIS Enterprise.
     */
    username?: string;
    /**
     * Password for this user. Used in CLI apps where users cannot do OAuth 2.0.
     */
    password?: string;
    /**
     * OAuth 2.0 access token from a previous user session.
     */
    token?: string;
    /**
     * Expiration date for the `token`
     */
    tokenExpires?: Date;
    /**
     * The ArcGIS Online or ArcGIS Enterprise portal you want to use for authentication. Defaults to `https://www.arcgis.com/sharing/rest` for the ArcGIS Online portal.
     */
    portal?: string;
    /**
     * Duration of requested tokens in minutes. Used when requesting tokens with `username` and `password` for when validating the identities of unknown servers. Defaults to 2 weeks.
     */
    tokenDuration?: number;
    /**
     * Original duration of the refresh token from a previous user session.
     */
    refreshTokenDuration?: number;
}
/**
 * Used to manage the authentication of ArcGIS Online and ArcGIs Enterprise users
 * in [`request`](/api/rest-request/request/). This class also includes several
 * helper methods for authenticating users with OAuth 2.0 in both browser and
 * server applications.
 */
export declare class UserSession implements IAuthenticationManager {
    /**
     * Client ID being used for authentication if provided in the `constructor`.
     */
    readonly clientId: string;
    /**
     * The currently authenticated user if provided in the `constructor`.
     */
    readonly username: string;
    /**
     * The currently authenticated user's password if provided in the `constructor`.
     */
    readonly password: string;
    /**
     * The current portal the user is authenticated with.
     */
    readonly portal: string;
    /**
     * Determines how long new tokens requested are valid.
     */
    readonly tokenDuration: number;
    /**
     * A valid redirect URI for this application if provided in the `constructor`.
     */
    readonly redirectUri: string;
    /**
     * Duration of new OAuth 2.0 refresh token validity.
     */
    readonly refreshTokenDuration: number;
    private _token;
    private _tokenExpires;
    private _refreshToken;
    private _refreshTokenExpires;
    /**
     * Internal list of trusted 3rd party servers (federated servers) that have
     *  been validated with `generateToken`.
     */
    private trustedServers;
    /**
     * The current ArcGIS Online or ArcGIS Enterprise `token`.
     */
    readonly token: string;
    /**
     * The expiration time of the current `token`.
     */
    readonly tokenExpires: Date;
    /**
     * The current token to ArcGIS Online or ArcGIS Enterprise.
     */
    readonly refreshToken: string;
    /**
     * The expiration time of the current `refreshToken`.
     */
    readonly refreshTokenExpires: Date;
    constructor(options: IUserSessionOptions);
    /**
     * Begins a new browser-based OAuth 2.0 sign in. If `options.popup` is true the
     * authentication window will open in a new tab/window otherwise the user will
     * be redirected to the authorization page in their current tab.
     *
     * @browserOnly
     */
    static beginOAuth2(options: IOauth2Options, win?: any): Promise<UserSession>;
    /**
     * Completes a browser-based OAuth 2.0 sign if `options.popup` is true the user
     * will be returned to the previous window. Otherwise a new `UserSession`
     * will be returned.
     *
     * @browserOnly
     */
    static completeOAuth2(options: IOauth2Options, win?: any): UserSession;
    /**
     * Begins a new server-based OAuth 2.0 sign in. This will redirect the user to
     * the ArcGIS Online or ArcGIS Enterprise authorization page.
     *
     * @nodeOnly
     */
    static authorize(options: IOauth2Options, response: http.ServerResponse): void;
    /**
     * Completes the server-based OAuth 2.0 sign in process by exchanging the `authorizationCode`
     * for a `access_token`.
     *
     * @nodeOnly
     */
    static exchangeAuthorizationCode(options: IOauth2Options, authorizationCode: string): Promise<UserSession>;
    static deserialize(str: string): UserSession;
    /**
     * Gets a appropriate token for the given URL. If `portal` is ArcGIS Online and
     * the request is to an ArcGIS Online domain `token` will be used. If the request
     * is to the current `portal` the current `token` will also be used. However if
     * the request is to an unknown server we will validate the server with a request
     * to our current `portal`.
     */
    getToken(url: string): Promise<string>;
    toJSON(): IUserSessionOptions;
    serialize(): string;
    /**
     * Manually refreshes the current `token` and `tokenExpires`.
     */
    refreshSession(): Promise<UserSession>;
    /**
     * Validates that a given URL is properly federated with our current `portal`.
     * Attempts to use the internal `trustedServers` cache first.
     */
    private getTokenForServer(url);
    /**
     * Returns an unexpired token for the current `portal`.
     */
    private getFreshToken();
    /**
     * Refreshes the current `token` and `tokenExpires` with `username` and
     * `password`.
     */
    private refreshWithUsernameAndPassword();
    /**
     * Refreshes the current `token` and `tokenExpires` with `refreshToken`.
     */
    private refreshWithRefreshToken();
    /**
     * Exchanges an expired `refreshToken` for a new one also updates `token` and
     * `tokenExpires`.
     */
    private refreshRefreshToken();
}
