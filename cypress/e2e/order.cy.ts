describe("Order", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      fixture: "order.json",
    }).as("postOrder");
    // Устанавливаем токены:
    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify(
        "1c33620e894681e5e03302fa479fc369cc6fe9447ca08243335cf6e484e6b9d0e7e878a585b39b9d"
      )
    );
    window.localStorage.setItem(
      "accessToken",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTA4MmM0NmQyOTk3MDAxY2FhYTg3ZCIsImlhdCI6MTcwMjQ5MzM2MywiZXhwIjoxNzAyNDk0NTYzfQ.V-kYn7yX4OYtTkU2m9QGGzTlAdnzjoMF7eYfyDyis7c"
    );
  });

  it("Opens modal, check data and close modal", () => {
    cy.visit("/");

    cy.get("[data-cy=ingredients]")
      .contains("Соус фирменный Space Sauce")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop", { force: true });

    cy.get("[data-cy=dropped-el]").contains("Соус фирменный Space Sauce");

    cy.get("[data-cy=ingredients]")
      .contains("Соус фирменный Space Sauce")
      .get(".counter__num")
      .contains(2);

    cy.get("[data-cy=order-button]").click();
    cy.get("[data-cy=order-button]").click();
    cy.wait("@postOrder");
    cy.get("[data-cy=order-modal]").contains("28841");
  });
});
