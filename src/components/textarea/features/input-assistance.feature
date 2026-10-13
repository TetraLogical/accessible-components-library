@textArea @input-assistance
Feature: Textarea — Input assistance
  Helping people to complete forms, enter data and pass authentication

  User story:
    As a person who completes forms or enters data
    I want clear labels, helpful error messages, and accessible authentication
    so that I can successfully complete tasks without confusion or frustration.

  Background:
    Given I load the sample "http://localhost:8081/textarea/examples/default"

  # ----------------------------------------------------------------------------
  # Understandable
  # ----------------------------------------------------------------------------

  @3.3.2 @a @manual
  Rule: 3.3.2 Labels or Instructions, Level A
    Scenario: The persistent label makes the expected input clear
      When I view the rendered ".tl-textarea label"
      Then it should be easy to understand the expected input from the label text
