# Roadmap

This is a simple roadmap to show what we're currently working on, what we plan to do next, and what things we're thinking about further down the line.

Our roadmap is a statement of intent, not a delivery plan. The Accessible Components Library remains a community project, and our customer work comes first. So, the roadmap is subject to change, depending on our capacity. The [changelog](CHANGELOG.md) remains the source of truth for what we've actually shipped.

We plan for major and minor release versions in our roadmap. We'll release patch versions when necessary. If you'd like to influence what we work on, [open an issue](https://github.com/TetraLogical/accessible-components-library/issues/new/choose) and let us know your thoughts. The [contributing guide](CONTRIBUTING.md) explains how we decide what to take on, and we close every issue with a reason either way.

## Now

> [!NOTE]
> This is work we've agreed to do, and currently have in progress.

### v1.1.0

The main focus for `v1.1.0` will be on form components.

Add new components:
- Button
- Checkbox
- Date input
- Radio button
- Select

Add new variants:
- Text input: Email
- Text input: Phone
- Text input: Number

Update:
- Templates: Include "reasoning" section
- Accordion: Include "reasoning" documentation
- Disclosure: Include "reasoning" documentation

## Next

> [!NOTE]
> This is work we're planning to do, but have not agreed on timescales yet.

Accordion:
- Convert the default structure to use a `<details>` element, prior to progressive enhancement
- Review the compatibility for the native `<details>` element, to see if the TalkBack bug has been fixed
- Update the progressively enhanced version to reflect the findings from the review

Tabs:
- Adjust the progressive enhancement to keep the headings inside the panels, instead of removing them to use as the button labels
- Align the mobile view to reflect any changes made to the Accordion component

## Later

> [!NOTE]
> This is work we're thinking about doing, but have not committed to yet.

In this section, we talk about atoms, molecules and organisms. This is terminology from the [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/) by Brad Frost.

### Styles / elements

We've been mainly focused on releasing components. In atomic design, they're often what would be referred to as "molecules". They're usually small modules made up of several native HTML elements, working together to create a single user experience.

However, we recognise there are some standalone native HTML elements which can easily be misconfigured, for example, `<img>` or `<h1>` elements. These don't really fit the description of a "component". They're usually what we would call "atoms".

We think there would still be value in documenting how to make some of these basic elements accessible.

### Patterns

Where components are usually made up of several HTML elements, we can also have patterns, which are made up of several components. In atomic design, these would often be referred to as "organisms".

Patterns usually provide a solution to a particular problem. For example, asking for personal details might involve using text inputs, email inputs, checkboxes, radio buttons and buttons.

We think there would be value in documenting how to make some more complex interaction patterns accessible.

## How we keep this up to date

We'll update this roadmap as things change. The date below shows when we last reviewed it. When something ships, it will be moved from this roadmap to the [changelog](CHANGELOG.md).

Last updated on 28 October 2026.
