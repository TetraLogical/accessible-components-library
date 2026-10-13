/*
  Measures where an element's focus indicator is drawn, and what happens to it:
  whether it fits in the viewport, whether an ancestor clips it, and whether
  anything is painted over the top of it.

  This function runs inside the page, so it has to be self contained. Playwright
  sends its source to the browser, and nothing else from this module goes with
  it, so everything it needs is declared inside it.

  It only reports measurements. Deciding whether those measurements pass or fail
  is left to the assertion which asked for them, because "not obscured at all"
  (WCAG 2.4.12) and "not obscured entirely" (WCAG 2.4.11) read the same numbers
  in different ways.
*/
export function measureFocusIndicator (el, { indicator, coveringSelector = null }) {
  // Describe an element well enough to recognise it in a failure message
  function describe (node) {
    // Get the tag name
    const tag = node.tagName.toLowerCase();
    // Get the id
    const id = node.id ? `#${node.id}` : "";
    // Get the class names, which are not a string on SVG elements
    const cls = node.className && typeof node.className === "string"
      ? `.${node.className.trim().split(/\s+/).join(".")}`
      : "";
    // Return the whole description
    return `<${tag}${id}${cls}>`;
  }

  // Find the closest ancestor two elements have in common
  function sharedAncestor (a, b) {
    // Walk up from the first element until an ancestor holds the second as well
    for (let node = a; node; node = node.parentElement) {
      if (node.contains(b)) return node;
    }
    // Nothing shared, so compare against the root
    return document.documentElement;
  }

  /*
    Report how high up the paint order an element sits, measured from an
    ancestor it shares with something else. Higher numbers are painted later,
    so they end up on top.

    0 is ordinary in-flow content. 0.5 is content lifted above it by being
    positioned, or by creating a stacking context of its own. Anything else is
    an explicit z-index.

    This is close to how a browser paints rather than exactly how it paints: it
    takes the highest layer found on the way up, without working out where one
    stacking context stops and the next begins. That is enough to tell an
    overlay apart from the content a focus indicator is drawn over.
  */
  function paintLayer (node, stopAt) {
    // Start at in-flow content
    let layer = 0;
    // A layer created anywhere between here and the shared ancestor lifts
    // everything inside it, so walk the whole way up
    for (let current = node; current && current !== stopAt; current = current.parentElement) {
      // Get the computed styles
      const cs = getComputedStyle(current);
      // Positioned elements are painted after the in-flow content around them
      const positioned = cs.position !== "static";
      // So are elements which create a stacking context in some other way
      const stacked =
        cs.transform !== "none" ||
        cs.filter !== "none" ||
        cs.mixBlendMode !== "normal" ||
        cs.isolation === "isolate" ||
        parseFloat(cs.opacity) < 1 ||
        cs.willChange.includes("transform") ||
        cs.willChange.includes("opacity") ||
        cs.contain.includes("paint");
      // Neither, so this element is painted with everything else in flow
      if (!positioned && !stacked) continue;
      // An explicit z-index sets the layer outright, otherwise the element
      // sits just above the in-flow content around it
      const z = cs.zIndex === "auto" ? 0.5 : (parseFloat(cs.zIndex) || 0);
      // Keep the highest layer found on the way up
      layer = Math.max(layer, z);
    }
    // Return the layer
    return layer;
  }

  // Report whether an element is in the top layer, which is painted over the
  // whole page no matter what the rest of the document does
  function inTopLayer (node) {
    // Walk up, because the top layer lifts everything inside it too
    for (let current = node; current; current = current.parentElement) {
      try {
        // Modal dialogs and open popovers are the two the components use
        if (current.matches("dialog:modal, :popover-open")) return true;
      } catch {
        // The browser does not know one of these selectors, so skip the check
        return false;
      }
    }
    // Nothing on the way up is in the top layer
    return false;
  }

  // Report whether an element is painted at all, because content which is not
  // painted still answers hit testing without hiding anything
  function isPainted (node) {
    // Get the computed styles
    const cs = getComputedStyle(node);
    // Fully transparent or hidden content covers nothing
    return parseFloat(cs.opacity) !== 0 && cs.visibility !== "hidden";
  }

  /*
    Report whether an element is painted over the focus indicator.

    This is the check which decides whether hit testing has found a genuine
    overlay, or just the content the indicator is drawn on top of. The focus
    indicator is drawn outside the element's own box, so points sampled around
    its perimeter land on whatever sits behind it: usually an ancestor, and
    sometimes a neighbour. Neither of those hides the indicator, because an
    outline is painted after all of the in-flow content it shares a layer with.
    Only content lifted into a layer above the focused element can cover it.
  */
  function paintsOverIndicator (node) {
    // The focused element, anything inside it, and its ancestors are all
    // painted at or below its focus indicator
    if (node === el || el.contains(node) || node.contains(el)) return false;
    // Content which is not painted cannot cover anything
    if (!isPainted(node)) return false;
    // Top layer content is painted over everything else
    if (inTopLayer(node)) return true;
    // Compare the two branches from the ancestor they share
    const shared = sharedAncestor(node, el);
    // Get the layer the other element is painted in
    const theirs = paintLayer(node, shared);
    // Get the layer the focused element is painted in
    const ours = paintLayer(el, shared);
    // A higher layer is painted later, so it covers the indicator
    if (theirs !== ours) return theirs > ours;
    // Sharing the in-flow layer means the indicator is painted afterwards
    if (theirs === 0) return false;
    // Sharing any other layer means document order decides which is on top
    return Boolean(el.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_FOLLOWING);
  }

  // Get the bounding rect for the element
  const rect = el.getBoundingClientRect();

  // Calculate the effective indicator area by expanding the element rect
  let expand = 0;
  // If the indicator has an outline
  if (indicator.hasOutline) {
    // Normalise the width and offset
    const outlineWidth = parseFloat(indicator.focusStyles.outlineWidth) || 0;
    const outlineOffset = parseFloat(indicator.focusStyles.outlineOffset) || 0;
    // Expand the rect by the outline and offset
    expand = outlineWidth + outlineOffset;
  } else if (indicator.hasBoxShadow) {
    // Try to parse the spread from box-shadow: For example "rgba(...) Xpx Ypx Bpx Spx"
    const match = indicator.focusStyles.boxShadow.match(
      /(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px\s+([\d.]+)px/
    );
    // If it parses, expand the rect by the offset
    expand = match ? parseFloat(match[4]) + parseFloat(match[3]) : 4;
  }

  // Get the indicator area
  const indicatorArea = {
    top: rect.top - expand,
    right: rect.right + expand,
    bottom: rect.bottom + expand,
    left: rect.left - expand
  };

  // Get the viewport size
  const viewport = { width: window.innerWidth, height: window.innerHeight };

  // Record every ancestor which clips, and how the indicator sits inside it
  const clipping = [];
  // Set the first element to the parent element
  let ancestor = el.parentElement;
  // Loop to walk through ancestors
  while (ancestor && ancestor !== document.documentElement) {
    // Get the computed styles of the ancestor
    const cs = getComputedStyle(ancestor);
    // Get the overflow values
    const overflow = cs.overflow;
    const overflowX = cs.overflowX;
    const overflowY = cs.overflowY;
    // Get the clipping values
    const clippingValues = ["hidden", "clip", "scroll", "auto"];
    const clipsX = clippingValues.includes(overflowX) || clippingValues.includes(overflow);
    const clipsY = clippingValues.includes(overflowY) || clippingValues.includes(overflow);
    // If there is clipping
    if (clipsX || clipsY) {
      // Get the bounding rect
      const ancestorRect = ancestor.getBoundingClientRect();
      // Record whether any part of the indicator falls outside the ancestor
      const partiallyOutside =
        (clipsY && indicatorArea.top < ancestorRect.top) ||
        (clipsY && indicatorArea.bottom > ancestorRect.bottom) ||
        (clipsX && indicatorArea.left < ancestorRect.left) ||
        (clipsX && indicatorArea.right > ancestorRect.right);
      // Record whether all of it falls outside the ancestor
      const fullyOutside =
        (clipsY && indicatorArea.bottom <= ancestorRect.top) ||
        (clipsY && indicatorArea.top >= ancestorRect.bottom) ||
        (clipsX && indicatorArea.right <= ancestorRect.left) ||
        (clipsX && indicatorArea.left >= ancestorRect.right);
      // Add the ancestor to the list
      clipping.push({
        description: describe(ancestor),
        overflow,
        rect: {
          top: ancestorRect.top,
          right: ancestorRect.right,
          bottom: ancestorRect.bottom,
          left: ancestorRect.left
        },
        partiallyOutside,
        fullyOutside
      });
    }
    // Set the ancestor to the parent element ready for the next loop
    ancestor = ancestor.parentElement;
  }

  // Find the element the caller expects to be out of the way, if it named one
  const covering = coveringSelector ? document.querySelector(coveringSelector) : null;

  // Sample the corners of the indicator, the middle of each edge, and its centre
  const samplePoints = [
    { x: indicatorArea.left + 1, y: indicatorArea.top + 1 },
    { x: indicatorArea.right - 1, y: indicatorArea.top + 1 },
    { x: indicatorArea.left + 1, y: indicatorArea.bottom - 1 },
    { x: indicatorArea.right - 1, y: indicatorArea.bottom - 1 },
    { x: indicatorArea.left + 1, y: (indicatorArea.top + indicatorArea.bottom) / 2 },
    { x: indicatorArea.right - 1, y: (indicatorArea.top + indicatorArea.bottom) / 2 },
    { x: (indicatorArea.left + indicatorArea.right) / 2, y: indicatorArea.top + 1 },
    { x: (indicatorArea.left + indicatorArea.right) / 2, y: indicatorArea.bottom - 1 },
    { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
  ];

  // Hit testing only works inside the viewport, so drop the points which fall
  // outside it rather than moving them somewhere the indicator is not
  const points = samplePoints
    .filter(point =>
      point.x >= 0 && point.x < viewport.width &&
      point.y >= 0 && point.y < viewport.height
    )
    .map(point => {
      // Pull the highest layer element from under the target point
      const topEl = document.elementFromPoint(point.x, point.y);
      // Return what was found there, and how it relates to the indicator
      return {
        x: point.x,
        y: point.y,
        // The element painted over the indicator here, if there is one
        obscuredBy: topEl && paintsOverIndicator(topEl) ? describe(topEl) : null,
        // Whether the element the caller named is the one painted here
        coveredByNamed: Boolean(covering && topEl && (topEl === covering || covering.contains(topEl)))
      };
    });

  // Return the measurements for the assertion to judge
  return {
    rect: { top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left },
    indicatorArea,
    viewport,
    clipping,
    points,
    // Whether the caller named an element which is not on the page
    namedElementMissing: Boolean(coveringSelector) && !covering
  };
}
