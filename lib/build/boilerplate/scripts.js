/* -------------------------------------------------------------------------- */
/* Boilerplate JS                                                             */
/* -------------------------------------------------------------------------- */

// Record the resolved colour scheme on <html>, so the stylesheet can switch its
// tokens. A page which sets data-user-color-scheme itself is left alone
const darkMode = window.matchMedia("(prefers-color-scheme: dark)");

function applyColourScheme () {
  if (document.documentElement.hasAttribute("data-user-color-scheme")) return;
  document.documentElement.setAttribute("data-color-scheme-resolved", darkMode.matches ? "dark" : "light");
}

darkMode.addEventListener("change", applyColourScheme);
applyColourScheme();
