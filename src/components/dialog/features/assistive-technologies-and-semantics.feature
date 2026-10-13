@dialog @assistive-technologies-and-semantics
Feature: Dialog — Assistive technologies and semantics
  Helping people who use a screen reader or other assistive tech by using appropriate code

  User story:
    As a person who uses assistive technology
    I want components that use semantic markup, roles, and states that my tools can interpret
    so that I can navigate, understand, and operate the interface reliably.

  Background:
    Given I load the sample "http://localhost:8081/dialog/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------

  @1.3.1 @a @automatic
  Rule: 1.3.1 Info and Relationships, Level A
    Scenario: The dialog has an accessible name
      When I click on "#dialog-trigger"
      And I inspect "#dialog-modal" in the DOM
      Then it should have an accessible name
      And its accessible name should be "Do you want to delete your account?"

  @1.3.1 @a @automatic
  Rule: 1.3.1 Info and Relationships, Level A
    Scenario: The dialog takes its accessible name from its visible heading
      When I click on "#dialog-trigger"
      And I inspect "#dialog-modal" in the DOM
      Then it should have the attribute "aria-labelledby" with the value "dialog-modal-heading"

  @1.3.1 @a @automatic
  Rule: 1.3.1 Info and Relationships, Level A
    Scenario: A non-modal dialog has an accessible name
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I click on "#dialog-trigger"
      And I inspect "#dialog-non-modal" in the DOM
      Then it should have an accessible name
      And its accessible name should be "Non-modal example"

  @1.3.2 @a @automatic
  Rule: 1.3.2 Meaningful Sequence, Level A
    Scenario Outline: A correct reading sequence is programmatically determined when the dialog is open
      When I click on "#dialog-trigger"
      And I inspect "<element>" in the DOM
      Then it is positioned after the "<previous_element>" element in the DOM
      Examples:
        | element              | previous_element      |
        | #dialog-modal        | #dialog-trigger       |
        | .tl-dialog__actions  | #dialog-modal-heading |
        | #dialog-confirm      | #dialog-cancel        |

  @1.3.2 @a @automatic
  Rule: 1.3.2 Meaningful Sequence, Level A
    Scenario: The close button comes after the content in a non-modal dialog's reading sequence
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I click on "#dialog-trigger"
      And I inspect "#dialog-close" in the DOM
      Then it is positioned after the "#dialog-non-modal p" element in the DOM

  @1.3.2 @a @automatic
  Rule: 1.3.2 Meaningful Sequence, Level A
    Scenario: The dialog is removed from the reading sequence when it is closed
      When I click on "#dialog-trigger"
      And I click on "#dialog-cancel"
      And I inspect "#dialog-modal" in the DOM
      Then it should not have the attribute "open"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.5.3 @a @automatic
  Rule: 2.5.3 Label in Name, Level A
    Scenario Outline: The controls which open and dismiss the dialog have an accessible name which matches or includes the visible label
      When I click on "#dialog-trigger"
      And I view the rendered "<element>"
      Then it should have an accessible name which contains the visible label "<visible_label>"
      Examples:
        | element         | visible_label |
        | #dialog-cancel  | No            |
        | #dialog-confirm | Yes           |

  @2.5.3 @a @automatic
  Rule: 2.5.3 Label in Name, Level A
    Scenario: The control which opens the dialog has an accessible name which matches or includes the visible label
      When I view the rendered '#dialog-trigger'
      Then it should have an accessible name which contains the visible label "Open modal"

  # ----------------------------------------------------------------------------
  # Robust
  # ----------------------------------------------------------------------------

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: The dialog has a role of dialog
      When I click on "#dialog-trigger"
      And I inspect "#dialog-modal" in the DOM
      Then it should have an accessible role of "dialog"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: A non-modal dialog has a role of dialog
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I click on "#dialog-trigger"
      And I inspect "#dialog-non-modal" in the DOM
      Then it should have an accessible role of "dialog"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: Modal dialogs use aria-modal="true"
      When I click on "#dialog-trigger"
      And I inspect "#dialog-modal" in the DOM
      Then it should have the attribute "aria-modal" with the value "true"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: Non-modal dialogs do not use aria-modal
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I click on "#dialog-trigger"
      And I inspect "#dialog-non-modal" in the DOM
      Then it should not have the attribute "aria-modal"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: The dialog reports whether it is open
      When I click on "#dialog-trigger"
      And I inspect "#dialog-modal" in the DOM
      Then it should have the attribute "open"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario Outline: The controls which open and dismiss the dialog have an appropriate accessible name and role for their function
      When I click on "#dialog-trigger"
      And I inspect "<element>" in the DOM
      Then it should have an accessible role of "button"
      And it should have an accessible name
      And its accessible name should be "<name>"
      Examples:
        | element         | name       |
        | #dialog-trigger | Open modal |
        | #dialog-cancel  | No         |
        | #dialog-confirm | Yes        |

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: An icon-only close button has an appropriate accessible name and role for its function
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I click on "#dialog-trigger"
      And I inspect "#dialog-close" in the DOM
      Then it should have an accessible role of "button"
      And it should have an accessible name
      And its accessible name should be "Close"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: Markup can be parsed without errors
      When I click on "#dialog-trigger"
      And I inspect "#dialog-modal" in the DOM
      Then it should use valid HTML with no parsing errors
