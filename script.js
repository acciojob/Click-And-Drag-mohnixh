document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const cubes = document.querySelectorAll(".cube");

  let selectedCube = null;
  let offsetX = 0;
  let offsetY = 0;

  cubes.forEach((cube) => {
    cube.addEventListener("mousedown", (e) => {
      selectedCube = cube;
      const rect = cube.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      cube.style.zIndex = 1000; // bring dragged cube above others
    });
  });

  document.addEventListener("mousemove", (e) => {
    if (!selectedCube) return;

    const containerRect = container.getBoundingClientRect();
    const cubeRect = selectedCube.getBoundingClientRect();

    let newX = e.clientX - containerRect.left - offsetX;
    let newY = e.clientY - containerRect.top - offsetY;

    // Boundary constraints
    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX + cubeRect.width > containerRect.width) {
      newX = containerRect.width - cubeRect.width;
    }
    if (newY + cubeRect.height > containerRect.height) {
      newY = containerRect.height - cubeRect.height;
    }

    selectedCube.style.left = `${newX}px`;
    selectedCube.style.top = `${newY}px`;
  });

  document.addEventListener("mouseup", () => {
    if (selectedCube) {
      selectedCube.style.zIndex = "";
    }
    selectedCube = null;
  });
});