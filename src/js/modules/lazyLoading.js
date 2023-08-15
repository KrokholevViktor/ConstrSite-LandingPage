function lazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const windowheight = document.documentElement.clientHeight;
    let lazyImagesPositions = [];
    if(lazyImages.length > 0) {
        lazyImages.forEach(img => {
            if(img.dataset.src) {
                lazyImagesPositions.push(img.getBoundingClientRect().top + scrollY);
                lazyScrollCheck()
            }
            
        })
    }
    
    window.addEventListener('scroll', lazyScroll);

    function lazyScroll() {
        if(document.querySelectorAll('img[data-src]').length > 0) {
            lazyScrollCheck();
            
        }
        
    }
    
    function lazyScrollCheck() {
        let imgIndex = lazyImagesPositions.findIndex(
            item => scrollY + 1000 > item - windowheight
        )
        if (imgIndex >= 0) {
            if (lazyImages[imgIndex].dataset.src) {
                lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
                lazyImages[imgIndex].removeAttribute('data-src');
            }
            delete lazyImagesPositions[imgIndex];
        }
    }
}

export default lazyLoading;