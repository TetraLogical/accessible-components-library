@dialog @navigation
Feature: Dialog — Navigation
  Helping people find the content they are looking for on a single page or across multiple pages

  User story:
    As a person who uses a screen reader or has cognitive impairments
    I want clear link purposes, headings, and multiple ways to find content
    so that I can efficiently locate the information I need and understand where I am in the site structure.

  Background:
    Given I load the sample "http://localhost:8081/dialog/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.4.6 @aa @manual
  Rule: 2.4.6 Headings and Labels, Level AA
    Scenario: The dialog has a clear and descriptive visible heading that communicates its purpose
      When I click on "#dialog-trigger"
      And I view the rendered '#dialog-modal-heading'
      Then it should be easy to understand the topic or purpose from the label text

  @2.4.6 @aa @automatic
  Rule: 2.4.6 Headings and Labels, Level AA
    Scenario: The visible heading is a heading in the code
      When I click on "#dialog-trigger"
      And I inspect "#dialog-modal-heading" in the DOM
      Then it should have an accessible role of "heading"

  @2.4.6 @aa @automatic
  Rule: 2.4.6 Headings and Labels, Level AA
    Scenario: The dialog's accessible name matches its visible heading
      When I click on "#dialog-trigger"
      And I view the rendered '#dialog-modal'
      Then it should have an accessible name which contains the visible label "Do you want to delete your account?"

  @2.4.6 @aa @manual
  Rule: 2.4.6 Headings and Labels, Level AA
    Scenario: A non-modal dialog has a clear and descriptive visible heading that communicates its purpose
      Given I load the sample "http://localhost:8081/dialog/examples/non-modal"
      When I click on "#dialog-trigger"
      And I view the rendered '#dialog-non-modal-heading'
      Then it should be easy to understand the topic or purpose from the label text
