/**
 * Disclosure
 *
 * The markup is a native <details> element, so it works in every browser
 * without this script. The script rebuilds it as a <button> which controls a
 * block of content, for two reasons: browsers and screen readers expose a
 * <summary> less consistently than a <button>, and some do not expose a
 * heading placed inside a <summary>: TalkBack still does not, and older
 * versions of Safari did not. Once rebuilt, the heading is kept with the
 * button inside it, so it stays a heading everywhere.
 *
 * Collapsed content is hidden with hidden="until-found", so the browser can
 * still reach it with find-in-page and with links to anchors inside it. When
 * it does, it reveals the content itself and fires a beforematch event first,
 * which the script uses to keep the button's state in step. Browsers without
 * support treat the attribute as plain hidden.
 *
 * For several disclosures which work together, use the Accordion component.
 */

// The chevron before the label, which the stylesheet turns when the content is expanded
const CHEVRON =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 8 8 8 8-8" /></svg>';

const HEADING = "h1, h2, h3, h4, h5, h6";

// Gives each content block without an id a unique one for aria-controls to point at
let instanceCount = 0;

// The element a link to an anchor on this page points at, when the page was opened at one
const anchor = location.hash
  ? document.getElementById(decodeURIComponent(location.hash.slice(1)))
  : null;

function setExpanded(trigger, content, expanded) {
  trigger.setAttribute("aria-expanded", expanded ? "true" : "false");

  if (expanded) {
    content.removeAttribute("hidden");
  } else {
    content.setAttribute("hidden", "until-found");
  }
}

document.querySelectorAll("details.tl-disclosure").forEach((details) => {
  const summary = details.querySelector(":scope > summary");
  if (!summary) return;

  // The label is the summary's content, or its heading's content when it holds one
  const heading =
    summary.children.length === 1 && summary.firstElementChild.matches(HEADING)
      ? summary.firstElementChild
      : null;

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.innerHTML = CHEVRON;
  trigger.append(...(heading ?? summary).childNodes);

  // The content is everything after the summary. When that is a single <div>
  // it is kept as the wrapper, so that its id and anything styled against it
  // survive. Otherwise the content is moved into a new one
  const siblings = [...details.children].filter((child) => child !== summary);
  const hasWrapper = siblings.length === 1 && siblings[0].tagName === "DIV";
  const content = hasWrapper ? siblings[0] : document.createElement("div");

  if (!hasWrapper) {
    content.append(
      ...[...details.childNodes].filter((node) => node !== summary),
    );
  }

  if (!content.id) content.id = `disclosure-${++instanceCount}-content`;
  trigger.setAttribute("aria-controls", content.id);

  const disclosure = document.createElement("div");
  disclosure.className = details.className;
  if (details.id) disclosure.id = details.id;

  if (heading) {
    heading.replaceChildren(trigger);
    disclosure.append(heading, content);
  } else {
    disclosure.append(trigger, content);
  }

  // A <details open> starts expanded, as it would without the script, and so
  // does one holding the anchor the page was opened at
  setExpanded(trigger, content, details.open || content.contains(anchor));

  trigger.addEventListener("click", () => {
    const expanded = trigger.getAttribute("aria-expanded") === "true";
    setExpanded(trigger, content, !expanded);
  });

  // The browser reveals the content itself when find-in-page or a link to an
  // anchor inside it finds a match, and says so first
  content.addEventListener("beforematch", () =>
    setExpanded(trigger, content, true),
  );

  details.replaceWith(disclosure);
});
