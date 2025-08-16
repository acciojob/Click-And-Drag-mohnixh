 class DraggableCubes {
            constructor() {
                this.container = document.getElementById('container');
                this.cubes = document.querySelectorAll('.cube');
                this.status = document.getElementById('status');
                
                // Drag state
                this.isDragging = false;
                this.draggedElement = null;
                this.startX = 0;
                this.startY = 0;
                this.offsetX = 0;
                this.offsetY = 0;
                
                this.init();
            }
            
            init() {
                // Position cubes in initial grid
                this.positionCubesInGrid();
                
                // Add event listeners to each cube
                this.cubes.forEach((cube, index) => {
                    cube.addEventListener('mousedown', (e) => this.handleMouseDown(e, cube));
                });
                
                // Add document-level listeners for mouse move and up
                document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
                document.addEventListener('mouseup', (e) => this.handleMouseUp(e));
                
                // Prevent text selection while dragging
                document.addEventListener('selectstart', (e) => {
                    if (this.isDragging) {
                        e.preventDefault();
                    }
                });
            }
            
            positionCubesInGrid() {
                const cols = 3;
                const cubeSize = 60;
                const gap = 20;
                const startX = 50;
                const startY = 50;
                
                this.cubes.forEach((cube, index) => {
                    const row = Math.floor(index / cols);
                    const col = index % cols;
                    const x = startX + col * (cubeSize + gap);
                    const y = startY + row * (cubeSize + gap);
                    
                    cube.style.left = x + 'px';
                    cube.style.top = y + 'px';
                });
            }
            
            handleMouseDown(e, cube) {
                e.preventDefault();
                
                // Set drag state
                this.isDragging = true;
                this.draggedElement = cube;
                
                // Calculate offset from mouse to element's top-left corner
                const rect = cube.getBoundingClientRect();
                const containerRect = this.container.getBoundingClientRect();
                
                this.offsetX = e.clientX - rect.left;
                this.offsetY = e.clientY - rect.top;
                
                // Add dragging class for visual feedback
                cube.classList.add('dragging');
                
                // Update status
                this.status.textContent = `Dragging cube ${cube.textContent}...`;
            }
            
            handleMouseMove(e) {
                if (!this.isDragging || !this.draggedElement) return;
                
                e.preventDefault();
                
                // Get container boundaries
                const containerRect = this.container.getBoundingClientRect();
                const cubeWidth = this.draggedElement.offsetWidth;
                const cubeHeight = this.draggedElement.offsetHeight;
                
                // Calculate new position relative to container
                let newX = e.clientX - containerRect.left - this.offsetX;
                let newY = e.clientY - containerRect.top - this.offsetY;
                
                // Apply boundary constraints
                newX = Math.max(0, Math.min(newX, this.container.offsetWidth - cubeWidth));
                newY = Math.max(0, Math.min(newY, this.container.offsetHeight - cubeHeight));
                
                // Update element position
                this.draggedElement.style.left = newX + 'px';
                this.draggedElement.style.top = newY + 'px';
            }
            
            handleMouseUp(e) {
                if (!this.isDragging) return;
                
                // Clean up drag state
                if (this.draggedElement) {
                    this.draggedElement.classList.remove('dragging');
                    this.status.textContent = `Cube ${this.draggedElement.textContent} dropped at new position!`;
                    
                    // Reset status after 2 seconds
                    setTimeout(() => {
                        this.status.textContent = 'Click and drag any cube to move it around!';
                    }, 2000);
                }
                
                this.isDragging = false;
                this.draggedElement = null;
                this.offsetX = 0;
                this.offsetY = 0;
            }
        }
        
        // Initialize the draggable cubes system when page loads
        document.addEventListener('DOMContentLoaded', () => {
            new DraggableCubes();
        });
        
        // Additional helper functions for testing/debugging
        function logCubePositions() {
            const cubes = document.querySelectorAll('.cube');
            cubes.forEach((cube, index) => {
                console.log(`Cube ${index + 1}: x=${cube.style.left}, y=${cube.style.top}`);
            });
        }
        
        function resetCubePositions() {
            const draggableSystem = new DraggableCubes();
            draggableSystem.positionCubesInGrid();
        }