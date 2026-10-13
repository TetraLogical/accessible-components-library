import { createStepError } from "#utils/error-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

const CONTROLS = 'a[href], button, input, select, textarea, [tabindex], [role="tab"], [role="button"], [role="menuitem"], [role="option"], [role="checkbox"], [role="radio"]';
const COMPOSITE_ROLES = new Set(["tab", "option", "menuitem", "menuitemcheckbox", "menuitemradio", "radio", "treeitem", "gridcell"]);
const COMPOSITE_GROUPS = '[role="tablist"], [role="listbox"], [role="menu"], [role="menubar"], [role="radiogroup"], [role="toolbar"], [role="tree"], [role="grid"]';
const ARROW_KEYS = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];

/**
 * Checks every rendered interactive control inside an element can be reached with the keyboard.
 *
 * Presses Tab from the top of the page and records every control inside the element which
 * receives focus, stopping once focus leaves the element or starts to repeat, as it does inside a
 * modal dialog. Any control reached which belongs to a composite widget, such as a tab in a tab
 * list, is then swept with the arrow keys. Every control must appear in the reached set.
 */
export async function assertAllControlsReachable ({ world }) {
  const { page } = world;
  const pageUrl = page.url();
  const stepLabel = "every interactive control should be reachable using the keyboard";

  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {},
    assertions: {}
  };

  const locator = world.locator;
  assertLocatorIsSet(locator, ctx);

  // Tag the root and its controls so focus can be matched back to them
  const controls = await locator.first().evaluate((root, { selector, compositeRoles, groupRoles }) => {
    root.setAttribute("data-tl-keyboard-root", "");
    const rendered = [...root.querySelectorAll(selector)].filter((control) => control.getClientRects().length > 0 && !control.disabled);
    return rendered.map((control, index) => {
      control.setAttribute("data-tl-keyboard-control", String(index));
      const text = (control.innerText || control.value || control.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim().slice(0, 40);
      return {
        index,
        description: `<${control.tagName.toLowerCase()}${control.id ? `#${control.id}` : ""}>${text ? ` "${text}"` : ""}`,
        composite: compositeRoles.includes(control.getAttribute("role")) || Boolean(control.parentElement?.closest(groupRoles))
      };
    });
  }, { selector: CONTROLS, compositeRoles: [...COMPOSITE_ROLES], groupRoles: COMPOSITE_GROUPS });

  const focused = () => page.evaluate(() => {
    const element = document.activeElement;
    const inside = Boolean(element?.closest("[data-tl-keyboard-root]"));
    const index = element?.getAttribute("data-tl-keyboard-control");
    return { inside, index: index === null || index === undefined ? null : Number(index) };
  });

  const reached = new Set();
  const focusableOnPage = await page.evaluate(() => document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])').length);

  try {
    // Sweep with Tab from the top of the page
    await page.evaluate(() => { document.activeElement?.blur?.(); window.scrollTo(0, 0); });
    const seen = new Set();
    let enteredRoot = false;
    for (let i = 0; i < focusableOnPage + controls.length + 5; i++) {
      await page.keyboard.press("Tab");
      const { inside, index } = await focused();
      if (inside) {
        enteredRoot = true;
        if (index !== null) {
          if (seen.has(index)) break; // Focus has looped, as it does inside a modal dialog
          seen.add(index);
          reached.add(index);
        }
      } else if (enteredRoot) {
        break; // Focus has left the component
      }
    }

    // Sweep composite widgets with the arrow keys, starting from each control Tab reached
    for (const control of controls.filter((item) => item.composite && reached.has(item.index))) {
      for (const key of ARROW_KEYS) {
        await page.locator(`[data-tl-keyboard-control="${control.index}"]`).focus();
        for (let i = 0; i < controls.length; i++) {
          await page.keyboard.press(key);
          const { inside, index } = await focused();
          if (!inside || index === null || index === control.index) break;
          reached.add(index);
        }
      }
    }
  } finally {
    await page.evaluate(() => {
      document.querySelector("[data-tl-keyboard-root]")?.removeAttribute("data-tl-keyboard-root");
      for (const control of document.querySelectorAll("[data-tl-keyboard-control]")) control.removeAttribute("data-tl-keyboard-control");
    });
  }

  const missing = controls.filter((control) => !reached.has(control.index));

  if (controls.length === 0) {
    throw createStepError({
      step: stepLabel,
      reason: "No interactive controls were found",
      expected: "At least one rendered control inside the element",
      actual: "None",
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Check the selector points at the component, and that it is open or expanded if it needs to be"
    });
  }

  if (missing.length > 0) {
    throw createStepError({
      step: stepLabel,
      reason: "Some controls cannot be reached with the keyboard",
      expected: `All ${controls.length} controls reachable with Tab or the arrow keys`,
      actual: `Not reached: ${missing.map((control) => control.description).join(", ")}`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Make sure every control is focusable, and that composite widgets move focus with the arrow keys"
    });
  }
}
