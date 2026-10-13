export function normaliseKeyName (key) {
  // Convert to lowercase for comparison
  const lowerKey = key.toLowerCase();

  // Map common variations to Playwright format
  const keyMap = {
    tab: "Tab",
    enter: "Enter",
    return: "Enter",
    escape: "Escape",
    esc: "Escape",
    space: " ",
    spacebar: " ",
    arrowdown: "ArrowDown",
    arrowup: "ArrowUp",
    arrowleft: "ArrowLeft",
    arrowright: "ArrowRight",
    down: "ArrowDown",
    up: "ArrowUp",
    left: "ArrowLeft",
    right: "ArrowRight",
    shift: "Shift",
    control: "Control",
    ctrl: "Control",
    alt: "Alt",
    meta: "Meta",
    backspace: "Backspace",
    delete: "Delete",
    home: "Home",
    end: "End",
    pageup: "PageUp",
    pagedown: "PageDown"
  };

  return keyMap[lowerKey] || key; // Return mapped key or original if not found
}
