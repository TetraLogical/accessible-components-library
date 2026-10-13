# How to use the documentation template

The [`_component.md`](./_component.md) file is the structure every component README follows. Copy it to the component's folder, rename it to `README.md`, replace `[name]` with the component name, and follow the prompts under each heading.

The prompts say what goes in each section. This page covers the conventions they don't spell out. The [accordion README](../../../src/components/accordion/README.md) is a complete example to compare against.

## Headings

Keep the headings as they are. The requirement categories match the feature files, and the build reads the structure, so renaming or reordering them breaks things.

The optional sections are marked as such in their prompts. Delete any that don't apply, rather than leaving them empty.

## Linking to the glossary

Write for people who don't know code. When a technical term is unavoidable, add it to the [glossary](../../../src/documentation/glossary.md) if it isn't there already, and link to it from the README with a relative path, for example `[accessible name](../../documentation/glossary.md#accessible-name)`.

## Requirements tables

The `Standard` column is either a link to the WCAG success criterion followed by its level, in the form `[1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), Level AA`, or the word `Recommendation`.

The `Description` column says what this component must do to meet the standard. Write it for the component, naming its parts, rather than copying the wording from WCAG. The template's descriptions are generic placeholders to rewrite, not to keep.

## Assistive technology compatibility table

The `Result` column is one of:

- `No issues`
- `Not yet tested`
- `Not applicable`
- a short summary of the problem, when there is one

The `Notes` column holds anything worth knowing about that pairing, such as a known bug with a link to the browser or assistive technology bug report, or why a row is not applicable. Write `No notes` when there is nothing to add, so it is clear the cell was not missed.
