# [name]

## Overview

> 1. A short description of the component, and of each variant if it has more than one
> 2. A screenshot of the component with a text description (optional)
> 3. A link to the component on TetraLogical.com, using the wording "View the [name] component on TetraLogical.com", with the name in lowercase

### What problems it solves

> Explain why this component exists

### When to use it

> A short description of when to use the component, and which variant to choose if it has more than one

### When not to use it

> Explain when not to use it, and link to any recommended alternatives

### Where to use it

> Explain the location or placement of the component within the page structure, only when relevant (optional)

### How it works

> Explain anything about the component's behaviour that is not obvious from the requirements below, such as the semantics it uses, what happens to keyboard focus, and the reasoning behind any design decisions. If everything is obvious, you can delete this section.

### Without JavaScript

> Explain how the component is progressively enhanced. If the component uses a script, explain what people get when it does not run. If there is no JavaScript, you can delete this section.

## Accessibility requirements

> Each category has a short description, a link to its feature file, and a table of requirements. In each table, delete or duplicate rows as appropriate and make each description specific to the component. List Level A and AA rows first, then Level AAA, then recommendations.
> If a category has no requirements, keep its description and replace the link and table with **No component-specific requirements**
> Each row should have a matching scenario in the feature file, under a Rule with the same name as the Standard column

### Adaptability

Helping people by honouring user preferences and by allowing adaptations to content presentation and time limits.

[View test scenarios: Adaptability](./features/adaptability.feature)

