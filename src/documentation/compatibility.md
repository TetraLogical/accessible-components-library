# Assistive technology compatibility notes

As accessibility specialists, we often encounter various compatibility issues and quirks that can be time-consuming to debug and research. Often what should work doesn't function as expected in certain situations.

This page is a place to document such issues, so that they can be easily shared with the team, increasing knowledge and potentially saving a lot of time.

* [A closed details element does not print its content](#a-closed-details-element-does-not-print-its-content)
* [aria-expanded states are not announced immediately following a change on iOS](#aria-expanded-states-are-not-announced-immediately-following-a-change-on-ios)
* [Browsers scroll to an anchor before an enhancing script has run](#browsers-scroll-to-an-anchor-before-an-enhancing-script-has-run)
* [Firefox keeps transparent backgrounds under Windows contrast themes](#firefox-keeps-transparent-backgrounds-under-windows-contrast-themes)
* [Hidden versus hidden until found](#hidden-versus-hidden-until-found)
* [Legend announced twice in VoiceOver/Safari](#legend-announced-twice-in-voiceoversafari)
* [Lists without bullets are not exposed as lists in Safari/VoiceOver](#lists-without-bullets-are-not-exposed-as-lists-in-safarivoiceover)
* [NVDA does not announce aria-describedby on the fieldset of a checkbox group](#nvda-does-not-announce-aria-describedby-on-the-fieldset-of-a-checkbox-group)
* [Safari does not expose a heading inside a summary element](#safari-does-not-expose-a-heading-inside-a-summary-element)
* [Screen readers announce CSS generated content](#screen-readers-announce-css-generated-content)
* [TalkBack does not expose a heading inside a summary element](#talkback-does-not-expose-a-heading-inside-a-summary-element)
* [Text input inconsistencies](#text-input-inconsistencies)

## A closed details element does not print its content

The content inside a closed `<details>` element is not rendered, so it is left out when printing out the page on paper. The same is true of anything hidden with `hidden`, including `hidden="until-found"`.

Using the `::details-content` pseudo-element, the content of a closed `<details>` can be shown using CSS. The browser hides it using `content-visibility: hidden` on the pseudo-element, and we use a print stylesheet to reveal it:

```css
@media print {
  details:not([open])::details-content {
    content-visibility: visible;
  }
}
```

Further information:

* [The ::details-content pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/::details-content) on MDN

## `aria-expanded` states are not announced immediately following a change on iOS

There is a known bug in WebKit which prevents VoiceOver from announcing "expanded" or "collapsed" when `aria-expanded` is toggled between `true` and `false`. This is a regression which occured on MacOS Sequoia 15.1.1 and iOS 18.1.1, and was raised by Nick Bromley in 2024.

Further information:

[AX: VoiceOver no longer announces change to aria-expanded value](https://bugs.webkit.org/show_bug.cgi?id=284804).

## Browsers scroll to an anchor before an enhancing script has run

When a page is opened using a URL fragment, such as `page.html#section-2`, the browser scrolls to the anchor as soon as it can, which is usually before scripts at the end of the body have run. A script which then starts all disclosures in a closed state, would hide the content the person came to read.

The HTML standard says a browser should open a closed `<details>` element around a fragment target. Chrome does, but it's not consistent across all browsers, so our components check the `location.hash` when they run, and they hold the disclosure open if it contains the fragment in the URL. For example: 

```js
const anchor = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
```

## Firefox keeps transparent backgrounds under Windows contrast themes

When a Windows contrast theme is active, Firefox colours a hovered button with the theme's selected item colours. However, its own stylesheet sets the text to `-moz-buttonhovertext` and the background to `-moz-buttonhoverface`, which on Windows map to the theme's highlight text and highlight colours. Any developer stylesheet colours are replaced as usual, but a transparent background set by the developer is kept.

So, a button styled with `background: none`, such as a disclosure trigger ends up with the highlight text colour on the page background, and the text can become hard to read while hovered. The focus outline follows the text colour, so it fades at the same time.

The fix is to set the hovered text colour explicitly inside a `forced-colors` media query, using a system colour keyword, which every browser will apply. `ButtonText` is chosen against the button and page backgrounds, so it's correct on either:

```css
@media (forced-colors: active) {
  button:hover {
    color: ButtonText;
  }
}
```

Further information:

* [Firefox's user agent stylesheet for form controls](https://github.com/mozilla-firefox/firefox/blob/main/layout/style/res/forms.css), which sets the hover colours
* [Firefox's Windows look and feel](https://github.com/mozilla-firefox/firefox/blob/main/widget/windows/nsLookAndFeel.cpp), which maps them to the contrast theme's highlight colours

## Hidden versus hidden until found

Content using the `hidden` attribute is hidden from assistive technology and visibly hidden on the rendered pahe. However, it also means it's not searchable on the page using a browsers in-page search feature. Instead, we use `hidden="until-found"`, which behaves the same way, but will automatically open the disclosure during in-page search, or when linking to an `id` inside a disclosure, using a fragment. Older browsers which don't support `until-found` will fall back to just using `hidden`.

The browser implements the hidden content using `content-visibility: hidden` rather than `display: none`, so the element's padding, border, margin and background are still rendered. So we use a small amount of CSS to hide it completely:

```css
@media screen {
  .tl-disclosure > div[hidden] {
    padding-block: 0;
    border-inline-start-width: 0;
  }
}
```

Further information:

* [The hidden attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/hidden) on MDN
* [The beforematch event](https://developer.mozilla.org/en-US/docs/Web/API/Element/beforematch_event) on MDN
* [WebKit features for Safari 26.2](https://webkit.org/?p=17640), which added support

## Legend announced twice in VoiceOver/Safari

Legends are read twice when focusing the first control within a fieldset. This is a bug caused by Safari and has a [ticket open: AX: safari reads everything in form elements twice, legend reread on refocus](https://bugs.webkit.org/show_bug.cgi?id=230824) since Sept 2021. 

There does not appear to be a workaround, the same happens when using `aria-label` and `aria-labelledby`. This happens on MacOS and iOs.

## Lists without bullets are not exposed as lists in Safari/VoiceOver

Safari does not expose a list as having a role of list when the visible bullets have been removed with CSS, which means that VoiceOver does not identify such elements as lists to the user.

To ensure such lists are exposed as a list in Safari and VoiceOver, either add `role="list"` to `<ul>` or `<ol>` or use an empty string as the value of the list-style-type property:

```css
ul {
  list-style-type: "";
}
```

This should only be done in instances where it is important to expose list semantics. There may be valid cases where list semantics are not essential on components that have had their default list styling removed.

Note: The fix is not required in recent versions of Safari  when the `ul` or `ol` is inside a `nav` element. This behavior is noted in Scot O'Hara's blog post, ["Fixing" Lists](https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html), updated in January 2023.

CodePen example:

[CodePen: Ensuring lists without bullets are exposed as lists in Safari/VoiceOver](https://codepen.io/TetraLogical/pen/wvVqmOR)

Further information:

[Removing list styles without affecting semantics](https://www.matuzo.at/blog/2023/removing-list-styles-without-affecting-semantics)

## NVDA does not announce `aria-describedby` on the fieldset of a checkbox group

NVDA does not announce `aria-describedby` on the `fieldset` of a checkbox group. The issue is not found on a radio group.

This issue has been open with NVDA since 2021: ([aria-describedby not reported for group in browse mode](https://github.com/nvaccess/nvda/issues/12718)).  

A solution, until the NVDA issue is fixed, is to include the hint text and error text in the `<legend>`.

## Safari does not expose a heading inside a `summary` element

Safari gives the `<summary>` element a role of button, and used to treat its children as presentational in the same way as it does for a `<button>`.

A heading placed inside a `<summary>` therefore lost its heading role in Safari. When using VoiceOver, it did not appear in the headings list and could not be reached with heading navigation. Chrome and Firefox kept the heading semantics throughout.

Checked again on 10 October 2026 with VoiceOver in Safari 26.6 on macOS Tahoe and in Safari on iOS 26, with JavaScript turned off so that the native `<details>` was in use: the heading inside the summary now appears in the headings rotor on both, so Safari has fixed this.

The disclosure component still rebuilds the `<details>` element, when its script runs, as a heading with a `<button>` inside it. Older versions of Safari stay in use for some time, TalkBack still does not expose the heading (see [TalkBack does not expose a heading inside a summary element](#talkback-does-not-expose-a-heading-inside-a-summary-element)), and a `<summary>` is still exposed less consistently than a `<button>` across browsers and screen readers, so rebuilding keeps the heading and the button exposed the same way everywhere.

Further information:

[The details and summary elements, again](https://www.scottohara.me/blog/2022/09/12/details-summary.html) by Scott O'Hara, and the related [HTML standard issue on summary content](https://github.com/whatwg/html/issues/2272).

## Screen readers announce CSS generated content

Text added with the CSS `content` property is transposed to the accessibility tree. Chrome includes it in the accessible name.

Decorative pseudo content can be given empty alternative text, which keeps it out of the accessible tree. For example:

```css
.tl-disclosure > summary::before {
  content: "\25B8";
  content: "\25B8" / "";
}
```

Apply it twice, first without the alt text, for older browsers which do not support it, so they will still have a fall back.

Further information:

[Alternative text for generated content](https://developer.mozilla.org/en-US/docs/Web/CSS/content#alternative_text_string_counter) on MDN.

## TalkBack does not expose a heading inside a `summary` element

TalkBack with Chrome on Android does not expose a heading placed inside a `<summary>` as a heading. Chrome, Firefox and Safari on desktop all expose the same heading correctly.

One of the reasons for us using a custom disclosure component is because a heading with a `<button>` inside it is exposed correctly on all browsers, and TalkBack also recognises it.

Further information:

[The state of details](https://hellogreg.org/posts/the-state-of-details/), a testing report across screen readers which identifies TalkBack as the remaining problem for headings inside a summary.

## Text input inconsistencies

There are many types of text `input`, including `number`, `email`, `password`, `month`, `tel`, `time`, `date`, `datetime-local`, and `url`. While some of these are safe to use, such as `email`, `password`, `tel`, and `url`, others have accessibility and usability issues associated with them so should be avoided.

* `number` - in Chrome, if non-numeric characters are entered they are stripped out with no feedback to screen readers. The only letter that is not stripped out is `e`. A better alternative is to use `type="text"` with `inputmode="numeric"`

* `month`, `time`, `date`, and `date-local` can be virtually unusable with voice control and mobile screen reader. On desktop characters that are entered can be stripped out without any screen reader notification meaning the wrong information could be accidentally submitted. The picker overlay in Chrome cannot be accessed with a keyboard.

* `month` is not supported in Firefox

Last updated on 13 October 2026.
