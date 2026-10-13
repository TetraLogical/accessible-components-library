# Accordion

## Overview

The accordion component is a stack of related sections, each of which people can expand to reveal its content or collapse to hide it.

Each section is made up of two parts:

- A **trigger**, which people can select to expand or collapse the section
- The **expandable / collapsible area**, with the section content

There are two variants:

- **Default**: The accordion lets each section expand and collapse independently. A "show/hide all sections" button at the top expands or collapses every section at once. If all sections are open, the button reads "hide all sections". If at least one section is closed, the button reads "show all sections".
- **One at a time**: The accordion can only have one section open at any given time. All sections can be closed, but opening a closed section will automatically close any open section. The first section is open when the page loads.

[View the accordion component on TetraLogical.com](https://tetralogical.com/resources/accessible-components-library/accordion/)

### What problems it solves

The accordion component helps reduce clutter on pages with a lot of related content. People can scan the section labels to find what they need, and expand only the sections that are relevant to them.

### When to use it

Use the accordion component to reduce cognitive load when you have a lot of related content that people don't need to see all at once.

Use the default accordion when people may want to read or compare several sections, such as a list of frequently asked questions.

Use the one at a time variant when people are likely to only read one section at a time. This is similar to a [tabs](../tabs/README.md) component.

Prefer the default accordion unless you have a reason not to. In the one at a time variant, collapsing a section that somebody did not ask you to collapse takes content away without warning, and it prevents people from being able to compare two sections side by side.

### When not to use it

Do not use the accordion component for important information as some people may miss it.

Do not use it for a single section of content. Use the [disclosure](../disclosure/README.md) component instead.

Do not use it for content that most people need to read in full. Hiding it makes people do more work to reach it.

### Where to use it

Accordions are often found in FAQs, product details, help pages, and long forms split into steps.

### How it works

Each trigger is a button which describes its expanded or collapsed state.

The buttons and sections receive focus in the order they appear in the markup, and keyboard focus stays on the button after it is activated. 

The default accordion has a "show all sections" button, which expands every section. It carries its own `aria-expanded` state like the rest of the buttons, but its label also changes to "Hide all sections". Arguably, because the label changes, it should not need to also use `aria-expanded`, but due to a VoiceOver bug, if you do not include it, then the label change is not always announced.

To make sure the state and the label never disagree, if some sections are open and others are closed, the button still reads "show all sections" with a collapsed state. Selecting it opens everything, changes the label to "hide all sections", and changes the state on the "show/hide all sections" button to expanded.

The button's collapsed label is set in the markup, and its expanded label is set using the `data-hide-label` attribute. Each is a whole phrase rather than a hard-coded "show/hide" prefix to make it compatible with localisation, because word order can differ between languages. If a page has more than one accordion, make each label specific, such as "show all frequently asked questions", so there is no confusion as to what each control does.

The one at a time variant has no "show all sections" button, because only one section can be open at a time. Activating the open section collapses it, which leaves every section closed.

Collapsed content is hidden using `hidden="until-found"`, so anything focusable inside a collapsed section still revealed when using the browsers in-page search. Older browsers treat the attribute as plain `hidden`, so the content stays hidden until the button is used. See [Hidden versus hidden until found](../../documentation/compatibility.md#hidden-versus-hidden-until-found) in the compatibility notes for more information.

The content inside the collapsed section has an `id`, which can be targeted using a fragment in the URL. If the fragment is present on the URL, the disclosure will be open, so people can see the shared content when they arrive on the page.

When the page is printed, every section is shown expanded and the Show all sections button is left out.

### Without JavaScript

Every section is progressively enhanced in the markup, so its content remains readable if the script does not run for some reason. Each trigger button is hidden on page load, but sits alongside a plain text placeholder with the same label. When the script runs, it collapses the content and swaps out the placeholder text for the buttons. This means all the content is available and no buttons are shown until it's all wired up to work.

## Accessibility requirements

### Adaptability

Helping people by honouring user preferences and by allowing adaptations to content presentation and time limits.

[View test scenarios: Adaptability](./features/adaptability.feature)

| Standard | Description |
| --- | --- |
| [1.3.4 Orientation](https://www.w3.org/WAI/WCAG22/Understanding/orientation.html), Level AA | Content is not restricted to a single orientation, unless it's essential |
| [1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), Level AA | Text can scale up to 200% without loss of content or functionality |
| [1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), Level AA | Content reflows without horizontal scrolling when the viewport is 320px wide |
| [1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html), Level AA | No loss of content occurs when line, letter or word spacing is increased |
| [1.4.8 Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html), Level AAA | Content adjusts as expected when people apply their preferences for text colour, width, alignment, spacing, and size |
| Recommendation | Content and information remain visible and understandable when using high contrast themes |
| Recommendation | Collapsed sections are shown when the page is printed, without the Show all sections button |

---

### Animation and movement

Helping people to limit animation or reduce motion within content.

**No component-specific requirements**

---

### Assistive technologies and semantics

Helping people who use a screen reader or other assistive tech by using appropriate code.

[View test scenarios: Assistive technologies and semantics](./features/assistive-technologies-and-semantics.feature)

| Standard | Description |
| --- | --- |
| [1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence), Level A | The order of content in the accessibility tree matches the logical reading order |
| [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html), Level A | Each trigger, and the Show all sections button, has an [accessible name](../../documentation/glossary.md#accessible-name) that matches or includes the visible label |
| [3.1.2 Language of Parts](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts), Level AA | If any of the text in the accordion component is in a language other than the language of the page, the correct language is declared for it using the `lang` attribute |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | Each trigger, and the Show all sections button, has an accessible name |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | Each trigger, and the Show all sections button, has a [role](../../documentation/glossary.md#role) of `button` |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | The `expanded` or `collapsed` state of each section is conveyed to screen readers |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | The `expanded` or `collapsed` state of the Show all sections button is conveyed to screen readers |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | The Show all sections button's state and accessible name change to describe what it will do, once every section is expanded or collapsed |
| Recommendation | Each trigger is associated with the content it controls, using the `aria-controls` attribute |
| Recommendation | Markup can be parsed without errors |

---

### Colour and contrast

Helping people who struggle with colour perception or low vision.

[View test scenarios: Colour and contrast](./features/colour-and-contrast.feature)

| Standard | Description |
| --- | --- |
| [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum), Level AA | All text in the accordion component has a contrast ratio of at least 4.5:1 against the background colours. This applies in default, hover, focus, expanded, and collapsed states |
| [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), Level AA | Any icons (such as a chevron or arrow) used to indicate the state of a section, or what the Show all sections button will do, have a contrast ratio of at least 3:1 against the background |
| [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), Level AA | If the triggers or the Show all sections button have a custom focus style, this must have a contrast ratio of at least 3:1 against the background |
| [1.4.6 Contrast (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced), Level AAA | All text in the accordion component has a contrast ratio of at least 7:1 against the background colours |

---

### Consistency and predictability

Helping people by keeping functionality and content consistent and predictable.

[View test scenarios: Consistency and predictability](./features/consistency-and-predictability.feature)

| Standard | Description |
| --- | --- |
| [3.2.1 On Focus](https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html), Level A | When a trigger or the Show all sections button receives keyboard focus, it does not initiate a [change of context](../../documentation/glossary.md#change-of-context) |
| [3.2.2 On Input](https://www.w3.org/WAI/WCAG22/Understanding/on-input), Level A | Expanding or collapsing sections, one at a time or all at once, does not result in an unexpected [change of context](../../documentation/glossary.md#change-of-context) |
| Recommendation | The down-pointing chevron/icon is to the left of each trigger's label, and of the Show all sections button's label |
| Recommendation | In the one at a time variant, activating the open section collapses it, leaving no section open |

---

### Images and media

Helping people to access (and remove distractions caused by) image, video and audio content.

[View test scenarios: Images and media](./features/images-and-media.feature)

| Standard | Description |
| --- | --- |
| [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html), Level A | If a trigger or the Show all sections button uses an icon without a visible text label, the icon has a text description; if a visible text label is also present, the icon is hidden from screen readers |

---

### Input assistance

Helping people to complete forms, enter data and pass authentication.

**No component-specific requirements**

---

### Keyboard

Helping people who use a keyboard.

[View test scenarios: Keyboard](./features/keyboard.feature)

| Standard | Description |
| --- | --- |
| [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html), Level A | Each trigger, and the Show all sections button, can be focused using the <kbd>Tab</kbd> key |
| [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html), Level A | Each trigger, and the Show all sections button, can be activated using the keyboard (typically <kbd>Enter</kbd> or <kbd>Space</kbd>) |
| [2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap), Level A | The accordion component does not [trap focus](../../documentation/glossary.md#focus-trap) |
| [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order), Level A | The Show all sections button, the triggers, and the content of expanded sections receive focus in a logical order |
| [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html), Level AA | Each trigger, and the Show all sections button, has a visible focus indicator when it receives keyboard focus |
| [2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), Level AA | Each trigger, and the Show all sections button, is not fully hidden by other content when it receives keyboard focus |
| [2.1.3 Keyboard (No Exception)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard-no-exception.html), Level AAA | The accordion component is accessible by keyboard, with no exceptions |
| [2.4.12 Focus Not Obscured (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html), Level AAA | Each trigger, and the Show all sections button, is fully visible when it receives keyboard focus |
| [2.4.13 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance), Level AAA | If the accordion component uses a custom focus style, this has a solid 2 pixel thick perimeter, or equivalent, and a contrast ratio of at least 3:1 against the background colour |
| Recommendation | A custom focus style is used instead of the browser's default, which can be hard to see against some backgrounds |

---

### Navigation

Helping people find the content they are looking for on a single page or across multiple pages.

[View test scenarios: Navigation](./features/navigation.feature)

| Standard | Description |
| --- | --- |
| [2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels), Level AA | Each trigger's label clearly describes the content that will be revealed |
| [2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels), Level AA | The Show all sections button's label clearly describes what it will do, and which sections it affects if there is more than one accordion on the page |
| Recommendation | Content inside a collapsed section can be found with the browser's find in page feature |
| Recommendation | A link to an anchor inside a collapsed section expands that section |

---

### Pointer and touch

Helping people use single pointer or touch interactions.

[View test scenarios: Pointer and touch](./features/pointer-and-touch.feature)

| Standard | Description |
| --- | --- |
| [2.5.2 Pointer Cancellation](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html), Level A | Each trigger, and the Show all sections button, is activated on the [`up` event](../../documentation/glossary.md#updown-events), not on the [`down` event](../../documentation/glossary.md#updown-events) |
| [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum), Level AA | Each trigger, and the Show all sections button, has a target area size, or a target area size together with spacing, of at least 24 by 24 CSS pixels |
| [2.5.5 Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html), Level AAA | Each trigger, and the Show all sections button, has a target area size of at least 44 by 44 CSS pixels |

---

### Text comprehension (optional)

Helping people to read and understand text content.

**No component-specific requirements**

## Assistive technology compatibility

This component has been tested with the following browsers and assistive technologies.

| Assistive technology | Result | Notes |
| --- | --- | --- |
| Keyboard | No issues | No notes |
| Voice Access/Chrome 154.0.8/Windows 11 | No issues | No notes |
| JAWS 2026.2603.86/Chrome 154.0.8/Windows 11 | No issues | No notes |
| NVDA 2026.1.1/Firefox 157.0/Windows 11 | No issues | No notes |
| VoiceOver/Safari macOS Tahoe 26.6 | No issues | No notes |
| VoiceOver/Safari/iOS 26.0 | No issues | Does not announce expanded or collapsed immediately after state change. This is a known bug with WebKit. See [aria-expanded states are not announced immediately following a change on iOS](../../documentation/compatibility.md#aria-expanded-states-are-not-announced-immediately-following-a-change-on-ios) in the compatibility notes. |
| TalkBack/Chrome 154.0.8/Android 17 | No issues | No notes |
| Windows Contrast themes | No issues | No notes |
| Windows Magnifier and/or Apple Zoom | No issues | No notes |
| Browser zoom | No issues | No notes |
| prefers-reduced-motion | Not applicable | There are no animations to reduce |

Last updated: 13 October 2026.