| Standard | Description |
| --- | --- |
| [1.3.3 Sensory Characteristics](https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics.html), Level A | Instructions do not rely solely on sensory characteristics like colour, shape or placement |
| [1.3.4 Orientation](https://www.w3.org/WAI/WCAG22/Understanding/orientation.html), Level AA | Content is not restricted to a single orientation, unless it's essential |
| [1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), Level AA | Text can scale up to 200% without loss of content or functionality |
| [1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), Level AA | Content reflows without horizontal scrolling when the viewport is 320px wide, unless it's essential |
| [1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html), Level AA | No loss of content occurs when line, letter or word spacing is increased |
| [2.2.1 Timing Adjustable](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html), Level A | People can extend or turn off any time limits |
| [1.4.8 Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html), Level AAA | Content adjusts as expected when people apply their preferences for text colour, width, alignment, spacing, and size |
| [2.2.3 No Timing](https://www.w3.org/WAI/WCAG22/Understanding/no-timing.html), Level AAA | No time limits, except for video and live events |
| [2.2.4 Interruptions](https://www.w3.org/WAI/WCAG22/Understanding/interruptions.html), Level AAA | Updates can be delayed or turned off, except in emergencies |
| Recommendation | Content and information remain visible and understandable when using high contrast themes |

---

### Animation and movement

Helping people to limit animation or reduce motion within content.

[View test scenarios: Animation and movement](./features/animation-and-movement.feature)

| Standard | Description |
| --- | --- |
| [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html), Level A | People can pause, stop or hide moving or auto-updating content |
| [2.3.1 Three Flashes or Below Threshold](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html), Level A | No content flashes more than three times per second |
| [2.3.2 Three Flashes](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes.html), Level AAA | No flashing content at all |
| [2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html), Level AAA | People can disable motion triggered by interaction |

---

### Assistive technologies and semantics

Helping people who use a screen reader or other assistive tech by using appropriate code.

[View test scenarios: Assistive technologies and semantics](./features/assistive-technologies-and-semantics.feature)

| Standard | Description |
| --- | --- |
| [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html), Level A | Information, structure, and relationships conveyed through presentation can be programmatically determined |
| [1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html), Level A | The order of content in the accessibility tree matches the logical reading order |
| [1.3.5 Identify Input Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html), Level AA | Input purpose can be programmatically determined |
| [2.4.2 Page Titled](https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html), Level A | Page has a title which describes topic or purpose |
| [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html), Level A | Each control has an [accessible name](../../documentation/glossary.md#accessible-name) that matches or includes the visible label |
| [3.1.1 Language of Page](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html), Level A | Primary language is marked up with the correct `lang` attribute |
| [3.1.2 Language of Parts](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html), Level AA | If any of the text in the component is in a language other than the language of the page, the correct language is declared for it using the `lang` attribute |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | Each control has an accessible name |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | Each control has the correct [role](../../documentation/glossary.md#role) |
| [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A | The state of each control is conveyed to screen readers |
| [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html), Level AA | Status messages are programmatically exposed without focus |
| [1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-purpose.html), Level AAA | Icons, regions, and controls expose their semantic purpose |
| Recommendation | Markup can be parsed without errors |

---

### Colour and contrast

Helping people who struggle with colour perception or low vision.

[View test scenarios: Colour and contrast](./features/colour-and-contrast.feature)

| Standard | Description |
| --- | --- |
| [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html), Level A | Colour is not the only visual means of conveying information |
| [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), Level AA | All text in the component has a contrast ratio of at least 4.5:1 against the background colours (or 3:1 for large text). This applies in every state, such as default, hover and focus |
| [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), Level AA | Any icons, borders and other graphical elements needed to understand the component have a contrast ratio of at least 3:1 against the background |
| [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), Level AA | If the component has a custom focus style, this must have a contrast ratio of at least 3:1 against the background |
| [1.4.6 Contrast (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html), Level AAA | All text in the component has a contrast ratio of at least 7:1 against the background colours (or 4.5:1 for large text) |

---

### Consistency and predictability

Helping people by keeping functionality and content consistent and predictable.

[View test scenarios: Consistency and predictability](./features/consistency-and-predictability.feature)

| Standard | Description |
| --- | --- |
| [3.2.1 On Focus](https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html), Level A | When a control receives keyboard focus, it does not initiate a [change of context](../../documentation/glossary.md#change-of-context) |
| [3.2.2 On Input](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html), Level A | [Changing a setting](../../documentation/glossary.md#change-of-a-setting) in the component does not result in an unexpected [change of context](../../documentation/glossary.md#change-of-context) |
| [3.2.3 Consistent Navigation](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html), Level AA | Navigation that repeats across multiple pages is consistently ordered |
| [3.2.4 Consistent Identification](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html), Level AA | Components with the same functionality in a set of web pages are identified consistently |
| [3.2.6 Consistent Help](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html), Level A | Help mechanisms are consistently located across multiple pages |
| [3.2.5 Change on Request](https://www.w3.org/WAI/WCAG22/Understanding/change-on-request.html), Level AAA | [Context changes](../../documentation/glossary.md#change-of-context) occur only on explicit user request |
| Recommendation | Any icon which indicates the state of a control is in a consistent position relative to its label |

---

### Images and media

Helping people to access (and remove distractions caused by) image, video and audio content.

[View test scenarios: Images and media](./features/images-and-media.feature)

| Standard | Description |
| --- | --- |
| [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html), Level A | If a control uses an icon without a visible text label, the icon has a text description; if a visible text label is also present, the icon is hidden from screen readers |
| [1.2.1 Audio-only and Video-only (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html), Level A | An alternative is available for audio-only and video-only content |
| [1.2.2 Captions (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html), Level A | Synchronised captions are available for prerecorded video with audio |
| [1.2.3 Audio Description or Media Alternative (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded.html), Level A | An alternative is available for synchronised media |
| [1.2.4 Captions (Live)](https://www.w3.org/WAI/WCAG22/Understanding/captions-live.html), Level A | Synchronised captions are available for live media |
| [1.2.5 Audio Description (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html), Level AA | Audio description is available for synchronised media |
| [1.4.2 Audio Control](https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html), Level A | It's possible to pause or stop audio if it automatically plays for longer than 3 seconds |
| [1.4.5 Images of Text](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html), Level AA | Real text is used instead of images of text (except where essential, such as logos) |
| [1.2.6 Sign Language (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/sign-language-prerecorded.html), Level AAA | Sign language interpretation is provided |
| [1.2.7 Extended Audio Description (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/extended-audio-description-prerecorded.html), Level AAA | Extended audio description is available for synchronised media |
| [1.2.8 Media Alternative (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/media-alternative-prerecorded.html), Level AAA | A full text alternative is available for video |
| [1.2.9 Audio-only (Live)](https://www.w3.org/WAI/WCAG22/Understanding/audio-only-live.html), Level AAA | An alternative is available for live audio |
| [1.4.7 Low or No Background Audio](https://www.w3.org/WAI/WCAG22/Understanding/low-or-no-background-audio.html), Level AAA | Videos with speech have no background sounds, or they're at least 20dB quieter |
| [1.4.9 Images of Text (No Exception)](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text-no-exception.html), Level AAA | No images of text at all |

---

### Input assistance

Helping people to complete forms, enter data and pass authentication.

[View test scenarios: Input assistance](./features/input-assistance.feature)

| Standard | Description |
| --- | --- |
| [2.5.4 Motion Actuation](https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation.html), Level A | Input is possible without relying solely on device or user movement |
| [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html), Level A | It's clear which inputs have errors, and errors are identified in text |
| [3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html), Level A | Labels or instructions are provided for all inputs |
| [3.3.3 Error Suggestion](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html), Level AA | Error messages suggest how to correct them, unless this would jeopardise security or purpose |
| [3.3.4 Error Prevention (Legal, Financial, Data)](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html), Level AA | People can go back, review, or confirm before irreversible form submissions |
| [3.3.7 Redundant Entry](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html), Level A | People are not required to re-enter the same information twice |
| [3.3.8 Accessible Authentication (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html), Level AA | Authentication does not rely on cognitive function tests |
| [2.2.5 Re-authenticating](https://www.w3.org/WAI/WCAG22/Understanding/re-authenticating.html), Level AAA | If an authenticated session expires, prior activity and data is preserved after re-authenticating |
| [2.2.6 Timeouts](https://www.w3.org/WAI/WCAG22/Understanding/timeouts.html), Level AAA | People are warned how long their session can be inactive before they may lose information, unless it is more than 20 hours |
| [2.5.6 Concurrent Input Mechanisms](https://www.w3.org/WAI/WCAG22/Understanding/concurrent-input-mechanisms.html), Level AAA | The interface supports multiple input modes, like mouse, touch, and voice |
| [3.3.5 Help](https://www.w3.org/WAI/WCAG22/Understanding/help.html), Level AAA | Context-sensitive help is available |
| [3.3.6 Error Prevention (All)](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-all.html), Level AAA | All submissions are reversible, checked, or confirmable before finalising |
| [3.3.9 Accessible Authentication (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-enhanced.html), Level AAA | Authentication requires no cognitive function test |

---

### Keyboard

Helping people who use a keyboard.

[View test scenarios: Keyboard](./features/keyboard.feature)

| Standard | Description |
| --- | --- |
| [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html), Level A | Each control can be focused using the <kbd>Tab</kbd> key |
| [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html), Level A | Each control can be activated using the keyboard (typically <kbd>Enter</kbd> or <kbd>Space</kbd>) |
| [2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html), Level A | The component does not [trap focus](../../documentation/glossary.md#focus-trap) |
| [2.1.4 Character Key Shortcuts](https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html), Level A | Character-only shortcut keys can be turned off or modified |
| [2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html), Level A | Repeated content can be skipped over |
| [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html), Level A | The controls receive focus in a logical order |
| [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html), Level AA | Each control has a visible focus indicator when it receives keyboard focus |
| [2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), Level AA | Each control is not fully hidden by other content when it receives keyboard focus |
| [2.1.3 Keyboard (No Exception)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard-no-exception.html), Level AAA | The component is accessible by keyboard, with no exceptions |
| [2.4.12 Focus Not Obscured (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html), Level AAA | Each control is fully visible when it receives keyboard focus |
| [2.4.13 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html), Level AAA | If the component uses a custom focus style, this has a solid 2 pixel thick perimeter, or equivalent, and a contrast ratio of at least 3:1 against the background colour |
| Recommendation | A custom focus style is used instead of the browser's default, which can be hard to see against some backgrounds |

---

### Navigation

Helping people find the content they are looking for on a single page or across multiple pages.

[View test scenarios: Navigation](./features/navigation.feature)

| Standard | Description |
| --- | --- |
| [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html), Level A | The purpose of each link can be determined from the link text alone, or its text together with its programmatically determined context |
| [2.4.5 Multiple Ways](https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways.html), Level AA | There are at least two options for reaching the same content, unless that content is a step in a process |
| [2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html), Level AA | Each label clearly describes the topic or purpose of its control |
| [2.4.8 Location](https://www.w3.org/WAI/WCAG22/Understanding/location.html), Level AAA | People are given an indication of their current location within a set of pages |
| [2.4.9 Link Purpose (Link Only)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html), Level AAA | The purpose of each link can be determined from the link text alone, or a mechanism is available to allow this |
| [2.4.10 Section Headings](https://www.w3.org/WAI/WCAG22/Understanding/section-headings.html), Level AAA | Section headings are used to organise content |

---

### Pointer and touch

Helping people use single pointer or touch interactions.

[View test scenarios: Pointer and touch](./features/pointer-and-touch.feature)

| Standard | Description |
| --- | --- |
| [1.4.13 Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html), Level AA | Content revealed on hover or focus is persistent, hoverable and dismissible |
| [2.5.1 Pointer Gestures](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html), Level A | Path-based or multi-point gestures have single-pointer alternatives |
| [2.5.2 Pointer Cancellation](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html), Level A | Each control is activated on the [`up` event](../../documentation/glossary.md#updown-events), not on the [`down` event](../../documentation/glossary.md#updown-events) |
| [2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html), Level AA | Drag actions have single-pointer alternatives |
| [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), Level AA | Each control has a target area size, or a target area size together with spacing, of at least 24 by 24 CSS pixels |
| [2.5.5 Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html), Level AAA | Each control has a target area size of at least 44 by 44 CSS pixels |

---

### Text comprehension (optional)

Helping people to read and understand text content.

[View test scenarios: Text comprehension](./features/text-comprehension.feature)

| Standard | Description |
| --- | --- |
| [3.1.3 Unusual Words](https://www.w3.org/WAI/WCAG22/Understanding/unusual-words.html), Level AAA | Unusual words, idioms or jargon are explained |
| [3.1.4 Abbreviations](https://www.w3.org/WAI/WCAG22/Understanding/abbreviations.html), Level AAA | Abbreviations are expanded or explained |
| [3.1.5 Reading Level](https://www.w3.org/WAI/WCAG22/Understanding/reading-level.html), Level AAA | Text can be understood by people with lower reading ability, or an alternative is provided |
| [3.1.6 Pronunciation](https://www.w3.org/WAI/WCAG22/Understanding/pronunciation.html), Level AAA | Pronunciation is provided where it is necessary for meaning |

## Assistive technology compatibility

> Replace this sentence once the component has been tested, with: "This component has been tested with the following browsers and assistive technologies."

This component has not yet been tested with assistive technologies.

| Assistive technology | Result | Notes |
| --- | --- | --- |
| Keyboard | Not yet tested | No notes |
| Voice Access/Chrome/Windows 11 | Not yet tested | No notes |
| JAWS/Chrome/Windows 11 | Not yet tested | No notes |
| NVDA/Firefox/Windows 11 | Not yet tested | No notes |
| VoiceOver/Safari/macOS | Not yet tested | No notes |
| VoiceOver/Safari/iOS | Not yet tested | No notes |
| TalkBack/Chrome/Android | Not yet tested | No notes |
| Windows Contrast themes | Not yet tested | No notes |
| Windows Magnifier and/or Apple Zoom | Not yet tested | No notes |
| Browser zoom | Not yet tested | No notes |
| prefers-reduced-motion | Not yet tested | No notes |

Last updated on dd MMMM yyyy.
