@tabs @consistency-and-predictability
Feature: Tabs — Consistency and predictability
  Helping people by keeping functionality consistent and predictable

  User story:
    As a person who benefits from consistent and predictable interfaces
    I want components that behave in expected ways and don't cause unexpected changes
    so that I can navigate and interact with confidence.

  Background:
    Given I load the sample "http://localhost:8081/tabs/examples/default"

  # ----------------------------------------------------------------------------
  # Understandable
  # ----------------------------------------------------------------------------

  @3.2.1 @a @automatic
  Rule: 3.2.1 On Focus, Level A
    Scenario: Receiving focus does not initiate a change of context
      When I focus "#tabs-0-tab-1" using a keyboard
      Then it should NOT navigate to a new page

  @3.2.1 @a @automatic
  Rule: 3.2.1 On Focus, Level A
    Scenario Outline: Moving focus between tabs does not initiate a change of context
      When I focus "<element>" using the arrow keys
      Then it should NOT navigate to a new page
      Examples:
        | element       |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |

  @recommendation @automatic
  Rule: Recommendation
    Scenario: In the narrow layout, the chevron icon is inside each toggle, before its label
      When I set the viewport to 320px wide
      And I inspect ".tl-tabs__disclosure:nth-of-type(1) > button > svg:first-child" in the DOM
      Then it should use the tag "svg"
      And it should be nested within the ".tl-tabs__disclosure:nth-of-type(1) > button" element
