@textArea @keyboard
Feature: Textarea — Keyboard
  Helping people who use a keyboard

  User story:
    As a keyboard user
    I want components that follow a logical tab order and provide visible, predictable focus states
    so that I can move through the interface efficiently and operate every feature without using a mouse.

  Background:
    Given I load the sample "http://localhost:8081/textarea/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario: The textarea is focusable using the Tab key
      When I focus ".tl-textarea textarea" using a keyboard
      Then ".tl-textarea textarea" should be focused

  @2.1.2 @a @automatic
  Rule: 2.1.2 No Keyboard Trap, Level A
    Scenario: The textarea does not trap focus going forwards
      When I focus ".tl-textarea textarea"
      And I press the 'TAB' key once
      Then the focus should not be on a '.tl-textarea textarea' element

  @2.1.2 @a @automatic
  Rule: 2.1.2 No Keyboard Trap, Level A
    Scenario: The textarea does not trap focus going backwards
      When I focus ".tl-textarea textarea"
      And I hold the 'SHIFT' key
      And I press the 'TAB' key once
      Then the focus should not be on a '.tl-textarea textarea' element

  @2.4.7 @aa @automatic
  Rule: 2.4.7 Focus Visible, Level AA
    Scenario: The textarea has a visible focus indicator when it receives keyboard focus
      When I focus ".tl-textarea textarea" using a keyboard
      Then it should have a visible focus indicator

  @2.4.11 @aa @automatic
  Rule: 2.4.11 Focus Not Obscured (Minimum), Level AA
    Scenario: The textarea is not fully hidden by other content when it receives keyboard focus
      When I focus ".tl-textarea textarea" using a keyboard
      Then it should have a visible focus indicator
      And its focus indicator should be at least partially visible

  @2.1.3 @aaa @automatic
  Rule: 2.1.3 Keyboard (No Exception), Level AAA
    Scenario: The textarea is operable by keyboard with no exceptions
      When I focus ".tl-textarea textarea" using a keyboard
      Then ".tl-textarea textarea" should be focused

  @2.4.12 @aaa @automatic
  Rule: 2.4.12 Focus Not Obscured (Enhanced), Level AAA
    Scenario: Focus is not even partially hidden by other content
      When I focus ".tl-textarea textarea" using a keyboard
      Then it should have a visible focus indicator
      And its focus indicator should be fully visible

  @2.4.13 @aaa @automatic
  Rule: 2.4.13 Focus Appearance, Level AAA
    Scenario: The custom focus style has a solid 2 pixel thick perimeter, or equivalent, and a contrast ratio of at least 3:1 against the background
      When I focus ".tl-textarea textarea" using a keyboard
      Then it should have a visible focus indicator
      And the focus indicator should have a contrast ratio of 3:1 against its background
      And its focus indicator should have a minimum perimiter thickness of 2px
