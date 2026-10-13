@textInput @assistive-technologies-and-semantics
Feature: Text Input — Assistive technologies and semantics
  Helping people who use a screen reader or other assistive tech by using appropriate code

  User story:
    As a person who uses assistive technology
    I want components that use semantic markup, roles, and states that my tools can interpret
    so that I can navigate, understand, and operate the interface reliably.

  Background:
    Given I load the sample "http://localhost:8081/text-input/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------

  @1.3.1 @a @automatic
  Rule: 1.3.1 Info and Relationships, Level A
    Scenario: The hint text is programmatically associated with the text input using aria-describedby
      When I inspect ".tl-text-input input" in the DOM
      Then it should have the attribute "aria-describedby" with the value "input-1-hint"

  @1.3.1 @a @automatic
  Rule: 1.3.1 Info and Relationships, Level A
    Scenario: A text input without hint text has no aria-describedby pointing at a hint
      Given I load the sample "http://localhost:8081/text-input/examples/without-hint"
      When I inspect ".tl-text-input input" in the DOM
      Then it should not have the attribute "aria-describedby"

  @1.3.1 @a @automatic
  Rule: 1.3.1 Info and Relationships, Level A
    Scenario: The hint referenced by the text input's aria-describedby is present in the DOM
      When I inspect ".tl-text-input #input-1-hint" in the DOM
      Then it should use the tag "p"

  @1.3.2 @a @automatic
  Rule: 1.3.2 Meaningful Sequence, Level A
    Scenario: The order of content in the HTML matches the reading order
      When I inspect ".tl-text-input input" in the DOM
      Then it is positioned after the ".tl-text-input label" element in the DOM

  @1.3.5 @aa @automatic
  Rule: 1.3.5 Identify Input Purpose, Level AA
    Scenario: A text input collecting personal information has an appropriate autocomplete attribute
      When I inspect ".tl-text-input input" in the DOM
      Then it should have the attribute "autocomplete" with the value "name"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.5.3 @a @automatic
  Rule: 2.5.3 Label in Name, Level A
    Scenario: The text input has an accessible name which contains its visible label
      When I view the rendered ".tl-text-input input"
      Then it should have an accessible name which contains the visible label "Full name"

  # ----------------------------------------------------------------------------
  # Robust
  # ----------------------------------------------------------------------------

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: The text input has an accessible name
      When I inspect ".tl-text-input input" in the DOM
      Then it should have an accessible name
      And its accessible name should be "Full name"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: The text input has the correct accessible role
      When I inspect ".tl-text-input input" in the DOM
      Then it should have an accessible role of "textbox"

  @recommendation @automatic
  Rule: Recommendation
    Scenario Outline: The component uses native HTML elements for the input and its label
      When I inspect "<element>" in the DOM
      Then it should use the tag "<tag>"
      Examples:
        | element              | tag   |
        | .tl-text-input label | label |
        | .tl-text-input input | input |

  @recommendation @automatic
  Rule: Recommendation
    Scenario Outline: The label is programmatically associated with the input using the for and id attributes
      When I inspect "<element>" in the DOM
      Then it should have the attribute "<attribute>" with the value "<value>"
      Examples:
        | element              | attribute | value   |
        | .tl-text-input label | for       | input-1 |
        | .tl-text-input input | id        | input-1 |

  @recommendation @automatic
  Rule: Recommendation
    Scenario: When the text input has an error, the invalid state is conveyed using aria-invalid
      Given I load the sample "http://localhost:8081/text-input/examples/error"
      When I inspect ".tl-text-input input" in the DOM
      Then it should have the attribute "aria-invalid" with the value "true"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: Markup can be parsed without errors
      When I inspect ".tl-text-input" in the DOM
      Then it should use valid HTML with no parsing errors
