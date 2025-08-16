class ClickAndDrag {
    constructor() {
        this.slider = document.querySelector('.items');
        this.isDown = false;
        this.startX = 0;
        this.scrollLeft = 0;
        this.walkX = 0;
        
        this.init();
    }
    
    init() {
        if (!this.slider) return;
        
        // Mouse events
        this.slider.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.slider.addEventListener('mouseleave', () => this.handleMouseLeave());
        this.slider.addEventListener('mouseup', () => this.handleMouseUp());
        this.slider.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Touch events for mobile support
        this.slider.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.slider.addEventListener('touchend', () => this.handleTouchEnd());
        this.slider.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        
        // Prevent context menu on right click
        this.slider.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Prevent image dragging
        this.slider.addEventListener('dragstart', (e) => e.preventDefault());
    }
    
    handleMouseDown(e) {
        this.isDown = true;
        this.slider.classList.add('dragging');
        this.startX = e.pageX;
        this.scrollLeft = this.slider.scrollLeft;
        
        // Prevent text selection
        e.preventDefault();
    }
    
    handleMouseLeave() {
        this.isDown = false;
        this.slider.classList.remove('dragging');
    }
    
    handleMouseUp() {
        this.isDown = false;
        this.slider.classList.remove('dragging');
    }
    
    handleMouseMove(e) {
        if (!this.isDown) return;
        
        e.preventDefault();
        
        const x = e.pageX;
        this.walkX = this.startX - x; // Distance moved (positive = moved left, negative = moved right)
        this.slider.scrollLeft = this.scrollLeft + this.walkX;
    }
    
    // Touch event handlers for mobile devices
    handleTouchStart(e) {
        this.isDown = true;
        this.slider.classList.add('dragging');
        this.startX = e.touches[0].pageX;
        this.scrollLeft = this.slider.scrollLeft;
    }
    
    handleTouchEnd() {
        this.isDown = false;
        this.slider.classList.remove('dragging');
    }
    
    handleTouchMove(e) {
        if (!this.isDown) return;
        
        e.preventDefault();
        
        const x = e.touches[0].pageX;
        this.walkX = this.startX - x;
        this.slider.scrollLeft = this.scrollLeft + this.walkX;
    }
    
    // Public methods for testing and external control
    scrollTo(position) {
        if (this.slider) {
            this.slider.scrollLeft = position;
        }
    }
    
    getScrollPosition() {
        return this.slider ? this.slider.scrollLeft : 0;
    }
    
    getMaxScroll() {
        if (!this.slider) return 0;
        return this.slider.scrollWidth - this.slider.clientWidth;
    }
    
    // Method to programmatically trigger drag (useful for testing)
    simulateDrag(startX, endX, duration = 300) {
        if (!this.slider) return;
        
        const startScrollLeft = this.slider.scrollLeft;
        const distance = startX - endX;
        const targetScrollLeft = Math.max(0, Math.min(startScrollLeft + distance, this.getMaxScroll()));
        
        // Smooth animation
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            
            this.slider.scrollLeft = startScrollLeft + (targetScrollLeft - startScrollLeft) * easeOutCubic;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Initialize the drag functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.clickAndDrag = new ClickAndDrag();
});

// Utility functions for debugging and testing
window.debugDrag = {
    getScrollPosition: () => window.clickAndDrag?.getScrollPosition() || 0,
    getMaxScroll: () => window.clickAndDrag?.getMaxScroll() || 0,
    scrollTo: (position) => window.clickAndDrag?.scrollTo(position),
    simulateDrag: (startX, endX, duration) => window.clickAndDrag?.simulateDrag(startX, endX, duration)
};

// Export for testing environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ClickAndDrag;
}