@accordion @consistency-and-predictability
Feature: Accordion — Consistency and predictability
  Helping people by keeping functionality and content consistent and predictable

  User story:
    As a person who benefits from consistent and predictable interfaces
    I want components that behave in expected ways and don't cause unexpected changes
    so that I can navigate and interact with confidence.

  Background:
    Given I load the sample "http://localhost:8081/accordion/examples/default"

  # ----------------------------------------------------------------------------
  # Understandable
  # ----------------------------------------------------------------------------

  @3.2.1 @a @automatic
  Rule: 3.2.1 On Focus, Level A
    Scenario: A trigger does not initiate a change of context when it receives keyboard focus
      When I focus ".tl-accordion__section:nth-of-type(1) > button" using a keyboard
      Then it should NOT navigate to a new page
      When I inspect ".tl-accordion__section:nth-of-type(1) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"

  @3.2.1 @a @automatic
  Rule: 3.2.1 On Focus, Level A
    Scenario: The Show all sections button does not initiate a change of context when it receives keyboard focus
      When I focus ".tl-accordion__toggle-all" using a keyboard
      Then it should NOT navigate to a new page
      When I inspect ".tl-accordion__section:nth-of-type(1) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"

  @3.2.2 @a @automatic
  Rule: 3.2.2 On Input, Level A
    Scenario: Expanding a section does not result in an unexpected change of context
      When I focus ".tl-accordion__section:nth-of-type(2) > button"
      And I press the "Enter" key once
      Then it should NOT navigate to a new page
      And ".tl-accordion__section:nth-of-type(2) > button" should be focused
      When I inspect ".tl-accordion__section:nth-of-type(2) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"

  @3.2.2 @a @automatic
  Rule: 3.2.2 On Input, Level A
    Scenario: Collapsing a section does not result in an unexpected change of context
      Given I load the sample "http://localhost:8081/accordion/examples/one-at-a-time"
      When I focus ".tl-accordion__section:nth-of-type(1) > button"
      And I press the "Enter" key once
      Then it should NOT navigate to a new page
      And ".tl-accordion__section:nth-of-type(1) > button" should be focused
      When I inspect ".tl-accordion__section:nth-of-type(1) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"

  @3.2.2 @a @automatic
  Rule: 3.2.2 On Input, Level A
    Scenario: Showing and hiding every section does not result in an unexpected change of context
      When I focus ".tl-accordion__toggle-all"
      And I press the "Enter" key once
      Then it should NOT navigate to a new page
      And ".tl-accordion__toggle-all" should be focused
      When I press the "Enter" key once
      Then it should NOT navigate to a new page
      And ".tl-accordion__toggle-all" should be focused

  @recommendation @automatic
  Rule: Recommendation
    Scenario: The chevron icon is inside each trigger, before its label
      When I inspect ".tl-accordion__section:nth-of-type(1) > button svg" in the DOM
      Then it should be nested within the ".tl-accordion__section:nth-of-type(1) > button" element
      And it should use the tag "svg"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: The chevron icon is inside the Show all sections button, before its label
      When I inspect ".tl-accordion__toggle-all span" in the DOM
      Then it is positioned after the ".tl-accordion__toggle-all svg" element in the DOM
      And it should be nested within the ".tl-accordion__toggle-all" element

  @recommendation @automatic
  Rule: Recommendation
    Scenario Outline: The down pointing chevron is to the left of each trigger's label
      When I view the rendered "<element> svg"
      Then it should be to the left of the text in the "<element>" element
      Examples:
        | element                                     |
        | .tl-accordion__toggle-all                   |
        | .tl-accordion__section:nth-of-type(1) > button |
        | .tl-accordion__section:nth-of-type(2) > button |
        | .tl-accordion__section:nth-of-type(3) > button |

  @recommendation @automatic
  Rule: Recommendation
    Scenario: In the one-at-a-time variant, activating the open section collapses it, leaving no section open
      Given I load the sample "http://localhost:8081/accordion/examples/one-at-a-time"
      When I click on ".tl-accordion__section:nth-of-type(1) > button"
      And I inspect ".tl-accordion__section:nth-of-type(1) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"
      When I inspect "#accordion-one-at-a-time-content-1" in the DOM
      Then it should have the attribute "hidden"
      When I inspect ".tl-accordion__section:nth-of-type(2) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"
