# Breadcrumbs

## Overview

Breadcrumbs are a type of navigation menu, typically displayed as a row of links, which resemble a file path to the current page.

The last item in our breadcrumbs component represents the current page. However, you might see other implementations on the web where the breadcrumbs only show previous pages and the current page is omitted.

![Screenshot of the breadcrumbs component, which consists of three links in a row: 'Home', 'About' and 'Team'. The first two links are purple and underlined with normal font weight. The last link, 'Team', represents the current page and is bold with a thicker coloured underline. A slanted line separates each link from the next](../../src/components/breadcrumbs/images/breadcrumb-example.png)

[View the breadcrumbs component on TetraLogical.com](https://tetralogical.com/resources/accessible-components-library/breadcrumbs/)

### What problems it solves

The breadcrumbs component helps people orientate themselves by providing a clear location within a set of web pages. This helps them to avoid getting lost in deeply nested content, and to easily retrace their steps from their current position.

### When to use it

Use the breadcrumbs component when you have several layers of nested content and there is a clear parent/child relationship between pages or sections. For example, technical documentation where you can drill down several times into more granular sections.

### When not to use it

Do not use the breadcrumbs component for:

- Primary navigation, step-by-step user journeys or content filters
- Flat or shallow content structures
- Content structures which are inconsistent or unrelated

### Where to use it

Breadcrumbs are typically positioned near the top of a page, just below the `<header>` and above the `<main>` section. This placement ensures that "skip to" links bypass both the breadcrumb navigation and other navigational elements that may be repeated across pages.

### How it works

The breadcrumbs are basically just an ordered list of links with some additional semantics. The list uses a native `<ol>` element, but also includes the attribute `role="list"`, due to [Safari removing list semantics when the list marker is missing](../../src/documentation/compatibility.md#lists-without-bullets-are-not-exposed-as-lists-in-safarivoiceover) in the compatibility notes.

## Accessibility requirements

### Adaptability

Helping people by honouring user preferences and by allowing adaptations to content presentation and time limits.

[View test scenarios: Adaptability](../../src/components/breadcrumbs/features/adaptability.feature)

| Standard | Description |
| --- | --- |
| [1.3.4 Orientation](https://www.w3.org/WAI/WCAG22/Understanding/orientation.html), Level AA | Content is not restricted to a single orientation, unless it's essential |
| [1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), Level AA | Text can scale up to 200% without loss of content or functionality |
| [1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), Level AA | Content reflows without horizontal scrolling when the viewport is 320px wide |
| [1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html), Level AA | Line, letter and word spacing can be increased without a loss of content |
| [1.4.8 Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html), Level AAA | People can see their preferences for text colour, width, alignment, spacing, and size reflected in the visual presentation |
| Recommendation | Content and information remain visible and understandable when using high contrast themes |

---

### Animation and movement

Helping people to limit animation or reduce motion within content.

**No component-specific requirements**

---

### Assistive technologies and semantics

Helping people who use a screen reader or other assistive tech by using appropriate code.

[View test scenarios: Assistive technologies and semantics](../../src/components/breadcrumbs/features/assistive-technologies-and-semantics.feature)

| Standard | Description |
| --- | --- |
| [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), Level A | If text characters are used as visual separators between breadcrumb items to indicate hierarchy, these are not conveyed to screen readers |
| [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), Level A | If the last item in the breadcrumbs represents the current page _and_ is visually different, the `aria-current` attribute is present to programmatically identify it as the current item |
| [1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence), Level A | The order of content in the HTML matches the reading order |
| [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html), Level A | Each link has an [accessible name](../../src/documentation/glossary.md#accessible-name) that matches or includes the visible label |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | Each link has an [accessible name](../../src/documentation/glossary.md#accessible-name) |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | Each link has a [role](../../src/documentation/glossary.md#role) of link |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | If using a navigation landmark, the correct role is applied |
| [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-purpose.html), Level AAA | A navigation [landmark](../../src/documentation/glossary.md#landmarks) is used to identify a navigation region |
| Recommendation | If using a navigation landmark, this has a descriptive [accessible name](../../src/documentation/glossary.md#accessible-name), such as "Breadcrumb" |
| Recommendation | An ordered list is used to communicate a structure for the list of links |
| Recommendation | Each link is implemented as an `<a>` element with an `href` attribute |
| Recommendation | Markup can be parsed without errors |

---

### Colour and contrast

Helping people who struggle with colour perception or low vision.

[View test scenarios: Colour and contrast](../../src/components/breadcrumbs/features/colour-and-contrast.feature)

| Standard | Description |
| --- | --- |
| [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html), Level A | Colour is not the only visual means of conveying information, such as identifying links or the current page |
| [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), Level AA | Each link has a contrast ratio of 4.5:1 against the background |
| [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), Level AA | Visual separators between each Breadcrumb item have a minimum contrast ratio of 3:1 against their background |
| [1.4.6 Contrast (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html), Level AAA | Text contrast ratio at least 7:1 (or 4.5:1 for large text) |

---

### Consistency and predictability

Helping people by keeping functionality and content consistent and predictable.

[View test scenarios: Consistency and predictability](../../src/components/breadcrumbs/features/consistency-and-predictability.feature)

| Standard | Description |
| --- | --- |
| [3.2.1 On Focus](https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html), Level A | A control receiving focus does not initiate a [change of context](../../src/documentation/glossary.md#change-of-context) |
| [3.2.3 Consistent Navigation](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html), Level AA | Breadcrumbs should consistently appear in the same location across pages and maintain a predictable structure that reflects the same hierarchy and order across pages |
| [3.2.4 Consistent Identification](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html), Level AA | The Breadcrumbs component is identified consistently on multiple pages |

---

### Images and media

Helping people to access (and remove distractions caused by) image, video and audio content.

[View test scenarios: Images and media](../../src/components/breadcrumbs/features/images-and-media.feature)

| Standard | Description |
| --- | --- |
| [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content), Level A | If images are used as visual separators between breadcrumb items to indicate hierarchy, they are not conveyed to screen readers |

---

### Input assistance

Helping people to complete forms, enter data and pass authentication.

**No component-specific requirements**

---

### Keyboard

Helping people who use a keyboard.

[View test scenarios: Keyboard](../../src/components/breadcrumbs/features/keyboard.feature)

| Standard | Description |
| --- | --- |
| [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html), Level A | Each link is focusable using the <kbd>Tab</kbd> key and clickable using the <kbd>Enter</kbd> key |
| [2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap), Level A | Each link does not [trap focus](../../src/documentation/glossary.md#focus-trap) |
| [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order), Level A | Each link receives focus in logical order |
| [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html), Level AA | Each link has a visible focus indicator |
| [2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), Level AA | Each link is not fully hidden by other content when it receives keyboard focus |
| [2.1.3 Keyboard (No Exception)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard-no-exception.html), Level AAA | Keyboard operability without exception |
| [2.4.12 Focus Not Obscured (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html), Level AAA | Focus is not even partially hidden by other content |
| [2.4.13 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html), Level AAA | Each link has a custom focus style with a solid 2 pixel thick perimeter, or equivalent, and a contrast ratio of at least 3:1 against the background colour |

---

### Navigation

Helping people find the content they are looking for on a single page or across multiple pages.

[View test scenarios: Navigation](../../src/components/breadcrumbs/features/navigation.feature)

| Standard | Description |
| --- | --- |
| [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html), Level A | The purpose of each link is clear from the link text, or the link text and its surrounding context |
| [2.4.8 Location](https://www.w3.org/WAI/WCAG22/Understanding/location.html), Level AAA | The current location is indicated within a set of pages |
| [2.4.9 Link Purpose (Link Only)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html), Level AAA | The purpose of each link is clear from the link text alone |
| Recommendation | Each link is underlined so it looks like a typical link, apart from the last item if it represents the current page |
| Recommendation | Visual separators are used between breadcrumb items to indicate hierarchy |
| Recommendation | The breadcrumb links are displayed in a row below the primary navigation, left-aligned, and with the current page the last element in the list |

---

### Pointer and touch

Helping people use single pointer or touch interactions.

[View test scenarios: Pointer and touch](../../src/components/breadcrumbs/features/pointer-and-touch.feature)

| Standard | Description |
| --- | --- |
| [2.5.2 Pointer Cancellation](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html), Level A | Each link is activated on the [`up` event](../../src/documentation/glossary.md#updown-events), not on the [`down` event](../../src/documentation/glossary.md#updown-events) |
| [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), Level AA | Each link has a target area size and spacing of at least 24 by 24 CSS pixels |
| [2.5.5 Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html), Level AAA | Each link has a target area size and spacing of at least 44 by 44 CSS pixels |

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
| VoiceOver/Safari/iOS 26.0 | No issues | No notes |
| TalkBack/Chrome 154.0.8/Android 17 | No issues | No notes |
| Windows Contrast themes | No issues | No notes |
| Windows Magnifier and/or Apple Zoom | No issues | No notes |
| Browser zoom | No issues | No notes |
| prefers-reduced-motion | Not applicable | There are no animations to reduce |

Last updated: 13 October 2026.
