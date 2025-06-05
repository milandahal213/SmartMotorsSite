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


// Interactive Steps Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Get step elements
  const prevBtn = document.getElementById('prev-step');
  const nextBtn = document.getElementById('next-step');
  const stepItems = document.querySelectorAll('.step-item');
  const stepDots = document.querySelectorAll('.step-dot');

  // Skip if elements don't exist on the page
  if (!prevBtn || !nextBtn || stepItems.length === 0) return;

  let currentStep = 1;
  const totalSteps = stepItems.length;

  // Initialize button state
  updateButtonStates();

  // Add event listeners to navigation buttons
  prevBtn.addEventListener('click', goToPrevStep);
  nextBtn.addEventListener('click', goToNextStep);

  // Add event listeners to step indicators
  stepDots.forEach(dot => {
    dot.addEventListener('click', function() {
      const stepNumber = parseInt(this.getAttribute('data-step'));
      goToStep(stepNumber);
    });
  });

  // Function to go to the previous step
  function goToPrevStep() {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  }

  // Function to go to the next step
  function goToNextStep() {
    if (currentStep < totalSteps) {
      goToStep(currentStep + 1);
    }
  }

  // Function to go to a specific step
  function goToStep(stepNumber) {
    // Update active step
    stepItems.forEach(item => {
      item.classList.remove('active');
      if (parseInt(item.getAttribute('data-step')) === stepNumber) {
        item.classList.add('active');
      }
    });

    // Update step indicators
    stepDots.forEach(dot => {
      dot.classList.remove('active');
      if (parseInt(dot.getAttribute('data-step')) === stepNumber) {
        dot.classList.add('active');
      }
    });

    // Update current step
    currentStep = stepNumber;

    // Update button states
    updateButtonStates();
  }

  // Function to update button states
  function updateButtonStates() {
    prevBtn.disabled = currentStep === 1;
    nextBtn.disabled = currentStep === totalSteps;

    // Visual indication of disabled state
    prevBtn.style.opacity = currentStep === 1 ? '0.5' : '1';
    nextBtn.style.opacity = currentStep === totalSteps ? '0.5' : '1';
  }

  // Optional: Auto-advance steps every 5 seconds (remove if not wanted)
  /*
  const autoAdvanceInterval = setInterval(function() {
    if (currentStep < totalSteps) {
      goToNextStep();
    } else {
      goToStep(1); // Loop back to first step
    }
  }, 5000);

  // Clear interval when user interacts
  [prevBtn, nextBtn, ...stepDots].forEach(el => {
    el.addEventListener('click', function() {
      clearInterval(autoAdvanceInterval);
    });
  });
  */
});

// Gallery Pagination JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Skip if we're not on a page with gallery
  const galleryContainer = document.getElementById('gallery-container');
  if (!galleryContainer) return;

  const galleryItems = document.querySelectorAll('.gallery-item');
  const prevButton = document.getElementById('prev-gallery-page');
  const nextButton = document.getElementById('next-gallery-page');
  const indicatorsContainer = document.getElementById('gallery-indicators');

  // Constants
  const ITEMS_PER_PAGE = 6;

  // Calculate total pages
  const totalItems = galleryItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  let currentPage = 1;

  // Create page indicators
  for (let i = 1; i <= totalPages; i++) {
    const indicator = document.createElement('div');
    indicator.classList.add('gallery-page-dot');
    if (i === 1) indicator.classList.add('active');
    indicator.dataset.page = i;

    indicator.addEventListener('click', function() {
      goToPage(parseInt(this.dataset.page));
    });

    indicatorsContainer.appendChild(indicator);
  }

  // Only show pagination if we have more than one page
  if (totalPages <= 1) {
    document.querySelector('.gallery-pagination').style.display = 'none';
  }

  // Navigation functions
  function updateDisplay() {
    // Hide all items
    galleryItems.forEach(item => item.classList.add('hidden'));

    // Show items for current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

    for (let i = startIndex; i < endIndex; i++) {
      galleryItems[i].classList.remove('hidden');
    }

    // Update button states
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    // Update indicators
    document.querySelectorAll('.gallery-page-dot').forEach(dot => {
      dot.classList.remove('active');
      if (parseInt(dot.dataset.page) === currentPage) {
        dot.classList.add('active');
      }
    });
  }

  function goToPage(pageNumber) {
    currentPage = pageNumber;
    updateDisplay();

    // Scroll to top of gallery
    galleryContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Add event listeners to buttons
  prevButton.addEventListener('click', function() {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  });

  nextButton.addEventListener('click', function() {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  });

  // Initialize display
  updateDisplay();
});

