import { When } from "@cucumber/cucumber";
import { createStepError } from "#utils/error-helpers.js";

// Changes the colour mode in the browser.
// For example: light, dark, forced colours.
When("I enable {string} mode", async function (requestedMode) {
  const pageUrl = this.page.url();

  // Accept both spellings, so "forced colors" and "forced colours" behave the same
  const mode = (requestedMode || "light").replace("colors", "colours");
  this.colorScheme = mode;
  const emulationOptions = {};
  if (mode === "forced colours") {
    emulationOptions.colorScheme = "dark";
    emulationOptions.forcedColors = "active";
    this.forcedColorsEnabled = true;
  } else if (mode === "dark") {
    emulationOptions.colorScheme = "dark";
    emulationOptions.forcedColors = null;
    this.forcedColorsEnabled = false;
  } else {
    emulationOptions.colorScheme = "light";
    emulationOptions.forcedColors = null;
    this.forcedColorsEnabled = false;
  }

  try {
    // Enable forced colors using CSS media
    await this.page.emulateMedia(emulationOptions);

    // Wait for styles to apply
    await this.page.waitForTimeout(300);
  } catch (error) {
    throw createStepError({
      step: "I enable forced colors mode",
      reason: `Failed to enable forced colors mode: ${error.message}`,
      pageUrl,
      scenarioName: this.scenarioName,
      suggestion: "Check that the browser supports forced colors emulation (Chromium-based browsers)",
      originalError: error
    });
  }
});

// Previews the page as it would print, so print styles apply
When("I preview the page for printing", async function () {
  await this.page.emulateMedia({ media: "print" });

  // Wait for styles to apply
  await this.page.waitForTimeout(300);
});

// Simulates landscape mode by swapping the browser's width and height.
// Note: This is a preview based on proportions rather than true landscape mode.
// Orientation media queries, screen.orientation and other device metadata will not change.
When("I switch to landscape mode", async function () {
  const pageUrl = this.page.url();
  try {
    // Get current viewport size
    const currentViewport = this.page.viewportSize();
    const currentWidth = currentViewport?.width || 800;
    const currentHeight = currentViewport?.height || 600;

    // Swap width and height for landscape
    // Only swap if currently in portrait (height > width)
    if (currentHeight > currentWidth) {
      await this.page.setViewportSize({
        width: currentHeight,
        height: currentWidth
      });

      // Store orientation in context
      this.orientation = "landscape";

      // Wait for layout to adjust
      await this.page.waitForTimeout(300);
    } else {
      // Already in landscape, no-op
      this.orientation = "landscape";
    }
  } catch (error) {
    throw createStepError({
      step: "I switch to landscape mode",
      reason: `Failed to switch to landscape mode: ${error.message}`,
      pageUrl,
      scenarioName: this.scenarioName,
      suggestion: "Check that the browser viewport can be resized",
      originalError: error
    });
  }
});

// Changes the zoom level in the browser.
When("I zoom in the browser to {int}%", async function (zoomPercent) {
  const pageUrl = this.page.url();

  try {
    // Create CDP session to control zoom through devtools
    const client = await this.page.context().newCDPSession(this.page);

    // Parse zoom percent and scale page (For example: 200% = 2.0)
    const zoomFactor = zoomPercent / 100;
    await client.send("Emulation.setPageScaleFactor", {
      pageScaleFactor: zoomFactor
    });

    // Store zoom level in context for cleanup
    this.zoomLevel = zoomPercent;
    this.cdpSession = client;

    // Wait a moment for zoom to apply
    await this.page.waitForTimeout(500);
  } catch (error) {
    throw createStepError({
      step: `I zoom in the browser to ${zoomPercent}%`,
      reason: `Failed to set zoom level: ${error.message}`,
      pageUrl,
      scenarioName: this.scenarioName,
      suggestion: `Check that zoom percentage is a valid number (tried: ${zoomPercent}%)`,
      originalError: error
    });
  }
});

