@accordion @navigation
Feature: Accordion — Navigation
  Helping people find the content they are looking for on a single page or across multiple pages

  User story:
    As a person who uses a screen reader or has cognitive impairments
    I want clear labels and well-organised content
    so that I can efficiently locate the information I need.

  Background:
    Given I load the sample "http://localhost:8081/accordion/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.4.6 @aa @manual
  Rule: 2.4.6 Headings and Labels, Level AA
    Scenario Outline: Each trigger clearly describes the content that will be revealed
      When I view the rendered "<element>"
      Then it should be easy to understand the topic or purpose from the label text
      Examples:
        | element                                         |
        | .tl-accordion__section:nth-of-type(1) > button |
        | .tl-accordion__section:nth-of-type(2) > button |
        | .tl-accordion__section:nth-of-type(3) > button |

  @2.4.6 @aa @manual
  Rule: 2.4.6 Headings and Labels, Level AA
    Scenario: The Show all sections button clearly describes what it will do
      When I view the rendered ".tl-accordion__toggle-all"
      Then it should be easy to understand the topic or purpose from the label text

  @recommendation @automatic
  Rule: Recommendation
    Scenario: Collapsed sections are hidden until found, so find in page can reveal them
      When I inspect "#accordion-content-2" in the DOM
      Then it should have the attribute "hidden" with the value "until-found"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: Following a link to an anchor inside a collapsed section expands that section only
      When I navigate to the fragment "#accordion-content-2"
      And I inspect ".tl-accordion__section:nth-of-type(2) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I inspect ".tl-accordion__section:nth-of-type(1) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"
      When I inspect ".tl-accordion__toggle-all" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"

    Scenario: Opening the page at an anchor inside a section of a one at a time accordion opens that section instead of the first
      Given I load the sample "http://localhost:8081/accordion/examples/one-at-a-time#accordion-one-at-a-time-content-2"
      When I inspect ".tl-accordion__section:nth-of-type(2) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I inspect ".tl-accordion__section:nth-of-type(1) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"