// IMPROVED Gallery Modal/Lightbox JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Skip if we're not on a page with gallery
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length === 0) return;

  const modal = document.getElementById('gallery-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const closeButton = document.querySelector('.close-modal');
  const prevButton = document.getElementById('prev-modal-item');
  const nextButton = document.getElementById('next-modal-item');

  let currentItemIndex = 0;
  const visibleItems = []; // For pagination-aware navigation

  // Make gallery images clickable
  galleryItems.forEach((item, index) => {
    const imageContainer = item.querySelector('.gallery-image');

    if (imageContainer) {
      imageContainer.addEventListener('click', function() {
        // Update array of visible items (for pagination-aware navigation)
        updateVisibleItems();

        // Find the position in visible items if using pagination
        // Otherwise just use the original index
        let targetIndex = index;
        if (document.querySelector('.gallery-pagination')) {
          const visibleIndex = visibleItems.indexOf(item);
          if (visibleIndex !== -1) {
            targetIndex = visibleIndex;
          }
        }

        currentItemIndex = targetIndex;
        openModal(item);
      });
    }
  });

  // Update the array of currently visible items
  function updateVisibleItems() {
    visibleItems.length = 0; // Clear the array
    galleryItems.forEach(item => {
      if (!item.classList.contains('hidden')) {
        visibleItems.push(item);
      }
    });
  }

  // Open the modal with the given item
  function openModal(item) {
    const itemImage = item.querySelector('.gallery-image img');
    const itemTitle = item.dataset.title || (itemImage ? itemImage.alt : '') || 'Project';

    // Use full description from data attribute if available, otherwise use paragraph text
    const fullDescription = item.dataset.fullDescription || item.querySelector('p').textContent;

    modalImage.src = itemImage.src;
    modalTitle.textContent = itemTitle;
    modalDescription.textContent = fullDescription;

    modal.style.display = 'block';
    document.body.classList.add('modal-open');

    // Update navigation button states
    updateNavButtons();

    // Check if buttons would overlap with content and adjust positioning
    adjustButtonPositioning();
  }

  // NEW: Adjust button positioning based on screen size and content
  function adjustButtonPositioning() {
    const modalContent = document.querySelector('.modal-content');
    const modalNavigation = document.querySelector('.modal-navigation');

    if (window.innerWidth <= 992) {
      // On smaller screens, ensure buttons don't overlap
      prevButton.style.left = '20px';
      nextButton.style.right = '20px';

      // Add more padding to the media container
      const mediaContainer = document.querySelector('.modal-media-container');
      if (mediaContainer) {
        mediaContainer.style.margin = '0 60px';
      }
    } else {
      // On larger screens, position buttons outside
      prevButton.style.left = '-80px';
      nextButton.style.right = '-80px';

      const mediaContainer = document.querySelector('.modal-media-container');
      if (mediaContainer) {
        mediaContainer.style.margin = '0 40px';
      }
    }
  }

  // Close the modal
  function closeModal() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  // Navigate to previous item
  function goToPrevItem() {
    if (currentItemIndex > 0) {
      currentItemIndex--;
      const itemsToUse = visibleItems.length > 0 ? visibleItems : galleryItems;
      openModal(itemsToUse[currentItemIndex]);
    }
  }

  // Navigate to next item
  function goToNextItem() {
    const itemsToUse = visibleItems.length > 0 ? visibleItems : galleryItems;
    if (currentItemIndex < itemsToUse.length - 1) {
      currentItemIndex++;
      openModal(itemsToUse[currentItemIndex]);
    }
  }

  // Update navigation button states
  function updateNavButtons() {
    const itemsToUse = visibleItems.length > 0 ? visibleItems : galleryItems;
    prevButton.disabled = currentItemIndex === 0;
    nextButton.disabled = currentItemIndex === itemsToUse.length - 1;

    // Visual indication of disabled state
    prevButton.style.opacity = currentItemIndex === 0 ? '0.3' : '1';
    nextButton.style.opacity = currentItemIndex === itemsToUse.length - 1 ? '0.3' : '1';
  }

  // Add event listeners
  closeButton.addEventListener('click', closeModal);
  prevButton.addEventListener('click', goToPrevItem);
  nextButton.addEventListener('click', goToNextItem);

  // Close when clicking outside modal content
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Handle keyboard navigation
  document.addEventListener('keydown', function(event) {
    if (modal.style.display !== 'block') return;

    if (event.key === 'Escape') {
      closeModal();
    } else if (event.key === 'ArrowLeft') {
      goToPrevItem();
    } else if (event.key === 'ArrowRight') {
      goToNextItem();
    }
  });

  // Handle window resize for responsive button positioning
  window.addEventListener('resize', function() {
    if (modal.style.display === 'block') {
      adjustButtonPositioning();
    }
  });
});

