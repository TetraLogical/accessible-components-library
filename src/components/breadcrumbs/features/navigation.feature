@breadcrumbs @navigation
Feature: Breadcrumbs — Navigation
  Helping people find the content they are looking for on a single page or across multiple pages

  User story:
    As a person who uses a screen reader or has cognitive impairments
    I want clear link purposes, headings, and multiple ways to find content
    so that I can efficiently locate the information I need and understand where I am in the site structure.

  Background:
    Given I load the sample "http://localhost:8081/breadcrumbs/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.4.4 @a @manual
  Rule: 2.4.4 Link Purpose (In Context), Level A
    Scenario Outline: The purpose of each link is clear from the link text, or the link text and its surrounding context
      When I view the rendered "<element>"
      Then it should be easy to understand the purpose of each link from its text and surrounding context
      Examples:
        | element                       |
        | .tl-breadcrumbs li:nth-child(1) a |
        | .tl-breadcrumbs li:nth-child(2) a |
        | .tl-breadcrumbs li:nth-child(3) a |

  @2.4.8 @aaa @automatic
  Rule: 2.4.8 Location, Level AAA
    Scenario: Provide indication of current location within a set of pages
      When I inspect '.tl-breadcrumbs li:nth-child(3) a' in the DOM
      Then it should have the attribute "aria-current" with the value "page"
      And it should have the CSS property "text-decoration-thickness" with the value "3.2px"
      
  @2.4.9 @aaa @manual
  Rule: 2.4.9 Link Purpose (Link Only), Level AAA
    Scenario Outline: The purpose of each link is clear from the link text alone
      When I view the rendered "<element>"
      Then it should be easy to understand the purpose of each link from its text alone
      Examples:
        | element                       |
        | .tl-breadcrumbs li:nth-child(1) a |
        | .tl-breadcrumbs li:nth-child(2) a |
        | .tl-breadcrumbs li:nth-child(3) a |

  @recommendation @automatic
  Rule: Recommendation
    Scenario Outline: Each link is underlined so it looks like a typical link, apart from the last item if it represents the current page
      When I view the rendered "<element>"
      Then it should be visually identifiable as a link without relying on colour alone
      Examples:
      | element                       |
      | .tl-breadcrumbs li:nth-child(1) a |
      | .tl-breadcrumbs li:nth-child(2) a |
      | .tl-breadcrumbs li:nth-child(3) a |
        
  @recommendation @automatic
  Rule: Recommendation
    Scenario Outline: Visual separators are used between breadcrumb items to indicate hierarchy
      When I inspect "<element>" in the DOM
      Then it should have a visible separator between elements using a '::before' element
      Examples:
        | element                       |
        | .tl-breadcrumbs li:nth-child(2) a |
        | .tl-breadcrumbs li:nth-child(3) a |
  
  @recommendation @automatic
  Rule: Recommendation
    Scenario Outline: The breadcrumb links are displayed in a row below the primary navigation, left-aligned, and with the current page the last element in the list
      When I inspect "<element>" in the DOM
      Then it is "<aligned>" aligned visually to the "<previous>" element
      Examples:
        | element     | previous | aligned |
        | .tl-breadcrumbs | nav      | left    |
