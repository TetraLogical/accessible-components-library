import { createStepError } from "#utils/error-helpers.js";
import { getImageData } from "#utils/element-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { recordChecklists } from "#utils/checklist-helpers.js";

// Build a checklist for images of text
// When strict is true (AAA / WCAG 1.4.9), no exemptions apply
// When strict is false (AA / WCAG 1.4.5), exemptions like logos are allowed
export async function buildImagesOfTextChecklist ({ world, strict }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = strict
    ? "it should not contain any images of text"
    : "it should not contain images of text which should have been rendered as actual text";

  // Build the shared context for guards and error reporting
  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: { strict },
    assertions: {}
  };

  // Get the locator from the preceding "When" step
  const locator = world.locator;

  // The locator must exist before we can build the checklist
  assertLocatorIsSet(locator, ctx);

  try {
    // Collect <img> data and background-image data in the browser context
    const results = await getImageData(locator);

    // Merge inline images and background images into a single array
    const items = [...results.imgs, ...results.bgs];

    // If there are no images, nothing to check
    if (!items.length) return;

    // Checklist text differs depending on whether this is AA or AAA
    const checks = strict
      ? [
          "Confirm this is not an image of text",
          "Confirm text has not been rendered as an image for any reason"
        ]
      : [
          "Confirm any text in the image is not exempt, like a logo",
          "Confirm any text in the image is is available elsewhere in the page / component",
          "Confirm any text is not used to present instructions, labels, or copy that should be HTML text"
        ];

    // Build one checklist item per image-like thing
    const checklists = items.map((item) => {
      // Shared context fields for every image type
      const commonContext = {
        selector: world.selector,
        url: pageUrl,
        elementSnippet: item.snippet,
        elementTag: item.tagName,
        dimensions: `${Math.round(item.rect.width)}px × ${Math.round(item.rect.height)}px`,
        position: `x:${Math.round(item.rect.x)}, y:${Math.round(item.rect.y)}`
      };

      // If it's an <img>, include image-specific attributes
      if (item.kind === "img") {
        return {
          step: stepLabel,
          type: "manual",
          element: world.selector,
          checks,
          context: {
            ...commonContext,
            kind: "img",
            src: item.src,
            alt: item.alt,
            role: item.role,
            ariaLabel: item.ariaLabel,
            ariaLabelledby: item.ariaLabelledby,
            naturalSize: `${item.naturalWidth} * ${item.naturalHeight}`,
            widthAttr: item.widthAttr,
            heightAttr: item.heightAttr,
            objectFit: item.objectFit,
            visibility: item.visibility,
            opacity: item.opacity,
            display: item.display
          }
        };
      }

      // If it's a background image, include background-specific properties
      return {
        step: stepLabel,
        type: "manual",
        element: world.selector,
        checks,
        context: {
          ...commonContext,
          kind: "background-image",
          backgroundImage: item.backgroundImage,
          backgroundRepeat: item.backgroundRepeat,
          backgroundSize: item.backgroundSize,
          backgroundPosition: item.backgroundPosition
        }
      };
    });

    // Record the checklists for manual review
    await recordChecklists(world, checklists);
  } catch (error) {
    // Let structured errors pass through unchanged
    if (error.message.includes("Step failed:")) throw error;

    // Wrap unexpected errors with context
    throw createStepError({
      step: stepLabel,
      reason: `Failed to verify images of text: ${error.message}`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "This is a manual verification step - review the element visually",
      originalError: error
    });
  }
}
