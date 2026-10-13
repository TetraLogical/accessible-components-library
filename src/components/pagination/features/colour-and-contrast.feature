@pagination @colour-and-contrast
Feature: Pagination — Colour and contrast
  Helping people who struggle with colour perception or low vision

  User story:
    As a person with low vision or colour vision deficiency
    I want components with sufficient contrast and that don't rely solely on colour
    so that I can perceive and understand all content and interface elements.
  
  Background:
    Given I load the sample "http://localhost:8081/pagination/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------
  
  @1.4.1 @a @automatic
  Rule: 1.4.1 Use of Color, Level A
    Scenario: The current page is distinguishable from the other pages without relying on colour alone
      When I view the rendered ".tl-pagination a[aria-current='page']"
      Then it should be distinguishable from ".tl-pagination li:nth-child(4) a" without relying on colour alone

    Scenario Outline: Colour is not the only visual means of conveying information
      When I view the rendered "<element>"
      Then it should have the CSS property "text-decoration-line" with the value "underline"
        Examples:
          | element                           |
          | .tl-pagination > a:first-child    |
          | .tl-pagination > ol + a           |
          | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(3) a  |
          | .tl-pagination li:nth-child(4) a  |
          | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(6) a  |
          | .tl-pagination li:nth-child(7) a  |
          | .tl-pagination li:nth-child(8) a  |
          | .tl-pagination li:nth-child(10) a |

  @1.4.3 @aa @automatic
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario Outline: The text for each link has a contrast ratio of at least 4.5:1 against the background colour
      When I view the rendered "<element>"
      Then its text should have a contrast ratio of "4.5" against its background
        Examples:
          | element                           |
          | .tl-pagination > a:first-child    |
          | .tl-pagination > ol + a           |
          | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(3) a  |
          | .tl-pagination li:nth-child(4) a  |
          | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(6) a  |
          | .tl-pagination li:nth-child(7) a  |
          | .tl-pagination li:nth-child(8) a  |
          | .tl-pagination li:nth-child(10) a |

  @1.4.3 @aa @automatic @darkmode
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario Outline: Darkmode: The text for each link has a contrast ratio of at least 4.5:1 against the background colour
      When I view the rendered "<element>"
      And I enable "dark" mode
      Then its text should have a contrast ratio of "4.5" against its background
        Examples:
          | element                           |
          | .tl-pagination > a:first-child    |
          | .tl-pagination > ol + a           |
          | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(10) a |

  @1.4.11 @aa @automatic
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario Outline: Icons used such as arrows for "previous" and "next" have a contrast ratio of at least 3:1 against the background colour
      When I view the rendered "<element>"
      Then its text should have a contrast ratio of "3" against its background
        Examples:
          | element                        |
          | .tl-pagination > a:first-child |
          | .tl-pagination > ol + a        |
  
  @1.4.11 @aa @automatic
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario Outline: If the links have a custom focus style that uses colour alone, the focus style has a contrast ratio of at least 3:1 against the background colour
      When I focus "<element>" using a keyboard
      Then it should have a visible focus indicator
      And the focus indicator should have a contrast ratio of 3:1 against its background
        Examples:
          | element                           |
          | .tl-pagination > a:first-child    |
          | .tl-pagination > ol + a           |
          | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(3) a  |
          | .tl-pagination li:nth-child(4) a  |
          | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(6) a  |
          | .tl-pagination li:nth-child(7) a  |
          | .tl-pagination li:nth-child(8) a  |
          | .tl-pagination li:nth-child(10) a |

  @1.4.6 @aaa @automatic
  Rule: 1.4.6 Contrast (Enhanced), Level AAA
    Scenario Outline: The text for each link has a contrast ratio of at least 7:1 against the background colour
      When I view the rendered "<element>"
      Then its text should have a contrast ratio of "7" against its background
        Examples:
          | element                           |
          | .tl-pagination > a:first-child    |
          | .tl-pagination > ol + a           |
          | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(3) a  |
          | .tl-pagination li:nth-child(4) a  |
          | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(6) a  |
          | .tl-pagination li:nth-child(7) a  |
          | .tl-pagination li:nth-child(8) a  |
          | .tl-pagination li:nth-child(10) a |

  @1.4.6 @aaa @automatic @darkmode
  Rule: 1.4.6 Contrast (Enhanced), Level AAA
    Scenario Outline: Darkmode: The text for each link has a contrast ratio of at least 7:1 against the background colour
      When I view the rendered "<element>"
      And I enable "dark" mode
      Then its text should have a contrast ratio of "7" against its background
        Examples:
          | element                           |
          | .tl-pagination > a:first-child    |
          | .tl-pagination > ol + a           |
          | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(10) a |

  # ----------------------------------------------------------------------------
  # Recommendations
  # ----------------------------------------------------------------------------
  
  @recommendation @automatic
  Rule: Recommendation
    Scenario: The visual design remains usable in Windows High Contrast/Forced Colors mode 
      When I enable "forced colors" mode
      And I view the rendered ".tl-pagination"
      Then it should not lose any content or functionality