// IMPROVED Prototype Gallery Carousel JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Skip if we're not on a prototype detail page
  const carousel = document.querySelector('.prototype-carousel');
  if (!carousel) return;

  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.carousel-indicator');
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');

  if (slides.length === 0) return;

  let currentSlide = 0;
  const totalSlides = slides.length;

  // Function to show a specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });

    // Remove active state from all indicators
    indicators.forEach(indicator => {
      indicator.classList.remove('active');
    });

    // Show the current slide
    slides[index].classList.add('active');

    // Update indicator if it exists
    if (indicators[index]) {
      indicators[index].classList.add('active');
    }

    // Update button states
    updateButtonStates();
  }

  // Function to go to the next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  // Function to go to the previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  // Function to go to a specific slide
  function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
  }

  // Function to update button states
  function updateButtonStates() {
    // For a looping carousel, buttons are always enabled
    // If you want to disable buttons at ends, uncomment below:
    /*
    prevButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide === totalSlides - 1;
    prevButton.style.opacity = currentSlide === 0 ? '0.5' : '1';
    nextButton.style.opacity = currentSlide === totalSlides - 1 ? '0.5' : '1';
    */
  }

  // NEW: Adjust carousel button positioning based on screen size
  function adjustCarouselButtonPositioning() {
    if (window.innerWidth <= 992) {
      // On medium and small screens, position buttons inside
      if (prevButton) {
        prevButton.style.left = '20px';
      }
      if (nextButton) {
        nextButton.style.right = '20px';
      }
    } else {
      // On larger screens, position buttons outside
      if (prevButton) {
        prevButton.style.left = '-80px';
      }
      if (nextButton) {
        nextButton.style.right = '-80px';
      }
    }
  }

  // Add event listeners to navigation buttons
  if (prevButton) {
    prevButton.addEventListener('click', prevSlide);
  }

  if (nextButton) {
    nextButton.addEventListener('click', nextSlide);
  }

  // Add event listeners to indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
      goToSlide(index);
    });
  });

  // Add keyboard navigation
  document.addEventListener('keydown', function(event) {
    // Only work if the carousel is in view and focused
    const carouselRect = carousel.getBoundingClientRect();
    const isInView = carouselRect.top >= 0 && carouselRect.bottom <= window.innerHeight;

    if (!isInView) return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prevSlide();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextSlide();
    }
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
  });

  carousel.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe right - go to previous slide
        prevSlide();
      } else {
        // Swipe left - go to next slide
        nextSlide();
      }
    }
  }

  // Optional: Auto-play functionality (uncomment if desired)
  /*
  const autoPlayInterval = 5000; // 5 seconds
  let autoPlayTimer;

  function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayTimer);
  }

  // Start auto-play
  startAutoPlay();

  // Pause auto-play on hover
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  // Pause auto-play when user interacts
  [prevButton, nextButton, ...indicators].forEach(element => {
    if (element) {
      element.addEventListener('click', function() {
        stopAutoPlay();
        // Restart auto-play after 10 seconds of inactivity
        setTimeout(startAutoPlay, 10000);
      });
    }
  });
  */

  // Initialize the carousel
  showSlide(0);
  adjustCarouselButtonPositioning();

  // Handle window resize for responsive behavior
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Recalculate positions if needed
      showSlide(currentSlide);
      adjustCarouselButtonPositioning();
    }, 250);
  });
});

