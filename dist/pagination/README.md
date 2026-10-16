# Pagination

## Overview

Pagination is a type of navigation menu, typically displayed as a row of numbered links, that helps users quickly navigate content that is split into sequential pages.

The term "pagination" comes from the verb to "paginate", which means to break content over numbered pages. It was typically used in publishing and book binding, but has made its way onto the web.

Pagination patterns often include:

- Numbered links that take users directly to a page
- A visual indicator for the current page
- Truncation when there are too many pages to show them all
- "Previous" and "Next" links to move the current page forwards or backwards

![Screen shot of the TetraLogical pagination component demo, which consists of 8 purple links and 2 black ellipsis which act as truncation indicators, in the following arrangement: 1, …, 4, 5, 6, 7, 8, 9, …, 13. Link 6 is highlighted with a purple background and white text to show it's the current page. Below and left aligned is a link labelled: Previous. Below and right aligned is a link labelled: Next.](../../src/components/pagination/images/pagination-example.png)

[View the pagination component on TetraLogical.com](https://tetralogical.com/resources/accessible-components-library/pagination/)

### What problems it solves

The pagination component divides content across multiple pages. It offers a user-friendly way to present large datasets in manageable chunks, reducing cognitive load. It also helps with performance by improving load speeds and reducing rendering lag.

### When to use it

Do use the pagination component if:

- You need to display large datasets such as blog post listings, e-commerce products or search results
- The user has enough time to browse the dataset
- The dataset is not part of a linear flow or step-by-step process

### When not to use it

Do not use the pagination component if:

- A manageable amount of content can be displayed on a single screen
- Finding the information in the dataset is time sensitive
- The dataset is part of a linear workflow or step-by-step process, as it can cause distractions and disrupt the intended flow

### Where to use it

Pagination components should be placed below the content they control. This creates a natural flow where the user browses content from top to bottom, then selects another page to display more content.

### How it works

The pagination is basically just an ordered list of links with some additional semantics. The list uses a native `<ol>` element, but also includes the attribute `role="list"`, due to [Safari removing list semantics when the list marker is missing](../../src/documentation/compatibility.md#lists-without-bullets-are-not-exposed-as-lists-in-safarivoiceover) in the compatibility notes.

When there are more than ten pages, the pagination component will:

- Truncate one or more links
- Use the current page as the centre point for the truncation window
- Never truncate the first or last page
- Show "Previous" and/or "Next" links

### Truncation

The truncation window is a sliding window which can only contain ten items. The first and last pages are always at the start and end, and the middle eight items are calculated forwards and backwards from the current page.

An ellipsis appears in place of the links which fall outside of the truncation window. It can appear in slot two, after the first page, and/or in slot nine, before the last page. This keeps the pages immediately before and after the current page visible.

Screen readers treat the ellipsis character as punctuation, and some, such as NVDA at its default punctuation level and TalkBack, do not announce it at all. So the character is hidden from screen readers, and visually hidden text alongside it reads "Ellipsis", which every screen reader announces.

Examples:

- [1] 2 3 4 5 6 7 8 … 13
- 1 … 4 5 [6] 7 8 9 … 13
- 1 … 6 7 8 9 10 11 12 [13]

#### Previous and Next links

The Previous link:

- Is not rendered when on the first page
- Links to the page immediately before the current page

The Next link:

- Is not rendered when on the last page
- Links to the page immediately after the current page

## Accessibility requirements

### Adaptability

Helping people by honouring user preferences and by allowing adaptations to content presentation and time limits.

[View test scenarios: Adaptability](../../src/components/pagination/features/adaptability.feature)

| Standard | Description |
| --- | --- |
| [1.3.4 Orientation](https://www.w3.org/WAI/WCAG22/Understanding/orientation.html), Level AA | Content is not restricted to a single orientation, unless it's essential |
| [1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), Level AA | Text can scale up to 200% without loss of content or functionality |
| [1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), Level AA | Content reflows without horizontal scrolling when the viewport is 320px wide |
| [1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html), Level AA | No loss of content occurs when line, letter or word spacing is increased |
| [1.4.8 Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html), Level AAA | Content adjusts as expected when people apply their preferences for text colour, width, alignment, spacing, and size |
| Recommendation | Content and information remain visible and understandable when using high contrast themes |

---

### Animation and movement

Helping people to limit animation or reduce motion within content.

**No component-specific requirements**

---

### Assistive technologies and semantics

Helping people who use a screen reader or other assistive tech by using appropriate code.

[View test scenarios: Assistive technologies and semantics](../../src/components/pagination/features/assistive-technologies-and-semantics.feature)

| Standard | Description |
| --- | --- |
| [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), Level A | The links in the pagination component are coded as items of an ordered list |
| [1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence), Level A | The order of content in the accessibility tree matches the logical reading order |
| [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html), Level A | Each link has an [accessible name](../../src/documentation/glossary.md#accessible-name) that matches or includes the visible label |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | Each link has an accessible name |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | Each link has a [role](../../src/documentation/glossary.md#role) of link |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | The link that indicates the current page is semantically identified as such via the `aria-current="page"` attribute |
| [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-purpose.html), Level AAA | The pagination component is placed within a navigation [landmark](../../src/documentation/glossary.md#landmarks) |
| Recommendation | If using a navigation landmark, this has a descriptive accessible name, such as "Pagination" |
| Recommendation | The ordered list has `role="list"`, so it is still exposed as a list in Safari/VoiceOver once its bullets are removed |
| Recommendation | Markup can be parsed without errors |

---

### Colour and contrast

Helping people who struggle with colour perception or low vision.

[View test scenarios: Colour and contrast](../../src/components/pagination/features/colour-and-contrast.feature)

| Standard | Description |
| --- | --- |
| [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html), Level A | The item in the pagination component representing the current page is not identified by colour alone |
| [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum), Level AA | All links in the pagination component have a contrast ratio of at least 4.5:1 against the background colours |
| [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast), Level AA | Any icons used in the pagination component, such as left and right chevrons in the "Previous" and "Next" links, have a contrast ratio of at least 3:1 against the background colours |
| [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast), Level AA | If the links have a custom focus style, this has a contrast ratio of at least 3:1 against the background colours |
| [1.4.6 Contrast (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html), Level AAA | All links in the pagination component have a contrast ratio of at least 7:1 against the background colours |

---

### Consistency and predictability

Helping people by keeping functionality and content consistent and predictable.

[View test scenarios: Consistency and predictability](../../src/components/pagination/features/consistency-and-predictability.feature)

| Standard | Description |
| --- | --- |
| [3.2.1 On Focus](https://www.w3.org/WAI/WCAG22/Understanding/on-focus), Level A | When the links in the pagination component receive focus, they do not initiate a [change of context](../../src/documentation/glossary.md#change-of-context) |
| [3.2.3 Consistent Navigation](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation), Level AA | The order of the links within the pagination component is consistent across all pages where they appear |
| [3.2.4 Consistent Identification](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification), Level AA | The links' text label and accessible name are consistent across all pages where they appear |
| Recommendation | The links in the pagination component are underlined |
| Recommendation | There is a visual cue for the current page, such as a background colour and bold text |

---

### Images and media

Helping people to access (and remove distractions caused by) image, video and audio content.

[View test scenarios: Images and media](../../src/components/pagination/features/images-and-media.feature)

| Standard | Description |
| --- | --- |
| [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content), Level A | If the "Previous" and "Next" links use an icon, such as a left and right chevron, with no text label, the icons have an appropriate text alternative. If a text label is also present, the icons are hidden from screen readers |
| [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content), Level A | Each ellipsis character is hidden from screen readers, and visually hidden text alongside it reads "Ellipsis" |
| [1.4.5 Images of Text](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html), Level AA | Real text is used instead of images for links where possible |
| [1.4.9 Images of Text (No Exception)](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text-no-exception.html), Level AAA | No images of text at all |

---

### Input assistance

Helping people to complete forms, enter data and pass authentication.

**No component-specific requirements**

---

### Keyboard

Helping people who use a keyboard.

[View test scenarios: Keyboard](../../src/components/pagination/features/keyboard.feature)

| Standard | Description |
| --- | --- |
| [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html), Level A | Each link in the pagination component can be focused using the <kbd>Tab</kbd> key, and selected using the <kbd>Enter</kbd> key |
| [2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap), Level A | The links in the pagination component do not [trap focus](../../src/documentation/glossary.md#focus-trap) |
| [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order), Level A | The links receive focus in a logical order |
| [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order), Level A | When a link in the pagination component is selected and new content is loaded, focus moves to the start of the new content |
| [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html), Level AA | The links have a visible focus indicator when they receive keyboard focus |
| [2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), Level AA | The links are not fully hidden by other content when they receive keyboard focus |
| [2.1.3 Keyboard (No Exception)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard-no-exception.html), Level AAA | The links in the pagination component are accessible by keyboard, with no exceptions |
| [2.4.12 Focus Not Obscured (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html), Level AAA | The links are fully visible when they receive keyboard focus |
| [2.4.13 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html), Level AAA | If the links have a custom focus style, this has a solid 2 pixel thick perimeter, or equivalent, and a contrast ratio of at least 3:1 against the background colour |
| Recommendation | A custom focus style is used instead of the browser's default, which can be hard to see against some backgrounds |

---

### Navigation

Helping people find the content they are looking for on a single page or across multiple pages.

[View test scenarios: Navigation](../../src/components/pagination/features/navigation.feature)

| Standard | Description |
| --- | --- |
| [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html), Level A | The purpose of each link in the pagination component can be determined from the link text alone, or its text together with its programmatically-determined context |
| [2.4.9 Link Purpose (Link Only)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html), Level AAA | The purpose of each link in the pagination component can be determined from the link text alone |
| Recommendation | If the pagination component contains "Previous" and "Next" links, the term "page" is included in their accessible name to make their purpose very clear; for example, "Previous page" and "Next page" |
| Recommendation | The Previous link is not rendered on the first page, and the Next link is not rendered on the last page |

---

### Pointer and touch

Helping people use single pointer or touch interactions.

[View test scenarios: Pointer and touch](../../src/components/pagination/features/pointer-and-touch.feature)

| Standard | Description |
| --- | --- |
| [2.5.2 Pointer Cancellation](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html), Level A | Each link in the pagination component is activated on the [`up` event](../../src/documentation/glossary.md#updown-events), not on the [`down` event](../../src/documentation/glossary.md#updown-events) |
| [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum), Level AA | Each link has a target area size, or a target area size together with spacing, of at least 24 by 24 CSS pixels |
| [2.5.5 Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html), Level AAA | Each link has a target area size of at least 44 by 44 CSS pixels |

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
| NVDA 2026.1.1/Firefox 157.0/Windows 11 | No issues | NVDA does not announce the elipses, but announces the visually hidden word as the workaround. |
| VoiceOver/Safari macOS Tahoe 26.6 | No issues | No notes |
| VoiceOver/Safari/iOS 26.0 | No issues | No notes |
| TalkBack/Chrome 154.0.8/Android 17 | No issues | TalkBack does not announce the elipses, but announces the visually hidden word as the workaround.  |
| Windows Contrast themes | No issues | No notes |
| Windows Magnifier and/or Apple Zoom | No issues | No notes |
| Browser zoom | No issues | No notes |
| prefers-reduced-motion | Not applicable | There are no animations to reduce |

Last updated on 13 October 2026.
