# Tabs

## Overview

The tabs component allows people to show and hide content by selecting the corresponding tab control.

It's inspired by physical paper folders, where pages of content are grouped in sections and indexed with a protruding labelled tab.

The tabs component is made up of three parts:

- `tablist` - a container to hold the `tab` elements
- `tab` - the controls the user interacts with
- `tabpanel` - the containers which hold the content

![Screenshot of the tabs component demo, which consists of three panels. The tabs are labelled: 'Panel 1', 'Panel 2' and 'Panel 3'. The tab labelled 'Panel 1' is selected, which is visually accented with a purple highlight. The content in the panel shows a the content for 'Panel 1' with a heading and a paragraph of lorem ipsum example content.](../../src/components/tabs/images/tabs-example.png)

[View the tabs component on TetraLogical.com](https://tetralogical.com/resources/accessible-components-library/tabs/)

### What problems it solves

The tabs component helps people find, read, and understand related content by breaking it down into more manageable chunks to minimise [cognitive load](../../src/documentation/glossary.md#cognitive-load). It allows to toggle between sections rather than scrolling large amounts of content, which can help prevent people from becoming overwhelmed or frustrated.

### When to use it

Use the tabs component when:

- The content can be separated into clearly labelled sections
- The first section is more relevant than the others for most users
- Users do not need to view more than one section at once

### When not to use it

Do not use the tabs component for:

- Unrelated sections of content (use separate pages instead)
- Important information; some people may miss it
- Content that needs to accessed in a specific order, such as a step-by-step process
- Blocks of information that users may need to compare; having to memorise the information while switching in between tabs can be frustrating and difficult

### Where to use it

Tabs are often found on product pages, dashboards, settings screens and profile pages, where a few related views share the same space on the page.

### How it works

Above 800 pixels wide, the sections are shown as a row of tabs with one `tabpanel` visible at a time. Only the selected `tab` is in the tab order, the arrow keys move between the tabs, and the `tabpanel` itself is not focusable, so pressing <kbd>Tab</kbd> from the selected `tab` moves to the first focusable element in its content, or out of the component when there is none.

Below that width the sections become an accordion which keeps one section open at a time, matching the one at a time variant of the [accordion](../accordion/README.md) component: each toggle is a button with an `aria-expanded` state and a chevron before its label, and activating the open section's toggle collapses it. The layout switches as the element is resized, keeping the same section selected.

### Without JavaScript

The markup is a list of in-page links, followed by a heading and the content for each section. Without the script, people get a table of contents as a list of links, and can read every section in full. The script replaces that markup with the tabs or the accordion, so nobody sees a control which is broken, and no content is unreachable.

## Accessibility requirements

### Adaptability

Helping people by honouring user preferences and by allowing adaptations to content presentation and time limits.

[View test scenarios: Adaptability](../../src/components/tabs/features/adaptability.feature)

| Standard | Description |
| --- | --- |
| [1.3.4 Orientation](https://www.w3.org/WAI/WCAG22/Understanding/orientation.html), Level AA | Content is not restricted to a single orientation, unless it's essential |
| [1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), Level AA | Text can scale up to 200% without loss of content or functionality |
| [1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), Level AA | Content reflows without horizontal scrolling when the viewport is 320px wide |
| [1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html), Level AA | No loss of content occurs when line, letter or word spacing is increased |
| [1.4.8 Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html), Level AAA | Content adjusts as expected when people apply their preferences for text colour, width, alignment, spacing, and size |
| Recommendation | Content and information remain visible and understandable when using high contrast themes |
| Recommendation | The selected `tab` remains identifiable when using high contrast themes |

---

### Animation and movement

Helping people to limit animation or reduce motion within content.

**No component-specific requirements**

---

### Assistive technologies and semantics

Helping people who use a screen reader or other assistive tech by using appropriate code.

[View test scenarios: Assistive technologies and semantics](../../src/components/tabs/features/assistive-technologies-and-semantics.feature)

| Standard | Description |
| --- | --- |
| [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships), Level A | The `tab` that is visually presented as the active one is identified as selected in the code |
| [1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence), Level A | The order of content in the accessibility tree matches the logical reading order |
| [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html), Level A | Each `tab`'s [accessible name](../../src/documentation/glossary.md#accessible-name) matches or includes the visible label |
| [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html), Level A | Each `tabpanel`'s accessible name matches or includes the visible label on the tab that controls it |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | Each `tab` has an accessible name |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | Each `tabpanel` has an accessible name |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | The `tablist` has a [role](../../src/documentation/glossary.md#role) of `tablist` |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | Each `tab` has a [role](../../src/documentation/glossary.md#role) of `tab` and is contained within the `tablist` |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | Each `tabpanel` has a [role](../../src/documentation/glossary.md#role) of `tabpanel` |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | Each `tab` is programmatically associated with the `tabpanel` it controls, and each `tabpanel` takes its accessible name from the `tab` that controls it |
| Recommendation | The `tablist` exposes its orientation, so arrow key behaviour is announced correctly |
| Recommendation | Markup can be parsed without errors |

---

### Colour and contrast

Helping people who struggle with colour perception or low vision.

[View test scenarios: Colour and contrast](../../src/components/tabs/features/colour-and-contrast.feature)

| Standard | Description |
| --- | --- |
| [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html), Level A | Colour alone is not used to visually identify the active `tab` |
| [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum), Level AA | All text content within the tabs component has a contrast ratio of at least 4.5:1 against the background colours |
| [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast), Level AA | If colour is used to identify the active `tab`, it has a contrast ratio of at least 3:1 against the background and the unselected `tabs` |
| [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast), Level AA | If the tabs component uses a custom focus style, this has a contrast ratio of at least 3:1 against the background colours |
| [1.4.6 Contrast (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html), Level AAA | All text content within the tabs component has a contrast ratio of at least 7:1 against the background colours |

---

### Consistency and predictability

Helping people by keeping functionality and content consistent and predictable.

[View test scenarios: Consistency and predictability](../../src/components/tabs/features/consistency-and-predictability.feature)

| Standard | Description |
| --- | --- |
| [3.2.1 On Focus](https://www.w3.org/WAI/WCAG22/Understanding/on-focus), Level A | When a `tab` receives keyboard focus, it does not initiate a [change of context](../../src/documentation/glossary.md#change-of-context) |
| Recommendation | In the narrow layout, the chevron is to the left of each toggle's label, as it is in the accordion component |

---

### Images and media

Helping people to access (and remove distractions caused by) image, video and audio content.

[View test scenarios: Images and media](../../src/components/tabs/features/images-and-media.feature)

| Standard | Description |
| --- | --- |
| [1.1.1 Non-text Content](https://www.w3.org/WAI/wcag22/Understanding/non-text-content.html), Level A | If a `tab` uses an icon in place of a visible text label, the icon has a text description; if a visible text label is also present, the icon is hidden from screen readers |
| [1.4.5 Images of Text](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html), Level AA | Real text is used instead of images of text (except essential/logos) |
| [1.4.9 Images of Text (No Exception)](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text-no-exception.html), Level AAA | No images of text at all |

---

### Input assistance

Helping people to complete forms, enter data and pass authentication.

**No component-specific requirements**

---

### Keyboard

Helping people who use a keyboard.

[View test scenarios: Keyboard](../../src/components/tabs/features/keyboard.feature)

| Standard | Description |
| --- | --- |
| [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html), Level A | Each `tab` can be reached and activated using the keyboard |
| [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html), Level A | The active `tab` can be focused using the <kbd>Tab</kbd> key |
| [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html), Level A | Each `tab` is either activated when it receives focus (automatic activation) or by pressing the <kbd>Enter</kbd> or <kbd>Space</kbd> keys (manual activation) |
| [2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap), Level A | The tabs component does not [trap focus](../../src/documentation/glossary.md#focus-trap) |
| [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order), Level A | Focus cannot be moved into the content of a non-visible `tabpanel` |
| [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order), Level A | The `tabpanel` itself is not in the tab order; focus moves from the selected `tab` to the first focusable element in its content |
| [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html), Level AA | Each `tab` has a visible focus indicator when it receives keyboard focus |
| [2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), Level AA | Each `tab` is not fully hidden by other content when it receives keyboard focus |
| [2.1.3 Keyboard (No Exception)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard-no-exception.html), Level AAA | The tabs component is accessible by keyboard, with no exceptions |
| [2.4.12 Focus Not Obscured (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html), Level AAA | Each `tab` is fully visible when it receives keyboard focus |
| [2.4.13 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html), Level AAA | If the tabs component uses a custom focus style, this has a solid 2 pixel thick perimeter, or equivalent, and a contrast ratio of at least 3:1 against the background colour |
| Recommendation | The right and left arrow keys are used to navigate between tabs (automatic activation) |
| Recommendation | The <kbd>Home</kbd> and <kbd>End</kbd> keys move to the first and last `tab` |
| Recommendation | A custom focus style is used instead of the browser's default, which can be hard to see against some backgrounds |

---

### Navigation

Helping people find the content they are looking for on a single page or across multiple pages.

[View test scenarios: Navigation](../../src/components/tabs/features/navigation.feature)

| Standard | Description |
| --- | --- |
| [2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html), Level AA | Each `tab` has a clear and accurate text label that informs users what the content of the `tabpanel` will be |

---

### Pointer and touch

Helping people use single pointer or touch interactions.

[View test scenarios: Pointer and touch](../../src/components/tabs/features/pointer-and-touch.feature)

| Standard | Description |
| --- | --- |
| [2.5.2 Pointer Cancellation](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html), Level A | Each `tab` is activated on the [`up` event](../../src/documentation/glossary.md#updown-events), not on the [`down` event](../../src/documentation/glossary.md#updown-events) when using a mouse |
| [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum), Level AA | Each `tab` has a target area size, or a target area size together with spacing, of at least 24 by 24 CSS pixels |
| [2.5.5 Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced), Level AAA | Each `tab` has a target area size of at least 44 by 44 CSS pixels |

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

Last updated on 13 October 2026.
