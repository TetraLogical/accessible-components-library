@dialog @keyboard
Feature: Dialog — Keyboard
  Helping people who use a keyboard

  User story:
    As a keyboard user
    I want components that follow a logical tab order and provide visible, predictable focus states
    so that I can move through the interface efficiently and operate every feature without using a mouse.

  Background:
    Given I load the sample "http://localhost:8081/dialog/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario: The control which opens the dialog can be focused using the Tab key
      When I focus "#dialog-trigger" using a keyboard
      Then "#dialog-trigger" should be focused

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario Outline: The dialog can be triggered using the keyboard
      When I focus "#dialog-trigger" using a keyboard
      And I press the "<key>" key once
      And I inspect "#dialog-modal" in the DOM
      Then it should have the attribute "open"
      Examples:
        | key   |
        | ENTER |
        | SPACE |

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario: The dialog can be dismissed using the keyboard
      When I click on "#dialog-trigger"
      And I focus "#dialog-cancel" using a keyboard
      And I press the "ENTER" key once
      And I inspect "#dialog-modal" in the DOM
      Then it should not have the attribute "open"

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario: A non-modal dialog can be triggered and dismissed using the keyboard
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I focus "#dialog-trigger" using a keyboard
      And I press the "ENTER" key once
      And I focus "#dialog-close" using a keyboard
      And I press the "ENTER" key once
      And I inspect "#dialog-non-modal" in the DOM
      Then it should not have the attribute "open"

  @2.1.2 @a @automatic
  Rule: 2.1.2 No Keyboard Trap, Level A
    # Focus is placed on the trigger explicitly, because the browser restores it
    # there asynchronously when the dialog closes
    Scenario: Focus can be moved away from the dialog once it has been dismissed
      When I click on "#dialog-trigger"
      And I press the "ESC" key once
      And I focus "#dialog-trigger" using a keyboard
      And I hold the "SHIFT" key
      And I press the "TAB" key once
      Then ".demo-link" should be focused

  @2.1.2 @a @automatic
  Rule: 2.1.2 No Keyboard Trap, Level A
    Scenario: Focus is not trapped by a non-modal dialog
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I click on "#dialog-trigger"
      And I focus "#dialog-close" using a keyboard
      And I press the "TAB" key once
      Then the focus should not be on a "#dialog-close" element

  @2.4.3 @a @automatic
  Rule: 2.4.3 Focus Order, Level A
    Scenario: When a dialog opens, focus moves to it
      When I click on "#dialog-trigger"
      Then "#dialog-modal" should be focused

  @2.4.3 @a @automatic
  Rule: 2.4.3 Focus Order, Level A
    Scenario: When a non-modal dialog opens, focus moves to it
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I click on "#dialog-trigger"
      Then "#dialog-non-modal" should be focused

  @2.4.3 @a @automatic
  Rule: 2.4.3 Focus Order, Level A
    Scenario: Until a modal dialog is dismissed, focus is contained within it
      When I click on "#dialog-trigger"
      And I focus "#dialog-confirm" using a keyboard
      And I press the "TAB" key once
      Then "#dialog-cancel" should be focused

  @2.4.3 @a @automatic
  Rule: 2.4.3 Focus Order, Level A
    Scenario: Until a modal dialog is dismissed, focus is contained within it when moving backwards
      When I click on "#dialog-trigger"
      And I focus "#dialog-cancel" using a keyboard
      And I hold the "SHIFT" key
      And I press the "TAB" key once
      Then "#dialog-confirm" should be focused

  @2.4.3 @a @automatic
  Rule: 2.4.3 Focus Order, Level A
    Scenario: When a modal dialog has just opened, moving backwards goes to its last control
      When I click on "#dialog-trigger"
      And I hold the "SHIFT" key
      And I press the "TAB" key once
      Then "#dialog-confirm" should be focused

  @2.4.3 @a @automatic
  Rule: 2.4.3 Focus Order, Level A
    Scenario: Until a modal dialog is dismissed, the content behind it is inert
      When I click on "#dialog-trigger"
      And I press the "TAB" key once
      And I press the "TAB" key once
      And I press the "TAB" key once
      Then the focus should not be on a ".demo-link" element

  @2.4.3 @a @automatic
  Rule: 2.4.3 Focus Order, Level A
    Scenario: The close button is the last control in a non-modal dialog's focus order
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I click on "#dialog-trigger"
      And I press the "TAB" key once
      Then "#dialog-close" should be focused
      When I press the "TAB" key once
      Then the focus should not be on a "#dialog-close" element

  @2.4.3 @a @automatic
  Rule: 2.4.3 Focus Order, Level A
    Scenario: When a dialog is closed, focus returns to the element that triggered the dialog
      When I click on "#dialog-trigger"
      And I click on "#dialog-cancel"
      Then "#dialog-trigger" should be focused

  @2.4.3 @a @automatic
  Rule: 2.4.3 Focus Order, Level A
    Scenario: When a dialog is dismissed with the Esc key, focus returns to the element that triggered the dialog
      When I click on "#dialog-trigger"
      And I press the "ESC" key once
      Then "#dialog-trigger" should be focused

  @2.4.7 @aa @automatic
  Rule: 2.4.7 Focus Visible, Level AA
    Scenario Outline: When controls within the dialog receive keyboard focus, a focus indicator is visible
      When I click on "#dialog-trigger"
      And I focus "<element>" using a keyboard
      Then it should have a visible focus indicator
      Examples:
        | element         |
        | #dialog-cancel  |
        | #dialog-confirm |

  @2.4.7 @aa @automatic
  Rule: 2.4.7 Focus Visible, Level AA
    Scenario: When the control which opens the dialog receives keyboard focus, a focus indicator is visible
      When I focus "#dialog-trigger" using a keyboard
      Then it should have a visible focus indicator

  @2.4.11 @aa @automatic
  Rule: 2.4.11 Focus Not Obscured (Minimum), Level AA
    Scenario Outline: When controls within the dialog receive keyboard focus, they are not fully hidden by other content
      When I click on "#dialog-trigger"
      And I focus "<element>" using a keyboard
      Then it should have a visible focus indicator
      And its focus indicator should be at least partially visible
      Examples:
        | element         |
        | #dialog-cancel  |
        | #dialog-confirm |

  @2.4.11 @aa @automatic
  Rule: 2.4.11 Focus Not Obscured (Minimum), Level AA
    Scenario: When content behind a non-modal dialog receives keyboard focus, the dialog does not fully hide it
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I click on "#dialog-trigger"
      And I focus a link behind "#dialog-non-modal" using a keyboard
      Then it should have a visible focus indicator
      And its focus indicator should be at least partially visible
      And it should not have its focus indicator entirely covered by "#dialog-non-modal"

  @2.1.3 @aaa @automatic
  Rule: 2.1.3 Keyboard (No Exception), Level AAA
    Scenario: The dialog component is accessible by keyboard, with no exceptions
      When I click on "#dialog-trigger"
      And I view the rendered '#dialog-modal'
      Then every interactive control should be reachable using the keyboard

  @2.4.12 @aaa @automatic
  Rule: 2.4.12 Focus Not Obscured (Enhanced), Level AAA
    Scenario Outline: When controls within the dialog receive keyboard focus, they are fully visible
      When I click on "#dialog-trigger"
      And I focus "<element>" using a keyboard
      Then it should have a visible focus indicator
      And its focus indicator should be fully visible
      Examples:
        | element         |
        | #dialog-cancel  |
        | #dialog-confirm |

  @2.4.12 @aaa @automatic
  Rule: 2.4.12 Focus Not Obscured (Enhanced), Level AAA
    Scenario: When content behind a non-modal dialog receives keyboard focus, the dialog moves aside
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I click on "#dialog-trigger"
      And I focus a link behind "#dialog-non-modal" using a keyboard
      Then it should have a visible focus indicator
      And its focus indicator should be fully visible
      And it should not have any part of its focus indicator covered by "#dialog-non-modal"

  @2.4.12 @aaa @automatic
  Rule: 2.4.12 Focus Not Obscured (Enhanced), Level AAA
    # In a viewport this small the dialog takes up most of the screen, so there
    # is nowhere on it left to move to. It runs off the edge instead, rather
    # than staying put and covering the focus
    Scenario: When content behind a non-modal dialog receives keyboard focus in a small viewport, the dialog still moves aside
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I set the viewport to 320px by 400px
      And I click on "#dialog-trigger"
      And I focus a link behind "#dialog-non-modal" using a keyboard
      Then it should have a visible focus indicator
      And its focus indicator should be fully visible
      And it should not have any part of its focus indicator covered by "#dialog-non-modal"

  @2.4.13 @aaa @automatic
  Rule: 2.4.13 Focus Appearance, Level AAA
    Scenario Outline: The custom focus style has a solid 2 pixel thick perimeter, or equivalent, and a contrast ratio of at least 3:1 against the background colour
      When I click on "#dialog-trigger"
      And I focus "<element>" using a keyboard
      Then it should have a visible focus indicator
      And the focus indicator should have a contrast ratio of 3:1 against its background
      And its focus indicator should have a minimum perimiter thickness of 2px
      Examples:
        | element         |
        | #dialog-cancel  |
        | #dialog-confirm |

  @recommendation @automatic
  Rule: Recommendation
    Scenario: The Esc key closes the dialog
      When I click on "#dialog-trigger"
      And I press the "ESC" key once
      And I inspect "#dialog-modal" in the DOM
      Then it should not have the attribute "open"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: The Esc key closes a non-modal dialog
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I click on "#dialog-trigger"
      And I press the "ESC" key once
      And I inspect "#dialog-non-modal" in the DOM
      Then it should not have the attribute "open"

  @recommendation @automatic
  Rule: Recommendation
    Scenario Outline: A custom focus style is used instead of the browser's default
      When I click on "#dialog-trigger"
      And I focus "<element>" using a keyboard
      Then it should have a visible focus indicator
      And its focus indicator should have a minimum perimiter thickness of 2px
      Examples:
        | element         |
        | #dialog-cancel  |
        | #dialog-confirm |
