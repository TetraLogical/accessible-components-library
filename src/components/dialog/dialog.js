/**
 * Dialog
 *
 * Built on the native <dialog> element. Controls point at their dialog with
 * commandfor and say what they do with command: "show-modal" opens a modal,
 * which makes the rest of the page inert and keeps keyboard focus inside the
 * dialog, "--show" opens a non-modal dialog which leaves the page interactive,
 * and "close" closes either. A modal dialog is also marked aria-modal="true".
 *
 * Browsers which support invoker commands handle "show-modal" and "close"
 * themselves, so a modal works without this script. "--show" is a custom
 * command with no native behaviour, so a non-modal dialog is open in the
 * markup with its controls hidden: without the script it reads as a block of
 * content where it sits in the page. This script closes it, reveals its
 * controls and handles every command itself, so that the behaviour is the
 * same in every browser.
 *
 * A non-modal dialog sits over the page, so it can hide the focus indicator of
 * whatever the user tabs to behind it. While that is the case the dialog is
 * given a data-focus-behind attribute and a --dialog-focus-offset custom
 * property, which the stylesheet uses to move it clear.
 */

// The focus indicator is drawn this far outside an element's box, so a dialog
// has to cover that much beyond the element before the indicator is hidden
const FOCUS_RING_ALLOWANCE = 6;

// Elements which can take keyboard focus, before checking whether they are
// disabled, hidden or taken out of the tab order
const FOCUSABLE = 'a[href], button, input, select, textarea, summary, iframe, audio[controls], video[controls], [contenteditable="true"], [tabindex]';

// The control which opened each dialog, so focus can go back to it on close
const openedBy = new WeakMap();

function isModal (dialog) {
  return dialog.getAttribute("aria-modal") === "true";
}

// The elements inside the dialog which are in the tab order, in DOM order
function tabbableElements (dialog) {
  return [...dialog.querySelectorAll(FOCUSABLE)].filter((element) =>
    element.tabIndex >= 0 && !element.matches(":disabled") && element.getClientRects().length > 0
  );
}

// The browser makes the page behind a modal dialog inert, but still lets Tab
// carry focus out of the dialog to its own toolbar. Wrap it round instead, so
// that focus stays inside the dialog until it is dismissed
function containFocus (dialog, event) {
  if (event.key !== "Tab") return;

  const tabbable = tabbableElements(dialog);
  const active = document.activeElement;

  // With nothing inside to move to, focus stays on the dialog itself
  if (!tabbable.length) {
    event.preventDefault();
    dialog.focus();
    return;
  }

  const first = tabbable[0];
  const last = tabbable[tabbable.length - 1];

  if (event.shiftKey && (active === first || active === dialog)) {
    // Shift+Tab from the first control, or from the dialog itself, wraps to the last
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    // Tab from the last control wraps to the first
    event.preventDefault();
    first.focus();
  }
}

// Whether the dialog completely hides the focus indicator of an element behind it
function completelyCovers (dialog, element) {
  if (!element || dialog.contains(element)) return false;
  // Only keyboard focus draws an indicator
  if (!element.matches(":focus-visible")) return false;

  const target = element.getBoundingClientRect();
  if (!target.width || !target.height) return false;

  // Measure the dialog in its resting position. A dialog which has already
  // moved aside covers nothing, so measuring it where it stands would send it
  // straight back on the next scroll, and aside again on the one after that
  const moved = dialog.hasAttribute("data-focus-behind");
  if (moved) dialog.removeAttribute("data-focus-behind");

  try {
    const cover = dialog.getBoundingClientRect();
    const covered =
      cover.top <= target.top - FOCUS_RING_ALLOWANCE &&
      cover.bottom >= target.bottom + FOCUS_RING_ALLOWANCE &&
      cover.left <= target.left - FOCUS_RING_ALLOWANCE &&
      cover.right >= target.right + FOCUS_RING_ALLOWANCE;
    if (!covered) return false;

    // The boxes overlap, but the dialog also has to be painted on top
    const x = (target.left + target.right) / 2;
    const y = (target.top + target.bottom) / 2;
    return dialog.contains(document.elementFromPoint(x, y));
  } finally {
    if (moved) dialog.setAttribute("data-focus-behind", "");
  }
}

// Move the dialog so that it starts just past the far edge of the element,
// leaving room for the focus indicator. The offset is an inline-start inset,
// so in a right-to-left dialog it is measured from the right of the viewport
function moveAside (dialog, element) {
  const target = element.getBoundingClientRect();
  const rightToLeft = getComputedStyle(dialog).direction === "rtl";
  const offset = rightToLeft
    ? document.documentElement.clientWidth - target.left + FOCUS_RING_ALLOWANCE
    : target.right + FOCUS_RING_ALLOWANCE;

  dialog.style.setProperty("--dialog-focus-offset", `${offset}px`);
  dialog.setAttribute("data-focus-behind", "");
}

function moveBack (dialog) {
  dialog.style.removeProperty("--dialog-focus-offset");
  dialog.removeAttribute("data-focus-behind");
}

// Keep a non-modal dialog clear of the focused element as focus moves, the page
// scrolls or resizes, and the dialog opens and closes
function keepClearOfFocus (dialog) {
  function update () {
    if (dialog.open && completelyCovers(dialog, document.activeElement)) {
      moveAside(dialog, document.activeElement);
    } else {
      moveBack(dialog);
    }
  }

  document.addEventListener("focusin", update);
  document.addEventListener("focusout", update);
  // Scroll events do not bubble, so listen during the capture phase to catch
  // scrolling inside any element on the page
  document.addEventListener("scroll", update, true);
  window.addEventListener("resize", update);
  new MutationObserver(update).observe(dialog, { attributeFilter: ["open"] });
}

document.querySelectorAll("[commandfor]").forEach((control) => {
  const dialog = document.getElementById(control.getAttribute("commandfor"));
  const command = control.getAttribute("command");
  if (!dialog || dialog.tagName !== "DIALOG") return;
  if (!["show-modal", "--show", "close"].includes(command)) return;

  control.addEventListener("click", (event) => {
    // Cancelling the click stops the browser running the command as well
    event.preventDefault();

    if (command === "close") {
      dialog.close();
      return;
    }

    openedBy.set(dialog, control);

    if (command === "show-modal") {
      dialog.showModal();
    } else {
      dialog.show();
    }

    // Focus the dialog itself, so that its name and content are announced
    dialog.focus();
  });
});

document.querySelectorAll("dialog").forEach((dialog) => {
  // Collapse a non-modal dialog which was open in the markup, and mark it so the
  // stylesheet can float it. The modal variant is closed in the markup already
  if (!isModal(dialog)) {
    if (dialog.open) dialog.close();
    dialog.setAttribute("data-enhanced", "");
  }

  // Reveal the controls which were hidden until there was a script to run them
  if (dialog.id) {
    document.querySelectorAll(`[commandfor="${CSS.escape(dialog.id)}"]`).forEach((control) => {
      control.hidden = false;
    });
  }

  // Return focus to the control which opened the dialog, however it was closed
  dialog.addEventListener("close", () => {
    const trigger = openedBy.get(dialog);
    if (trigger) trigger.focus();
  });

  if (isModal(dialog)) {
    dialog.addEventListener("keydown", (event) => containFocus(dialog, event));
    return;
  }

  // The browser closes a modal dialog on Esc, but a non-modal one needs a hand
  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    dialog.close();
  });

  keepClearOfFocus(dialog);
});
