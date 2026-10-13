/**
 * Tabs
 *
 * The markup is a series of headings, each followed by the content of its
 * section, so it reads as plain sections without JavaScript. This script turns
 * it into a tablist with a tabpanel per section when the element is wider than
 * SWITCH_SIZE, and into an accordion of disclosures, one open at a time, when
 * it is narrower. It switches between the two layouts as the element is
 * resized, keeping the same section selected and moving focus to its control.
 */

// The chevron on each accordion toggle, which the stylesheet turns when the section is open
const CHEVRON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 8 8 8 8-8" /></svg>';

class TLTabs extends HTMLElement {
  // Below this width in pixels, the tabs render as an accordion
  static SWITCH_SIZE = 800;
  // Gives each instance without an id a unique name to build its ids from
  static instanceCount = 0;

  connectedCallback () {
    // Read the markup once only, in case the element is moved in the DOM
    if (!this.sections) {
      this.name = this.id || `tabs-${TLTabs.instanceCount++}`;
      this.currentIndex = 0;
      this.sections = this.findHeadings()
        .filter((heading) => heading.nextElementSibling)
        .map((heading) => ({
          label: heading.textContent.trim(),
          content: heading.nextElementSibling
        }));
      this.resizeObserver = new ResizeObserver(() => this.updateLayout());
    }

    // Leave the markup as it is when there are no sections to work with
    if (!this.sections.length) return;

    this.updateLayout();
    this.resizeObserver.observe(this);
  }

  disconnectedCallback () {
    this.resizeObserver.disconnect();
  }

  // Sections start at the first heading level which appears more than once, or
  // failing that at the first heading level which appears at all
  findHeadings () {
    let fallback = [];
    for (const level of ["h1", "h2", "h3", "h4", "h5", "h6"]) {
      const headings = [...this.querySelectorAll(`:scope > ${level}`)];
      if (headings.length > 1) return headings;
      if (headings.length && !fallback.length) fallback = headings;
    }
    return fallback;
  }

  // Build whichever layout the width calls for, unless it is already showing.
  // When focus was inside the old layout it moves to the same section's control
  // in the new one
  updateLayout () {
    const layout = this.clientWidth > TLTabs.SWITCH_SIZE ? "tabs" : "accordion";
    if (layout === this.layout) return;

    const focusedIndex = this.contains(document.activeElement) ? this.focusedSectionIndex() : -1;

    this.layout = layout;
    if (layout === "tabs") {
      this.renderTabs();
    } else {
      this.renderAccordion();
    }

    if (focusedIndex !== -1) this.controls[focusedIndex].focus();
  }

  // The section whose control or content has focus, or the selected section
  // when focus is somewhere else inside the element
  focusedSectionIndex () {
    const active = document.activeElement;
    for (let i = 0; i < this.sections.length; i++) {
      if (this.controls[i] === active || this.panels[i].contains(active)) return i;
    }
    return this.currentIndex;
  }

  renderTabs () {
    const tablist = document.createElement("div");
    tablist.className = "tl-tabs__tablist";
    tablist.setAttribute("role", "tablist");
    tablist.setAttribute("aria-orientation", "horizontal");

    this.controls = this.sections.map((section, index) => {
      const tab = document.createElement("a");
      tab.id = `${this.name}-tab-${index + 1}`;
      tab.href = `#${this.name}-panel-${index + 1}`;
      tab.textContent = section.label;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", `${this.name}-panel-${index + 1}`);

      tab.addEventListener("click", (event) => {
        // Select the tab rather than following its link to the panel
        event.preventDefault();
        this.selectTab(index);
      });
      tab.addEventListener("keydown", (event) => this.onTabKeydown(event, index));

      tablist.append(tab);
      return tab;
    });

    this.panels = this.sections.map((section, index) => {
      const panel = document.createElement("div");
      panel.id = `${this.name}-panel-${index + 1}`;
      panel.className = "tl-tabs__panel";
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", `${this.name}-tab-${index + 1}`);
      panel.append(section.content);
      return panel;
    });

    this.replaceChildren(tablist, ...this.panels);
    this.selectTab(this.currentIndex);
  }

  // Show one panel and mark its tab as selected. Only the selected tab is in
  // the tab order; the others are reached with the arrow keys
  selectTab (index) {
    this.currentIndex = index;
    this.controls.forEach((tab, i) => {
      if (i === index) {
        tab.setAttribute("aria-selected", "true");
        tab.removeAttribute("tabindex");
      } else {
        tab.removeAttribute("aria-selected");
        tab.setAttribute("tabindex", "-1");
      }
      this.panels[i].hidden = i !== index;
    });
  }

  // Left and Right move between the tabs, wrapping at either end, and Home and
  // End jump to the first and last. The tab which receives focus is selected
  onTabKeydown (event, index) {
    const last = this.sections.length - 1;
    let next;

    switch (event.key) {
      case "ArrowLeft":
        next = index === 0 ? last : index - 1;
        break;
      case "ArrowRight":
        next = index === last ? 0 : index + 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }

    event.preventDefault();
    this.selectTab(next);
    this.controls[next].focus();
  }

  renderAccordion () {
    const disclosures = [];
    this.controls = [];
    this.panels = [];

    this.sections.forEach((section, index) => {
      const disclosure = document.createElement("div");
      disclosure.className = "tl-tabs__disclosure";

      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "tl-tabs__toggle";
      toggle.setAttribute("aria-controls", `${this.name}-panel-${index + 1}`);
      // The chevron sits before the label, as it does in the accordion component
      toggle.insertAdjacentHTML("afterbegin", CHEVRON);
      toggle.append(section.label);
      toggle.addEventListener("click", () => this.toggleSection(index));

      const panel = document.createElement("div");
      panel.id = `${this.name}-panel-${index + 1}`;
      panel.className = "tl-tabs__panel";
      panel.append(section.content);

      disclosure.append(toggle, panel);
      disclosures.push(disclosure);
      this.controls.push(toggle);
      this.panels.push(panel);
    });

    this.replaceChildren(...disclosures);
    this.openSection(this.currentIndex);
  }

  // Open the section whose toggle was pressed and close the rest. Pressing the
  // toggle of the open section closes it, leaving every section closed
  toggleSection (index) {
    const open = this.controls[index].getAttribute("aria-expanded") === "true";
    this.openSection(open ? null : index);
  }

  // Open one section and close the others, or close them all when given null.
  // The tab layout always has a tab selected, so with every section closed it
  // falls back to the first one
  openSection (index) {
    this.currentIndex = index ?? 0;
    this.controls.forEach((toggle, i) => {
      toggle.setAttribute("aria-expanded", i === index ? "true" : "false");
      this.panels[i].hidden = i !== index;
    });
  }
}

if (!customElements.get("tl-tabs")) {
  customElements.define("tl-tabs", TLTabs);
}
