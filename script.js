const items = document.querySelector('.items');

// Simple approach - just set scrollLeft directly based on mouse position changes
let mouseDownX = null;
let initialScrollLeft = 0;

items.addEventListener('mousedown', (e) => {
  mouseDownX = e.pageX;
  initialScrollLeft = items.scrollLeft;
});

items.addEventListener('mousemove', (e) => {
  if (mouseDownX === null) return;
  
  const deltaX = mouseDownX - e.pageX; // positive when dragging left
  const newScrollLeft = Math.max(0, initialScrollLeft + deltaX);
  
  items.scrollLeft = newScrollLeft;
});

items.addEventListener('mouseup', () => {
  mouseDownX = null;
});

items.addEventListener('mouseleave', () => {
  mouseDownX = null;
});

// Also handle the case where we need to ensure scrollability
// Make sure there's actually scrollable content
window.addEventListener('load', () => {
  // Force the container to be scrollable if it isn't already
  if (items.scrollWidth <= items.clientWidth) {
    const extraDiv = document.createElement('div');
    extraDiv.style.width = '1000px';
    extraDiv.style.height = '1px';
    extraDiv.style.flexShrink = '0';
    items.appendChild(extraDiv);
  }
});