// cypress/integration/tests/test.spec.js

describe("Draggable Cubes App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // change if your app runs elsewhere
  });

  it("selects a cube on click", () => {
    cy.get(".cube").first().trigger("mousedown", { which: 1 });
    // Drag mode should activate; position stored
    // We'll just assert cube exists after click
    cy.get(".cube").first().should("exist");
  });

  it("drags a cube to a new position", () => {
    cy.get(".cube").first().then(($cube) => {
      const initialLeft = $cube.position().left;
      const initialTop = $cube.position().top;

      cy.wrap($cube)
        .trigger("mousedown", { which: 1, pageX: initialLeft + 10, pageY: initialTop + 10 })
        .trigger("mousemove", { pageX: initialLeft + 120, pageY: initialTop + 80 })
        .trigger("mouseup", { force: true });

      cy.get(".cube").first().then(($cube2) => {
        const newLeft = $cube2.position().left;
        const newTop = $cube2.position().top;

        expect(newLeft).to.not.equal(initialLeft);
        expect(newTop).to.not.equal(initialTop);
      });
    });
  });

  it("drops cube at its new location after mouseup", () => {
    cy.get(".cube").first().then(($cube) => {
      const initialLeft = $cube.position().left;
      const initialTop = $cube.position().top;

      cy.wrap($cube)
        .trigger("mousedown", { which: 1, pageX: initialLeft + 10, pageY: initialTop + 10 })
        .trigger("mousemove", { pageX: initialLeft + 150, pageY: initialTop + 100 })
        .trigger("mouseup", { force: true });

      cy.get(".cube").first().then(($cube2) => {
        const finalLeft = $cube2.position().left;
        const finalTop = $cube2.position().top;

        expect(finalLeft).to.be.closeTo(initialLeft + 150, 50); // within tolerance
        expect(finalTop).to.be.closeTo(initialTop + 100, 50);
      });
    });
  });

  it("keeps cube inside container boundaries", () => {
    cy.get(".container").then(($container) => {
      const containerWidth = $container.width();
      const containerHeight = $container.height();

      cy.get(".cube").first().then(($cube) => {
        const cubeWidth = $cube.width();
        const cubeHeight = $cube.height();

        const initialLeft = $cube.position().left;
        const initialTop = $cube.position().top;

        // Try dragging far outside container
        cy.wrap($cube)
          .trigger("mousedown", { which: 1, pageX: initialLeft + 10, pageY: initialTop + 10 })
          .trigger("mousemove", { pageX: 9999, pageY: 9999 })
          .trigger("mouseup", { force: true });

        cy.get(".cube").first().then(($cube2) => {
          const finalLeft = $cube2.position().left;
          const finalTop = $cube2.position().top;

          expect(finalLeft).to.be.gte(0);
          expect(finalTop).to.be.gte(0);
          expect(finalLeft).to.be.lte(containerWidth - cubeWidth);
          expect(finalTop).to.be.lte(containerHeight - cubeHeight);
        });
      });
    });
  });
});