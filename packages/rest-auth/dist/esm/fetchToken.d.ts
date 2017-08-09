import { IParams } from "@esri/rest-request";
export declare type GrantTypes = "authorization_code" | "refresh_token" | "client_credentials" | "exchange_refresh_token";
export interface IFetchTokenParams extends IParams {
    client_id: string;
    client_secret?: string;
    grant_type: GrantTypes;
    redirect_uri?: string;
    refresh_token?: string;
    code?: string;
}
export interface IFetchTokenResponse {
    token: string;
    expires: Date;
    username: string;
    refreshToken?: string;
}
export declare function fetchToken(url: string, params: IFetchTokenParams): Promise<IFetchTokenResponse>;
