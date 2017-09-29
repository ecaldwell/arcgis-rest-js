import { ISpatialReference, IExtent } from "@esri/arcgis-rest-common-types";
import { request, IRequestOptions, IParams } from "@esri/arcgis-rest-request";
import { UserSession } from "@esri/arcgis-rest-auth";

export interface ICreateFeatureServiceParams extends IParams {
  createParameters: {
    name: string;
    serviceDescription?: string;
    maxRecordCount?: number;
    supportedQueryFormats?: "JSON";
    capabilities?: string;
    description?: string;
    copyrightText?: string;
    spatialReference?: ISpatialReference;
    initialExtent?: IExtent;
    allowGeometryUpdates?: boolean;
    units?: string;
    xssPreventionInfo?: {
      xssPreventionEnabled?: boolean;
      xssPreventionRule?: string;
      xssInputRule?: string;
    };
  };
}

export interface ICreateFeatureServiceResponse {
  encodedServiceURL: string;
  itemId: string;
  name: string;
  serviceItemId: string;
  serviceurl: string;
  size: number;
  success: boolean;
  type: string;
  isView: boolean;
}

export function createFeatureService(
  requestParams: ICreateFeatureServiceParams,
  requestOptions: IRequestOptions
): Promise<ICreateFeatureServiceResponse> {
  const { portal, username } = requestOptions.authentication as UserSession;
  return request(
    `${portal}/content/users/${username}/createService`,
    requestParams,
    requestOptions
  );
}
