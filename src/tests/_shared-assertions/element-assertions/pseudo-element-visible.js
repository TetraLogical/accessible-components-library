import { createStepError } from "#utils/error-helpers.js";
import { assertElementInDom } from "./element-in-dom.js";

// Validate that an element has a visible CSS pseudo-element (::before or ::after)
export async function assertPseudoElementIsVisible ({ world, ctx }) {
  // Pull the values we need from the world context
  const { page, locator, selector, pseudoElement } = world;

  // The parent element must exist before we can check its pseudo-element
  await assertElementInDom(page, selector, ctx);

  // Wait for the pseudo-element's CSS to be applied before checking visibility,
  // since stylesheets can load after the DOM is ready
  const TIMEOUT_MS = 2000;
  const POLL_INTERVAL_MS = 50;

  // Run the check inside the browser context where getComputedStyle is available
  const result = await locator.first().evaluate(async (el, { pseudoElement, timeoutMs, pollIntervalMs }) => {
    // Helper to read the pseudo-element's computed styles and decide if it's visible
    const checkPseudoElement = () => {
      // Read the computed styles for the given pseudo-element
      const style = getComputedStyle(el, pseudoElement);
      const content = style.content;
      const display = style.display;

      // Sum all four border widths to check if a border is being drawn
      const totalBorderWidth =
        (parseFloat(style.borderTopWidth) || 0) +
        (parseFloat(style.borderRightWidth) || 0) +
        (parseFloat(style.borderBottomWidth) || 0) +
        (parseFloat(style.borderLeftWidth) || 0);

      // The pseudo-element has content if it isn't empty, none, or normal
      const hasContent = content !== "none" && content !== '""' && content !== "" && content !== "normal";
      // A visible border counts as a visual indicator even without content
      const hasBorder = style.borderStyle !== "none" && totalBorderWidth > 0;
      // display: none hides the pseudo-element entirely
      const isVisible = display !== "none";
      // It's present if it's visible and has either content or a border
      const hasPseudo = isVisible && (hasContent || hasBorder);

      return {
        hasPseudo,
        content,
        display,
        borderStyle: style.borderStyle,
        totalBorderWidth,
        hasContent,
        hasBorder,
        isVisible
      };
    };

    // Poll until the pseudo-element appears or we run out of time
    const startTime = Date.now();
    let lastCheck = checkPseudoElement();

    while (!lastCheck.hasPseudo && (Date.now() - startTime) < timeoutMs) {
      // Wait briefly before checking again
      await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
      lastCheck = checkPseudoElement();
    }

    // Return the final result along with how long we waited
    return {
      hasPseudoElement: lastCheck.hasPseudo,
      waitedMs: Date.now() - startTime,
      details: lastCheck
    };
  }, { pseudoElement, timeoutMs: TIMEOUT_MS, pollIntervalMs: POLL_INTERVAL_MS });

  // If the pseudo-element never appeared after polling, report the failure
  if (!result.hasPseudoElement) {
    // Record the failed check on the context
    ctx.assertions.pseudoPresent = false;

    throw createStepError({
      step: ctx.stepLabel,
      reason: "Pseudo element not found in DOM",
      selector: ctx.selector,
      pageUrl: ctx.pageUrl,
      scenarioName: ctx.scenarioName,
      suggestion: "Check that the element has a ::before or ::after pseudo element with content or border styles defined in CSS",
      details: {
        waitedMs: result.waitedMs,
        pseudoElement,
        ...result.details
      }
    });
  }

  // Record the passed check on the context
  ctx.assertions.pseudoPresent = true;
}
