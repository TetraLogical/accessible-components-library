@dialog @colour-and-contrast
Feature: Dialog — Colour and contrast
  Helping people who struggle with colour perception or low vision

  User story:
    As a person with low vision or colour vision deficiency
    I want components with sufficient contrast and that don't rely solely on colour
    so that I can perceive and understand all content and interface elements.

  Background:
    Given I load the sample "http://localhost:8081/dialog/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------

  @1.4.3 @aa @automatic
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario Outline: Text in the dialog has a contrast ratio of 4.5:1 against its background
      When I click on "#dialog-trigger"
      And I view the rendered "<element>"
      Then its text should have a contrast ratio of '4.5:1' against its background
      Examples:
        | element               |
        | #dialog-modal         |
        | #dialog-modal-heading |
        | #dialog-cancel        |
        | #dialog-confirm       |

  @1.4.3 @aa @automatic @darkmode
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario Outline: Darkmode: Text in the dialog has a contrast ratio of 4.5:1 against its background
      When I click on "#dialog-trigger"
      And I view the rendered "<element>"
      And I enable "dark" mode
      Then its text should have a contrast ratio of '4.5:1' against its background
      Examples:
        | element               |
        | #dialog-modal         |
        | #dialog-modal-heading |
        | #dialog-cancel        |
        | #dialog-confirm       |

  @1.4.11 @aa @automatic
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario: The icon which is the only content of the close button has a contrast ratio of 3:1 with its background
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I click on "#dialog-trigger"
      And I view the rendered '#dialog-close'
      Then its text should have a contrast ratio of '3:1' against its background

  @1.4.11 @aa @automatic @darkmode
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario: Darkmode: The icon which is the only content of the close button has a contrast ratio of 3:1 with its background
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I click on "#dialog-trigger"
      And I view the rendered '#dialog-close'
      And I enable "dark" mode
      Then its text should have a contrast ratio of '3:1' against its background

  @1.4.11 @aa @automatic
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario Outline: The custom focus indicator has a contrast ratio of 3:1 against the background
      When I click on "#dialog-trigger"
      And I focus "<element>" using a keyboard
      Then it should have a visible focus indicator
      And the focus indicator should have a contrast ratio of 3:1 against its background
      Examples:
        | element         |
        | #dialog-cancel  |
        | #dialog-confirm |

  @1.4.11 @aa @automatic
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario: The custom focus indicator on the control which opens the dialog has a contrast ratio of 3:1 against the background
      When I focus "#dialog-trigger" using a keyboard
      Then it should have a visible focus indicator
      And the focus indicator should have a contrast ratio of 3:1 against its background

  @1.4.6 @aaa @automatic
  Rule: 1.4.6 Contrast (Enhanced), Level AAA
    Scenario Outline: Text in the dialog has a contrast ratio of 7:1 against its background
      When I click on "#dialog-trigger"
      And I view the rendered "<element>"
      Then its text should have a contrast ratio of '7:1' against its background
      Examples:
        | element               |
        | #dialog-modal         |
        | #dialog-modal-heading |
        | #dialog-cancel        |
        | #dialog-confirm       |

  @1.4.6 @aaa @automatic @darkmode
  Rule: 1.4.6 Contrast (Enhanced), Level AAA
    Scenario Outline: Darkmode: Text in the dialog has a contrast ratio of 7:1 against its background
      When I click on "#dialog-trigger"
      And I view the rendered "<element>"
      And I enable "dark" mode
      Then its text should have a contrast ratio of '7:1' against its background
      Examples:
        | element               |
        | #dialog-modal         |
        | #dialog-modal-heading |
        | #dialog-cancel        |
        | #dialog-confirm       |
