// Baseball Image Generator
// This app generates different baseball images when the button is clicked

// Array of baseball images from various sources
const baseballImages = [
  'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600',
  'https://images.unsplash.com/photo-1614970479062-73f1a557d7f7?w=600',
  'https://images.unsplash.com/photo-1564069189-87ba65e5df3d?w=600',
  'https://images.unsplash.com/photo-1508414457954-6f95e48c3ff6?w=600',
  'https://images.unsplash.com/photo-1566577739095-1ddc1906e1d1?w=600',
  'https://picsum.photos/seed/baseball1/600/400',
  'https://picsum.photos/seed/baseball2/600/400',
  'https://picsum.photos/seed/baseball3/600/400',
  'https://picsum.photos/seed/baseball4/600/400',
  'https://picsum.photos/seed/baseball5/600/400'
];

// Keep track of which images we've shown
let usedImages = [];
let currentImageIndex = -1;

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
  const button = document.getElementById('generate-btn');
  const image = document.getElementById('baseball-image');

  // Set initial state
  image.style.display = 'none';

  // Add click event listener to button
  if (button) {
    button.addEventListener('click', generateNewBaseball);
  }

  // Add keyboard support (Enter or Space)
  if (button) {
    button.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        generateNewBaseball();
      }
    });
  }
}

/**
 * Generate and display a new baseball image
 */
function generateNewBaseball() {
  const image = document.getElementById('baseball-image');
  const button = document.getElementById('generate-btn');

  // Disable button temporarily to prevent rapid clicking
  button.disabled = true;
  button.textContent = 'Loading...';

  // Get a random baseball image
  const newImageUrl = getRandomBaseball();

  // Create a new image to preload
  const img = new Image();

  img.onload = () => {
    // Image loaded successfully
    image.src = newImageUrl;
    image.style.display = 'block';
    image.alt = `Baseball image ${currentImageIndex + 1}`;

    // Re-enable button
    button.disabled = false;
    button.textContent = 'Generate Baseball';

    // Add a little animation effect
    image.style.opacity = '0';
    setTimeout(() => {
      image.style.transition = 'opacity 0.5s ease';
      image.style.opacity = '1';
    }, 10);
  };

  img.onerror = () => {
    // If image fails to load, try another one
    console.error('Failed to load image:', newImageUrl);

    // Try a fallback approach with a different random image
    const fallbackUrl = `https://picsum.photos/seed/${Math.random()}/600/400`;
    image.src = fallbackUrl;
    image.style.display = 'block';
    image.alt = 'Random baseball-themed image';

    // Re-enable button
    button.disabled = false;
    button.textContent = 'Generate Baseball';
  };

  // Start loading the image
  img.src = newImageUrl;
}

/**
 * Get a random baseball image that hasn't been shown recently
 * @returns {string} URL of a baseball image
 */
function getRandomBaseball() {
  // If we've shown all images, reset the used list
  if (usedImages.length >= baseballImages.length) {
    usedImages = [];
  }

  // Find available images
  const availableImages = baseballImages.filter((img, index) =>
    !usedImages.includes(index)
  );

  // Pick a random available image
  const randomIndex = Math.floor(Math.random() * availableImages.length);
  const selectedImage = availableImages[randomIndex];

  // Find the original index and mark it as used
  const originalIndex = baseballImages.indexOf(selectedImage);
  usedImages.push(originalIndex);
  currentImageIndex = originalIndex;

  // Add a cache-busting parameter to ensure fresh loads
  const timestamp = new Date().getTime();
  return `${selectedImage}&t=${timestamp}`;
}

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateNewBaseball,
    getRandomBaseball
  };
}
