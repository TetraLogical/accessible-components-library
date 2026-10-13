import { TOLERANCES } from "#utils/constants.js";
import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";
import { assertBoundingBoxExists } from "./bounding-box-exists.js";

/**
 * Checks that nothing inside an element has been lost after a user setting changed, such as
 * zoom, text spacing, orientation, a user stylesheet or forced colours.
 *
 * It fails when the page needs a horizontal scrollbar, the element overflows the viewport,
 * text is clipped by an overflow, rendered siblings overlap, or an interactive control has
 * collapsed, been pushed out of the document or is covered by something else.
 *
 * When a user stylesheet step has run, it also checks the preferences took effect: the text
 * and background colours, the line height and the text alignment.
 */
export async function assertNoLossOfContent ({ world }) {
  const pageUrl = world.page.url();
  const stepLabel = "it should not lose any content or functionality";

  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {},
    assertions: {}
  };

  const locator = world.locator;
  assertLocatorIsSet(locator, ctx);

  const boundingBox = await locator.first().boundingBox();
  assertBoundingBoxExists({ boundingBox, selector: world.selector, pageUrl, scenarioName: world.scenarioName, stepLabel });

  const preferences = {
    foreground: world.userForegroundColour ?? null,
    background: world.userBackgroundColour ?? null,
    lineHeight: world.userLineHeight ?? null,
    textAlign: world.userTextAlign ?? null
  };

  const problems = await locator.first().evaluate(findProblems, { tolerance: TOLERANCES.ALIGNMENT_PIXELS + 1, preferences });

  if (problems.length > 0) {
    const shown = problems.slice(0, 8);
    const more = problems.length > shown.length ? ` (and ${problems.length - shown.length} more)` : "";
    throw createStepError({
      step: stepLabel,
      reason: "Content or functionality was lost",
      expected: "No clipped text, no overlapping content, no horizontal scrolling, and every control still usable",
      actual: `${shown.join("; ")}${more}`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Let the component grow with its content: avoid fixed heights and widths, let text wrap, and use relative units"
    });
  }
}

