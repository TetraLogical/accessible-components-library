@disclosure @assistive-technologies-and-semantics
Feature: Disclosure — Assistive technologies and semantics
  Helping people who use a screen reader or other assistive tech by using appropriate code

  User story:
    As a person who uses assistive technology
    I want components that use semantic markup, roles, and states that my tools can interpret
    so that I can navigate, understand, and operate the interface reliably.

  Background:
    Given I load the sample "http://localhost:8081/disclosure/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------

  @1.3.2 @a @automatic
  Rule: 1.3.2 Meaningful Sequence, Level A
    Scenario: The order of content in the accessibility tree matches the logical reading order
      When I inspect "#disclosure-content" in the DOM
      Then it is positioned after the ".tl-disclosure > button" element in the DOM

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.5.3 @a @automatic
  Rule: 2.5.3 Label in Name, Level A
    Scenario: The disclosure trigger has an accessible name that matches or includes the visible label
      When I view the rendered ".tl-disclosure > button"
      Then it should have an accessible name which contains the visible label "World Wide Web Consortium"

  # ----------------------------------------------------------------------------
  # Robust
  # ----------------------------------------------------------------------------

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: The disclosure trigger has an accessible name
      When I inspect ".tl-disclosure > button" in the Accessibility Tree
      Then it should have an accessible name
      And its accessible name should be "World Wide Web Consortium"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: The disclosure trigger has a role of button
      When I inspect ".tl-disclosure > button" in the Accessibility Tree
      Then it should have an accessible role of "button"
      And it should use the tag "button"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: The collapsed state of the disclosure is conveyed to screen readers
      When I inspect ".tl-disclosure > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"
      When I inspect "#disclosure-content" in the DOM
      Then it should have the attribute "hidden"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: The expanded state of the disclosure is conveyed to screen readers
      When I click on ".tl-disclosure > button"
      And I inspect ".tl-disclosure > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I inspect "#disclosure-content" in the DOM
      Then it should not have the attribute "hidden"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: The trigger is associated with the content it controls, using the aria-controls attribute
      When I inspect ".tl-disclosure > button" in the DOM
      Then it should have the attribute "aria-controls" with the value "disclosure-content"
      When I inspect "#disclosure-content" in the DOM
      Then it should have the attribute "id" with the value "disclosure-content"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: A heading placed inside the trigger keeps its heading role once the script has run
      Given I load the sample "http://localhost:8081/disclosure/examples/with-heading"
      When I inspect ".tl-disclosure > h2" in the Accessibility Tree
      Then it should have an accessible role of "heading"
      When I inspect ".tl-disclosure > h2 > button" in the Accessibility Tree
      Then it should have an accessible role of "button"
      And its accessible name should be "World Wide Web Consortium"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: Markup can be parsed without errors
      When I inspect ".tl-disclosure" in the DOM
      Then it should use valid HTML with no parsing errors
