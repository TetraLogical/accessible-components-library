@textInput @consistency-and-predictability
Feature: Text Input — Consistency and predictability
  Helping people by keeping functionality consistent and predictable

  User story:
    As a person who benefits from consistent and predictable interfaces
    I want components that behave in expected ways and don't cause unexpected changes
    so that I can navigate and interact with confidence.

  Background:
    Given I load the sample "http://localhost:8081/text-input/examples/default"

  # ----------------------------------------------------------------------------
  # Understandable
  # ----------------------------------------------------------------------------

  @3.2.1 @a @automatic
  Rule: 3.2.1 On Focus, Level A
    Scenario: Receiving focus does not initiate a change of context
      When I focus ".tl-text-input input" using a keyboard
      Then it should NOT navigate to a new page
