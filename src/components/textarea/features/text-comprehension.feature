@textArea @text-comprehension
Feature: Textarea — Text comprehension
  Helping people to read and understand text content

  User story:
    As a person who may struggle with complex language or symbols
    I want optional fields to be marked in plain words
    so that I can complete the form without guessing what a symbol means.

  Background:
    Given I load the sample "http://localhost:8081/textarea/examples/default"

  # ----------------------------------------------------------------------------
  # Understandable
  # ----------------------------------------------------------------------------

  @recommendation @automatic
  Rule: Recommendation
    Scenario: An optional textarea has the text "(optional)" in its label
      Given I load the sample "http://localhost:8081/textarea/examples/without-hint"
      When I inspect ".tl-textarea label" in the DOM
      Then it should contain the text "(optional)"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: An asterisk is not used to indicate that a textarea is required
      When I inspect ".tl-textarea" in the DOM
      Then it should not contain the text "*"
