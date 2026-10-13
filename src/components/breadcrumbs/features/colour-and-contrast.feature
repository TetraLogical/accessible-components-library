@breadcrumbs @colour-and-contrast
Feature: Breadcrumbs — Colour and contrast
  Helping people who struggle with colour perception or low vision

  User story:
    As a person with low vision or colour vision deficiency
    I want components with sufficient contrast and that don't rely solely on colour
    so that I can perceive and understand all content and interface elements.

  Background:
    Given I load the sample "http://localhost:8081/breadcrumbs/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------

  @1.4.1 @a @automatic
  Rule: 1.4.1 Use of Color, Level A
    Scenario Outline: Links are identifiable without relying on colour alone
      When I view the rendered "<element>"
      Then it should be visually identifiable as a link without relying on colour alone
      Examples:
        | element                       |
        | .tl-breadcrumbs li:nth-child(1) a |
        | .tl-breadcrumbs li:nth-child(2) a |
        | .tl-breadcrumbs li:nth-child(3) a |

    Scenario: The current page is distinguishable from the other links without relying on colour alone
      When I view the rendered ".tl-breadcrumbs li:nth-child(3) a"
      Then it should be distinguishable from ".tl-breadcrumbs li:nth-child(1) a" without relying on colour alone

  @1.4.3 @aa @automatic
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario Outline: Each link has a contrast ratio of 4.5:1 against the background
      When I view the rendered "<element>"
      Then its text should have a contrast ratio of '4.5:1' against its background
      Examples:
        | element                       |
        | .tl-breadcrumbs li:nth-child(1) a |
        | .tl-breadcrumbs li:nth-child(2) a |
        | .tl-breadcrumbs li:nth-child(3) a |
  
  @1.4.3 @aa @automatic @darkmode
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario Outline: Darkmode: Each link has a contrast ratio of 4.5:1 against the background
      When I view the rendered "<element>"
      And I enable "dark" mode
      Then its text should have a contrast ratio of '4.5:1' against its background
      Examples:
        | element                       |
        | .tl-breadcrumbs li:nth-child(1) a |
        | .tl-breadcrumbs li:nth-child(2) a |
        | .tl-breadcrumbs li:nth-child(3) a |

  @1.4.11 @aa @automatic
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario Outline: Visual separators between breadcrumb items have a minimum contrast ratio of 3:1 against the background
      When I view the rendered "<element>"
      And it has the pseudo element "::before"
      Then its pseudo element should have a contrast ratio of '3:1' against its background
      Examples:
        | element                             |
        | .tl-breadcrumbs li:nth-child(2) div |
        | .tl-breadcrumbs li:nth-child(3) div |

  @1.4.11 @aa @automatic @darkmode
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario Outline: Darkmode: Visual separators between breadcrumb items have a minimum contrast ratio of 3:1 against the background
      When I view the rendered "<element>"
      And I enable "dark" mode
      And it has the pseudo element "::before"
      Then its pseudo element should have a contrast ratio of '3:1' against its background
      Examples:
        | element                             |
        | .tl-breadcrumbs li:nth-child(2) div |
        | .tl-breadcrumbs li:nth-child(3) div |

  @1.4.6 @aaa @automatic
  Rule: 1.4.6 Contrast (Enhanced), Level AAA
    Scenario Outline: Each link has a contrast ratio of least 7:1
      When I view the rendered "<element>"
      Then its text should have a contrast ratio of '7:1' against its background
      Examples:
        | element                           |
        | .tl-breadcrumbs li:nth-child(1) a |
        | .tl-breadcrumbs li:nth-child(2) a |
        | .tl-breadcrumbs li:nth-child(3) a |

  @1.4.6 @aaa @automatic @darkmode
  Rule: 1.4.6 Contrast (Enhanced), Level AAA
    Scenario Outline: Darkmode: Each link has a contrast ratio of 7:1
      When I view the rendered "<element>"
      And I enable "dark" mode
      Then its text should have a contrast ratio of '7:1' against its background
      Examples:
        | element                           |
        | .tl-breadcrumbs li:nth-child(1) a |
        | .tl-breadcrumbs li:nth-child(2) a |
        | .tl-breadcrumbs li:nth-child(3) a |
