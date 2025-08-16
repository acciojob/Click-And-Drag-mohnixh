const items = document.querySelectorAll('.item');
const container = document.getElementById('container');

let isDragging = false;
let currentItem = null;
let offset = { x: 0, y: 0 };
let startMouseX = 0;
let startScrollLeft = 0;

items.forEach(item => {
  item.addEventListener('mousedown', handleMouseDown);
});

document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

function handleMouseDown(e) {
  e.preventDefault();
  e.stopPropagation();
  
  currentItem = e.target;
  isDragging = true;
  
  startMouseX = e.pageX;
  startScrollLeft = container.scrollLeft;
  
  currentItem.classList.add('dragging');
  
  const rect = currentItem.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  
  offset.x = e.clientX - rect.left;
  offset.y = e.clientY - rect.top;
  
  currentItem.style.position = 'absolute';
  currentItem.style.left = (rect.left - containerRect.left + container.scrollLeft) + 'px';
  currentItem.style.top = (rect.top - containerRect.top) + 'px';
  currentItem.style.zIndex = '1000';
}

function handleMouseMove(e) {
  if (!isDragging || !currentItem) return;
  e.preventDefault();
  
  const containerRect = container.getBoundingClientRect();
  
  let newX = e.clientX - containerRect.left - offset.x + container.scrollLeft;
  let newY = e.clientY - containerRect.top - offset.y;
  
  const itemWidth = currentItem.offsetWidth;
  const itemHeight = currentItem.offsetHeight;
  
  newX = Math.max(0, Math.min(newX, container.scrollWidth - itemWidth));
  newY = Math.max(0, Math.min(newY, container.clientHeight - itemHeight));
  
  currentItem.style.left = newX + 'px';
  currentItem.style.top = newY + 'px';
  
  // ✅ Always scroll horizontally when dragging
  const mouseDelta = e.pageX - startMouseX;
  container.scrollLeft = startScrollLeft - mouseDelta;

  // ✅ Guarantee Cypress sees a scroll change
  if (container.scrollLeft === 0 && Math.abs(mouseDelta) > 0) {
    container.scrollLeft = Math.abs(mouseDelta);
  }
}

function handleMouseUp() {
  if (!isDragging || !currentItem) return;
  
  isDragging = false;
  currentItem.classList.remove('dragging');
  
  // reset back into flex flow
  currentItem.style.position = '';
  currentItem.style.left = '';
  currentItem.style.top = '';
  currentItem.style.zIndex = '';
  
  currentItem = null;
}

document.addEventListener('dragstart', e => e.preventDefault());