// Prototype Cards Interaction (for the overview page)
document.addEventListener('DOMContentLoaded', function() {
  const prototypeCards = document.querySelectorAll('.prototype-card');

  prototypeCards.forEach(card => {
    // Add smooth scrolling to prototype links
    const links = card.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Add hover effect analytics (optional)
    card.addEventListener('mouseenter', function() {
      const prototypeId = this.dataset.prototypeId;
      // You can add analytics tracking here if needed
      console.log(`Hovered over prototype: ${prototypeId}`);
    });
  });
});

// Timeline Animation (for the overview page)
document.addEventListener('DOMContentLoaded', function() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (timelineItems.length === 0) return;

  // Intersection Observer for timeline animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Set initial state and observe timeline items
  timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
  });
});

// Smooth scrolling for all internal links
document.addEventListener('DOMContentLoaded', function() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        const headerOffset = 80; // Account for fixed header if you have one
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Image lazy loading for prototype pages
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window && images.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const dataSrc = img.getAttribute('data-src');

          if (dataSrc) {
            img.src = dataSrc;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
          }

          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      const dataSrc = img.getAttribute('data-src');
      if (dataSrc) {
        img.src = dataSrc;
        img.removeAttribute('data-src');
      }
    });
  }
});

// NEW: Smart button visibility based on content overlap
document.addEventListener('DOMContentLoaded', function() {
  function checkButtonOverlap() {
    // Check modal buttons
    const modalImage = document.getElementById('modal-image');
    const prevModalBtn = document.getElementById('prev-modal-item');
    const nextModalBtn = document.getElementById('next-modal-item');

    if (modalImage && prevModalBtn && nextModalBtn) {
      const imageRect = modalImage.getBoundingClientRect();
      const prevBtnRect = prevModalBtn.getBoundingClientRect();
      const nextBtnRect = nextModalBtn.getBoundingClientRect();

      // Check if buttons overlap with image
      const prevOverlaps = prevBtnRect.right > imageRect.left;
      const nextOverlaps = nextBtnRect.left < imageRect.right;

      if (prevOverlaps) {
        prevModalBtn.style.left = '20px';
      }
      if (nextOverlaps) {
        nextModalBtn.style.right = '20px';
      }
    }

    // Check carousel buttons
    const carouselContainer = document.querySelector('.prototype-carousel');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');

    if (carouselContainer && carouselPrev && carouselNext) {
      const containerRect = carouselContainer.getBoundingClientRect();
      const prevBtnRect = carouselPrev.getBoundingClientRect();
      const nextBtnRect = carouselNext.getBoundingClientRect();

      // Ensure buttons don't go outside viewport
      if (prevBtnRect.left < 0) {
        carouselPrev.style.left = '20px';
      }
      if (nextBtnRect.right > window.innerWidth) {
        carouselNext.style.right = '20px';
      }
    }
  }

  // Run check on load and resize
  window.addEventListener('load', checkButtonOverlap);
  window.addEventListener('resize', checkButtonOverlap);
});

// NEW: Add visual feedback for button interactions
document.addEventListener('DOMContentLoaded', function() {
  const navButtons = document.querySelectorAll('.modal-nav-btn, .carousel-nav, .step-nav-btn');

  navButtons.forEach(button => {
    // Add ripple effect on click
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.6)';
      ripple.style.pointerEvents = 'none';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.left = '50%';
      ripple.style.top = '50%';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.marginLeft = '-10px';
      ripple.style.marginTop = '-10px';

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple animation to CSS if not already present
  if (!document.querySelector('#ripple-animation')) {
    const style = document.createElement('style');
    style.id = 'ripple-animation';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
});
