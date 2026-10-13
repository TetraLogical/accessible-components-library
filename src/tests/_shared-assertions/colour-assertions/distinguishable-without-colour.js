import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

/**
 * Checks an element can be told apart from a reference element without relying on colour.
 *
 * Compares the computed styles which do not involve colour, such as text decoration, font weight,
 * border and outline widths, box shadow geometry, background images, generated content and icons.
 * At least one of them must differ. Useful for a selected tab against an unselected one, or the
 * current page against the other pages.
 */
export async function assertDistinguishableWithoutColour ({ world, referenceSelector }) {
  const pageUrl = world.page.url();
  const stepLabel = `it should be distinguishable from "${referenceSelector}" without relying on colour alone`;

  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: { referenceSelector },
    assertions: {}
  };

  const locator = world.locator;
  assertLocatorIsSet(locator, ctx);

  const reference = world.page.locator(referenceSelector).first();
  if (await reference.count() === 0) {
    throw createStepError({
      step: stepLabel,
      reason: "Reference element not found",
      expected: `An element matching "${referenceSelector}"`,
      actual: "No match",
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Check the reference selector"
    });
  }

  const [a, b] = await Promise.all([
    locator.first().evaluate(collectNonColourStyles),
    reference.evaluate(collectNonColourStyles)
  ]);

  const differences = Object.keys(a).filter((key) => a[key] !== b[key]);

  if (differences.length === 0) {
    throw createStepError({
      step: stepLabel,
      reason: "Nothing other than colour distinguishes the elements",
      expected: `At least one non-colour difference between "${world.selector}" and "${referenceSelector}"`,
      actual: `Identical: ${Object.entries(a).map(([key, value]) => `${key}=${value}`).join(", ")}`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Add a cue which survives without colour, such as an underline, bold text, a border, a shape or an icon"
    });
  }
}

// Runs in the browser. Gathers the computed styles which do not involve colour.
function collectNonColourStyles (element) {
  const stripColours = (value) => value
    .replace(/rgba?\([^)]*\)/g, "")
    .replace(/#[0-9a-f]{3,8}/gi, "")
    .replace(/\b(?:currentcolor|transparent)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  const style = getComputedStyle(element);
  const pseudo = (name) => {
    const s = getComputedStyle(element, name);
    if (s.content === "none" || s.content === "normal") return "none";
    return `${s.content} ${s.width}x${s.height} ${s.borderStyle} ${stripColours(s.backgroundImage)}`;
  };

  return {
    textDecorationLine: style.textDecorationLine,
    textDecorationStyle: style.textDecorationStyle,
    textDecorationThickness: style.textDecorationThickness,
    textUnderlineOffset: style.textUnderlineOffset,
    fontWeight: style.fontWeight,
    fontStyle: style.fontStyle,
    fontSize: style.fontSize,
    textTransform: style.textTransform,
    borderWidths: [style.borderTopWidth, style.borderRightWidth, style.borderBottomWidth, style.borderLeftWidth].join(" "),
    borderStyles: [style.borderTopStyle, style.borderRightStyle, style.borderBottomStyle, style.borderLeftStyle].join(" "),
    outline: `${style.outlineWidth} ${style.outlineStyle}`,
    boxShadow: stripColours(style.boxShadow),
    backgroundImage: stripColours(style.backgroundImage),
    before: pseudo("::before"),
    after: pseudo("::after"),
    icons: element.querySelectorAll('img, svg, [role="img"]').length
  };
}
