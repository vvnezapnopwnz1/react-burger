import cypress from "cypress";

describe("service is available", function () {
  it("should be available on localhost:3000", function () {
    cypress.visit("http://localhost:3000");
  });
});
