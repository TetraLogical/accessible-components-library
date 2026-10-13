/**
 * Create a standardised error message with context
 * @example
 * throw createStepError({
 *   step: 'I view the rendered element',
 *   reason: 'Element not found',
 *   selector: '.missing-button',
 *   pageUrl: page.url(),
 *   scenarioName: 'User can click the submit button',
 *   suggestion: 'Check that the selector is correct and element exists in the DOM'
 * });
 */
export function createStepError (options) {
  const {
    step,
    reason,
    expected,
    actual,
    selector,
    pageUrl,
    scenarioName,
    suggestion,
    details,
    assertions,
    originalError
  } = options;

  // Parts array
  const parts = [];

  // Main error message
  parts.push(`Step failed: "${step}"`);
  parts.push(`Reason: ${reason}`);

  // Context
  if (scenarioName) parts.push(`Scenario: "${scenarioName}"`);
  if (selector) parts.push(`Selector: "${selector}"`);
  if (expected !== undefined) parts.push(`Expected: ${expected}`);
  if (actual !== undefined) parts.push(`Actual: ${actual}`);
  if (pageUrl) parts.push(`Page URL: ${pageUrl}`);
  if (suggestion) parts.push(`Suggestion: ${suggestion}`);
  if (details) parts.push(`Details: ${JSON.stringify(details, null, 2)}`);
  if (details) parts.push(`Assertions: ${JSON.stringify(assertions, null, 2)}`);

  // Original error details
  if (originalError) parts.push(`Original error: ${originalError.message}`);

  // Create new error
  const error = new Error(parts.join("\n"));

  // Preserve original stack trace if available
  if (originalError && originalError.stack) error.stack = originalError.stack;

  return error;
}
