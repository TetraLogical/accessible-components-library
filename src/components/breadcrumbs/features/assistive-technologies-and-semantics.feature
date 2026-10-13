@breadcrumbs @assistive-technologies-and-semantics
Feature: Breadcrumbs — Assistive technologies and semantics
  Helping people who use a screen reader or other assistive tech by using appropriate code

  User story:
    As a person who uses assistive technology
    I want components that use semantic markup, roles, and states that my tools can interpret
    so that I can navigate, understand, and operate the interface reliably.

  Background:
    Given I load the sample "http://localhost:8081/breadcrumbs/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------
  @1.3.1 @a @automatic
  Rule: 1.3.1 Info and Relationships, Level A
    Scenario Outline: If text characters are used as visual separators between breadcrumb items to indicate hierarchy, they are not conveyed to screen readers
      When I inspect "<element>" in the Accessibility Tree
      And it has the pseudo element "::before"
      Then its accessible name and visible text should be identical
      Examples:
        | element                       |
        | .tl-breadcrumbs li:nth-child(2) a |
        | .tl-breadcrumbs li:nth-child(3) a |

  @1.3.1 @a @automatic
  Rule: 1.3.1 Info and Relationships, Level A
    Scenario: If the last item in the breadcrumbs represents the current page and is visually different, the aria-current attribute is used to programmatically identify it
      When I inspect ".tl-breadcrumbs li:nth-child(3) a" in the DOM
      Then it should have the attribute "aria-current" with the value "page"

  @1.3.2 @a @automatic
  Rule: 1.3.2 Meaningful Sequence, Level A
    Scenario Outline: The order of content in the HTML matches the reading order
      When I inspect "<element>" in the DOM
      Then it is positioned after the "<previous_element>" element in the DOM
      Examples:
        | element                       | previous_element              |
        | .tl-breadcrumbs li:nth-child(2) a | .tl-breadcrumbs li:nth-child(1) a |
        | .tl-breadcrumbs li:nth-child(3) a | .tl-breadcrumbs li:nth-child(2) a |

  @2.5.3 @a @automatic
  Rule: 2.5.3 Label in Name, Level A
    Scenario Outline: Each link has an accessible name that matches or includes the visible label
      When I view the rendered "<element>"
      Then it should have an accessible name which contains the visible label "<visible_label>"
      Examples:
        | element                           | visible_label |
        | .tl-breadcrumbs li:nth-child(1) a | Home          |
        | .tl-breadcrumbs li:nth-child(2) a | About         |
        | .tl-breadcrumbs li:nth-child(3) a | Team          |

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario Outline: Each link has an accessible name
      When I inspect "<element>" in the DOM
      Then it should have an accessible name
      And its accessible name should be "<name>"
      Examples:
        | element                           | name  |
        | .tl-breadcrumbs li:nth-child(1) a | Home  |
        | .tl-breadcrumbs li:nth-child(2) a | About |
        | .tl-breadcrumbs li:nth-child(3) a | Team  |

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario Outline: Each link has the correct accessible role
      When I inspect "<element>" in the DOM
      Then it should have an accessible role of "<role>"
      Examples:
        | element                       | role |
        | .tl-breadcrumbs li:nth-child(1) a | link |
        | .tl-breadcrumbs li:nth-child(2) a | link |
        | .tl-breadcrumbs li:nth-child(3) a | link |

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: A navigation landmark is used to identify a navigation region
      When I inspect ".tl-breadcrumbs" in the DOM
      Then it should have an accessible role of "navigation"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: Markup can be parsed without errors
      When I inspect ".tl-breadcrumbs" in the DOM
      Then it should use valid HTML with no parsing errors

  @recommendation @automatic
  Rule: Recommendation
    Scenario Outline: Each link is implemented as an <a> element with an href attribute
      When I inspect "<element>" in the DOM
      Then it should use the tag "a"
      And it should have the attribute "<attribute>" with the value "<value>"
      Examples:
        | element                           | attribute | value       |
        | .tl-breadcrumbs li:nth-child(1) a | href      | /           |
        | .tl-breadcrumbs li:nth-child(2) a | href      | /about      |
        | .tl-breadcrumbs li:nth-child(3) a | href      | /about/team |

  @recommendation @automatic
  Rule: Recommendation
    Scenario Outline: An ordered list is used to provide structure for the breadcrumb items
      When I inspect "<element>" in the DOM
      Then it should use the tag "<tag>"
      Examples:
        | element                        | tag |
        | .tl-breadcrumbs > ol               | ol  |
        | .tl-breadcrumbs ol li:nth-child(1) | li  |
        | .tl-breadcrumbs ol li:nth-child(2) | li  |
        | .tl-breadcrumbs ol li:nth-child(3) | li  |
      
  @recommendation @automatic
  Rule: Recommendation
    Scenario: The navigation landmark has a descriptive accessible name such as "Breadcrumb"
      When I inspect ".tl-breadcrumbs" in the DOM
      Then it should have an accessible name
      And its accessible name should be "Breadcrumb"