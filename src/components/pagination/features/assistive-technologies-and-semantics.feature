@pagination @assistive-technologies-and-semantics
Feature: Pagination — Assistive technologies and semantics
  Helping people who use a screen reader or other assistive tech by using appropriate code

  User story:
    As a person who uses assistive technology
    I want components that use semantic markup, roles, and states that my tools can interpret
    so that I can navigate, understand, and operate the interface reliably.
  
  Background:
    Given I load the sample "http://localhost:8081/pagination/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------
  
  @1.3.1 @a @automatic
  Rule: 1.3.1 Info and Relationships, Level A
    Scenario: A navigation landmark is used to identify the pagination component
      When I inspect ".tl-pagination" in the DOM
      Then it should use the tag "nav"

  @1.3.1 @a @automatic
  Rule: 1.3.1 Info and Relationships, Level A
    Scenario: The link that visually indicates the current page communicates the state programmatically or as text
      When I inspect ".tl-pagination li:nth-child(5) a" in the DOM
      Then it should have the attribute "aria-current" with the value "page"

  @1.3.2 @a @automatic
  Rule: 1.3.2 Meaningful Sequence, Level A
    Scenario Outline: A correct reading sequence can be programmatically determined
      When I inspect "<element>" in the DOM
      Then it is positioned after the "<previous_element>" element in the DOM
        Examples:
          | element                             | previous_element                    |
          | .tl-pagination > ol                 | .tl-pagination > a:first-child      |
          | .tl-pagination > ol + a             | .tl-pagination > ol                 |
          | .tl-pagination li:nth-child(1) a    | .tl-pagination > ol                 |
          | .tl-pagination li:nth-child(2) .visually-hidden | .tl-pagination li:nth-child(1) a    |
          | .tl-pagination li:nth-child(3) a    | .tl-pagination li:nth-child(2) .visually-hidden |
          | .tl-pagination li:nth-child(4) a    | .tl-pagination li:nth-child(3) a    |
          | .tl-pagination li:nth-child(5) a    | .tl-pagination li:nth-child(4) a    |
          | .tl-pagination li:nth-child(6) a    | .tl-pagination li:nth-child(5) a    |
          | .tl-pagination li:nth-child(7) a    | .tl-pagination li:nth-child(6) a    |
          | .tl-pagination li:nth-child(8) a    | .tl-pagination li:nth-child(7) a    |
          | .tl-pagination li:nth-child(9) .visually-hidden | .tl-pagination li:nth-child(8) a    |
          | .tl-pagination li:nth-child(10) a   | .tl-pagination li:nth-child(9) .visually-hidden |

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.5.3 @a @automatic
  Rule: 2.5.3 Label in Name, Level A
    Scenario Outline: Each link has an accessible name that matches or includes the visible label
      When I inspect "<element>" in the Accessibility Tree
      Then it should have an accessible name which contains the visible label "<visible_label>"
        Examples:
          | element                             | visible_label |
          | .tl-pagination > a:first-child      | Previous      |
          | .tl-pagination > ol + a             | Next          |
          | .tl-pagination li:nth-child(1) a    | 1             |
          | .tl-pagination li:nth-child(3) a    | 4             |
          | .tl-pagination li:nth-child(4) a    | 5             |
          | .tl-pagination li:nth-child(5) a    | 6             |
          | .tl-pagination li:nth-child(6) a    | 7             |
          | .tl-pagination li:nth-child(7) a    | 8             |
          | .tl-pagination li:nth-child(8) a    | 9             |
          | .tl-pagination li:nth-child(10) a   | 13            |

  # ----------------------------------------------------------------------------
  # Robust
  # ----------------------------------------------------------------------------

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario Outline: Each link has an accessible name
      When I inspect "<element>" in the Accessibility Tree
      Then it should have an accessible name
        Examples:
          | element                             |
          | .tl-pagination > a:first-child      |
          | .tl-pagination > ol + a             |
          | .tl-pagination li:nth-child(1) a    |
          | .tl-pagination li:nth-child(3) a    |
          | .tl-pagination li:nth-child(4) a    |
          | .tl-pagination li:nth-child(5) a    |
          | .tl-pagination li:nth-child(6) a    |
          | .tl-pagination li:nth-child(7) a    |
          | .tl-pagination li:nth-child(8) a    |
          | .tl-pagination li:nth-child(10) a   |

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario Outline: Each link has a role of link
      When I inspect "<element>" in the Accessibility Tree
      Then it should have an accessible role of "link"
        Examples:
          | element                           |
          | .tl-pagination > a:first-child    |
          | .tl-pagination > ol + a           |
          | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(3) a  |
          | .tl-pagination li:nth-child(4) a  |
          | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(6) a  |
          | .tl-pagination li:nth-child(7) a  |
          | .tl-pagination li:nth-child(8) a  |
          | .tl-pagination li:nth-child(10) a |

  @4.1.2 @a @automatic
  Rule: 4.1.2 Name, Role, Value, Level A
    Scenario: The link which indicates the current page has a value of aria-current="page"
      When I inspect ".tl-pagination li:nth-child(5) a" in the DOM
      Then it should have the attribute "aria-current" with the value "page"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: Markup can be parsed without errors
      When I inspect ".tl-pagination" in the DOM
      Then it should use valid HTML with no parsing errors

  @recommendation @automatic
  Rule: Recommendation
    Scenario: The navigation landmark has a descriptive accessible name, such as "Pagination"
      When I inspect ".tl-pagination" in the Accessibility Tree
      Then its accessible name should be "Pagination"

  @recommendation @automatic
  Rule: Recommendation
    Scenario Outline: Each link is implemented as an <a> element with a href attribute
      When I inspect "<element>" in the DOM
      Then it should use the tag "a"
      And it should have the attribute "href"
        Examples:
          | element                           |
          | .tl-pagination > a:first-child    |
          | .tl-pagination > ol + a           |
          | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(3) a  |
          | .tl-pagination li:nth-child(4) a  |
          | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(6) a  |
          | .tl-pagination li:nth-child(7) a  |
          | .tl-pagination li:nth-child(8) a  |
          | .tl-pagination li:nth-child(10) a |

  @recommendation @automatic
  Rule: Recommendation
    Scenario: An <ol> is used with role="list" to ensure it is exposed as lists in Safari/VoiceOver
      When I inspect ".tl-pagination > ol" in the DOM
      Then it should have the attribute "role" with the value "list"
