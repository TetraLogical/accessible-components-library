@accordion @assistive-technologies-and-semantics
Feature: Accordion — Assistive technologies and semantics
  Helping people who use a screen reader or other assistive tech by using appropriate code

  User story:
    As a person who uses assistive technology
    I want components that use semantic markup, roles, and states that my tools can interpret
    so that I can navigate, understand, and operate the interface reliably.

  Background:
    Given I load the sample "http://localhost:8081/accordion/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------

  @1.3.2 @a @automatic
  Rule: 1.3.2 Meaningful Sequence, Level A
    Scenario: The order of content in the accessibility tree matches the logical reading order
      When I inspect "#accordion-content-1" in the DOM
      Then it is positioned after the ".tl-accordion__section:nth-of-type(1) > button" element in the DOM
      When I inspect ".tl-accordion__section:nth-of-type(2) > button" in the DOM
      Then it is positioned after the "#accordion-content-1" element in the DOM

  @1.3.2 @a @automatic
  Rule: 1.3.2 Meaningful Sequence, Level A
    Scenario: The Show all sections button comes before the sections it controls
      When I inspect ".tl-accordion__section:nth-of-type(1) > button" in the DOM
      Then it is positioned after the ".tl-accordion__toggle-all" element in the DOM

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.5.3 @a @automatic
  Rule: 2.5.3 Label in Name, Level A
    Scenario Outline: Each trigger has an accessible name that matches or includes the visible label
      When I view the rendered "<element>"
      Then it should have an accessible name which contains the visible label "<label>"
      Examples:
        | element                                         | label                           |
        | .tl-accordion__section:nth-of-type(1) > button | What is an accessibility audit? |
        | .tl-accordion__section:nth-of-type(2) > button | How long does an audit take?    |
        | .tl-accordion__section:nth-of-type(3) > button | What do we get at the end?      |

  @2.5.3 @a @automatic
  Rule: 2.5.3 Label in Name, Level A
    Scenario: The Show all sections button has an accessible name that matches or includes the visible label
      When I view the rendered ".tl-accordion__toggle-all"
      Then it should have an accessible name which contains the visible label "Show all sections"

  # ----------------------------------------------------------------------------
  # Robust
  # ----------------------------------------------------------------------------

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: Each trigger has an accessible name and a role of button
      When I inspect ".tl-accordion__section:nth-of-type(1) > button" in the Accessibility Tree
      Then it should have an accessible name
      And its accessible name should be "What is an accessibility audit?"
      And it should have an accessible role of "button"
      And it should use the tag "button"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: The Show all sections button has an accessible name and a role of button
      When I inspect ".tl-accordion__toggle-all" in the Accessibility Tree
      Then it should have an accessible name
      And its accessible name should be "Show all sections"
      And it should have an accessible role of "button"
      And it should use the tag "button"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: The one-at-a-time variant opens with its first section expanded, and the rest collapsed
      Given I load the sample "http://localhost:8081/accordion/examples/one-at-a-time"
      When I inspect ".tl-accordion__section:nth-of-type(1) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I inspect "#accordion-one-at-a-time-content-1" in the DOM
      Then it should not have the attribute "hidden"
      When I inspect ".tl-accordion__section:nth-of-type(2) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"
      When I inspect ".tl-accordion__section:nth-of-type(3) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"
      When I inspect "#accordion-one-at-a-time-content-3" in the DOM
      Then it should have the attribute "hidden"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: In the one-at-a-time variant, opening one section collapses the section which was already open
      Given I load the sample "http://localhost:8081/accordion/examples/one-at-a-time"
      When I click on ".tl-accordion__section:nth-of-type(2) > button"
      And I inspect ".tl-accordion__section:nth-of-type(2) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I inspect ".tl-accordion__section:nth-of-type(1) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"
      When I inspect "#accordion-one-at-a-time-content-1" in the DOM
      Then it should have the attribute "hidden"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: An accordion opens with every section collapsed
      When I inspect ".tl-accordion__section:nth-of-type(1) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"
      When I inspect ".tl-accordion__section:nth-of-type(2) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"
      When I inspect ".tl-accordion__section:nth-of-type(3) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"
      When I inspect "#accordion-content-1" in the DOM
      Then it should have the attribute "hidden"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: Opening one section leaves the others as they were
      When I click on ".tl-accordion__section:nth-of-type(1) > button"
      And I click on ".tl-accordion__section:nth-of-type(2) > button"
      And I inspect ".tl-accordion__section:nth-of-type(1) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I inspect ".tl-accordion__section:nth-of-type(2) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I inspect "#accordion-content-1" in the DOM
      Then it should not have the attribute "hidden"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: The Show all sections button expands every section, and its name and state change to Hide all sections, expanded
      When I click on ".tl-accordion__toggle-all"
      And I inspect ".tl-accordion__section:nth-of-type(1) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I inspect ".tl-accordion__section:nth-of-type(2) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I inspect ".tl-accordion__section:nth-of-type(3) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I inspect "#accordion-content-3" in the DOM
      Then it should not have the attribute "hidden"
      When I inspect ".tl-accordion__toggle-all" in the Accessibility Tree
      Then its accessible name should be "Hide all sections"
      When I inspect ".tl-accordion__toggle-all" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: The Show all sections button only changes to Hide all sections once every section is open
      When I click on ".tl-accordion__section:nth-of-type(2) > button"
      And I inspect ".tl-accordion__toggle-all" in the Accessibility Tree
      Then its accessible name should be "Show all sections"
      When I inspect ".tl-accordion__toggle-all" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"
      When I click on ".tl-accordion__section:nth-of-type(1) > button"
      And I click on ".tl-accordion__section:nth-of-type(3) > button"
      And I inspect ".tl-accordion__toggle-all" in the Accessibility Tree
      Then its accessible name should be "Hide all sections"
      When I inspect ".tl-accordion__toggle-all" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I click on ".tl-accordion__section:nth-of-type(2) > button"
      And I inspect ".tl-accordion__toggle-all" in the Accessibility Tree
      Then its accessible name should be "Show all sections"
      When I inspect ".tl-accordion__toggle-all" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: The Hide all sections button collapses every section, and its name and state change back to Show all sections, collapsed
      When I click on ".tl-accordion__toggle-all"
      And I click on ".tl-accordion__toggle-all"
      And I inspect ".tl-accordion__section:nth-of-type(1) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"
      When I inspect ".tl-accordion__section:nth-of-type(2) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"
      When I inspect ".tl-accordion__section:nth-of-type(3) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"
      When I inspect "#accordion-content-1" in the DOM
      Then it should have the attribute "hidden"
      When I inspect ".tl-accordion__toggle-all" in the Accessibility Tree
      Then its accessible name should be "Show all sections"
      When I inspect ".tl-accordion__toggle-all" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: The expanded or collapsed state of the Show all sections button is conveyed to screen readers
      When I inspect ".tl-accordion__toggle-all" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"
      When I click on ".tl-accordion__toggle-all"
      And I inspect ".tl-accordion__toggle-all" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: The trigger is associated with the content it controls, using the aria-controls attribute
      When I inspect ".tl-accordion__section:nth-of-type(1) > button" in the DOM
      Then it should have the attribute "aria-controls" with the value "accordion-content-1"
      When I inspect "#accordion-content-1" in the DOM
      Then it should have the attribute "id" with the value "accordion-content-1"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: The Show all sections button is associated with every section it controls, using the aria-controls attribute
      When I inspect ".tl-accordion__toggle-all" in the DOM
      Then it should have the attribute "aria-controls" with the value "accordion-content-1 accordion-content-2 accordion-content-3"

  @recommendation @automatic
  Rule: Recommendation
    Scenario Outline: Markup can be parsed without errors
      Given I load the sample "http://localhost:8081/accordion/examples/<variant>"
      When I inspect ".tl-accordion" in the DOM
      Then it should use valid HTML with no parsing errors
      Examples:
        | variant       |
        | default       |
        | one-at-a-time |
