@textArea @navigation
Feature: Textarea — Navigation
  Helping people find the content they are looking for on a single page or across multiple pages

  User story:
    As a person who uses a screen reader or has cognitive impairments
    I want clear link purposes, headings, and multiple ways to find content
    so that I can efficiently locate the information I need and understand where I am in the site structure.

  Background:
    Given I load the sample "http://localhost:8081/textarea/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.4.6 @aa @manual
  Rule: 2.4.6 Headings and Labels, Level AA
    Scenario: The textarea has a clear and accurate label that informs the user about the expected input
      When I view the rendered ".tl-textarea label"
      Then it should be easy to understand the expected input from the label text
