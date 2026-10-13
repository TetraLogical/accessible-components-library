@dialog @consistency-and-predictability
Feature: Dialog — Consistency and predictability
  Helping people by keeping functionality consistent and predictable

  User story:
    As a person who benefits from consistent and predictable interfaces
    I want components that behave in expected ways and don't cause unexpected changes
    so that I can navigate and interact with confidence.

  Background:
    Given I load the sample "http://localhost:8081/dialog/examples/default"

  # ----------------------------------------------------------------------------
  # Understandable
  # ----------------------------------------------------------------------------

  @3.2.1 @a @automatic
  Rule: 3.2.1 On Focus, Level A
    Scenario: The control which opens the dialog does not initiate a change of context when it receives focus
      When I focus "#dialog-trigger" using a keyboard
      Then it should NOT navigate to a new page

  @3.2.1 @a @automatic
  Rule: 3.2.1 On Focus, Level A
    Scenario: The dialog does not open when the control which opens it receives focus
      When I focus "#dialog-trigger" using a keyboard
      And I inspect "#dialog-modal" in the DOM
      Then it should not have the attribute "open"

  @3.2.1 @a @automatic
  Rule: 3.2.1 On Focus, Level A
    Scenario Outline: The controls which dismiss the dialog do not initiate a change of context when they receive focus
      When I click on "#dialog-trigger"
      And I focus "<element>" using a keyboard
      Then it should NOT navigate to a new page
      Examples:
        | element         |
        | #dialog-cancel  |
        | #dialog-confirm |

  @3.2.1 @a @automatic
  Rule: 3.2.1 On Focus, Level A
    Scenario: The dialog does not close when a control within it receives focus
      When I click on "#dialog-trigger"
      And I focus "#dialog-cancel" using a keyboard
      And I inspect "#dialog-modal" in the DOM
      Then it should have the attribute "open"

  @recommendation @automatic
  Rule: Recommendation
    Scenario Outline: The dialog has a clear visible method to dismiss it, such as a close button
      When I click on "#dialog-trigger"
      And I view the rendered "<element>"
      Then it should have an accessible name
      Examples:
        | element         |
        | #dialog-cancel  |
        | #dialog-confirm |

  @recommendation @automatic
  Rule: Recommendation
    Scenario: While a modal dialog is open, the page behind it cannot be scrolled
      When I click on "#dialog-trigger"
      And I inspect "html" in the DOM
      Then it should have the CSS property "overflow-y" with the value "hidden"
      When I press the "ESC" key once
      And I inspect "html" in the DOM
      Then it should have the CSS property "overflow-y" with the value "visible"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: A non-modal dialog does not stop the page behind it from scrolling
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I click on "#dialog-trigger"
      And I inspect "html" in the DOM
      Then it should have the CSS property "overflow-y" with the value "visible"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: A non-modal dialog has a clear visible method to dismiss it, such as a close button
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I click on "#dialog-trigger"
      And I view the rendered '#dialog-close'
      Then it should have an accessible name
