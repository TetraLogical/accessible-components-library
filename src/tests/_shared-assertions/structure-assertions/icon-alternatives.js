import { createStepError } from "#utils/error-helpers.js";
import { recordChecklist } from "#utils/checklist-helpers.js";
import { assertLocatorIsSet } from "#sharedAssertions/element-assertions/index.js";

/**
 * Checks every icon inside an element has a text alternative or is hidden from assistive technologies.
 *
 * When the element has a text label, each icon must be hidden, so the label is not read twice or
 * padded with a meaningless graphic. Without a text label, each icon must carry an accessible name.
 * An icon which carries its own name also records a manual checklist, because whether the wording
 * describes the purpose rather than the picture is a judgement call.
 */
export async function assertIconAlternatives ({ world }) {
  const pageUrl = world.page.url();
  const stepLabel = "any icon should have a text description, or be hidden from assistive technologies";

  const ctx = {
    stepLabel,
    pageUrl,
    scenarioName: world.scenarioName,
    details: {},
    assertions: {}
  };

  const locator = world.locator;
  assertLocatorIsSet(locator, ctx);

  const result = await locator.first().evaluate((element) => {
    const iconSelector = 'img, svg, [role="img"]';
    const icons = [...element.querySelectorAll(iconSelector)];
    if (element.matches(iconSelector)) icons.unshift(element);

    // The text label is every text node which is not inside an icon
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let textLabel = "";
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (node.parentElement?.closest(iconSelector)) continue;
      textLabel += node.textContent;
    }
    textLabel = textLabel.replace(/\s+/g, " ").trim();

    const describe = (icon) => {
      const tag = icon.tagName.toLowerCase();
      const cls = typeof icon.className === "string" && icon.className.trim() ? `.${icon.className.trim().split(/\s+/)[0]}` : "";
      return `<${tag}${cls}>`;
    };

    return {
      textLabel,
      icons: icons.map((icon) => {
        const tag = icon.tagName.toLowerCase();
        const role = icon.getAttribute("role");
        const alt = icon.getAttribute("alt");
        const title = tag === "svg" ? icon.querySelector(":scope > title")?.textContent?.trim() : icon.getAttribute("title");
        const name = [icon.getAttribute("aria-label"), alt, title].find((value) => value && value.trim()) || "";
        const labelledBy = icon.getAttribute("aria-labelledby");
        const hidden = icon.getAttribute("aria-hidden") === "true" ||
          ["presentation", "none"].includes(role) ||
          (tag === "img" && alt === "" && !icon.getAttribute("aria-label") && !labelledBy);
        return { snippet: describe(icon), hidden, named: Boolean(name || labelledBy), name: name || (labelledBy ? `labelled by #${labelledBy}` : "") };
      })
    };
  });

  const problems = [];
  for (const icon of result.icons) {
    if (result.textLabel && !icon.hidden) {
      problems.push(`${icon.snippet} is not hidden from assistive technologies, although "${result.textLabel}" already labels the control`);
    } else if (!result.textLabel && !icon.named) {
      problems.push(`${icon.snippet} has no text description and nothing else labels the control`);
    }
  }

  if (problems.length > 0) {
    throw createStepError({
      step: stepLabel,
      reason: "An icon has no suitable text alternative",
      expected: "Icons hidden with aria-hidden=\"true\" when a text label exists, or given a text description when it doesn't",
      actual: problems.join("; "),
      selector: world.selector,
      pageUrl,
      scenarioName: world.scenarioName,
      suggestion: "Add aria-hidden=\"true\" to decorative icons, or alt, aria-label or an SVG <title> to icons which stand alone"
    });
  }

  // Wording is a judgement call, so leave it to a person when an icon carries its own description
  for (const icon of result.icons) {
    if (result.textLabel || !icon.named) continue;
    await recordChecklist(world, {
      step: stepLabel,
      type: "manual",
      element: world.selector,
      checks: [
        "Text description describes the purpose of the control, not what the icon looks like",
        "Text description is short and makes sense when read on its own"
      ],
      context: { icon: icon.snippet, textDescription: icon.name, url: pageUrl }
    });
  }
}
