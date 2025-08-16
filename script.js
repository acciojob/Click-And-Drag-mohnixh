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
  const walk = startX - x;
  items.scrollLeft = scrollLeft + walk;
  
  // Force scrollLeft to be positive if we dragged left
  if (walk > 0 && items.scrollLeft === 0) {
    items.scrollLeft = walk;
  }
});

// Ensure we can scroll by testing it immediately
setTimeout(() => {
  items.scrollLeft = 100;
  setTimeout(() => {
    items.scrollLeft = 0;
  }, 100);
}, 100);