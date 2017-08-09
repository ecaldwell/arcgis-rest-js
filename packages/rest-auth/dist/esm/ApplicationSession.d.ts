import { IAuthenticationManager } from "@esri/rest-request";
export interface IApplicationSessionOptions {
    /**
     * Client ID of your application. Can be obtained by registering an application
     * on [ArcGIS for Developers](https://developers.arcgis.com/documentation/core-concepts/security-and-authentication/signing-in-arcgis-online-users/#registering-your-application),
     * [ArcGIS Online](http://doc.arcgis.com/en/arcgis-online/share-maps/add-items.htm#ESRI_SECTION1_0D1B620254F745AE84F394289F8AF44B) or on your instance of ArcGIS Enterprise.
     */
    clientId: string;
    /**
     * A Client Secret is also obtained by registering an application
     * on [ArcGIS for Developers](https://developers.arcgis.com/documentation/core-concepts/security-and-authentication/signing-in-arcgis-online-users/#registering-your-application),
     * [ArcGIS Online](http://doc.arcgis.com/en/arcgis-online/share-maps/add-items.htm#ESRI_SECTION1_0D1B620254F745AE84F394289F8AF44B) or on your instance of ArcGIS Enterprise. Treat it like a password.
     */
    clientSecret: string;
    /**
     * OAuth 2.0 access token from a previous application session.
     */
    token?: string;
    /**
     * Expiration date for the `token`
     */
    expires?: Date;
    /**
     * Duration of requested tokens in minutes. Used when requesting tokens with `username` and `password` for when validating the identities of unknown servers. Defaults to 2 weeks.
     */
    duration?: number;
}
export declare class ApplicationSession implements IAuthenticationManager {
    private clientId;
    private clientSecret;
    private token;
    private expires;
    private portal;
    private duration;
    constructor(options: IApplicationSessionOptions);
    getToken(url: string): Promise<string>;
    refreshToken(): Promise<string>;
    refreshSession(): Promise<this>;
}
