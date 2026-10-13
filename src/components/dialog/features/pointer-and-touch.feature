@dialog @pointer-and-touch
Feature: Dialog — Pointer and touch
  Helping people use single pointer or touch interactions

  User story:
    As a person using touch or pointer input
    I want components with accessible gestures, adequate target sizes, and predictable interactions
    so that I can accurately interact with all functionality.

  Background:
    Given I load the sample "http://localhost:8081/dialog/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.5.2 @a @automatic
  Rule: 2.5.2 Pointer Cancellation, Level A
    Scenario: The control which opens the dialog is not activated on the down event
      When I press the mouse down on "#dialog-trigger"
      And I inspect "#dialog-modal" in the DOM
      Then it should not have the attribute "open"

  @2.5.2 @a @automatic
  Rule: 2.5.2 Pointer Cancellation, Level A
    Scenario: The control which opens the dialog is activated on the up event
      When I click on "#dialog-trigger"
      And I inspect "#dialog-modal" in the DOM
      Then it should have the attribute "open"

  @2.5.2 @a @automatic
  Rule: 2.5.2 Pointer Cancellation, Level A
    Scenario Outline: The controls which dismiss the dialog are not activated on the down event
      When I click on "#dialog-trigger"
      And I press the mouse down on "<element>"
      And I inspect "#dialog-modal" in the DOM
      Then it should have the attribute "open"
      Examples:
        | element         |
        | #dialog-cancel  |
        | #dialog-confirm |

  @2.5.2 @a @automatic
  Rule: 2.5.2 Pointer Cancellation, Level A
    Scenario Outline: The controls which dismiss the dialog are activated on the up event
      When I click on "#dialog-trigger"
      And I click on "<element>"
      And I inspect "#dialog-modal" in the DOM
      Then it should not have the attribute "open"
      Examples:
        | element         |
        | #dialog-cancel  |
        | #dialog-confirm |

  @2.5.2 @a @automatic
  Rule: 2.5.2 Pointer Cancellation, Level A
    Scenario: Opening the dialog with a pointer does not navigate to a new page
      When I click on "#dialog-trigger"
      Then it should NOT navigate to a new page

  @2.5.8 @aa @automatic
  Rule: 2.5.8 Target Size (Minimum), Level AA
    Scenario Outline: The controls which open and dismiss the dialog have a target area size, or a target area size together with spacing, of at least 24 by 24 pixels
      When I click on "#dialog-trigger"
      And I view the rendered "<element>"
      Then it should have a width and height of at least 24px
      Examples:
        | element         |
        | #dialog-trigger |
        | #dialog-cancel  |
        | #dialog-confirm |

  @2.5.8 @aa @automatic
  Rule: 2.5.8 Target Size (Minimum), Level AA
    Scenario: An icon-only close button has a target area size of at least 24 by 24 pixels
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I click on "#dialog-trigger"
      And I view the rendered '#dialog-close'
      Then it should have a width and height of at least 24px

  @2.5.5 @aaa @automatic
  Rule: 2.5.5 Target Size (Enhanced), Level AAA
    Scenario Outline: The controls which open and dismiss the dialog have a target area size of at least 44 by 44 pixels
      When I click on "#dialog-trigger"
      And I view the rendered "<element>"
      Then it should have a width and height of at least 44px
      Examples:
        | element         |
        | #dialog-trigger |
        | #dialog-cancel  |
        | #dialog-confirm |

  @2.5.5 @aaa @automatic
  Rule: 2.5.5 Target Size (Enhanced), Level AAA
    Scenario: An icon-only close button has a target area size of at least 44 by 44 pixels
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I click on "#dialog-trigger"
      And I view the rendered '#dialog-close'
      Then it should have a width and height of at least 44px
