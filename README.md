# Accessible components library

Accessible components with working examples, code, guidance, and the test scenarios we use to check them.

You can read our blog post, [Introducing the Accessible Components Library](https://tetralogical.com/blog/2026/10/09/accessible-components-library/) for more information about this project.

> [!NOTE]
> These are components we use in our own work. You're free to reuse or adapt them, but they're not a production-ready design system. Test them in your own context before you rely on them.

For each component, we've documented:

- What problem it solves
- When to use it
- When not to use it
- Where to use it
- Accessibility requirements

Bug reports and suggestions are welcome, so please [open an issue](https://github.com/TetraLogical/accessible-components-library/issues) if you spot a problem or think something could be better. We're not accepting pull requests at the moment, but we read every issue.

## Accessibility requirements

We document the accessibility requirements for each component, covering all relevant [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/) level A, AA and AAA success criteria, our recommended best practice, and the assistive technology and browser pairings we've tested against.

The requirements for each component are grouped by theme:

- Adaptability
- Animation and movement
- Assistive technologies and semantics
- Colour and contrast
- Consistency and predictability
- Images and media
- Input assistance
- Keyboard
- Navigation
- Pointer and touch

Each requirement is published with test scenarios, so you can test that you're meeting it.

The full set of requirements, and the people and assistive technologies they're written for, is on the accessibility [requirements](./src/documentation/requirements.md) page. Terms used throughout the documentation are explained in the [glossary](./src/documentation/glossary.md).

## Test scenarios

We map each requirement to a test scenario using Gherkin formatting, which lets us write tests in plain language. That means anyone can follow what's being tested, even without understanding the code behind it.

Every scenario is built from a shared set of steps. You can [view the full list of test steps](./dist/_assets/available-steps.md) to see what each one does and write scenarios of your own.

For example:

```gherkin
@1.4.10@aa@manual
Rule:1.4.10 Reflow, Level AA
  Scenario: Content reflows without horizontal scrolling at 320px wide
    Given I load the sample "https://tetralogical.com/resources/accessible-components-library/breadcrumbs/examples/default.html"
    When I view the rendered '.tl-breadcrumbs'
    And I set the viewport to 320px wide
    Then it should reflow without requiring horizontal scrolling
```

## Getting started

You'll need Node.js 24 (there's an `.nvmrc`) and npm. The tests drive a real browser through Playwright, so install Chromium once after the dependencies.

```bash
git clone https://github.com/TetraLogical/accessible-components-library.git
cd accessible-components-library
npm install
npx playwright install chromium
```

### Build and preview the components

```bash
npm start
```

This builds `dist/` and serves it at `http://localhost:8080`, where you can open each component's example pages. While you're working on a component, `npm run dev` rebuilds whenever a file in `src/` or `lib/` changes.

### Run the tests

```bash
npm test
```

This builds the components, serves them on port 8081 and runs every scenario. Scenarios tagged `@automatic` are checked by the test harness. Scenarios tagged `@manual` can't be automated, so they pass and record a checklist of what to verify by hand, with the context the harness gathered. Each run writes a JSON report to `_reports/`, and a Markdown file of the manual checklists alongside it, for example `2026-10-02_16-51-28-checklists.md`. Automated-only runs don't produce the Markdown file.

To run a subset:

| Command | Runs |
| --- | --- |
| `npm run test:auto` | Automated scenarios only |
| `npm run test:manual` | Manual scenarios only, to generate the checklists |
| `COMPONENT=tabs npm run test:component` | Scenarios for one component, named by its folder under `src/components/` |
| `npm run test:levelA` | WCAG level A scenarios |
| `npm run test:levelAA` | WCAG level A and AA scenarios |
| `npm run test:levelAAA` | WCAG level A, AA and AAA scenarios |
| `npm run test:recommendation` | Scenarios tagged `@recommendation`, which go beyond WCAG |
| `SC=1.4.3 npm run test:sc` | Scenarios for one success criterion |
| `npm run test:only` | Scenarios you've tagged `@only` while working on them |

The `COMPONENT`, `SC` and `TAGS` variables narrow any of these commands and can be combined. For example, `COMPONENT=tabs SC=2.1.1 npm run test:auto` runs the automated scenarios for success criterion 2.1.1 on the tabs component, and `TAGS="@keyboard and not @manual" npm test` accepts any [Cucumber tag expression](https://cucumber.io/docs/cucumber/api/#tag-expressions).

### Lint

```bash
npm run lint
```

Runs eslint over the JavaScript and HTML, and stylelint over the CSS. Both run in CI, so it's worth running before you push.

## Repository structure

- `src/components/` is where each component lives: its markup, CSS, JavaScript, README and the Gherkin feature files that hold its test scenarios. If you're browsing on GitHub, this is the place to read. The links in each README resolve from here.
- `src/documentation/` holds the documents shared across components: the glossary, the assistive technology compatibility notes and the consolidated accessibility requirements.
- `src/tests/` contains the step definitions and assertions that the feature files run against.
- `dist/` is committed build output, generated from `src/` by `npm run build`. It contains a standalone example page for each variant, plus a copy of each component's README, CSS and JavaScript, and an `_assets/` folder documenting the test steps and which ones apply to each WCAG success criterion. It exists so that the HTML, CSS and JavaScript is compiled using the boilerplates to create working examples. The links in those READMEs to the shared documentation, feature files and images still point back at `src/`, so they resolve if you open `dist/` on GitHub. The site rewrites the links as it renders them, so it is unaffected. Don't edit anything in `dist/` by hand; change `src/` and rebuild.
- `lib/` has the build script, the templates for documenting and testing a new component, the generator for the testing documentation in `dist/_assets/`, and the deploy script that publishes a release.

## Feedback

Found an accessibility problem, or have a suggestion? [Open an issue on GitHub](https://github.com/TetraLogical/accessible-components-library/issues/new/choose). The team reads and triages every one.

We're not accepting pull requests at the moment. [The contributing guide](CONTRIBUTING.md) explains why, and [the development guide](DEVELOPMENT.md) covers the conventions and how to add a component if you've forked the library.

## Licence

This project is released under the [ISC licence](LICENSE). You're free to use, copy, modify and share the code and documentation, including in commercial projects, as long as the copyright notice stays with it.

Last updated: 13 October 2026.
