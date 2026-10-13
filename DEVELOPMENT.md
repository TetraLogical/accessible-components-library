# Development guide

This guide is for the TetraLogical team, and for anyone who has forked the library and wants to keep to the same structure.

We're not accepting pull requests at the moment. [The contributing guide](CONTRIBUTING.md) explains how to report a problem or suggest a change instead.

## Setting up

The [README](README.md#getting-started) covers installation, building, previewing and running the tests. For example:

```bash
npm install
npx playwright install chromium
npm start
```

## Making a change

1. Create a branch from `main`
2. Make your change in `src/`. Never edit `dist/` by hand, it's generated automatically as a build output
3. Run `npm run build` to regenerate `dist/`
4. Run `npm run lint` and `npm test`, and fix anything that fails
5. Once everything passes, commit your change together with the updated `dist/`, then push. Note: Continuous Integration (CI) will fail if `dist/` is out of sync with `src/`, or if there are failing tests or linting issues

## Adding a component

Every component lives in its own folder under `src/components/`, and the build picks up new folders automatically. Use kebab-case for the folder name, for example `text-input`.

Example folder structure: 

```
src/components/text-input/
  text-input-default.html    # Default variant
  text-input-error.html      # Named variant
  text-input.css             # CSS (optional)
  text-input.js              # JavaScript (optional)
  README.md                  # Component documentation
  images/                    # Screenshots (optional)
  features/                  # Gherkin feature files
```

### Writing the documentation

Every component needs a `README.md` file. Copy [`lib/templates/documentation/_component.md`](lib/templates/documentation/_component.md) to the component directory and rename it to `README.md`. 

Images are optional, but if you need to add any, put them in a folder called `images/`.

The README structure matters. The groupings are deliberate, and the headings match the feature files. So don't change these.

Write documentation in British English. Write for people who don't know code. Avoid jargon where possible, and add any unavoidable technical terms to the [glossary](src/documentation/glossary.md). Follow the instructions in [the documentation README](lib/templates/documentation/README.md) for more guidance.

End the `README.md` with a `Last updated on dd MMMM yyyy.` line. The build reads that date into the component's `_info.json`, which makes it easier to track versions. For example `Last updated on 2 October 2026.`

When you're finished, add the component to the list in [`src/documentation/requirements.md`](src/documentation/requirements.md), so people can find it.

### Writing HTML

Each variant is a `.html` file. It's a partial, not a full web page. During the build process, it's automatically wrapped using the boiler plate templates in `lib/build/boilerplate`, and compiled to `dist/`

When naming your files, the default variant should match the folder name, followed by the word default. For example `text-input-default.html`.

Additional variants should follow the same pattern, but with a descriptive postfix. For example, `text-input-error.html`.

### Writing CSS

CSS files are technically optional, but the components will likely look terrible if you don't include it.

To add CSS, create a `.css` file using the component name. For example, `text-input.css`, and use `tl-` as a prefix to avoid clashes with other third party CSS. For example, `.tl-text-input`. 

Use [Styelint](https://stylelint.io/) for CSS coding conventions, and use logical properties, such as `block-start`, not `top`. These standards are enforced by linting and CI rules. We recommend installing the [Stylelint extension for VSCode](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint).

Passing example:

```css
.tl-text-input-container {
  padding-inline-start: 1rem;
  margin-block-end: 1rem;
}
```

Failing example:

```css
.tl-text-input-container {
  margin-bottom: 1rem;
  padding-left: 1rem;
}
```

### Writing JavaScript

JavaScript files are optional. Not all components will need it.

To add JavaScript, create a `.js` file using the component name. For example, `text-input.js`.

Components should be built using [progressive enhancement](https://www.gov.uk/service-manual/technology/using-progressive-enhancement). This means the HTML should be implemented as a fully working primative version first, and JavaScript is used to modify it to provide the enhanced version when it loads. This means if the JavaScript does not load for some reason, the entire component is not broken. See the [disclosure](./src/components/disclosure/) component as an example

Use [Standard](https://standardjs.com/) formatting for JavaScript, but use double quotes, semicolons, and no trailing commas. These standards are enforced by linting and CI rules. We recommend installing the [ESLint extension for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

Passing example:

```js
function codeExample (e) {
  const semiColons = "must always used";
  
  let doubleQuotes = "must always used on basic strings";
  doubleQuotes = "can still be used if \"nested\" double quotes are escaped";

  const backTicks = `can only be used if the string contains ${executables}`;

  const singleQuotes = 'can only be used if the string contains "nested" double quotes which are not escaped';

  const trailingCommas = [
    "are not allowed on",
    "arrays and objects",
    "after the final entry"
  ];
}
```

Failing example:

```js
function codeExample (e) {
  const semiColons = "will error if missing"
  
  const doubleQuotes = "will error if the string contains "nested" double quotes which are not escaped"

  const backTicks = `will error if used on a basic string`

  const singleQuotes = 'will error if used on a basic string'

  const trailingCommas = [
    "will error if left on",
    "arrays and objects",
    "after the final entry",
  ]
}
```

### Writing test scenarios

Feature files need to be added to a folder called `features`. Copy the feature files from [`lib/templates/features/`](lib/templates/features/) into the component's `features/` folder.

Each scenario must map to a requirement in the components `README.md` documentation. Follow [the features README](lib/templates/features/README.md) for more information on naming, tagging and structure.

Scenarios are built from a shared set of test steps. Be considered when writing scenarios, and re-use existing steps wherever possible.

While you're working on a component, you can isolate and run its scenarios with `COMPONENT=text-input npm run test:component`. The test profiles are generated from the folders under `src/components/`. You can also [run different subsets of tests](README.md#run-the-tests).

The build generates the testing documentation into [`dist/_assets/`](dist/_assets/README.md) from the feature files and the step definitions, so it always matches the tests:

- [`available-steps.md`](dist/_assets/available-steps.md) lists every step a scenario can use, with what it does
- [`success-criteria/`](dist/_assets/success-criteria/) has a page for each WCAG success criterion the scenarios cover, showing the steps to use, an example scenario to copy and the components that already test it
- [`recommendations.md`](dist/_assets/recommendations.md) does the same for the scenarios tagged `@recommendation`

If you need a step that doesn't exist, add it under `src/tests/_shared-steps/` with a comment directly above it, then run `npm run build` to regenerate the documentation. The build warns if a scenario uses a step that has no definition.

A manual step should gather whatever context a reviewer needs, such as the link text or the controls inside the component, then call `recordChecklist` from `src/tests/_utils/checklist-helpers.js`. The checklist formatter in `lib/test/checklist-formatter.js` collects every checklist from the run into a Markdown file in `_reports/`. See `src/tests/_shared-assertions/checklist-assertions/` for examples.

### Assistive technology testing

Before a component is published we test it with the assistive technology and browser pairings listed in [the requirements](src/documentation/requirements.md), and record the results in the README's compatibility table.

Last updated: 13 October 2026.
