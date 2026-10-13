@tabs @navigation
Feature: Tabs — Navigation
  Helping people find the content they are looking for on a single page or across multiple pages

  User story:
    As a person who uses a screen reader or has cognitive impairments
    I want clear link purposes, headings, and multiple ways to find content
    so that I can efficiently locate the information I need and understand where I am in the site structure.

  Background:
    Given I load the sample "http://localhost:8081/tabs/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.4.6 @aa @manual
  Rule: 2.4.6 Headings and Labels, Level AA
    Scenario Outline: Each tab has a clear and accurate text label that informs users what the content of the tabpanel will be
      When I view the rendered "<element>"
      Then it should be easy to understand the topic or purpose from the label text
      Examples:
        | element       |
        | #tabs-0-tab-1 |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |
