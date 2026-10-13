// Extract the numeric thickness value from a focus indicator (outline or box-shadow)
export function extractIndicatorThickness ({ focusIndicator }) {
  // Outlines report their width directly as a CSS pixel value
  if (focusIndicator.indicatorType === "outline") {
    return parseFloat(focusIndicator.focusStyles.outlineWidth) || 0;
  }

  // For box-shadows, parse spread and blur from the shorthand value
  const boxShadow = focusIndicator.focusStyles.boxShadow;
  const match = boxShadow.match(/(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px\s+([\d.]+)px/);

  if (match) {
    const blur = parseFloat(match[3]) || 0;
    const spread = parseFloat(match[4]) || 0;
    // Use spread as primary thickness, but if spread < 2, consider spread + blur
    return spread >= 2 ? spread : spread + blur;
  }

  // Fallback: try to parse just blur from a 3-value box-shadow ("rgba(...) Xpx Ypx Bpx")
  const fallbackMatch = boxShadow.match(/(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px/);
  if (fallbackMatch) {
    return parseFloat(fallbackMatch[3]) || 0;
  }

  // No thickness could be determined
  return 0;
}
