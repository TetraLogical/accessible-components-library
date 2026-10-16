# Accessibility requirements

Accessibility requirements can be described at different levels from high level to specific.

## High level requirements

For a component to be considered accessible at a high level, it must:

* Meet the Web Content Accessibility Guidelines (WCAG) 2.2 to Level AA
* It is a good practice to meet AAA requirements where possible
* Some components will have additional recommendations to make them more accessible, which do not fall under specific WCAG success criteria 

Looking through the lens of [disabled people](https://tetralogical.com/blog/2024/11/18/foundations-types-of-disability/) with access needs, components need to work with the following [assistive technologies](https://tetralogical.com/blog/2025/07/28/foundations-types-of-assistive-technology-and-adaptive-strategies/):

* [Browser zoom to 200%](https://tetralogical.com/blog/2026/03/24/designing-for-people-with-low-vision/) (vision)
* Mobile devices and/or browser zoom to 400% (vision)
* [Screen magnification software](https://tetralogical.com/blog/2021/11/10/browsing-with-screen-magnification/) (vision)
  * Windows Magnifier and/or Apple Zoom
* High contrast themes (formerly Windows High Contrast Mode) (vision, cognition)
* Prefers-reduced-motion (cognition)
* [Speech recognition](https://tetralogical.com/blog/2021/11/15/browsing-with-speech-recognition/) (mobility and cognition)
  * Windows 11 Voice Access
* [Keyboard-only navigation](https://tetralogical.com/blog/2021/10/26/browsing-with-a-keyboard/) and related input devices, such as eye tracking, switch device and head wand (mobility)
* Mobile devices with a fixed screen orientation (mobility)
* Desktop screen readers (vision, cognition)
  * JAWS, Chrome, Windows
  * NVDA, Firefox, Windows
  * VoiceOver, Safari, MacOS
* Mobile screen readers (vision, cognition)
  * VoiceOver, Safari, iOS
  * TalkBack, Chrome, Safari

Components also need to work for people that experience:

* Colour blindness (vision)
* Poor motor control (mobility)
* Memory impairment (cognition)
* Difficulty concentrating (cognition)
* Difficulty reading (cognition, literacy)

And should work for people with:

* Low digital literacy

## Specific accessibility requirements

Each component includes a set of specific accessibility requirements. These criteria either map directly to WCAG or are considered recommendations. 

* [Accordion](../components/accordion/README.md#accessibility-requirements)
* [Breadcrumbs](../components/breadcrumbs/README.md#accessibility-requirements)
* [Dialog](../components/dialog/README.md#accessibility-requirements)
* [Disclosure](../components/disclosure/README.md#accessibility-requirements)
* [Pagination](../components/pagination/README.md#accessibility-requirements)
* [Tabs](../components/tabs/README.md#accessibility-requirements)
* [Text input](../components/text-input/README.md#accessibility-requirements)
* [Textarea](../components/textarea/README.md#accessibility-requirements)

The content below is a consolidated version  of common requirements, organised by category, to support the creation of accessibility requirements for new components.

### Adaptability

Helping people by honouring user preferences and by allowing adaptations to content presentation and time limits.

* Instructions do not rely solely on sensory characteristics like colour, shape or placement ([1.3.3 Sensory Characteristics](https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics.html), Level A)
* Content is not restricted to a single orientation, unless it's essential ([1.3.4 Orientation](https://www.w3.org/WAI/WCAG22/Understanding/orientation.html), Level AA)
* Text can scale up to 200% without loss of content or functionality ([1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), Level AA)
* Content reflows without horizontal scrolling at 320px wide, unless it's essential ([1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), Level AA)
* Line, letter and word spacing can be increased without a loss of content ([1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html), Level AA)
* People can extend or turn off any time limits ([2.2.1 Timing Adjustable](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html), Level A)
* People can see their preferences for text colour, width, alignment, spacing, and size reflected in the visual presentation ([1.4.8 Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html), Level AAA)
* No time limits, except for video and live events ([2.2.3 No Timing](https://www.w3.org/WAI/WCAG22/Understanding/no-timing.html), Level AAA)
* Updates can be delayed or turned off, except in emergencies ([2.2.4 Interruptions](https://www.w3.org/WAI/WCAG22/Understanding/interruptions.html), Level AAA)
* Content and information remains visible and understandable when using high contrast themes (Recommendation)

### Animation and movement

Helping people to limit animation or reduce motion within content.

* People can pause, stop or hide moving or auto-updating content ([2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html), Level A)
* No content flashes more than three times per second ([2.3.1 Three Flashes or Below Threshold](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html), Level A)
* No flashing content at all ([2.3.2 Three Flashes](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes.html), Level AAA)
* People can disable motion triggered by interaction ([2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html), Level AAA)

### Assistive technologies and semantics

Helping people who use a screen reader or other assistive tech by using appropriate code.

* Information, structure, and relationships conveyed through presentation can be programmatically determined ([1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html), Level A)
* When sequence affects meaning, correct reading sequence is programmatically determined ([1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html), Level A)
* Input purpose can be programmatically determined ([1.3.5 Identify Input Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html), Level AA)
* Page has a title which describes topic or purpose ([2.4.2 Page Titled](https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html), Level A)
* The visible label (or icon text alternative) is part of the computed [accessible name](glossary.md#accessible-name) ([2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html), Level A)
* Primary language is marked up with the correct lang attribute ([3.1.1 Language of Page](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html), Level A)
* Changes in language are marked up with the correct lang attribute ([3.1.2 Language of Parts](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html), Level AA)
* Elements have the correct computed [accessible name](glossary.md#accessible-name), role and properties ([4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), Level A)
* Status messages are programmatically exposed without focus ([4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html), Level AA)
* Icons, regions, and controls expose their semantic purpose ([1.3.6 Identify Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-purpose.html), Level AAA)
* Markup can be parsed without errors (Recommendation)

### Colour and contrast

Helping people who struggle with colour perception or low vision.

* Colour is not the only visual means of conveying information ([1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html), Level A)
* Text has a contrast ratio of 4.5:1 or higher (or 3:1 for large text) ([1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), Level AA)
* Graphical elements and UI components have a contrast ratio of 3:1 or higher ([1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), Level AA)
* Text contrast ratio at least 7:1 (or 4.5:1 for large text) ([1.4.6 Contrast (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html), Level AAA)

### Consistency and predictability

Helping people by keeping functionality and content consistent and predictable.

* A control receiving focus does not initiate a [change of context](glossary.md#change-of-context) ([3.2.1 On Focus](https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html), Level A)
* [Changing a setting](glossary.md#change-of-a-setting) in the component does not trigger a [change of context](glossary.md#change-of-context) ([3.2.2 On Input](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html), Level A)
* Consistently order navigation that repeats across multiple pages ([3.2.3 Consistent Navigation](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html), Level AA)
* Components with the same functionality in a set of web pages are identified consistently ([3.2.4 Consistent Identification](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html), Level AA)
* Help mechanisms are consistently located across multiple pages ([3.2.6 Consistent Help](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html), Level A)
* [Context changes](glossary.md#change-of-context) occur only on explicit user request ([3.2.5 Change on Request](https://www.w3.org/WAI/WCAG22/Understanding/change-on-request.html), Level AAA)

### Images and media

Helping people to access (and remove distractions caused by) image, video and audio content.

* Adequate text alternatives are provided, or are marked as decorative ([1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html), Level A)
* An alternative is available for audio-only and video-only content ([1.2.1 Audio-only and Video-only (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html), Level A)
* Synchronised captions are available for prerecorded video with audio ([1.2.2 Captions (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html), Level A)
* An alternative is available for synchronised media ([1.2.3 Audio Description or Media Alternative (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded.html), Level A)
* Synchronised captions are available for live media ([1.2.4 Captions (Live)](https://www.w3.org/WAI/WCAG22/Understanding/captions-live.html), Level A)
* Audio description is available for synchronised media ([1.2.5 Audio Description (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html), Level AA)
* It's possible to pause or stop audio if it automatically plays longer than 3 seconds ([1.4.2 Audio Control](https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html), Level A)
* Real text is used instead of images of text (except essential/logos) ([1.4.5 Images of Text](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html), Level AA)
* Sign language interpretation is provided ([1.2.6 Sign Language (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/sign-language-prerecorded.html), Level AAA)
* Extended audio description is available for synchronised media ([1.2.7 Extended Audio Description (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/extended-audio-description-prerecorded.html), Level AAA)
* Full text alternative is available for video ([1.2.8 Media Alternative (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/media-alternative-prerecorded.html), Level AAA)
* Alternative is available for live audio ([1.2.9 Audio-only (Live)](https://www.w3.org/WAI/WCAG22/Understanding/audio-only-live.html), Level AAA)
* Videos with speech have no background sounds, or they're below 20dB ([1.4.7 Low or No Background Audio](https://www.w3.org/WAI/WCAG22/Understanding/low-or-no-background-audio.html), Level AAA)
* No images of text at all ([1.4.9 Images of Text (No Exception)](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text-no-exception.html), Level AAA)

### Input assistance

Helping people to complete forms, enter data and pass authentication.

* Input is possible without relying solely on device or user movement ([2.5.4 Motion Actuation](https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation.html), Level A)
* It's clear which inputs have errors, and errors are identified in text ([3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html), Level A)
* Labels or instructions are provided for all inputs ([3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html), Level A)
* Error messages suggest how to correct them, unless this would jeopardise security or purpose ([3.3.3 Error Suggestion](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html), Level AA)
* People can go back, review, or confirm before irreversible form submissions ([3.3.4 Error Prevention (Legal, Financial, Data)](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html), Level AA)
* People are not required to re-enter the same information twice ([3.3.7 Redundant Entry](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html), Level A)
* Authentication does not rely on cognitive function tests ([3.3.8 Accessible Authentication (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html), Level AA)
* If an authenticated session expires, prior activity and data is preserved after re-authenticating ([2.2.5 Re-authenticating](https://www.w3.org/WAI/WCAG22/Understanding/re-authenticating.html), Level AAA)
* People are warned how long their session can be inactive before they may lose information, unless more than 20 hours ([2.2.6 Timeouts](https://www.w3.org/WAI/WCAG22/Understanding/timeouts.html), Level AAA)
* Interface supports multiple input modes, like mouse, touch, and voice ([2.5.6 Concurrent Input Mechanisms](https://www.w3.org/WAI/WCAG22/Understanding/concurrent-input-mechanisms.html), Level AAA)
* Context-sensitive help is available ([3.3.5 Help](https://www.w3.org/WAI/WCAG22/Understanding/help.html), Level AAA)
* All submissions reversible or confirm-able before finalising (Shared with Development) ([3.3.6 Error Prevention (All)](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-all.html), Level AAA)
* Authentication requires no cognitive test ([3.3.9 Accessible Authentication (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-enhanced.html), Level AAA)

### Keyboard

Helping people who use a keyboard.

* All functionality works using a keyboard (unless it's an exception) ([2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html), Level A)
* Focus does not become trapped ([2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html), Level A)
* Character-only shortcut keys can be turned off or modified ([2.1.4 Character Key Shortcuts](https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html), Level A)
* Repeated content can be skipped over ([2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html), Level A)
* Focus order is logical ([2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html), Level A)
* Keyboard focus indicator is visible and discernible ([2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html), Level AA)
* Focus indicator is not completely hidden by other elements ([2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), Level AA)
* Keyboard operability without exception ([2.1.3 Keyboard (No Exception)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard-no-exception.html), Level AAA)
* Focus is not even partially hidden by other content ([2.4.12 Focus Not Obscured (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html), Level AAA)
* The focus indicator has a contrast ratio of 3:1 or higher ([2.4.13 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html), Level AAA)

### Navigation

Helping people find the content they are looking for on a single page or across multiple pages.

* The purpose of each link can be determined from the link text alone, or its text together with its programmatically-determined context ([2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html), Level A)
* There are at least two options for reaching the same content, unless that content is a step in a process ([2.4.5 Multiple Ways](https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways.html), Level AA)
* Headings and labels clearly describe topic or purpose ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html), Level AA)
* Provide indication of current location within a set of pages ([2.4.8 Location](https://www.w3.org/WAI/WCAG22/Understanding/location.html), Level AAA)
* The purpose of each link can be determined from the link text alone, or a mechanism is available to allow this ([2.4.9 Link Purpose (Link Only)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html), Level AAA)
* Sections headings are used to organise content ([2.4.10 Section Headings](https://www.w3.org/WAI/WCAG22/Understanding/section-headings.html), Level AAA)

### Pointer and touch

Helping people use single pointer or touch interactions.

* Content revealed on hover or focus is persistent, hoverable and dismissible ([1.4.13 Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html), Level AA)
* Path-based or multi-point gestures have single-pointer alternatives ([2.5.1 Pointer Gestures](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html), Level A)
* Actions triggered on release, not press, to prevent errors ([2.5.2 Pointer Cancellation](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html), Level A)
* Drag actions have single-pointer alternatives ([2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html), Level AA)
* Actionable elements have a clickable area which is least 24×24 px ([2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), Level AA)
* Actionable elements have a clickable area which is least 44x44 px ([2.5.5 Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html), Level AAA)

### Text comprehension (optional)

Helping people to read and understand text content.

* Explain unusual words, idioms or jargon ([3.1.3 Unusual Words](https://www.w3.org/WAI/WCAG22/Understanding/unusual-words.html), Level AAA)
* Abbreviations expanded or explained ([3.1.4 Abbreviations](https://www.w3.org/WAI/WCAG22/Understanding/abbreviations.html), Level AAA)
* Text can be understood by people with lower reading ability or an alternative is provided ([3.1.5 Reading Level](https://www.w3.org/WAI/WCAG22/Understanding/reading-level.html), Level AAA)
* Provide pronunciation where necessary for meaning ([3.1.6 Pronunciation](https://www.w3.org/WAI/WCAG22/Understanding/pronunciation.html), Level AAA)

Last updated on 13 October 2026.
