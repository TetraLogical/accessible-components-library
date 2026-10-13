@breadcrumbs @consistency-and-predictability
Feature: Breadcrumbs — Consistency and predictability
  Helping people by keeping functionality consistent and predictable

  User story:
    As a person who benefits from consistent and predictable interfaces
    I want components that behave in expected ways and don't cause unexpected changes
    so that I can navigate and interact with confidence.

  Background:
    Given I load the sample "http://localhost:8081/breadcrumbs/examples/default"

  # ----------------------------------------------------------------------------
  # Understandable
  # ----------------------------------------------------------------------------

  @3.2.1 @a @automatic
  Rule: 3.2.1 On Focus, Level A
    Scenario Outline: Receiving focus does not initiate a change of context
      When I focus "<element>" using a keyboard
      Then it should NOT navigate to a new page
      Examples:
        | element                       | 
        | .tl-breadcrumbs li:nth-child(1) a |
        | .tl-breadcrumbs li:nth-child(2) a |
        | .tl-breadcrumbs li:nth-child(3) a |

  @3.2.3 @aa @automatic
  Rule: 3.2.3 Consistent Navigation, Level AA
    Scenario: The location of the breadcrumbs component is consistent on multiple pages
      When I inspect '.tl-breadcrumbs' in the DOM
      Then it is positioned after the 'body' element in the DOM

  @3.2.4 @aa @automatic
  Rule: 3.2.4 Consistent Identification, Level AA
    Scenario: The breadcrumbs component is identified consistently on multiple pages
      When I inspect '.tl-breadcrumbs' in the DOM
      Then its accessible name should be 'Breadcrumb'
