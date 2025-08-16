const items = document.querySelectorAll('.item');
const container = document.getElementById('container');

let isDragging = false;
let currentItem = null;
let offset = { x: 0, y: 0 };
let startMouseX = 0;
let startScrollLeft = 0;

// Add event listeners to each item
items.forEach(item => {
  item.addEventListener('mousedown', handleMouseDown);
});

// Global event listeners
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

function handleMouseDown(e) {
  e.preventDefault();
  e.stopPropagation();
  
  currentItem = e.target;
  isDragging = true;
  
  // Record starting positions
  startMouseX = e.pageX;
  startScrollLeft = container.scrollLeft;
  
  currentItem.classList.add('dragging');
  
  // Get initial offset for smooth dragging
  const rect = currentItem.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  
  offset.x = e.clientX - rect.left;
  offset.y = e.clientY - rect.top;
  
  // Convert to absolute positioning
  currentItem.style.position = 'absolute';
  currentItem.style.left = (rect.left - containerRect.left + container.scrollLeft) + 'px';
  currentItem.style.top = (rect.top - containerRect.top) + 'px';
  currentItem.style.zIndex = '1000';
}

function handleMouseMove(e) {
  if (!isDragging || !currentItem) return;
  
  e.preventDefault();
  
  const containerRect = container.getBoundingClientRect();
  
  // Calculate new position
  let newX = e.clientX - containerRect.left - offset.x + container.scrollLeft;
  let newY = e.clientY - containerRect.top - offset.y;
  
  // Keep within container bounds
  const itemWidth = currentItem.offsetWidth;
  const itemHeight = currentItem.offsetHeight;
  
  newX = Math.max(0, Math.min(newX, container.scrollWidth - itemWidth));
  newY = Math.max(0, Math.min(newY, container.clientHeight - itemHeight));
  
  currentItem.style.left = newX + 'px';
  currentItem.style.top = newY + 'px';
  
  // Auto-scroll container when dragging near edges
  const mouseX = e.pageX;
  const mouseDelta = mouseX - startMouseX;
  
  // If dragging left significantly, scroll the container right
  if (mouseDelta < -50) {
    container.scrollLeft = startScrollLeft + Math.abs(mouseDelta) * 0.5;
  }
}

function handleMouseUp(e) {
  if (!isDragging || !currentItem) return;
  
  isDragging = false;
  currentItem.classList.remove('dragging');
  currentItem = null;
}

// Prevent default drag behavior
document.addEventListener('dragstart', (e) => {
  e.preventDefault();
});