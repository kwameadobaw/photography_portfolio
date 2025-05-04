document.addEventListener('DOMContentLoaded', function() {
    // Initialize Masonry-like layout
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Assign special sizes to some items for visual interest
    if (galleryItems.length > 0) {
        // Make every 4th item wide
        for (let i = 3; i < galleryItems.length; i += 4) {
            if (galleryItems[i]) galleryItems[i].classList.add('wide');
        }
        
        // Make every 6th item tall
        for (let i = 5; i < galleryItems.length; i += 6) {
            if (galleryItems[i]) galleryItems[i].classList.add('tall');
        }
        
        // Make every 9th item large
        for (let i = 8; i < galleryItems.length; i += 9) {
            if (galleryItems[i]) {
                galleryItems[i].classList.add('large');
                // Remove other classes if they exist
                galleryItems[i].classList.remove('wide', 'tall');
            }
        }
    }
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide items based on filter
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.classList.contains(filterValue) || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
            
            // Re-layout the grid after filtering
            setTimeout(() => {
                // This timeout gives the browser time to process the display changes
                arrangeItems();
            }, 100);
        });
    });
    
    // Function to arrange items in a visually pleasing way
    function arrangeItems() {
        const visibleItems = Array.from(galleryItems).filter(item => 
            item.style.display !== 'none'
        );
        
        // Reset all special size classes
        visibleItems.forEach(item => {
            item.classList.remove('wide', 'tall', 'large');
        });
        
        // Apply special sizes to visible items
        if (visibleItems.length > 3) {
            for (let i = 3; i < visibleItems.length; i += 4) {
                if (visibleItems[i]) visibleItems[i].classList.add('wide');
            }
        }
        
        if (visibleItems.length > 5) {
            for (let i = 5; i < visibleItems.length; i += 6) {
                if (visibleItems[i]) visibleItems[i].classList.add('tall');
            }
        }
        
        if (visibleItems.length > 8) {
            for (let i = 8; i < visibleItems.length; i += 9) {
                if (visibleItems[i]) {
                    visibleItems[i].classList.add('large');
                    visibleItems[i].classList.remove('wide', 'tall');
                }
            }
        }
    }
    
    // Initialize lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentIndex = 0;
    
    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            const imgSrc = this.querySelector('img').getAttribute('src');
            const caption = this.querySelector('.overlay h3').textContent;
            
            lightboxContent.setAttribute('src', imgSrc);
            lightboxCaption.textContent = caption;
            lightbox.style.display = 'block';
            
            // Add animation class
            setTimeout(() => {
                lightboxContent.classList.add('show');
            }, 10);
        });
    });
    
    // Close lightbox
    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
        lightboxContent.classList.remove('show');
    });
    
    // Navigate through images
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightbox();
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightbox();
    });
    
    // Update lightbox content
    function updateLightbox() {
        const imgSrc = galleryItems[currentIndex].querySelector('img').getAttribute('src');
        const caption = galleryItems[currentIndex].querySelector('.overlay h3').textContent;
        
        lightboxContent.classList.remove('show');
        
        setTimeout(() => {
            lightboxContent.setAttribute('src', imgSrc);
            lightboxCaption.textContent = caption;
            lightboxContent.classList.add('show');
        }, 300);
    }
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            lightboxContent.classList.remove('show');
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                updateLightbox();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                updateLightbox();
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                lightboxContent.classList.remove('show');
            }
        }
    });
});