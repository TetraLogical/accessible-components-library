import { createStepError } from "#utils/error-helpers.js";
import { assertAxNodeIsSet } from "#sharedAssertions/element-assertions/index.js";

// Check that an element is made of real text, with no image in its accessibility subtree
export async function assertContainsStaticTextOnly ({ world }) {
  const pageUrl = world.page.url();
  const stepLabel = "it should contain static text, not an image";

  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    selector: world.selector,
    assertions: {}
  };

  assertAxNodeIsSet(world.axNode, ctx);

  // The roles of the node and its children, gathered when the node was inspected
  const roles = world.axNode.roles ?? [];
  const TEXT_ROLES = new Set(["StaticText", "InlineTextBox", "text"]);

  const hasImage = roles.some((r) => r === "img" || r === "image");
  const hasStaticText = roles.some((r) => TEXT_ROLES.has(r));

  if (hasImage) {
    throw createStepError({
      step: stepLabel,
      reason: "Element contains an image node in the accessibility tree",
      expected: "Only StaticText nodes, no img role",
      actual: "Found role: img",
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Replace the image with real HTML text"
    });
  }

  if (!hasStaticText) {
    throw createStepError({
      step: stepLabel,
      reason: "Element does not contain any static text in the accessibility tree",
      expected: "At least one text node (StaticText, InlineTextBox, or text role)",
      actual: `Found roles: ${[...new Set(roles)].join(", ")}`,
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Ensure the element contains visible text content"
    });
  }
}
