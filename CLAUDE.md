# CLAUDE.md - AI Assistant Guide

This document provides comprehensive guidance for AI assistants working on this codebase. It describes the project structure, development workflows, coding conventions, and best practices.

## Project Overview

**Repository**: Claude-Code
**Type**: Web Development Project
**Primary Language**: HTML/CSS/JavaScript
**Purpose**: Interactive web applications with client-side functionality

## Current Project State

This repository contains a fully functional **Baseball Image Generator** web application. The project demonstrates modern web development best practices with clean, maintainable code. It features interactive image generation with smooth animations, responsive design, and accessibility support.

## Repository Structure

```
Claude-Code/
├── CLAUDE.md           # This file - AI assistant guide
├── README.md           # User-facing documentation
├── index.html          # Main HTML entry point
├── css/                # Stylesheets
│   └── styles.css      # Main stylesheet
├── js/                 # JavaScript modules
│   └── app.js          # Main application logic
├── assets/             # Static assets
│   ├── images/         # Image files
│   └── fonts/          # Custom fonts
└── docs/               # Additional documentation
```

## Development Workflows

### 1. Feature Development

When implementing new features:

1. **Understand Requirements**: Read the user's request carefully
2. **Plan Structure**: Determine which files need to be created/modified
3. **Implement Incrementally**: Build features step by step
4. **Test Locally**: Ensure code works before committing
5. **Commit & Push**: Use clear commit messages

### 2. Git Workflow

**Branch Strategy**:
- Main branch: Primary development branch
- Feature branches: Named `claude/claude-md-<session-id>`
- Always develop on the designated branch

**Commit Guidelines**:
```bash
# Good commit messages
git commit -m "Add baseball image generator functionality"
git commit -m "Update styles for responsive design"
git commit -m "Fix image loading bug in generator"

# Bad commit messages
git commit -m "updates"
git commit -m "fix stuff"
git commit -m "wip"
```

**Push Protocol**:
```bash
# Always use -u flag for first push
git push -u origin <branch-name>

# Branch naming must follow pattern
claude/claude-md-<session-id>

# Retry on network failures with exponential backoff
# 2s, 4s, 8s, 16s between retries (up to 4 retries)
```

### 3. Code Review Checklist

Before committing code, verify:
- [ ] Code follows project conventions
- [ ] No syntax errors or warnings
- [ ] Functionality works as expected
- [ ] Comments explain complex logic
- [ ] No hardcoded credentials or sensitive data
- [ ] Files are in correct directories
- [ ] Proper indentation and formatting

## Coding Conventions

### HTML

```html
<!-- Use semantic HTML5 elements -->
<header>, <nav>, <main>, <section>, <article>, <footer>

<!-- Proper indentation (2 spaces) -->
<div class="container">
  <h1>Title</h1>
  <p>Content</p>
</div>

<!-- Always include alt text for images -->
<img src="path/to/image.jpg" alt="Descriptive text">

<!-- Use meaningful class names -->
<button class="btn-generate">Generate</button>
```

### CSS

```css
/* Use BEM-like naming for clarity */
.block {}
.block__element {}
.block--modifier {}

/* Group related properties */
.selector {
  /* Positioning */
  position: relative;
  top: 0;

  /* Box Model */
  display: flex;
  width: 100%;
  padding: 1rem;
  margin: 0 auto;

  /* Typography */
  font-size: 1rem;
  color: #333;

  /* Visual */
  background: #fff;
  border: 1px solid #ccc;
}

/* Mobile-first responsive design */
.container {
  width: 100%;
}

@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
```

### JavaScript

```javascript
// Use modern ES6+ syntax
const variableName = 'value';
let mutableVariable = 0;

// Arrow functions for callbacks
array.map(item => item.value);

// Descriptive function names
function generateRandomImage() {
  // Implementation
}

// Event listeners with clear handlers
button.addEventListener('click', handleButtonClick);

function handleButtonClick(event) {
  event.preventDefault();
  // Handle click
}

// Use template literals for strings
const message = `Generated ${count} images`;

// Error handling
try {
  // Risky operation
} catch (error) {
  console.error('Error message:', error);
}
```

