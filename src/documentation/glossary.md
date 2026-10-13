# Glossary

As accessibility specialists, we often use technical terms that may not be familiar to everyone. This glossary explains the common terms that people might find unclear, and includes links to further information where helpful.

## Accessible description

An [accessible description](https://tetralogical.com/blog/2023/04/05/accessible-names-and-descriptions/) provides additional information, about an element, that complements the accessible name.

## Accessible name

An [accessible name](https://tetralogical.com/blog/2023/04/05/accessible-names-and-descriptions/) is the information used by [Assistive Technologies](https://tetralogical.com/blog/2025/07/28/foundations-types-of-assistive-technology-and-adaptive-strategies/) (AT) to identify an element such as an image, link, button, or form input,  for example “Settings”.

## Affordance

A visual or physical cue in an interface that suggests how an element can be used, for example, a raised button implies it can be clicked, and underlined text suggests a link.

## Assistive technologies

[Assistive technologies](https://tetralogical.com/blog/2025/07/28/foundations-types-of-assistive-technology-and-adaptive-strategies/) are tools that help disabled people do things that might otherwise be difficult or impossible. They can be software, hardware, or both for example, screen readers, [screen magnifiers](https://tetralogical.com/blog/2021/11/10/browsing-with-screen-magnification/), [speech recognition](https://tetralogical.com/blog/2021/11/15/browsing-with-speech-recognition/), browser settings, adaptive keyboards, and input devices like head pointers, switches, and eye tracking.

## Change of context

Major changes can disorient people who can’t view the entire page at once, especially if they happen without warning. Examples include opening a new window, moving focus to another component, navigating to a new page (or anything that appears to be a new page), or significantly re-arranging page content. These are all considered changes of context.

## Change of a setting

Changing the setting of any user interface component is changing some aspect in the control that will persist when the user is no longer interacting with it. So checking a checkbox, entering text into a text field, or changing the selected option in a list control changes its setting, but activating a link or a button does not.

## Child element

An element nested within another element, known as its parent. The parent element contains and often defines the structure or behavior of its child elements. For example:

```html
<ul>
  <li>First item</li>
</ul>
```

In this example, the `<li>` is a child element of the `<ul>` parent element.

## Cognitive load

The amount of mental effort required to process information when completing a task. High cognitive load can make tasks feel harder, interrupt the flow of interaction, and place the burden on people to figure things out rather than supporting a smooth, intuitive experience.

## Digital literacy

Just as literacy refers to the ability to read and write, digital literacy refers to a person's ability to effectively navigate, understand, and engage with digital technologies, media, and devices. It includes skills such as using software and apps, evaluating online information, practicing digital safety, and communicating in digital environments.

## Focus trap

The condition where keyboard focus is intentionally or unintentionally confined within a specific area of a webpage. This can be negative, such as when a person becomes stuck due to a keyboard trap, or positive, as in the case of a modal dialog where focus is deliberately contained until the dialog is closed. A well-implemented focus trap allows users to exit using common keys like <kbd>Esc</kbd>.

## Forms/focus mode 

A screen reader mode activated when interacting with form elements like input fields, buttons, or dropdowns. In this mode, people can type, select, and manipulate form controls directly, with keyboard focus and input behavior similar to standard interaction.

## Landmarks

Much like a physical landmark that stands out and aids orientation, [landmarks](https://tetralogical.com/blog/2022/03/18/landmarks/) in a digital interface refers to a clearly defined section of a webpage that helps people navigate more efficiently. These structural elements, such as headers, navigation menus, and main content areas, allow both users and assistive technologies to understand and move through the page more easily.

## Live region

A part of a webpage that updates automatically and announces those changes to screen readers, so people are informed without needing to refresh or move focus. Live regions are useful for things like alerts, chat messages, or form errors.

## Parent element

An element that contains one or more nested elements, known as child elements. It defines the structure or context in which its child elements exist. For example:

```html
<div>
  <p>This is a child paragraph.</p>
</div>
```

In this example, the `<div>` is the parent element, and the `<p>` is its child.

## Progressive enhancement 

A web design approach that starts with delivering the core content and functionality, then gradually adds more advanced features based on the user's browser capabilities. This ensures everyone, regardless of device, browser, or connection speed, can access and use the essential parts of a website.

## Readability

The ease with which text can be read and understood, influenced by factors such as font choice, size, spacing, contrast, and language clarity. High readability improves user comprehension and reduces cognitive load.

## Role

An element's role describes its purpose, for example “button”.

## Roving tabindex

Roving tabindex is a pattern whereby multiple focusable elements are represented by a single `tabindex=0` element, while the individual elements maintain `tabindex=-1` and are made accessible via arrow keys after the entry element if focused. This allows keyboard users to quickly tab through a page without having to stop on every element in a large collection. Here is an example of a listbox:

```html
<ul role="listbox" tabindex="0">
  <li role="option" tabindex="0" aria-selected="true">Option 1</li>
  <li role="option" tabindex="-1">Option 2</li>
  <li role="option" tabindex="-1">Option 3</li>
</ul>
```

* Only one item (Option 1) has `tabindex="0"`, meaning it is currently focusable with the keyboard
* The other options have `tabindex="-1"`, meaning they can be focused programmatically, for example, with arrow keys, but are not part of the normal tab order
* As people navigates with arrow keys, JavaScript updates the `tabindex` values so that only the newly focused item has `tabindex="0"`, keeping the roving index behavior

## Skip links

A skip link is the first focusable element on a webpage that allows keyboard users to bypass repeated content, such as navigation menus, and jump directly to the main content. It typically uses an `href` pointing to an in-page anchor, for example `#main`, to improve accessibility and streamline navigation.


## `Up`/`Down` events

User input events triggered when a key, mouse button, or touch input is pressed down (`Down` event) or released (`Up` event). These events are essential for detecting and responding to user interactions.

## Viewport
The visible area of a webpage within a person's device or browser window. Since webpages can extend beyond the viewport, only a portion of the content is visible at a time without scrolling. Responsive design ensures content reflows to fit the viewport size across different devices and screen resolutions.

## Virtual/browse mode

The default screen reader mode for navigating web content. It allows people to move through the page using keyboard commands, reading content sequentially or jumping between elements (headings, links, paragraphs) without interacting directly with form controls. In this mode, the screen reader interprets the page structure to provide an efficient reading experience.

Last updated on 13 October 2026.
