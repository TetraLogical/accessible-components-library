import { getElement } from "#utils/element-helpers.js";
import { createStepError } from "#utils/error-helpers.js";

// Selector for elements which can receive sequential keyboard focus
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Roles for composite widgets which manage focus with the arrow keys
const COMPOSITE_ROLES = '[role="tablist"], [role="radiogroup"], [role="menu"], [role="menubar"], [role="listbox"], [role="tree"], [role="toolbar"]';

export async function focusUsingArrowKeys ({ world, selector }) {
  // Get the current page URL for error reporting
  const pageUrl = world.page.url();

  // Describe the step being verified
  const stepLabel = `I focus "${selector}" using the arrow keys`;

  try {
    // The target must be visible before it can receive focus
    const { locator } = await getElement(world.page, selector, {
      visible: true,
      pageUrl
    });

    // Get the target as a single element
    const target = locator.first();

    // Read the details we need from the composite widget which contains the target
    const widget = await target.evaluate((element, { focusable, compositeRoles }) => {
      // Find the composite widget, falling back to the target's parent element
      const container = element.closest(compositeRoles) || element.parentElement;

      // No container means there is nothing to navigate within
      if (!container) return null;

      // The item which is currently in the tab order is the entry point
      const entry = container.querySelector(focusable);

      // Vertical widgets are navigated with the down arrow, horizontal ones with the right arrow
      const isVertical = container.getAttribute("aria-orientation") === "vertical";

      // Mark the entry point so it can be located again from the test context
      const attribute = "data-pw-arrow-entry";
      if (entry) entry.setAttribute(attribute, "");

      // Return what the test context needs to drive the keyboard
      return {
        attribute,
        hasEntry: !!entry,
        itemCount: container.children.length,
        key: isVertical ? "ArrowDown" : "ArrowRight"
      };
    }, { focusable: FOCUSABLE, compositeRoles: COMPOSITE_ROLES });

    // The target must sit inside a container we can navigate
    if (!widget) {
      throw new Error(`No parent element found for "${selector}" to navigate within`);
    }

    // The container must have an item in the tab order to start from
    if (!widget.hasEntry) {
      throw new Error(
        `No item within the composite widget containing "${selector}" is in the tab order. ` +
        "Composite widgets should keep one item reachable with the Tab key."
      );
    }

    // Locate the entry point that was marked in the browser
    const entryLocator = world.page.locator(`[${widget.attribute}]`).first();

    // Position sequential focus just before the entry point, then Tab onto it,
    // so the focus is genuinely keyboard-driven and :focus-visible applies
    await entryLocator.evaluate((element, focusable) => {
      // Collect every visible focusable element in tab order
      const all = Array.from(document.querySelectorAll(focusable))
        .filter(candidate => candidate.offsetParent !== null);

      // Find where the entry point sits in that order
      const index = all.indexOf(element);

      if (index > 0) {
        // Focus the element before it, ready to Tab forwards
        all[index - 1].focus();
      } else if (document.activeElement && document.activeElement !== document.body) {
        // The entry point is first, so clear focus and Tab from the top of the page
        document.activeElement.blur();
      }
    }, FOCUSABLE);

    // Tab onto the entry point
    await world.page.keyboard.press("Tab");

    // Allow one press per item, plus a margin for widgets which wrap around
    const maxPresses = Math.max(widget.itemCount, 10);

    // Press the arrow key until the target is focused, or we run out of presses
    let isFocused = await target.evaluate(element => document.activeElement === element);
    for (let press = 0; press < maxPresses && !isFocused; press++) {
      await world.page.keyboard.press(widget.key);
      isFocused = await target.evaluate(element => document.activeElement === element);
    }

    // Remove the temporary marker now the navigation is done
    await entryLocator.evaluate((element, attribute) => element.removeAttribute(attribute), widget.attribute).catch(() => {});

    // The target must have received focus
    if (!isFocused) {
      // Describe whatever ended up with focus instead
      const actual = await world.page.evaluate(() => {
        const active = document.activeElement;
        if (!active || active === document.body) return "(no element focused)";
        const tag = active.tagName.toLowerCase();
        const id = active.id ? `#${active.id}` : "";
        const cls = active.className ? `.${active.className.trim().split(/\s+/).join(".")}` : "";
        return `<${tag}${id}${cls}>`;
      });

      throw new Error(
        `The ${widget.key} key did not move focus to "${selector}" within ${maxPresses} presses. ` +
        `Active element: ${actual}`
      );
    }

    // Store the target for the assertions which follow
    world.locator = target;
    world.selector = selector;
    world.focusMethod = "keyboard";
  } catch (error) {
    // Let structured errors pass through unchanged
    if (error.message.includes("Step failed:")) throw error;

    // Wrap unexpected errors with context
    throw createStepError({
      step: stepLabel,
      reason: error.message,
      selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Ensure the element is inside a composite widget which supports arrow key navigation, and that one of its items is in the tab order",
      originalError: error
    });
  }
}
