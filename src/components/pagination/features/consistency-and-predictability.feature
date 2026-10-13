@pagination @consistency-and-predictability
Feature: Pagination — Consistency and predictability
  Helping people by keeping functionality and content consistent and predictable

  User story:
    As a person who benefits from consistent and predictable interfaces
    I want components that behave in expected ways and don't cause unexpected changes
    so that I can navigate and interact with confidence.
  
  Background:
    Given I load the sample "http://localhost:8081/pagination/examples/default"

  # ----------------------------------------------------------------------------
  # Understandable
  # ----------------------------------------------------------------------------
  
  @3.2.1 @a @automatic
  Rule: 3.2.1 On Focus, Level A
    Scenario Outline: Each link does not result in a change of context when focused
      When I focus "<element>" using a keyboard
      Then it should NOT navigate to a new page
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

  @3.2.3 @aa @automatic
  Rule: 3.2.3 Consistent Navigation, Level AA
    Scenario Outline: Each link has the same accessible name on different pages
      Given I load the sample "<sample>"
      When I inspect "<element>" in the Accessibility Tree
      Then its accessible name should be "<name>"
        Examples:
          | element                        | name          | sample                                                |
          | .tl-pagination > a:first-child | Previous page | http://localhost:8081/pagination/examples/default        |
          | .tl-pagination > a:first-child | Previous page | http://localhost:8081/pagination/examples/default?page=7 |
          | .tl-pagination > ol + a        | Next page     | http://localhost:8081/pagination/examples/default        |
          | .tl-pagination > ol + a        | Next page     | http://localhost:8081/pagination/examples/default?page=7 |
          | .tl-pagination li:first-child a | 1            | http://localhost:8081/pagination/examples/default        |
          | .tl-pagination li:first-child a | 1            | http://localhost:8081/pagination/examples/default?page=7 |
          | .tl-pagination li:last-child a  | 13           | http://localhost:8081/pagination/examples/default        |
          | .tl-pagination li:last-child a  | 13           | http://localhost:8081/pagination/examples/default?page=7 |

  @recommendation @automatic
  Rule: Recommendation
    Scenario Outline: Each link has a visual style that makes it look like a link, such as an underline or background colour
      When I view the rendered "<element>"
      Then it should have the CSS property "text-decoration-line" with the value "underline"
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
    Scenario: There is a visual cue for the current link
      When I inspect ".tl-pagination li:nth-child(5) a" in the DOM
      Then it should have the CSS property "background-color" with the value "rgb(66, 0, 101)"
      And it should have the CSS property "color" with the value "rgb(255, 255, 255)"
      And it should have the CSS property "font-weight" with the value "700"
