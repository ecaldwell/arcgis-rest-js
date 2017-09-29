import { createFeatureService } from "../src/index";
import * as fetchMock from "fetch-mock";
import { CreateFeatureService } from "./mocks/responses";

const MOCK_USER_SESSION = {
  getToken() {
    return Promise.resolve("token");
  },
  username: "username",
  portal: "https://arcgis.com/sharing/rest"
};

describe("feature layers", () => {
  let paramsSpy: jasmine.Spy;

  beforeEach(() => {
    paramsSpy = spyOn(FormData.prototype, "append").and.callThrough();
  });

  afterAll(() => {
    paramsSpy.calls.reset();
  });

  afterEach(fetchMock.restore);

  it("should create a feature service", done => {
    fetchMock.once("*", CreateFeatureService);

    createFeatureService(
      {
        createParameters: {
          name: "NewServiceName"
        }
      },
      {
        authentication: MOCK_USER_SESSION
      }
    )
      .then(response => {
        expect(fetchMock.called()).toEqual(true);
        const [url, options]: [string, RequestInit] = fetchMock.lastCall("*");
        expect(url).toEqual(
          "https://arcgis.com/sharing/rest/content/users/username/createService"
        );
        expect(options.method).toBe("POST");
        expect(paramsSpy).toHaveBeenCalledWith("f", "json");
        expect(paramsSpy).toHaveBeenCalledWith(
          "createParameters",
          JSON.stringify({ name: "NewServiceName" })
        );
        expect(response).toEqual(CreateFeatureService);
        done();
      })
      .catch(e => {
        fail(e);
      });
  });
});
