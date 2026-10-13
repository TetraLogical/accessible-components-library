@disclosure @keyboard
Feature: Disclosure — Keyboard
  Helping people who use a keyboard

  User story:
    As a keyboard user
    I want components that follow a logical tab order and provide visible, predictable focus states
    so that I can move through the interface efficiently and operate every feature without using a mouse.

  Background:
    Given I load the sample "http://localhost:8081/disclosure/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario: The disclosure trigger can be focused using the Tab key
      When I focus ".tl-disclosure > button" using a keyboard
      Then ".tl-disclosure > button" should be focused

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario: The disclosure trigger can be activated using the Enter key
      When I focus ".tl-disclosure > button"
      And I press the "Enter" key once
      And I inspect ".tl-disclosure > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I press the "Enter" key once
      And I inspect ".tl-disclosure > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario: The disclosure trigger can be activated using the Space key
      When I focus ".tl-disclosure > button"
      And I press the "Space" key once
      And I inspect ".tl-disclosure > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I press the "Space" key once
      And I inspect ".tl-disclosure > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"

  @2.1.2 @a @automatic
  Rule: 2.1.2 No Keyboard Trap, Level A
    Scenario: The disclosure does not trap focus going forwards
      When I focus ".tl-disclosure > button"
      And I press the "TAB" key once
      Then the focus should not be on a ".tl-disclosure > button" element

  @2.1.2 @a @automatic
  Rule: 2.1.2 No Keyboard Trap, Level A
    Scenario: The disclosure does not trap focus going backwards
      When I focus ".tl-disclosure > button"
      And I hold the "SHIFT" key
      And I press the "TAB" key once
      Then the focus should not be on a ".tl-disclosure > button" element

  @2.1.2 @a @automatic
  Rule: 2.1.2 No Keyboard Trap, Level A
    Scenario: The disclosure does not trap focus once its content is expanded
      When I click on ".tl-disclosure > button"
      And I focus ".tl-disclosure > button"
      And I press the "TAB" key once
      Then the focus should not be on a ".tl-disclosure > button" element

  @2.4.7 @aa @automatic
  Rule: 2.4.7 Focus Visible, Level AA
    Scenario: The disclosure trigger has a visible focus indicator when it receives keyboard focus
      When I focus ".tl-disclosure > button" using a keyboard
      Then it should have a visible focus indicator

  @2.4.11 @aa @automatic
  Rule: 2.4.11 Focus Not Obscured (Minimum), Level AA
    Scenario: The disclosure trigger is not fully hidden by other content when it receives keyboard focus
      When I focus ".tl-disclosure > button" using a keyboard
      Then it should have a visible focus indicator
      And its focus indicator should be at least partially visible

  @2.1.3 @aaa @automatic
  Rule: 2.1.3 Keyboard (No Exception), Level AAA
    Scenario: The disclosure component is accessible by keyboard, with no exceptions
      When I view the rendered ".tl-disclosure"
      Then every interactive control should be reachable using the keyboard

  @2.4.12 @aaa @automatic
  Rule: 2.4.12 Focus Not Obscured (Enhanced), Level AAA
    Scenario: The disclosure trigger is fully visible when it receives keyboard focus
      When I focus ".tl-disclosure > button" using a keyboard
      Then it should have a visible focus indicator
      And its focus indicator should be fully visible

  @2.4.13 @aaa @automatic
  Rule: 2.4.13 Focus Appearance, Level AAA
    Scenario: The custom focus style has a solid 2 pixel thick perimeter, or equivalent, and a contrast ratio of at least 3:1
      When I focus ".tl-disclosure > button" using a keyboard
      Then it should have a visible focus indicator
      And the focus indicator should have a contrast ratio of 3:1 against its background
      And its focus indicator should have a minimum perimiter thickness of 2px
