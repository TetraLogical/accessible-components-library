/**
 * Pagination. This JS is for demo purposes only.
 *
 * The markup is complete without JavaScript: every page is a real link, and a
 * server would render the right set of links for each page. This script stands
 * in for that server. It reads the current page from the "page" query
 * parameter and rebuilds the component to match, following the same truncation
 * rules as the markup, so that every link in the demo leads to a working page.
 */

// The most items the list can hold, counting the first and last pages and any
// ellipses. Keep this in step with --columns in the CSS
const MAX_ITEMS = 10;

// A window of `size` pages centred on the current page, kept between the first
// and last pages, which are always shown on their own
function clampRange(current, total, size) {
  let start = Math.max(2, current - Math.floor((size - 1) / 2));
  const end = Math.min(total - 1, start + size - 1);
  // If the end was clamped, pull the start back so the window keeps its size
  start = Math.max(2, end - size + 1);
  return { start, end };
}

// One ellipsis for each side of the window which stops short of the first or last page
function countEllipses(range, total) {
  return (range.start > 2 ? 1 : 0) + (range.end < total - 1 ? 1 : 0);
}

// The items to render: page numbers, with null wherever an ellipsis goes
function getItems(current, total) {
  if (total <= MAX_ITEMS) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  // The first and last pages take two of the slots, and each ellipsis takes
  // another, so the window shrinks to make room. Shrinking it can pull an edge
  // away from the first or last page, which then needs an ellipsis of its own,
  // so the window is sized once more when that happens
  const middle = MAX_ITEMS - 2;
  let range = clampRange(current, total, middle);
  let ellipses = countEllipses(range, total);
  range = clampRange(current, total, middle - ellipses);

  if (countEllipses(range, total) !== ellipses) {
    ellipses = countEllipses(range, total);
    range = clampRange(current, total, middle - ellipses);
  }

  const items = [1];
  if (range.start > 2) items.push(null);
  for (let page = range.start; page <= range.end; page++) items.push(page);
  if (range.end < total - 1) items.push(null);
  items.push(total);
  return items;
}

// A link to a page, with an accessible name when the label alone is not enough
function createLink(page, label, name) {
  const link = document.createElement("a");
  link.href = `?page=${page}`;
  link.textContent = label;
  if (name) link.setAttribute("aria-label", name);
  return link;
}

function render(nav, current, total) {
  const children = [];
  // Previous and Next are only needed once pages have been truncated
  const truncated = total > MAX_ITEMS;

  // A non-breaking space keeps each arrow on the same line as its word
  if (truncated && current > 1) {
    children.push(createLink(current - 1, "<\u00A0Previous", "Previous page"));
  }

  const list = document.createElement("ol");
  // Safari and VoiceOver stop treating a list as a list once its bullets are removed
  list.setAttribute("role", "list");

  for (const page of getItems(current, total)) {
    const item = document.createElement("li");
    if (page === null) {
      // Screen readers treat the character as punctuation and may skip it, so
      // it is hidden and the word is given as text instead
      const ellipsis = document.createElement("span");
      ellipsis.setAttribute("aria-hidden", "true");
      ellipsis.textContent = "⋯";

      const text = document.createElement("span");
      text.className = "visually-hidden";
      text.textContent = "Ellipsis";

      item.append(ellipsis, text);
    } else {
      const link = createLink(page, String(page));
      if (page === current) link.setAttribute("aria-current", "page");
      item.append(link);
    }
    list.append(item);
  }
  children.push(list);

  if (truncated && current < total) {
    children.push(createLink(current + 1, "Next\u00A0>", "Next page"));
  }

  nav.replaceChildren(...children);
}

document.querySelectorAll(".tl-pagination").forEach((nav) => {
  // The last page number is the total, and the current link is the page the
  // markup was rendered for
  const total = Number(nav.querySelector("li:last-child a").textContent);
  const initial = Number(
    nav.querySelector("[aria-current='page']").textContent,
  );
  const page = Number(new URLSearchParams(window.location.search).get("page"));

  // Leave the markup alone unless the URL asks for a different, real page
  if (
    Number.isInteger(page) &&
    page >= 1 &&
    page <= total &&
    page !== initial
  ) {
    render(nav, page, total);
  }
});
