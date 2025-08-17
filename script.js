// script.js
document.addEventListener("DOMContentLoaded", () => {
  const cubes = document.querySelectorAll(".cube");
  const container = document.querySelector(".container");

  let selectedCube = null;
  let offsetX = 0;
  let offsetY = 0;

  cubes.forEach(cube => {
    cube.addEventListener("mousedown", (e) => {
      selectedCube = cube;
      const rect = cube.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      cube.style.zIndex = "1000"; // bring on top
    });
  });

  document.addEventListener("mousemove", (e) => {
    if (!selectedCube) return;

    const containerRect = container.getBoundingClientRect();
    let newLeft = e.clientX - containerRect.left - offsetX;
    let newTop = e.clientY - containerRect.top - offsetY;

    // keep cube inside container
    newLeft = Math.max(0, Math.min(newLeft, containerRect.width - selectedCube.offsetWidth));
    newTop = Math.max(0, Math.min(newTop, containerRect.height - selectedCube.offsetHeight));

    selectedCube.style.left = `${newLeft}px`;
    selectedCube.style.top = `${newTop}px`;
  });

  document.addEventListener("mouseup", () => {
    if (selectedCube) {
      selectedCube.style.zIndex = "1"; 
      selectedCube = null;
    }
  });
});