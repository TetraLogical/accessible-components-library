@disclosure @images-and-media
Feature: Disclosure — Images and media
  Helping people to access (and remove distractions caused by) image, video and audio content

  User story:
    As a person who cannot see images
    I want appropriate text alternatives for images
    so that I can access the same information as everyone else.

  Background:
    Given I load the sample "http://localhost:8081/disclosure/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------

  @1.1.1 @a @automatic
  Rule: 1.1.1 Non-text Content, Level A
    Scenario: The icon is hidden from screen readers, because the trigger has a visible text label
      When I inspect ".tl-disclosure > button svg" in the DOM
      Then it should have the attribute "aria-hidden" with the value "true"
      When I inspect ".tl-disclosure > button" in the Accessibility Tree
      Then its accessible name should be "World Wide Web Consortium"

  @1.1.1 @a @automatic
  Rule: 1.1.1 Non-text Content, Level A
    Scenario: If the disclosure trigger uses an icon without a visible text label, the icon has a text description
      When I view the rendered ".tl-disclosure > button"
      Then any icon should have a text description, or be hidden from assistive technologies
