export const TIMEOUTS = {
  ELEMENT_ATTACHED: 5000, // 5 seconds for element to attach to DOM
  ELEMENT_VISIBLE: 5000, // 5 seconds for element to become visible
  PAGE_LOAD: 5000, // 15 seconds for page navigation
  INTERACTION: 1000, // 3 seconds for interactions (click, focus, etc.)
  ANIMATION: 1000 // 1 second for CSS animations/transitions
};

export const TOLERANCES = {
  ALIGNMENT_PIXELS: 1, // 1 pixel tolerance for left/top/right/bottom alignment
  COLOR_CONTRAST: 0.01, // 0.01 tolerance for contrast ratio calculations
  DIMENSION_PIXELS: 1 // 1 pixel tolerance for width/height comparisons
};
