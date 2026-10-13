@disclosure @navigation
Feature: Disclosure — Navigation
  Helping people find the content they are looking for on a single page or across multiple pages

  User story:
    As a person who uses a screen reader or has cognitive impairments
    I want clear labels and well-organised content
    so that I can efficiently locate the information I need.

  Background:
    Given I load the sample "http://localhost:8081/disclosure/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.4.6 @aa @manual
  Rule: 2.4.6 Headings and Labels, Level AA
    Scenario: The disclosure trigger's label clearly describes the content that will be revealed
      When I view the rendered ".tl-disclosure > button"
      Then it should be easy to understand the topic or purpose from the label text

  @recommendation @automatic
  Rule: Recommendation
    Scenario: Collapsed content is hidden until found, so find in page can reveal it
      When I inspect "#disclosure-content" in the DOM
      Then it should have the attribute "hidden" with the value "until-found"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: Following a link to an anchor inside collapsed content expands the disclosure
      When I navigate to the fragment "#disclosure-content"
      And I inspect ".tl-disclosure > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I inspect "#disclosure-content" in the DOM
      Then it should not have the attribute "hidden"

    Scenario: Opening the page at an anchor inside collapsed content expands the disclosure
      Given I load the sample "http://localhost:8081/disclosure/examples/with-heading#disclosure-content"
      When I inspect ".tl-disclosure > h2 > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I inspect "#disclosure-content" in the DOM
      Then it should not have the attribute "hidden"
