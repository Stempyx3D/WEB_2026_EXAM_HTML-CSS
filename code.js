let currentImageIndex = 0;
const wheelTrack = document.querySelector('.wheel-track');
const wheelBtnLeft = document.querySelector('.wheel-btn-left');
const wheelBtnRight = document.querySelector('.wheel-btn-right');
const totalImages = document.querySelectorAll('.wheel-image').length;
const originalImageCount = 5;
const mediaQuery = window.matchMedia('(max-width: 1000px)');

function updateWheel(instant = false) {
    const imageWidth = document.querySelector('.wheel-image').offsetWidth;
    const container = document.querySelector('.wheel-container');
    const containerWidth = container.offsetWidth;
    const gap = 0;
    let offset;
    
    if (mediaQuery.matches) {
        offset = (containerWidth / 2) - (imageWidth / 2) - (currentImageIndex * imageWidth) - (imageWidth * 2);
    } else {
        offset = -(currentImageIndex * (imageWidth + gap)) - (containerWidth / 18);
    }
    
    if (instant) {
        wheelTrack.style.transition = 'none';
        wheelTrack.style.transform = `translateX(${offset}px)`;
        setTimeout(() => {
            wheelTrack.style.transition = 'transform 0.3s ease';
        }, 50);
    } else {
        wheelTrack.style.transform = `translateX(${offset}px)`;
    }

    updateImageScales();
}

function updateImageScales() {
    const images = document.querySelectorAll('.wheel-image');
    const centerIndex = 2; // Middle
    const semiCenterIndex = [1, 3]; //next to center
    const edgeIndex = [0, 4]; // Edge
    
    images.forEach((img, index) => {
        let position = (index - currentImageIndex) % originalImageCount;

        if (!mediaQuery.matches) {
            if (position < 0) position += originalImageCount;
            
            if (position === centerIndex) {
                img.style.transform = 'scale(1)';
            } else if (semiCenterIndex.includes(position)) {
                const moveAmount = position === 1 ? 6 : -6;
                img.style.transform = `scale(0.85) translateX(${moveAmount}%)`;
            } else {
                const moveAmount = position < centerIndex ? 36 : -36;
                img.style.transform = `scale(0.7) translateX(${moveAmount}%)`;
            }
        } else {
            img.style.transform = '';
        }
    });
}

wheelBtnRight.addEventListener('click', () => {
    currentImageIndex++;
    updateWheel();

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

window.addEventListener('load', () => {
    if (mediaQuery.matches) {
        wheelTrack.style.transform = 'translateX(50%)';
    }
    updateWheel();
});
window.addEventListener('resize', () => {
    updateWheel(true);
});

function headerScrollHandler() {
    const headerEl = document.querySelector('header');
    if (!headerEl) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
        const currentY = window.scrollY;
        if (currentY > lastScrollY && currentY > 50) {
            headerEl.classList.add('header-hidden');
        } else {
            headerEl.classList.remove('header-hidden');
        }
        lastScrollY = currentY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    });
}
headerScrollHandler();