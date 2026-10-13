import { TIMEOUTS } from "#utils/constants.js";

/**
 * Returns an element if it is visible on the page
 */
export async function getElement (page, selector, options = {}) {
  const { visible = false, timeout = TIMEOUTS.ELEMENT_ATTACHED, pageUrl = "" } = options;

  const locator = page.locator(selector);

  try {
    // Wait for first element to be in desired state
    await locator.first().waitFor({
      state: visible ? "visible" : "attached",
      timeout
    });
  } catch (error) {
    // Enhanced error message with context
    const state = visible ? "visible" : "in DOM";
    const pageContext = pageUrl ? `\nPage URL: ${pageUrl}` : "";
    throw new Error(
      `Timeout waiting for element "${selector}" to be ${state}.\n` +
      `Waited ${timeout}ms but element was not found.\n` +
      `Suggestion: Check that selector is correct and element loads within timeout.${pageContext}`
    );
  }

  // Count how many elements match
  const count = await locator.count();

  // Validate count (should have at least 1)
  if (count === 0) {
    const state = visible ? "visible" : "in DOM";
    const pageContext = pageUrl ? `\nPage URL: ${pageUrl}` : "";
    throw new Error(
      `Expected element "${selector}" to be ${state}, but found none.\n` +
      `The element may have been removed from the page after initial load.${pageContext}`
    );
  }

  return { locator, count };
}

// Get the accessibility node for an element via CDP (replaces removed page.accessibility.snapshot API)
export async function getElementAXNode (page, locator) {
  const session = await page.context().newCDPSession(page);
  const tmpAttr = `data-pw-ax-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
  try {
    await locator.evaluate((el, attr) => el.setAttribute(attr, ""), tmpAttr);
    const { root: { nodeId: docNodeId } } = await session.send("DOM.getDocument");
    const { nodeId } = await session.send("DOM.querySelector", {
      nodeId: docNodeId,
      selector: `[${tmpAttr}]`
    });
    if (!nodeId) return null;
    // Fetch the node with its relatives, so the roles of its children can be read too
    const { nodes } = await session.send("Accessibility.getPartialAXTree", {
      nodeId,
      fetchRelatives: true
    });
    if (!nodes?.length) return null;
    // Pick out the element's own node from among its ancestors and children
    const { node: { backendNodeId } } = await session.send("DOM.describeNode", { nodeId });
    const target = nodes.find(node => node.backendDOMNodeId === backendNodeId) ?? nodes[0];
    // Collect the roles of the node and everything beneath it which was returned
    const byId = new Map(nodes.map(node => [node.nodeId, node]));
    const roles = [];
    const walk = (node) => {
      if (!node) return;
      if (node.role?.value) roles.push(node.role.value);
      for (const childId of node.childIds ?? []) walk(byId.get(childId));
    };
    walk(target);
    const name = target.name?.value ?? "";
    const role = target.role?.value ?? "";
    return { name, role, roles };
  } finally {
    await locator.evaluate((el, attr) => el.removeAttribute(attr), tmpAttr).catch(() => {});
    await session.detach();
  }
}

// Get HTML snippet
export async function getSnippet (locator) {
  const parent = locator.locator("xpath=..");
  const parentHtml = await parent.innerHTML();
  return parentHtml;
}

/**
 * Collects image data and background-image data
 */
export async function getImageData (locator) {
  // Evaluate the locator code
  return locator.evaluate(root => {
    // Define a function to get the bounding box
    function getRect (node) {
      const r = node.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    }
    // Define a function to get the snippet
    function getSnippet (node) {
      // Small HTML-ish context to help manual review
      const tag = node.tagName ? node.tagName.toLowerCase() : "unknown";
      const id = node.id ? `#${node.id}` : "";
      const cls = node.className && typeof node.className === "string"
        ? `.${node.className.trim().split(/\s+/).slice(0, 3).join(".")}`
        : "";
      return `<${tag}${id}${cls}>`;
    }

    // Get the <img> elements within the code (root)
    const imgs = Array.from(root.querySelectorAll("img")).map(img => {
      // Get the computed styles for the image
      const computed = window.getComputedStyle(img);
      // Get the bounding box for the image
      const rect = getRect(img);
      // Return the details
      return {
        kind: "img",
        tagName: "img",
        snippet: getSnippet(img),
        src: img.currentSrc || img.src || "",
        alt: img.getAttribute("alt"),
        role: img.getAttribute("role"),
        ariaLabel: img.getAttribute("aria-label"),
        ariaLabelledby: img.getAttribute("aria-labelledby"),
        widthAttr: img.getAttribute("width"),
        heightAttr: img.getAttribute("height"),
        naturalWidth: img.naturalWidth || 0,
        naturalHeight: img.naturalHeight || 0,
        objectFit: computed.objectFit,
        display: computed.display,
        visibility: computed.visibility,
        opacity: computed.opacity,
        rect
      };
    });
    // Get all the elements to check for background-images
    const nodes = [root, ...Array.from(root.querySelectorAll("*"))];
    // Map the background images
    const bgs = nodes.map(node => {
      // Get the computed styles
      const computed = window.getComputedStyle(node);
      // Get the background image
      const bgImage = computed.backgroundImage;
      // Exit early if no background image found
      if (!bgImage || bgImage === "none") return null;
      // Get the bounding box
      const rect = getRect(node);
      // Get the tag name if there is one
      const tagName = node.tagName ? node.tagName.toLowerCase() : "unknown";
      // Return the detals
      return {
        kind: "background-image",
        tagName,
        snippet: getSnippet(node),
        backgroundImage: bgImage,
        backgroundRepeat: computed.backgroundRepeat,
        backgroundSize: computed.backgroundSize,
        backgroundPosition: computed.backgroundPosition,
        rect
      };
    }).filter(Boolean);
    // Return the images and bgImages
    return { imgs, bgs };
  });
}
