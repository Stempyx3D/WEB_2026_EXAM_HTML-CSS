// Image wheel functionality
let currentImageIndex = 0;
const wheelTrack = document.querySelector('.wheel-track');
const wheelBtnLeft = document.querySelector('.wheel-btn-left');
const wheelBtnRight = document.querySelector('.wheel-btn-right');
const totalImages = document.querySelectorAll('.wheel-image').length;
const originalImageCount = 5; // Original number of unique images

function updateWheel(instant = false) {
    const imageWidth = document.querySelector('.wheel-image').offsetWidth;
    const gap = 0; // Gap between images
    const offset = -(currentImageIndex * (imageWidth + gap));
    
    if (instant) {
        wheelTrack.style.transition = 'none';
        wheelTrack.style.transform = `translateX(${offset}px)`;
        setTimeout(() => {
            wheelTrack.style.transition = 'transform 0.3s ease';
        }, 50);
    } else {
        wheelTrack.style.transform = `translateX(${offset}px)`;
    }
    
    // Update scale for side images
    updateImageScales();
}

function updateImageScales() {
    const images = document.querySelectorAll('.wheel-image');
    const centerIndex = 2; // Middle position when showing 5 images
    const semiCenterIndex = [1, 3]; // Positions next to center
    const edgeIndex = [0, 4]; // Edge positions
    
    images.forEach((img, index) => {
        // Calculate position relative to current index (5 images visible)
        let position = (index - currentImageIndex) % originalImageCount;
        if (position < 0) position += originalImageCount;
        
        if (position === centerIndex) {
            // Center image - full size
            //img.style.width = '420px';
            //img.style.transform = 'scale(1) translateX(0)';
            img.style.transform = 'scale(1)';
            //img.style.margin = '0';
        } else if (semiCenterIndex.includes(position)) {
            // Images next to center - slightly scaled down and moved towards center
            const moveAmount = position === 1 ? 6 : -6;
            //img.style.width = '350px'; // Left side moves right, right side moves left
            //img.style.transform = `scale(0.9) translateX(${offset*0.1}%)`;
            img.style.transform = `scale(0.85) translateX(${moveAmount}%)`;
            //img.style.marginRight = `${moveAmount}px`;
            //img.style.margin = '0 -0.25%';
        } else {
            // All side images - scaled down and moved towards center
            const moveAmount = position < centerIndex ? 36 : -36; // Left side moves right, right side moves left
            //img.style.width = '280px';
            //img.style.transform = `scale(0.8) translateX(${offset*0.4}%)`;
            img.style.transform = `scale(0.7) translateX(${moveAmount}%)`;
            //img.style.margin = '0 -0.5%';
        }
    });
}

wheelBtnRight.addEventListener('click', () => {
    currentImageIndex++;
    updateWheel();
    
    // Reset to beginning when reaching the end of first set
    if (currentImageIndex >= originalImageCount) {
        setTimeout(() => {
            currentImageIndex = 0;
            updateWheel(true);
        }, 300);
    }
});

wheelBtnLeft.addEventListener('click', () => {
    if (currentImageIndex <= 0) {
        currentImageIndex = originalImageCount;
        updateWheel(true);
        setTimeout(() => {
            currentImageIndex--;
            updateWheel();
        }, 50);
    } else {
        currentImageIndex--;
        updateWheel();
    }
});

// Initialize on load
window.addEventListener('load', updateWheel);
//window.addEventListener('resize', () => updateWheel(true));