## File Organization

### When to Create New Files

**Create new files when**:
- Adding a new page (new .html file)
- Adding a new major feature module (new .js file)
- Adding component-specific styles (new .css file)
- Adding static assets (images, fonts, etc.)

**Don't create new files when**:
- Adding small utility functions (add to existing .js)
- Adding a few CSS rules (add to existing .css)
- Making minor updates or fixes

### Directory Guidelines

```
css/
  - styles.css          # Main global styles
  - components.css      # Reusable component styles (if needed)
  - utilities.css       # Utility classes (if needed)

js/
  - app.js              # Main application logic
  - utils.js            # Utility functions (if needed)
  - config.js           # Configuration (if needed)

assets/
  images/               # All image files
  fonts/                # Custom fonts
```

## Security Best Practices

### Never Commit

- API keys or secrets
- Passwords or credentials
- Personal information
- `.env` files with sensitive data
- Large binary files

### Always Validate

- User input in forms
- Data before using in DOM
- External API responses
- File uploads (if implemented)

### XSS Prevention

```javascript
// BAD - Vulnerable to XSS
element.innerHTML = userInput;

// GOOD - Safe from XSS
element.textContent = userInput;

// If HTML is needed, sanitize first
element.innerHTML = sanitizeHTML(userInput);
```

## Common Patterns

### Image Generation Pattern

```javascript
// Random selection from array
const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
const randomImage = images[Math.floor(Math.random() * images.length)];

// Dynamic image loading
function loadImage(src) {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    // Image loaded successfully
  };
  img.onerror = () => {
    console.error('Failed to load image');
  };
  return img;
}
```

### Event Handling Pattern

```javascript
// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  const button = document.querySelector('#generate-btn');
  if (button) {
    button.addEventListener('click', handleGenerate);
  }
}

function handleGenerate(event) {
  event.preventDefault();
  // Handle the action
}
```

## Debugging Guidelines

### Console Logging

```javascript
// Use descriptive logs
console.log('User clicked generate button');
console.log('Loading image:', imageUrl);
console.error('Failed to fetch data:', error);

// Remove console logs before committing (or use a logger)
```

### Common Issues

1. **Element not found**: Check if DOM is loaded before querying
2. **Image not loading**: Verify path and file exists
3. **Event not firing**: Check if listener is attached correctly
4. **Styles not applying**: Check CSS specificity and file load order

## Testing Checklist

Before marking work complete:

- [ ] Open in browser and test functionality
- [ ] Test on different screen sizes (responsive)
- [ ] Check browser console for errors
- [ ] Verify all images load correctly
- [ ] Test button clicks and interactions
- [ ] Verify no broken links
- [ ] Check visual appearance matches expectations

## Performance Considerations

### Optimization Tips

```javascript
// Cache DOM queries
const button = document.querySelector('#btn'); // Once
// vs
document.querySelector('#btn').addEventListener(...); // Each time

// Lazy load images if many
<img src="placeholder.jpg" data-src="actual.jpg" loading="lazy">

// Minimize reflows
// BAD
element.style.width = '100px';
element.style.height = '100px';

// GOOD
element.style.cssText = 'width: 100px; height: 100px;';
```

## Accessibility Guidelines

### Always Include

```html
<!-- Alt text for images -->
<img src="baseball.jpg" alt="Red baseball with white stitching">

<!-- Labels for inputs -->
<label for="input-id">Label text</label>
<input id="input-id" type="text">

<!-- ARIA labels for buttons without text -->
<button aria-label="Generate new baseball image">
  <img src="icon.svg" alt="">
</button>

<!-- Semantic HTML -->
<button> instead of <div onclick="">
<nav> for navigation
<main> for main content
```

