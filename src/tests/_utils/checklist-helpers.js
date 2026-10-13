// Media type used to attach manual checklists to a step, so the checklist formatter can pick them out
export const CHECKLIST_MEDIA_TYPE = "application/vnd.manual-checklist+json";

/**
 * Records a manual checklist against the current step.
 *
 * The checklist is attached to the Cucumber step, which puts it in the JSON report and lets
 * lib/test/checklist-formatter.js gather every checklist from the run into a Markdown file.
 * Playwright locators can't be serialised, so a non-string element falls back to the selector.
 */
export async function recordChecklist (world, checklist) {
  const { element, ...rest } = checklist;
  const payload = {
    ...rest,
    element: typeof element === "string" ? element : (world.selector ?? null)
  };
  await world.attach(JSON.stringify(payload), CHECKLIST_MEDIA_TYPE);
}

// Records several checklists against the current step
export async function recordChecklists (world, checklists) {
  for (const checklist of checklists) await recordChecklist(world, checklist);
}
