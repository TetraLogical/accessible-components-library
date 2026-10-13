import { expect } from "@playwright/test";

// Check that two elements are left-aligned within a given tolerance
export function assertLeftAlignment ({ boxA, boxB, selectorA, selectorB, tolerance }) {
  // Compare the left edges of both bounding boxes
  expect(
    Math.abs(boxA.x - boxB.x),
    `"${selectorA}" is not left-aligned with "${selectorB}"`
  ).toBeLessThanOrEqual(tolerance);
}
