import { When } from "@cucumber/cucumber";
import { createStepError } from "#utils/error-helpers.js";
import { normaliseKeyName } from "#utils/keyboard-helpers.js";

// Presses a key on the keyboard.
When("I press the {string} key once", async function (key) {
  const pageUrl = this.page.url();
  // Remember the URL before the key press, so a URL change can be checked afterwards
  this.pageUrl = pageUrl;
  const normalizedKey = normaliseKeyName(key);

  try {
    await this.page.keyboard.press(normalizedKey);
  } catch (error) {
    throw createStepError({
      step: `I press the "${key}" key once`,
      reason: `Failed to press key: ${error.message}`,
      pageUrl,
      scenarioName: this.scenarioName,
      suggestion: `Check that "${key}" is a valid keyboard key name (tried: "${normalizedKey}")`,
      originalError: error
    });
  }
});

// Holds a key on the keyboard.
When("I hold the {string} key", async function (key) {
  const pageUrl = this.page.url();
  const normalizedKey = normaliseKeyName(key);

  try {
    await this.page.keyboard.down(normalizedKey);

    // Track held keys for cleanup (store normalized key)
    if (!this.heldKeys) this.heldKeys = [];
    this.heldKeys.push(normalizedKey);
  } catch (error) {
    throw createStepError({
      step: `I hold the "${key}" key`,
      reason: `Failed to hold key: ${error.message}`,
      pageUrl,
      scenarioName: this.scenarioName,
      suggestion: `Check that "${key}" is a valid keyboard key name (tried: "${normalizedKey}")`,
      originalError: error
    });
  }
});
