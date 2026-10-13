@textInput @pointer-and-touch
Feature: Text Input — Pointer and touch
  Helping people use single pointer or touch interactions

  User story:
    As a person using touch or pointer input
    I want components with accessible gestures, adequate target sizes, and predictable interactions
    so that I can accurately interact with all functionality.

  Background:
    Given I load the sample "http://localhost:8081/text-input/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.5.8 @aa @automatic
  Rule: 2.5.8 Target Size (Minimum), Level AA
    Scenario: The text input has a target area size and spacing of at least 24 by 24 pixels
      When I view the rendered ".tl-text-input input"
      Then it should have a width and height of at least 24px

  @2.5.5 @aaa @automatic
  Rule: 2.5.5 Target Size (Enhanced), Level AAA
    Scenario: The text input has a target area size and spacing of at least 44 by 44 pixels
      When I view the rendered ".tl-text-input input"
      Then it should have a width and height of at least 44px
