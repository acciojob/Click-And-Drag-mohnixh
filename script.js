const items = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

items.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX;
  scrollLeft = items.scrollLeft;
});

items.addEventListener('mouseleave', () => {
  isDown = false;
});

items.addEventListener('mouseup', () => {
  isDown = false;
});

items.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX;
  const walk = startX - x; // Distance moved (positive when dragging left)
  items.scrollLeft = scrollLeft + walk;
});