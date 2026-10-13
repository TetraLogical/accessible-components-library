@textInput @keyboard
Feature: Text Input — Keyboard
  Helping people who use a keyboard

  User story:
    As a keyboard user
    I want components that follow a logical tab order and provide visible, predictable focus states
    so that I can move through the interface efficiently and operate every feature without using a mouse.

  Background:
    Given I load the sample "http://localhost:8081/text-input/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario: The text input is focusable using the Tab key
      When I focus ".tl-text-input input" using a keyboard
      Then ".tl-text-input input" should be focused

  @2.1.2 @a @automatic
  Rule: 2.1.2 No Keyboard Trap, Level A
    Scenario: The text input does not trap focus going forwards
      When I focus ".tl-text-input input"
      And I press the 'TAB' key once
      Then the focus should not be on a '.tl-text-input input' element

  @2.1.2 @a @automatic
  Rule: 2.1.2 No Keyboard Trap, Level A
    Scenario: The text input does not trap focus going backwards
      When I focus ".tl-text-input input"
      And I hold the 'SHIFT' key
      And I press the 'TAB' key once
      Then the focus should not be on a '.tl-text-input input' element

  @2.4.7 @aa @automatic
  Rule: 2.4.7 Focus Visible, Level AA
    Scenario: The text input has a visible focus indicator when it receives keyboard focus
      When I focus ".tl-text-input input" using a keyboard
      Then it should have a visible focus indicator

  @2.4.11 @aa @automatic
  Rule: 2.4.11 Focus Not Obscured (Minimum), Level AA
    Scenario: The text input is not fully hidden by other content when it receives keyboard focus
      When I focus ".tl-text-input input" using a keyboard
      Then it should have a visible focus indicator
      And its focus indicator should be at least partially visible

  @2.1.3 @aaa @automatic
  Rule: 2.1.3 Keyboard (No Exception), Level AAA
    Scenario: The text input is operable by keyboard with no exceptions
      When I focus ".tl-text-input input" using a keyboard
      Then ".tl-text-input input" should be focused

  @2.4.12 @aaa @automatic
  Rule: 2.4.12 Focus Not Obscured (Enhanced), Level AAA
    Scenario: Focus is not even partially hidden by other content
      When I focus ".tl-text-input input" using a keyboard
      Then it should have a visible focus indicator
      And its focus indicator should be fully visible

  @2.4.13 @aaa @automatic
  Rule: 2.4.13 Focus Appearance, Level AAA
    Scenario: The custom focus style has a solid 2 pixel thick perimeter, or equivalent, and a contrast ratio of at least 3:1 against the background
      When I focus ".tl-text-input input" using a keyboard
      Then it should have a visible focus indicator
      And the focus indicator should have a contrast ratio of 3:1 against its background
      And its focus indicator should have a minimum perimiter thickness of 2px