### Keyboard Navigation

```javascript
// Ensure interactive elements are keyboard accessible
button.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleAction();
  }
});
```

## AI Assistant Specific Guidelines

### When Working on This Codebase

1. **Always read files before editing**: Never propose changes without reading the current code
2. **Use TodoWrite for multi-step tasks**: Track progress on complex features
3. **Prefer editing over creating**: Modify existing files rather than creating new ones when possible
4. **Keep it simple**: Avoid over-engineering; implement exactly what's requested
5. **No unnecessary improvements**: Don't refactor code that wasn't asked to be changed
6. **Test before committing**: Verify functionality works as expected

### Communication Style

- Be concise and clear
- Explain what you're doing and why
- Point out potential issues or concerns
- Ask for clarification when requirements are ambiguous
- Use file references: `path/to/file.js:123`

### Tool Usage

```bash
# Read files before editing
Read tool → Edit tool

# Search for patterns
Grep for content search
Glob for file pattern matching

# Execute commands
Bash for git operations, testing, file listing

# Never use bash for:
- Reading files (use Read tool)
- Editing files (use Edit tool)
- Searching content (use Grep tool)
```

### Error Handling

When encountering errors:

1. Read the error message carefully
2. Check relevant files for issues
3. Fix the root cause, not symptoms
4. Verify the fix works
5. Explain what was wrong and how it was fixed

## Resources and References

### Documentation to Consult

- MDN Web Docs: https://developer.mozilla.org/
- HTML Spec: https://html.spec.whatwg.org/
- CSS Reference: https://developer.mozilla.org/en-US/docs/Web/CSS
- JavaScript Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript

### Useful Tools

- Browser DevTools: Inspect, debug, test
- Console: View logs and errors
- Network Tab: Check resource loading
- Responsive Design Mode: Test different screen sizes

## Project-Specific Notes

### Current Features

**Baseball Image Generator** (v1.0)
- Interactive button-driven image generation
- Random image selection from a pool of 10 baseball-themed images
- Smart image rotation system (no repeats until all images shown)
- Preloading and error handling for images
- Smooth fade-in animations on image display
- Loading state feedback on button
- Keyboard accessibility (Enter/Space key support)
- Fully responsive design for mobile and desktop
- Gradient background with modern UI design
- Cache-busting to ensure fresh image loads

### Technical Implementation Details

**Image Sources**:
- 5 Unsplash baseball images
- 5 Picsum placeholder images with baseball seeds
- Fallback mechanism for failed image loads

**State Management**:
- Tracks used images to prevent immediate repeats
- Resets rotation after all images shown
- Manages button disabled state during loading

**Error Handling**:
- Image preloading before display
- Fallback to random Picsum image on load failure
- Console error logging for debugging

### Known Issues

None currently identified. The application is stable and functioning as expected.

### Future Enhancements

Potential improvements for future development:
- Add image counter to show progress (e.g., "Image 3 of 10")
- Implement image download functionality
- Add sound effects on button click
- Create image gallery view of previously shown images
- Add sharing functionality for social media
- Implement different themes (football, basketball, etc.)
- Add animation variety (slide, zoom, flip transitions)
- Include image descriptions or baseball facts
- Add fullscreen image viewer on click
- Implement favorites/like system for images

---

## Version History

- **v1.1** (2026-01-01): Updated with Baseball Image Generator implementation
  - Added comprehensive current features documentation
  - Documented technical implementation details
  - Listed future enhancement possibilities
  - Updated project state to reflect working application

- **v1.0** (2026-01-01): Initial CLAUDE.md creation
  - Established project structure
  - Defined coding conventions
  - Documented workflows and best practices

---

**Last Updated**: 2026-01-01
**Maintained By**: AI Assistants working on this codebase

For questions or clarifications about this guide, refer to the commit history or project documentation.
