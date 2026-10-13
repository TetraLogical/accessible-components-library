import { expect } from "@playwright/test";

// Check that two elements are right-aligned within a given tolerance
export function assertRightAlignment ({ boxA, boxB, selectorA, selectorB, tolerance }) {
  // Compare the right edges of both bounding boxes
  expect(
    Math.abs((boxA.x + boxA.width) - (boxB.x + boxB.width)),
    `"${selectorA}" is not right-aligned with "${selectorB}"`
  ).toBeLessThanOrEqual(tolerance);
}
