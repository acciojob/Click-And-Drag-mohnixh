// Your code here.
const items = document.querySelectorAll('.item');
const container = document.getElementById('container');

// Variables to track dragging state
let isDragging = false;
let currentItem = null;
let offset = { x: 0, y: 0 };

// Add event listeners to each item
items.forEach(item => {
  item.addEventListener('mousedown', handleMouseDown);
});

// Add global event listeners for mouse movement and release
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

function handleMouseDown(e) {
  e.preventDefault();
  
  // Set the current item being dragged
  currentItem = e.target;
  isDragging = true;
  
  // Add dragging class for visual feedback
  currentItem.classList.add('dragging');
  
  // Get the container boundaries
  const containerRect = container.getBoundingClientRect();
  const itemRect = currentItem.getBoundingClientRect();
  
  // Calculate offset from mouse to item's top-left corner
  offset.x = e.clientX - itemRect.left;
  offset.y = e.clientY - itemRect.top;
  
  // Convert to absolute positioning
  currentItem.style.position = 'absolute';
  currentItem.style.left = (itemRect.left - containerRect.left) + 'px';
  currentItem.style.top = (itemRect.top - containerRect.top) + 'px';
}

function handleMouseMove(e) {
  if (!isDragging || !currentItem) return;
  
  e.preventDefault();
  
  // Get container boundaries
  const containerRect = container.getBoundingClientRect();
  const itemWidth = currentItem.offsetWidth;
  const itemHeight = currentItem.offsetHeight;
  
  // Calculate new position relative to container
  let newX = e.clientX - containerRect.left - offset.x;
  let newY = e.clientY - containerRect.top - offset.y;
  
  // Apply boundary constraints
  newX = Math.max(0, Math.min(newX, container.clientWidth - itemWidth));
  newY = Math.max(0, Math.min(newY, container.clientHeight - itemHeight));
  
  // Update item position
  currentItem.style.left = newX + 'px';
  currentItem.style.top = newY + 'px';
}

function handleMouseUp(e) {
  if (!isDragging || !currentItem) return;
  
  // Reset dragging state
  isDragging = false;
  currentItem.classList.remove('dragging');
  currentItem = null;
}

// Prevent default drag behavior on images and other elements
document.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

// Optional: Add touch support for mobile devices
items.forEach(item => {
  item.addEventListener('touchstart', handleTouchStart, { passive: false });
});

document.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleTouchEnd);

function handleTouchStart(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent('mousedown', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  e.target.dispatchEvent(mouseEvent);
}

function handleTouchMove(e) {
  if (!isDragging) return;
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent('mousemove', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  document.dispatchEvent(mouseEvent);
}

function handleTouchEnd(e) {
  if (!isDragging) return;
  e.preventDefault();
  const mouseEvent = new MouseEvent('mouseup', {});
  document.dispatchEvent(mouseEvent);
}