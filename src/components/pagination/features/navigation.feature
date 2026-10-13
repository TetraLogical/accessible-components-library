@pagination @navigation
Feature: Pagination — Navigation
  Helping people find the content they are looking for on a single page or across multiple pages

  User story:
    As a person navigating a website
    I want clear link purposes, headings, and multiple ways to find content
    so that I can efficiently locate the information I need.
  
  Background:
    Given I load the sample "http://localhost:8081/pagination/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------
  
  @2.4.4 @a @manual
  Rule: 2.4.4 Link Purpose (In Context), Level A
    Scenario Outline: The purpose of each link is clear from the link text, or the link text and its surrounding context
      When I view the rendered "<element>"
      Then it should be easy to understand the purpose of each link from its text and surrounding context
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

  @2.4.9 @aaa @manual
  Rule: 2.4.9 Link Purpose (Link Only), Level AAA
    Scenario Outline: The purpose of each link is clear from the link text alone
      When I view the rendered "<element>"
      Then it should be easy to understand the purpose of each link from its text alone
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
    Scenario Outline: The "Previous" and "Next" links include the term "page" in their accessible name
      When I inspect "<element>" in the Accessibility Tree
      Then its accessible name should be "<name>"
      Examples:
        | element                        | name          |
        | .tl-pagination > a:first-child | Previous page |
        | .tl-pagination > ol + a        | Next page     |

  @recommendation @automatic
  Rule: Recommendation
    Scenario: The Previous link is not rendered on the first page
      Given I load the sample "http://localhost:8081/pagination/examples/default?page=1"
      When I inspect ".tl-pagination > a" in the Accessibility Tree
      Then its accessible name should be "Next page"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: The Next link is not rendered on the last page
      Given I load the sample "http://localhost:8081/pagination/examples/default?page=13"
      When I inspect ".tl-pagination > a" in the Accessibility Tree
      Then its accessible name should be "Previous page"
