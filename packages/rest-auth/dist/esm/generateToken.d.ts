import { IParams } from "@esri/rest-request";
export interface IGenerateTokenParams extends IParams {
    username?: string;
    password?: string;
    expiration?: number;
    token?: string;
    serverUrl?: string;
}
export interface IGenerateTokenResponse {
    token: string;
    expires: number;
    ssl: boolean;
}
export declare function generateToken(url: string, params: IGenerateTokenParams): Promise<IGenerateTokenResponse>;