// Sets the viewport width in the browser.
When("I set the viewport to {int}px wide", async function (width) {
  const pageUrl = this.page.url();

  try {
    // Get current viewport size
    const currentViewport = this.page.viewportSize();
    // Set a default height if not set
    const height = currentViewport?.height || 800;

    // Set new viewport size
    await this.page.setViewportSize({
      width,
      height
    });

    // Store viewport size in context
    this.viewportWidth = width;
    this.viewportHeight = height;

    // Wait a moment for layout to adjust
    await this.page.waitForTimeout(300);
  } catch (error) {
    throw createStepError({
      step: `I set the viewport to ${width}px wide`,
      reason: `Failed to set viewport width: ${error.message}`,
      pageUrl,
      scenarioName: this.scenarioName,
      suggestion: `Check that width is a valid pixel value (tried: ${width}px)`,
      originalError: error
    });
  }
});

// Sets both the width and height of the viewport in the browser.
When("I set the viewport to {int}px by {int}px", async function (width, height) {
  const pageUrl = this.page.url();

  try {
    // Set new viewport size
    await this.page.setViewportSize({
      width,
      height
    });

    // Store viewport size in context
    this.viewportWidth = width;
    this.viewportHeight = height;

    // Wait a moment for layout to adjust
    await this.page.waitForTimeout(300);
  } catch (error) {
    throw createStepError({
      step: `I set the viewport to ${width}px by ${height}px`,
      reason: `Failed to set viewport size: ${error.message}`,
      pageUrl,
      scenarioName: this.scenarioName,
      suggestion: `Check that both dimensions are valid pixel values (tried: ${width}px by ${height}px)`,
      originalError: error
    });
  }
});

// Increases the line height.
When("I increase the line height to {float} times the font size", async function (multiplier) {
  await this.page.addStyleTag({
    content: `
      * {
        line-height: ${multiplier}em !important;
      }
    `
  });

  // Store the multiplier for potential verification
  this.lineHeightMultiplier = multiplier;
});

// Increases the line spacing following paragraphs.
When("I increase the spacing following paragraphs to {int} times the font size", async function (multiplier) {
  await this.page.addStyleTag({
    content: `
      p {
        margin-bottom: ${multiplier}em !important;
      }
    `
  });

  // Store the multiplier for potential verification
  this.paragraphSpacingMultiplier = multiplier;
});

// Increases the letter spacing.
When("I increase the letter spacing to {float} times the font size", async function (multiplier) {
  await this.page.addStyleTag({
    content: `
      * {
        letter-spacing: ${multiplier}em !important;
      }
    `
  });

  // Store the multiplier for potential verification
  this.letterSpacingMultiplier = multiplier;
});

// Increases the word spacing.
When("I increase the word spacing to {float} times the font size", async function (multiplier) {
  await this.page.addStyleTag({
    content: `
      * {
        word-spacing: ${multiplier}em !important;
      }
    `
  });

  // Store the multiplier for potential verification
  this.wordSpacingMultiplier = multiplier;
});

// Overrides the foreground and background colours using a custom stylesheet.
When("I apply a custom foreground and background colour using a user stylesheet", async function () {
  await this.page.addStyleTag({
    content: `
      *, *::before, *::after {
        color: #12005e !important;
        background-color: #fffbe6 !important;
      }
    `
  });

  // Store the colours for potential verification
  this.userForegroundColour = "#12005e";
  this.userBackgroundColour = "#fffbe6";
});

// Overrides the max width using a custom stylesheet.
When("I apply a custom max-width using a user stylesheet", async function () {
  await this.page.addStyleTag({
    content: `
      * {
        max-inline-size: 80ch !important;
      }
    `
  });

  // Store the measure for potential verification
  this.userMaxWidth = "80ch";
});

// Overrides the text alignment using a custom stylesheet.
When("I apply a custom text-alignment using a user stylesheet", async function () {
  await this.page.addStyleTag({
    content: `
      * {
        text-align: start !important;
      }
    `
  });

  // Store the alignment for potential verification
  this.userTextAlign = "start";
});

// Overrides the line-height of the font using a custom stylesheet.
When("I apply a custom line height using a user stylesheet", async function () {
  await this.page.addStyleTag({
    content: `
      * {
        line-height: 1.5 !important;
      }
    `
  });

  // Store the line height for potential verification
  this.userLineHeight = 1.5;
});

// Resizes the font to 200% using a custom stylesheet.
When("I apply a custom font size of 200% using a user stylesheet", async function () {
  await this.page.addStyleTag({
    content: `
      html {
        font-size: 200% !important;
      }
    `
  });

  // Store the font size for potential verification
  this.userFontSize = "200%";
});
