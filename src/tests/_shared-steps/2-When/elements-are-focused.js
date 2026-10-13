import { When } from "@cucumber/cucumber";
import { getElement } from "#utils/element-helpers.js";
import { createStepError } from "#utils/error-helpers.js";
import { focusUsingArrowKeys } from "#sharedAssertions/focus-assertions/arrow-key-navigation.js";

// Focuses an element programmatically (without a keyboard press).
// Note: May not activate :focus-visible styles.
When("I focus {string}", async function (selector) {
  const pageUrl = this.page.url();
  try {
    const { locator } = await getElement(this.page, selector, {
      visible: false,
      pageUrl: this.page.url()
    });
    this.locator = locator;
    this.selector = selector; // keep string for error output

    await this.locator.focus();
  } catch (error) {
    // Throw an error if it does not appear
    throw createStepError({
      step: `When I focus "${selector}"`,
      reason: error.message,
      selector,
      pageUrl,
      scenarioName: this.scenarioName,
      suggestion: "Ensure the element exists and is visible on the page",
      originalError: error
    });
  }
});

// Focuses an element using the keyboard.
// Note: Will activate :focus-visible styles.
When("I focus {string} using a keyboard", async function (selector) {
  const pageUrl = this.page.url();
  try {
    const { locator } = await getElement(this.page, selector, {
      visible: true,
      pageUrl
    });

    // Determine if the element itself is focusable or has a focusable descendant
    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const isSelfFocusable = await locator.evaluate((el, sel) => {
      return el.matches(sel);
    }, focusableSelector);

    let targetLocator = locator;
    if (!isSelfFocusable) {
      targetLocator = locator.locator(focusableSelector).first();
      const count = await targetLocator.count();
      if (count === 0) {
        throw new Error(`No focusable element found within "${selector}"`);
      }
    }

    // Position sequential focus just before the target by focusing the
    // preceding focusable element in tab order, then pressing Tab
    await targetLocator.evaluate((target) => {
      const sel = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
      const all = Array.from(document.querySelectorAll(sel))
        .filter(el => el.offsetParent !== null);
      const idx = all.indexOf(target);

      if (idx > 0) {
        all[idx - 1].focus();
      } else {
        // Target is the first focusable element — clear focus so Tab starts from the top
        if (document.activeElement && document.activeElement !== document.body) {
          document.activeElement.blur();
        }
      }
    });

    // Press Tab — genuine keyboard navigation activates :focus-visible
    await this.page.keyboard.press("Tab");

    // Verify the target element received focus
    const isFocused = await targetLocator.evaluate((el) => {
      return document.activeElement === el;
    });

    if (!isFocused) {
      const actual = await this.page.evaluate(() => {
        const ae = document.activeElement;
        if (!ae || ae === document.body) return "(no element focused)";
        const tag = ae.tagName.toLowerCase();
        const id = ae.id ? `#${ae.id}` : "";
        const cls = ae.className ? `.${ae.className.trim().split(/\s+/).join(".")}` : "";
        return `<${tag}${id}${cls}>`;
      });
      throw new Error(
        `Tab did not move focus to the expected element within "${selector}". ` +
        `Active element: ${actual}`
      );
    }

    this.locator = targetLocator;
    this.selector = selector;
    this.focusMethod = "keyboard";
  } catch (error) {
    if (error.message.includes("Step failed:")) {
      throw error;
    }
    throw createStepError({
      step: `When I focus "${selector}" using a keyboard`,
      reason: error.message,
      selector,
      pageUrl,
      scenarioName: this.scenarioName,
      suggestion: "Ensure the element or a focusable descendant exists, is visible, and can receive keyboard focus via Tab navigation",
      originalError: error
    });
  }
});

// Focuses a link behind the element (to check if focus indicator is visible).
// Note: The link is automatically injected and focused by the test.
When("I focus a link behind {string} using a keyboard", async function (selector) {
  const pageUrl = this.page.url();
  const injectedSelector = ".test-link-behind";

  try {
    const { locator: overlay } = await getElement(this.page, selector, {
      visible: true,
      pageUrl
    });

    await overlay.evaluate((el) => {
      const rect = el.getBoundingClientRect();

      // Give the link a focus indicator of its own, since a browser default
      // varies too much to make assertions about
      const style = document.createElement("style");
      style.textContent =
        ".test-link-behind:focus-visible { outline: 3px solid #7f238b; outline-offset: 3px; }";
      document.head.appendChild(style);

      const link = document.createElement("a");
      link.className = "test-link-behind";
      link.href = "#";
      link.textContent = "Link behind the overlay";

      // Sit the link at the centre of the overlay, in page coordinates, so it
      // stays put if the overlay moves out of the way. Absolute rather than
      // fixed positioning: a fixed element has no offsetParent, which would keep
      // it out of the tab order worked out below.
      link.style.position = "absolute";
      link.style.margin = "0";
      link.style.insetInlineStart = `${window.scrollX + rect.left + rect.width / 2 - 60}px`;
      link.style.insetBlockStart = `${window.scrollY + rect.top + rect.height / 2 - 10}px`;

      // Inserting before the overlay leaves the overlay painting on top, which
      // is the whole point: both are positioned, so source order decides
      el.before(link);
    });

    const { locator } = await getElement(this.page, injectedSelector, {
      visible: true,
      pageUrl
    });

    // Position sequential focus just before the link, then Tab onto it, so the
    // focus counts as keyboard focus and :focus-visible applies
    await locator.evaluate((target) => {
      const sel = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
      const all = Array.from(document.querySelectorAll(sel))
        .filter(el => el.offsetParent !== null);
      const idx = all.indexOf(target);

      if (idx > 0) {
        all[idx - 1].focus();
      } else if (document.activeElement && document.activeElement !== document.body) {
        document.activeElement.blur();
      }
    });

    await this.page.keyboard.press("Tab");

    const isFocused = await locator.evaluate(el => document.activeElement === el);
    if (!isFocused) {
      throw new Error(`Tab did not move focus to the link behind "${selector}"`);
    }

    this.locator = locator;
    this.selector = injectedSelector;
    this.focusMethod = "keyboard";
  } catch (error) {
    if (error.message.includes("Step failed:")) {
      throw error;
    }
    throw createStepError({
      step: `When I focus a link behind "${selector}" using a keyboard`,
      reason: error.message,
      selector,
      pageUrl,
      scenarioName: this.scenarioName,
      suggestion: "Ensure the element exists, is visible, and is positioned so that it covers page content",
      originalError: error
    });
  }
});

// Focuses an element inside a component using arrow keys.
// For example: Components which use a roving tabindex pattern.
// Note: Will activate :focus-visible) styles.
When("I focus {string} using the arrow keys", async function (selector) {
  await focusUsingArrowKeys({ world: this, selector });
});
