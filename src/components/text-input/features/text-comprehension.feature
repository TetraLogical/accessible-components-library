@textInput @text-comprehension
Feature: Text Input — Text comprehension
  Helping people to read and understand text content

  User story:
    As a person who may struggle with complex language or symbols
    I want optional fields to be marked in plain words
    so that I can complete the form without guessing what a symbol means.

  Background:
    Given I load the sample "http://localhost:8081/text-input/examples/default"

  # ----------------------------------------------------------------------------
  # Understandable
  # ----------------------------------------------------------------------------

  @recommendation @automatic
  Rule: Recommendation
    Scenario: An optional text input has the text "(optional)" in its label
      Given I load the sample "http://localhost:8081/text-input/examples/without-hint"
      When I inspect ".tl-text-input label" in the DOM
      Then it should contain the text "(optional)"

  @recommendation @automatic
  Rule: Recommendation
    Scenario: An asterisk is not used to indicate that a text input is required
      When I inspect ".tl-text-input" in the DOM
      Then it should not contain the text "*"
