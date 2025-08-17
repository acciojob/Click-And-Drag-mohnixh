const container = document.getElementById("container");
const cubeSize = 90;
const gap = 10;
const cols = 5;
const rows = 5;

// Create grid of cubes
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const cube = document.createElement("div");
    cube.className = "cube";
    cube.style.left = `${col * (cubeSize + gap)}px`;
    cube.style.top = `${row * (cubeSize + gap)}px`;
    container.appendChild(cube);
  }
}

let selectedCube = null;
let offsetX = 0, offsetY = 0;
let initialX = 0, initialY = 0;
let dragged = false;

container.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("cube")) {
    selectedCube = e.target;
    selectedCube.classList.add("dragging");

    const rect = selectedCube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Save initial position
    initialX = rect.left - containerRect.left;
    initialY = rect.top - containerRect.top;
    dragged = false;
  }
});

document.addEventListener("mousemove", (e) => {
  if (selectedCube) {
    dragged = true;
    const containerRect = container.getBoundingClientRect();

    let x = e.clientX - containerRect.left - offsetX;
    let y = e.clientY - containerRect.top - offsetY;

    // Constrain inside container
    x = Math.max(0, Math.min(x, container.offsetWidth - cubeSize));
    y = Math.max(0, Math.min(y, container.offsetHeight - cubeSize));

    selectedCube.style.left = `${x}px`;
    selectedCube.style.top = `${y}px`;
  }
});

document.addEventListener("mouseup", () => {
  if (selectedCube) {
    selectedCube.classList.remove("dragging");

    if (!dragged) {
      // If it was just a click, reset position
      selectedCube.style.left = `${initialX}px`;
      selectedCube.style.top = `${initialY}px`;
    } else {
      // Ensure final position inside bounds
      let x = parseInt(selectedCube.style.left);
      let y = parseInt(selectedCube.style.top);

      x = Math.max(0, Math.min(x, container.offsetWidth - cubeSize));
      y = Math.max(0, Math.min(y, container.offsetHeight - cubeSize));

      selectedCube.style.left = `${x}px`;
      selectedCube.style.top = `${y}px`;
    }

    selectedCube = null;
  }
});