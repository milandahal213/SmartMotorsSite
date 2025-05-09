// Enhanced image handling
document.addEventListener('DOMContentLoaded', function() {
  // Function to handle image loading and fitting
  function handleImageFit() {
    const imageContainers = document.querySelectorAll('.hero-image, .feature-image, .product-image, .step-image, .gallery-image');

    imageContainers.forEach(container => {
      const img = container.querySelector('img');

      if (img) {
        // Add loading event to handle image fitting after load
        img.addEventListener('load', function() {
          // Check if image proportions match container
          const containerRatio = container.clientWidth / container.clientHeight;
          const imageRatio = img.naturalWidth / img.naturalHeight;

          // Add specific classes based on image proportions
          if (Math.abs(containerRatio - imageRatio) > 0.5) {
            if (imageRatio > containerRatio) {
              container.classList.add('landscape-heavy');
            } else {
              container.classList.add('portrait-heavy');
            }
          }
        });

        // Handle loading errors
        img.addEventListener('error', function() {
          console.error('Error loading image:', img.src);
          container.classList.add('image-error');
          // Optionally set a fallback image
          img.src = '/assets/images/fallback-image.jpg';
        });
      }
    });
  }

  // Function to create a lazy loading effect
  function setupLazyLoading() {
    // Only proceed if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const dataSrc = img.getAttribute('data-src');

            if (dataSrc) {
              img.src = dataSrc;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      // Target all images that should be lazy loaded
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
      });
    }
  }

  // Run image handling functions
  handleImageFit();
  setupLazyLoading();

  // Re-run on window resize for responsive adjustments
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleImageFit, 250);
  });
});

// Add this to your main.js file or create a new script file

// Import the model-viewer script in your default.html layout
// Add this line in the head section of your _layouts/default.html file:
// <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>

// Simplified JavaScript for model-viewer (no buttons)

document.addEventListener('DOMContentLoaded', function() {
  // Check if model-viewer exists on the page
  const modelViewer = document.querySelector('model-viewer');

  if (modelViewer) {
    // Handle loading state
    modelViewer.addEventListener('progress', function(event) {
      const progressBar = document.querySelector('.progress-bar');
      const updatingBar = document.querySelector('.update-bar');

      if (progressBar && updatingBar) {
        progressBar.classList.remove('hide');
        updatingBar.style.width = `${event.detail.totalProgress * 100}%`;

        if (event.detail.totalProgress === 1) {
          progressBar.classList.add('hide');
        }
      }
    });

    // Optional: Set initial camera position for optimal view
    modelViewer.cameraOrbit = '0deg 75deg 105%';
    modelViewer.fieldOfView = '30deg';
  }
});
