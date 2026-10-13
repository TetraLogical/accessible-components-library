@tabs @colour-and-contrast
Feature: Tabs — Colour and contrast
  Helping people who struggle with colour perception or low vision

  User story:
    As a person with low vision or colour vision deficiency
    I want components with sufficient contrast and that don't rely solely on colour
    so that I can perceive and understand all content and interface elements.

  Background:
    Given I load the sample "http://localhost:8081/tabs/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------

  @1.4.1 @a @automatic
  Rule: 1.4.1 Use of Color, Level A
    Scenario Outline: Colour alone is not used to visually identify the active tab
      When I click on "<element>"
      And I view the rendered "<element>"
      Then it should be distinguishable from "<other tab>" without relying on colour alone
      Examples:
        | element       | other tab     |
        | #tabs-0-tab-1 | #tabs-0-tab-2 |
        | #tabs-0-tab-2 | #tabs-0-tab-1 |
        | #tabs-0-tab-3 | #tabs-0-tab-1 |

  @1.4.3 @aa @automatic
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario Outline: All text content within the tabs component has a contrast ratio of 4.5:1 against the background
      When I view the rendered "<element>"
      Then its text should have a contrast ratio of '4.5:1' against its background
      Examples:
        | element         |
        | #tabs-0-tab-1   |
        | #tabs-0-tab-2   |
        | #tabs-0-tab-3   |
        | #tabs-0-panel-1 |

  @1.4.3 @aa @automatic @darkmode
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario Outline: Darkmode: All text content within the tabs component has a contrast ratio of 4.5:1 against the background
      When I view the rendered "<element>"
      And I enable "dark" mode
      Then its text should have a contrast ratio of '4.5:1' against its background
      Examples:
        | element         |
        | #tabs-0-tab-1   |
        | #tabs-0-tab-2   |
        | #tabs-0-tab-3   |
        | #tabs-0-panel-1 |

  @1.4.11 @aa @automatic
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario: The colour used to identify the active tab has a contrast ratio of 3:1 against the background
      When I view the rendered '#tabs-0-tab-1'
      Then its selected state box-shadow or border should have a contrast ratio of '3:1' against its background

  @1.4.11 @aa @automatic
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario Outline: The colour used to identify the active tab has a contrast ratio of 3:1 against the unselected tabs
      When I view the rendered '#tabs-0-tab-1'
      Then its selected state box-shadow or border should have a contrast ratio of '3:1' against the "<element>" element
      Examples:
        | element       |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |

  @1.4.11 @aa @automatic @darkmode
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario: Darkmode: The colour used to identify the active tab has a contrast ratio of 3:1 against the background
      When I view the rendered '#tabs-0-tab-1'
      And I enable "dark" mode
      Then its selected state box-shadow or border should have a contrast ratio of '3:1' against its background

  @1.4.11 @aa @automatic
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario Outline: The custom focus style has a contrast ratio of 3:1 against the background
      When I focus "<element>" using the arrow keys
      Then it should have a visible focus indicator
      And the focus indicator should have a contrast ratio of 3:1 against its background
      Examples:
        | element       |
        | #tabs-0-tab-1 |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |

  @1.4.6 @aaa @automatic
  Rule: 1.4.6 Contrast (Enhanced), Level AAA
    Scenario Outline: All text content within the tabs component has a contrast ratio of 7:1 against the background
      When I view the rendered "<element>"
      Then its text should have a contrast ratio of '7:1' against its background
      Examples:
        | element         |
        | #tabs-0-tab-1   |
        | #tabs-0-tab-2   |
        | #tabs-0-tab-3   |
        | #tabs-0-panel-1 |

  @1.4.6 @aaa @automatic @darkmode
  Rule: 1.4.6 Contrast (Enhanced), Level AAA
    Scenario Outline: Darkmode: All text content within the tabs component has a contrast ratio of 7:1 against the background
      When I view the rendered "<element>"
      And I enable "dark" mode
      Then its text should have a contrast ratio of '7:1' against its background
      Examples:
        | element         |
        | #tabs-0-tab-1   |
        | #tabs-0-tab-2   |
        | #tabs-0-tab-3   |
        | #tabs-0-panel-1 |
