import { createStepError } from "#utils/error-helpers.js";

// Parse a CSS colour string to an { r, g, b, a } object using the browser's canvas API
export async function parseColourToRgba ({ page, colour, selector, pageUrl, scenarioName, stepLabel }) {
  // Use the browser's canvas 2D context to normalise any CSS colour value
  const rgba = await page.evaluate((colour) => {
    // Create a temporary canvas context for colour conversion
    const ctx = document.createElement("canvas").getContext("2d");
    // Set a known sentinel value so we can detect invalid colours
    const sentinel = "rgba(1, 2, 3, 0.4)";
    ctx.fillStyle = sentinel;
    // Attempt to override with the target colour
    ctx.fillStyle = colour;

    // If the fill style didn't change, the colour was not recognised
    if (ctx.fillStyle === sentinel) return null;

    // Try to match a hex colour (#rrggbb)
    const hex = ctx.fillStyle.match(/^#([0-9a-f]{6})$/i);
    if (hex) {
      const h = hex[1];
      return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
        a: 1
      };
    }

    // Try to match a legacy rgba() value with commas
    const rgbOld = ctx.fillStyle.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/
    );
    if (rgbOld) {
      return {
        r: parseInt(rgbOld[1], 10),
        g: parseInt(rgbOld[2], 10),
        b: parseInt(rgbOld[3], 10),
        a: rgbOld[4] !== undefined ? parseFloat(rgbOld[4]) : 1
      };
    }

    // Unrecognised format
    return null;
  }, colour);

  // The colour must have been parsed successfully
  if (!rgba) {
    throw createStepError({
      step: stepLabel,
      reason: "Could not parse focus indicator colour",
      expected: "A valid CSS colour value",
      actual: colour,
      selector,
      pageUrl,
      scenarioName,
      suggestion: "Ensure the focus indicator has a valid outline-color or box-shadow colour"
    });
  }

  return rgba;
}
