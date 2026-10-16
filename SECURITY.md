# Security policy

The Accessible Components Library is maintained by [TetraLogical](https://tetralogical.com/). If you think you've found a security problem in the library, we want to hear about it, and we appreciate you reporting it responsibly.

## Supported versions

We only fix security problems in the latest release. We don't backport fixes to older versions. The [changelog](CHANGELOG.md) shows the latest release and what changed in it.

If you've copied components into your own project, update them to the latest release to get a fix.

## Reporting a vulnerability

Don't report security problems in a public issue. Anyone can read issues, so the details would be public before we can fix it.

Report it privately using [GitHub's private vulnerability reporting](https://github.com/TetraLogical/accessible-components-library/security/advisories/new). If you can't use GitHub, email [hello@tetralogical.com](mailto:hello@tetralogical.com) with "Security" in the subject line.

Include as much of the following as you can:

- Which component and variant, or which part of the build or test tooling, is affected
- What kind of problem it is, for example cross-site scripting
- The steps to reproduce it, or a proof of concept
- What someone could do by exploiting it, and anything they would need first
- The browser and operating system you used, and their versions, if relevant
- A suggested fix, if you have one

## Scope

This policy covers:

- The HTML, CSS and JavaScript for each component, in `src/components/` and the built copies in `dist/`
- The build and test tooling in this repository

It doesn't cover:

- Accessibility problems and other bugs. [Open an issue](https://github.com/TetraLogical/accessible-components-library/issues/new/choose) for those.
- Vulnerabilities in third-party dependencies, unless the way we use them makes the library vulnerable. Report those to the dependency's maintainers.
- Copies of the components that have been changed, for example in a fork or someone else's design system
- The TetraLogical website. Email [hello@tetralogical.com](mailto:hello@tetralogical.com) about problems with the website.

Last updated on 16 October 2026.
