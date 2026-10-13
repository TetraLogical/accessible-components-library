@disclosure @consistency-and-predictability
Feature: Disclosure — Consistency and predictability
  Helping people by keeping functionality and content consistent and predictable

  User story:
    As a person who benefits from consistent and predictable interfaces
    I want components that behave in expected ways and don't cause unexpected changes
    so that I can navigate and interact with confidence.

  Background:
    Given I load the sample "http://localhost:8081/disclosure/examples/default"

  # ----------------------------------------------------------------------------
  # Understandable
  # ----------------------------------------------------------------------------

  @3.2.1 @a @automatic
  Rule: 3.2.1 On Focus, Level A
    Scenario: The disclosure trigger does not initiate a change of context when it receives keyboard focus
      When I focus ".tl-disclosure > button" using a keyboard
      Then it should NOT navigate to a new page
      When I inspect ".tl-disclosure > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"

  @3.2.2 @a @automatic
  Rule: 3.2.2 On Input, Level A
    Scenario: Expanding the disclosure does not result in an unexpected change of context
      When I focus ".tl-disclosure > button"
      And I press the "Enter" key once
      Then it should NOT navigate to a new page
      And ".tl-disclosure > button" should be focused
      When I inspect ".tl-disclosure > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"

  @3.2.2 @a @automatic
  Rule: 3.2.2 On Input, Level A
    Scenario: Collapsing the disclosure does not result in an unexpected change of context
      When I click on ".tl-disclosure > button"
      And I focus ".tl-disclosure > button"
      And I press the "Enter" key once
      Then it should NOT navigate to a new page
      And ".tl-disclosure > button" should be focused
      When I inspect ".tl-disclosure > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: The chevron icon is inside the disclosure trigger, before its label
      When I inspect ".tl-disclosure > button svg" in the DOM
      Then it should be nested within the ".tl-disclosure > button" element
      And it should use the tag "svg"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: The down pointing chevron is to the left of the disclosure's label
      When I view the rendered ".tl-disclosure > button svg"
      Then it should be to the left of the text in the ".tl-disclosure > button" element
