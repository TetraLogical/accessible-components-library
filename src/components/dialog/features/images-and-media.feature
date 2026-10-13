@dialog @images-and-media
Feature: Dialog — Images and media
  Helping people to access (and remove distractions caused by) image, video and audio content

  User story:
    As a person who cannot see images
    I want appropriate text alternatives for images
    so that I can access the same information as everyone else.

  Background:
    Given I load the sample "http://localhost:8081/dialog/examples/non-modal"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------

  @1.1.1 @a @automatic
  Rule: 1.1.1 Non-text Content, Level A
    Scenario: If an icon is the only content of the close button, it has a text alternative; if a text label is also available, the icon is hidden from screen readers
      When I click on "#dialog-trigger"
      And I view the rendered '#dialog-close'
      Then any icon should have a text description, or be hidden from assistive technologies

  @1.1.1 @a @automatic
  Rule: 1.1.1 Non-text Content, Level A
    Scenario: The close button has an accessible name, whether it uses a text label or an icon
      When I click on "#dialog-trigger"
      And I inspect "#dialog-close" in the DOM
      Then it should have an accessible name

  @1.1.1 @a @automatic
  Rule: 1.1.1 Non-text Content, Level A
    Scenario: The icon within the close button is hidden from assistive technologies
      When I click on "#dialog-trigger"
      And I inspect "#dialog-close svg" in the DOM
      Then it should have the attribute "aria-hidden" with the value "true"
