# Feature File Templates

Feature files are written using [Gherkin](https://cucumber.io/docs/gherkin/reference) syntax. It's a way to write automated tests in a way that is human-readable.

## Structure

Our feature file templates are made up of several parts:

1. Feature details
2. Rules
3. Scenarios
4. Steps
5. Tags
6. Notes

### Naming convention

```
src/components/[component-name]/features/[category].feature
```

1. Component name: Place new `.feature` files inside the `features` directory of the component, under `src/components`, using the component name in `kebab-case`. For example, `src/components/text-input/features`.

2. Category: Name new `.feature` files using the corresponding categories and place them inside the new component directory. For example, `src/components/text-input/features/keyboard.feature`.

### Global tags

At the top of each feature file, add global tags so that test runs can be scoped. This should be the component name in `camelCase`, prefixed with an `@` character. 

For example:
```gherkin
@textInput @keyboard
```

### Feature details

The `Feature` details orient anybody who is reading the feature file, and help them understand why these tests exist, who they are for, and what problem they solve.

Add the component name and the accessibility category, in the following order, separated using an em dash (`—`).

For example:
```gherkin
@textInput @keyboard
Feature: Text Input — Keyboard
```

The `Feature` details also contain a description taken directly from the documentation and a user story. You don't need to edit these unless they are somehow not relevant to the feature file you're writing.

For example:
```gherkin
@textInput @keyboard
Feature: Text Input — Keyboard
  Helping people who use a keyboard

  User story:
    As a keyboard user I want components that follow a logical tab order and provide visible, predictable focus states so that I can move through the interface efficiently and operate  every feature without using a mouse.
```

### Rules

A `Rule` definition allows us to state whether a test is intended to determine a pass or fail against a particular WCAG success criterion.

Rules should also be tagged using their WCAG success criterion, their level, and whether they are automatic or manual.

For example:
```gherkin
@3.2.4 @a @automatic
Rule: 3.2.4 Consistent Identification, Level A
```

If a test does not determine a pass or fail against a particular WCAG criterion, define it as a recommendation instead with a description. For example:

```gherkin
@recommendation @automatic
Rule: Recommendation — Page title and heading level 1 should match
```

### Scenarios

Scenarios are defined using either `Scenario` or `Scenario Outline`, depending on whether you need to run the test once or multiple times.

Simple scenarios are tests which do not need to be repeated for different variations, elements or states. For these, we just use the keyword `Scenario`. 

For example:
```gherkin
Scenario: The page title describes the topic or purpose
  When I read the page title
  Then it should describe the topic or purpose
```

Complex scenarios are tests which *do* need to be repeated on different variations, elements or states. For these, we define a `Scenario Outline` and an `Examples` table.

The `Examples` table contains values which we can access as variables, and the test will run against each line in the table.

To use the variables from the table, wrap them in angled brackets and quotes, like `"<element>"`.

For example:
```gherkin
Scenario Outline: Fields all have a clear and descriptive label
  When view the rendered "<element>"
  Then it should be easy to understand the expected input from the label text
  Examples:
    | element                     |
    | label[for="address-line-1"] |
    | label[for="address-line-2"] |
    | label[for="city"]           |
    | label[for="postcode"]       |
```

You can also include more than one variable by adding a new column in the table.

```gherkin
Scenario Outline: Elements have the correct attributes and values
  When I inspect "<element>" in the DOM
  And it has validation errors
  Then it should have the attribute "<attribute>" with the value "<value>"
  Examples:
    | element           | attribute        | value               |
    | #first-name-input | class            | error               |
    | #last-name-input  | class            | error               |
    | #first-name-input | aria-invalid     | true                |
    | #last-name-input  | aria-invalid     | true                |
    | #first-name-label | aria-describedby | #first-name-errmsg  |
    | #last-name-label  | aria-describedby | #last-name-errmsg   |
```

### Steps

Steps are the literal step-by-step instructions to describe the test. They are defined using the key words `Given`, `When` and `Then`. For more complex scenarios, you can also use `And` or `But` when needed.

```gherkin
Scenario: Error message is updated on form submission only
  Given the text input component is rendered on the page
  And it is showing an error message
  When I enter a valid input into the field
  But I do not re-submit the form
  Then the error message should remain visible
```

In the testing template, you will often see a single `Given` statement under a `Background` definition. This should be used when multiple scenarios share one or more of the same steps. 

As most of our documentation relies on a component being rendered on the screen, `Background` must be defined inside the `Feature`, after the user story, and before any `Rule` definitions.

```gherkin
@breadcrumbs @navigation
Feature: Breadcrumbs — Navigation
  Helping people find the content they are looking for on a single page or across multiple pages.

  User story:
    As a person who uses a screen reader or has cognitive impairments I want clear link text and well-organised navigation so that I can find content efficiently and understand where I am in the site structure.
  
  Background:
    Given I load the sample "http://localhost:8081/breadcrumbs/examples/default"

  @2.4.4 @a @manual
  Rule: 2.4.4 Link Purpose (In Context), Level A
    Scenario Outline: The purpose of each link is clear from the link text, or the link text and its surrounding context
      When I view the rendered "<element>"
      Then it should be easy to understand the purpose of each link from its text and surrounding context
      Examples:
        | element                       |
        | .tl-breadcrumbs li:nth-child(1) a |
        | .tl-breadcrumbs li:nth-child(2) a |
        | .tl-breadcrumbs li:nth-child(3) a |
```
Reuse the shared steps wherever you can. Every step, with what it does, is listed in [`dist/_assets/available-steps.md`](../../../dist/_assets/available-steps.md), and there is a page for each WCAG success criterion under [`dist/_assets/success-criteria/`](../../../dist/_assets/success-criteria/) showing which steps to use, with an example scenario. Both are regenerated by `npm run build`.

### Tags

Tags are used in the test suite to filter out manual tests, and to allow you to narrow down and run a subset of tests, rather than waiting for the entire suite to run every time.

Tags are defined using an `@` character. For example:

```gherkin
@manual
```

In each feature file, using [camelCase](https://developer.mozilla.org/en-US/docs/Glossary/Camel_case), you should tag:

1. The component name, for example `@textInput` or `@breadcrumbs`
2. The accessibility category, for example `@keyboard` or `@navigation`
3. Whether it's a WCAG criterion or a recommendation, for example:
  - `@1.4.1` or `@recommendation`
  - The WCAG level, if applicable, for example: `@a`, `@aa` or `@aaa`
4. The test type, for example `@automatic` or `@manual`

#### Tagging the component name and accessibility category

Tag the accessibility category and the component name on a single line above the `Feature` definition, to apply them to all tests in the file.

For consistency, always use the same ordering in the tags list and in the feature name:

1. Component name
2. Accessibility category

```gherkin
@textInput @keyboard
Feature: Text Input — Keyboard
```

#### Tagging rules

Tag each rule with the WCAG criterion reference number, the WCAG level, and the test type. 

For consistency, always define tags directly above the `Rule` definition, and in the same order, for example:

1. WCAG SC ref
2. WCAG level
3. Test type

```gherkin
@2.4.2 @a @manual
Rule: 2.4.2 Page Titled, Level A
  Scenario: The page title describes the topic or purpose
```

If the rule does not produce a pass or fail against a WCAG criterion, tag it as a recommendation instead.

```gherkin
@recommendation @automatic
Rule: Recommendation — Page title and heading level 1 should match
  Scenario: The page title includes the exact text from the h1
```

### Notes

Notes in the feature templates are provided as comments. For example:

```bash
# Level AA
# * Headings and labels clearly describe topic or purpose ([2.4.6 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html), Level A)
# * Changing a setting in the component does not trigger a change of context ([3.2.2 On Input](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html), Level A)
# * Components with the same functionality in a set of web pages are identified consistently ([3.2.4 Consistent Identification](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html), Level A)
# * People can go back, review, or confirm before irreversible form submissions ([3.3.4 Error Prevention (Legal, Financial, Data)](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html), Level AA)
# * People are not required to re-enter the same information twice ([3.3.7 Redundant Entry](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html), Level A)
# * Authentication does not rely on cognitive function tests ([3.3.8 Accessible Authentication (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html), Level AA)
```

Notes are provided to help you fill in the template, for example which WCAG criteria you should include. However, all comments should be removed from feature files before committing them to the project.
