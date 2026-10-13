/**
 * Accordion
 *
 * The markup works without JavaScript: every section is expanded, each trigger
 * is hidden, and a plain text placeholder stands in for it. This script removes
 * the placeholders, reveals the triggers and collapses the sections.
 *
 * By default each section opens and closes on its own, and a "Show all
 * sections" button at the top expands or collapses them all at once. The
 * .tl-accordion--one-at-a-time variant has no such button, opens its first
 * section on load, and closes the open section when another one is opened.
 *
 * Collapsed content is hidden with hidden="until-found", so the browser can
 * still reach it with find-in-page and with links to anchors inside it. When
 * it does, it reveals the content itself and fires a beforematch event first,
 * which the script uses to open the section properly. Browsers without
 * support treat the attribute as plain hidden.
 */

// The element a link to an anchor on this page points at, when the page was opened at one
const anchor = location.hash
  ? document.getElementById(decodeURIComponent(location.hash.slice(1)))
  : null;

function setExpanded(section, expanded) {
  section.trigger.setAttribute("aria-expanded", expanded ? "true" : "false");

  if (expanded) {
    section.content.removeAttribute("hidden");
  } else {
    section.content.setAttribute("hidden", "until-found");
  }
}

function isExpanded(section) {
  return section.trigger.getAttribute("aria-expanded") === "true";
}

// Wire up the "Show all sections" button, and return a function which keeps it
// in step with the sections. The visible text in the markup is the collapsed
// label, so it is only written once. The expanded label comes from
// data-hide-label. Both are whole phrases rather than a fixed verb and a noun,
// because word order differs between languages
function setUpToggleAll(toggleAll, sections) {
  // The label sits in a span so that the icon is left alone
  const label = toggleAll.querySelector(":scope > span") || toggleAll;
  const showLabel = label.textContent.trim();
  const hideLabel = toggleAll.dataset.hideLabel || "Hide all sections";

  // The button carries an aria-expanded state like the triggers, so screen
  // readers announce the change when it is pressed. A label change on its own
  // is not announced by VoiceOver with Safari. The state and the label only say
  // every section is open once that is true, so the two never disagree
  function update() {
    const expanded = sections.every(isExpanded);
    toggleAll.setAttribute("aria-expanded", expanded ? "true" : "false");
    label.textContent = expanded ? hideLabel : showLabel;
  }

  toggleAll.setAttribute(
    "aria-controls",
    sections
      .map((section) => section.content.id)
      .filter(Boolean)
      .join(" "),
  );

  // Expand every section unless they are all open already, in which case
  // collapse them all
  toggleAll.addEventListener("click", () => {
    const expand = !sections.every(isExpanded);
    sections.forEach((section) => setExpanded(section, expand));
    update();
  });

  update();
  toggleAll.hidden = false;
  return update;
}

document.querySelectorAll(".tl-accordion").forEach((accordion) => {
  const oneAtATime = accordion.classList.contains(
    "tl-accordion--one-at-a-time",
  );
  const sections = [];

  for (const element of accordion.querySelectorAll(
    ":scope > .tl-accordion__section",
  )) {
    const trigger = element.querySelector(":scope > button");
    const placeholder = element.querySelector(":scope > p");
    const content = element.querySelector(":scope > div");

    // There is nothing to toggle without both a trigger and some content
    if (!trigger || !content) continue;

    if (placeholder) placeholder.remove();
    trigger.hidden = false;
    sections.push({ trigger, content });
  }

  if (!sections.length) return;

  // Every section starts collapsed, apart from the one holding the anchor the
  // page was opened at, or failing that the first section of a one-at-a-time
  // accordion, which opens the way the first tab of a tab set does
  const opened = sections.find((section) => section.content.contains(anchor));
  sections.forEach((section, index) =>
    setExpanded(
      section,
      opened ? section === opened : oneAtATime && index === 0,
    ),
  );

  // The one-at-a-time variant has no "Show all sections" button
  const toggleAll = oneAtATime
    ? null
    : accordion.querySelector(":scope > .tl-accordion__toggle-all");
  const updateToggleAll = toggleAll
    ? setUpToggleAll(toggleAll, sections)
    : () => {};

  // Opens or closes a section. Only one section stays open in the one-at-a-time
  // variant, so the others are closed first
  function toggle(section, expanded) {
    if (oneAtATime) {
      sections.forEach((other) => setExpanded(other, false));
    }

    setExpanded(section, expanded);
    updateToggleAll();
  }

  sections.forEach((section) => {
    section.trigger.addEventListener("click", () =>
      toggle(section, !isExpanded(section)),
    );

    // The browser reveals the content itself when find-in-page or a link to an
    // anchor inside it finds a match, and says so first
    section.content.addEventListener("beforematch", () =>
      toggle(section, true),
    );
  });
});
