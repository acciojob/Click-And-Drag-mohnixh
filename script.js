const items = document.querySelector('.items');

// Variables to track dragging state
let isDown = false;
let startX;
let scrollLeft;

// Mouse down event - start dragging
items.addEventListener('mousedown', (e) => {
  isDown = true;
  items.classList.add('dragging');
  startX = e.pageX - items.offsetLeft;
  scrollLeft = items.scrollLeft;
});

// Mouse leave event - stop dragging if mouse leaves container
items.addEventListener('mouseleave', () => {
  isDown = false;
  items.classList.remove('dragging');
});

// Mouse up event - stop dragging
items.addEventListener('mouseup', () => {
  isDown = false;
  items.classList.remove('dragging');
});

// Mouse move event - handle dragging
items.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - items.offsetLeft;
  const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
  items.scrollLeft = scrollLeft - walk;
});

// Prevent default drag behavior
items.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

// Touch support for mobile devices
items.addEventListener('touchstart', (e) => {
  isDown = true;
  items.classList.add('dragging');
  startX = e.touches[0].pageX - items.offsetLeft;
  scrollLeft = items.scrollLeft;
}, { passive: true });

items.addEventListener('touchend', () => {
  isDown = false;
  items.classList.remove('dragging');
});

items.addEventListener('touchmove', (e) => {
  if (!isDown) return;
  const x = e.touches[0].pageX - items.offsetLeft;
  const walk = (x - startX) * 2;
  items.scrollLeft = scrollLeft - walk;
}, { passive: true });