// Runs in the browser. Returns a list of plain-text problems, or an empty list.
function findProblems (root, { tolerance, preferences }) {
  const problems = [];
  const describe = (element) => {
    const tag = element.tagName.toLowerCase();
    const id = element.id ? `#${element.id}` : "";
    const cls = typeof element.className === "string" && element.className.trim()
      ? `.${element.className.trim().split(/\s+/).slice(0, 2).join(".")}`
      : "";
    const text = (element.textContent || "").replace(/\s+/g, " ").trim().slice(0, 30);
    return `<${tag}${id}${cls}>${text ? ` "${text}"` : ""}`;
  };
  const isRendered = (element) => element.getClientRects().length > 0;
  // Convert a hex colour to the rgb() form used by computed styles
  const toRgb = (hex) => {
    const [r, g, b] = hex.replace("#", "").match(/../g).map((pair) => parseInt(pair, 16));
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Horizontal scrolling on the page
  const doc = document.documentElement;
  if (doc.scrollWidth > doc.clientWidth) {
    problems.push(`the page needs a horizontal scrollbar (${doc.scrollWidth}px of content in ${doc.clientWidth}px)`);
  }

  // The element itself overflowing the viewport
  const rootRect = root.getBoundingClientRect();
  if (rootRect.width > doc.clientWidth + tolerance) {
    problems.push(`the element is ${Math.round(rootRect.width)}px wide in a ${doc.clientWidth}px viewport`);
  }

  const elements = [root, ...root.querySelectorAll("*")].filter(isRendered);
  const formControls = new Set(["input", "textarea", "select"]);

  for (const element of elements) {
    const style = getComputedStyle(element);
    const tag = element.tagName.toLowerCase();

    // Clipped content: an overflow that hides more than it shows
    const clips = ["hidden", "clip"].includes(style.overflowX) || ["hidden", "clip"].includes(style.overflowY);
    const intentionallyHidden = element.clientWidth <= 1 || element.clientHeight <= 1 || style.clip !== "auto" || style.clipPath !== "none";
    if (clips && !intentionallyHidden && !formControls.has(tag) && tag !== "svg") {
      if (element.scrollWidth > element.clientWidth + tolerance || element.scrollHeight > element.clientHeight + tolerance) {
        problems.push(`${describe(element)} clips its content (${element.scrollWidth}×${element.scrollHeight}px inside ${element.clientWidth}×${element.clientHeight}px)`);
      }
    }

    // Overlapping siblings, compared fragment by fragment so wrapped inline elements are not false positives
    const children = [...element.children].filter((child) => {
      const childStyle = getComputedStyle(child);
      return isRendered(child) && !["absolute", "fixed"].includes(childStyle.position);
    });
    const fragments = children.map((child) => ({
      child,
      rects: [...child.getClientRects()].filter((rect) => rect.width > 0 && rect.height > 0)
    }));
    for (let i = 0; i < fragments.length; i++) {
      for (let j = i + 1; j < fragments.length; j++) {
        const overlap = fragments[i].rects.some((a) => fragments[j].rects.some((b) =>
          Math.min(a.right, b.right) - Math.max(a.left, b.left) > tolerance &&
          Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > tolerance
        ));
        if (overlap) problems.push(`${describe(fragments[i].child)} overlaps ${describe(fragments[j].child)}`);
      }
    }

    // User stylesheet preferences
    if (preferences.foreground && style.color !== toRgb(preferences.foreground) && (element.childNodes.length === 0 || [...element.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim()))) {
      problems.push(`${describe(element)} ignores the preferred text colour (${style.color})`);
    }
    if (preferences.background && style.backgroundColor !== toRgb(preferences.background) && tag !== "svg" && !element.closest("svg")) {
      problems.push(`${describe(element)} ignores the preferred background colour (${style.backgroundColor})`);
    }
    if (preferences.lineHeight && style.lineHeight !== "normal") {
      const ratio = parseFloat(style.lineHeight) / parseFloat(style.fontSize);
      if (ratio < preferences.lineHeight - 0.01) problems.push(`${describe(element)} ignores the preferred line height (${ratio.toFixed(2)})`);
    }
    if (preferences.textAlign && style.textAlign === "justify") {
      problems.push(`${describe(element)} ignores the preferred text alignment (justify)`);
    }
  }

  // Interactive controls that are still rendered must be usable
  const controls = root.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  for (const control of controls) {
    if (!isRendered(control)) continue;
    const rect = control.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) {
      problems.push(`${describe(control)} has collapsed to ${Math.round(rect.width)}×${Math.round(rect.height)}px`);
      continue;
    }
    const docRect = { right: rect.right + window.scrollX, bottom: rect.bottom + window.scrollY, left: rect.left + window.scrollX, top: rect.top + window.scrollY };
    if (docRect.right <= 0 || docRect.bottom <= 0 || docRect.left >= doc.scrollWidth || docRect.top >= doc.scrollHeight) {
      problems.push(`${describe(control)} has been pushed out of the document`);
      continue;
    }
    // Test the centre of each line fragment, so a link wrapped over two lines is not a false positive
    control.scrollIntoView({ block: "center", inline: "nearest" });
    const hits = [...control.getClientRects()]
      .filter((fragment) => fragment.width > 0 && fragment.height > 0)
      .map((fragment) => document.elementFromPoint(fragment.left + fragment.width / 2, fragment.top + fragment.height / 2));
    const reachable = hits.some((hit) => hit === control || control.contains(hit));
    const blocker = hits.find((hit) => hit && hit !== control && !control.contains(hit));
    if (!reachable && blocker) {
      problems.push(`${describe(control)} is covered by ${describe(blocker)}`);
    }
  }
  window.scrollTo(0, 0);

  return [...new Set(problems)];
}
