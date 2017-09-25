import { createFeatureLayer } from "../src/index";

describe("feature layers", () => {
  it("should return success", done => {
    createFeatureLayer().then(response => {
      expect(response).toBe("Success!");
      done();
    });
  });
});
