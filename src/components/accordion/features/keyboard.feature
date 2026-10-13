@accordion @keyboard
Feature: Accordion — Keyboard
  Helping people who use a keyboard

  User story:
    As a keyboard user
    I want components that follow a logical tab order and provide visible, predictable focus states
    so that I can move through the interface efficiently and operate every feature without using a mouse.

  Background:
    Given I load the sample "http://localhost:8081/accordion/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario: A trigger can be focused using the Tab key
      When I focus ".tl-accordion__section:nth-of-type(1) > button" using a keyboard
      Then ".tl-accordion__section:nth-of-type(1) > button" should be focused

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario: A trigger can be activated using the Enter key
      When I focus ".tl-accordion__section:nth-of-type(2) > button"
      And I press the "Enter" key once
      And I inspect ".tl-accordion__section:nth-of-type(2) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I press the "Enter" key once
      And I inspect ".tl-accordion__section:nth-of-type(2) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario: A trigger can be activated using the Space key
      When I focus ".tl-accordion__section:nth-of-type(2) > button"
      And I press the "Space" key once
      And I inspect ".tl-accordion__section:nth-of-type(2) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I press the "Space" key once
      And I inspect ".tl-accordion__section:nth-of-type(2) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario: The Show all sections button can be focused using the Tab key
      When I focus ".tl-accordion__toggle-all" using a keyboard
      Then ".tl-accordion__toggle-all" should be focused

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario: The Show all sections button can be activated using the Enter key
      When I focus ".tl-accordion__toggle-all"
      And I press the "Enter" key once
      And I inspect ".tl-accordion__section:nth-of-type(1) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I press the "Enter" key once
      And I inspect ".tl-accordion__section:nth-of-type(1) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario: The Show all sections button can be activated using the Space key
      When I focus ".tl-accordion__toggle-all"
      And I press the "Space" key once
      And I inspect ".tl-accordion__section:nth-of-type(3) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "true"
      When I press the "Space" key once
      And I inspect ".tl-accordion__section:nth-of-type(3) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"

  @2.1.2 @a @automatic
  Rule: 2.1.2 No Keyboard Trap, Level A
    Scenario: The accordion does not trap focus going forwards
      When I focus ".tl-accordion__section:nth-of-type(3) > button"
      And I press the "TAB" key once
      Then the focus should not be on a ".tl-accordion__section > button" element

  @2.1.2 @a @automatic
  Rule: 2.1.2 No Keyboard Trap, Level A
    Scenario: The accordion does not trap focus going backwards
      When I focus ".tl-accordion__section:nth-of-type(1) > button"
      And I hold the "SHIFT" key
      And I press the "TAB" key once
      Then the focus should not be on a ".tl-accordion__section > button" element

  @2.1.2 @a @automatic
  Rule: 2.1.2 No Keyboard Trap, Level A
    Scenario: The accordion does not trap focus once every section is expanded
      When I click on ".tl-accordion__toggle-all"
      And I focus ".tl-accordion__section:nth-of-type(3) > button"
      And I press the "TAB" key once
      Then the focus should not be on a ".tl-accordion__section > button" element

  @2.4.3 @a @automatic
  Rule: 2.4.3 Focus Order, Level A
    Scenario Outline: In the one-at-a-time variant, the triggers receive focus in a logical order
      Given I load the sample "http://localhost:8081/accordion/examples/one-at-a-time"
      When I focus "<element>"
      And I press the "TAB" key once
      Then "<next_element>" should be focused
      Examples:
        | element                                         | next_element                                    |
        | .tl-accordion__section:nth-of-type(2) > button | .tl-accordion__section:nth-of-type(3) > button |

  @2.4.3 @a @automatic
  Rule: 2.4.3 Focus Order, Level A
    Scenario: Focus moves into the expanded section before it reaches the next trigger
      Given I load the sample "http://localhost:8081/accordion/examples/one-at-a-time"
      When I focus ".tl-accordion__section:nth-of-type(1) > button"
      And I press the "TAB" key once
      Then "#accordion-one-at-a-time-content-1 .demo-link" should be focused
      When I press the "TAB" key once
      Then ".tl-accordion__section:nth-of-type(2) > button" should be focused

  @2.4.3 @a @automatic
  Rule: 2.4.3 Focus Order, Level A
    Scenario: The content of a collapsed section is not in the tab order
      Given I load the sample "http://localhost:8081/accordion/examples/one-at-a-time"
      When I click on ".tl-accordion__section:nth-of-type(1) > button"
      And I focus ".tl-accordion__section:nth-of-type(1) > button"
      And I press the "TAB" key once
      Then ".tl-accordion__section:nth-of-type(2) > button" should be focused

  @2.4.3 @a @automatic
  Rule: 2.4.3 Focus Order, Level A
    Scenario Outline: The Show all sections button and the triggers receive focus in a logical order
      When I focus "<element>"
      And I press the "TAB" key once
      Then "<next_element>" should be focused
      Examples:
        | element                                         | next_element                                    |
        | .tl-accordion__toggle-all                       | .tl-accordion__section:nth-of-type(1) > button |
        | .tl-accordion__section:nth-of-type(1) > button | .tl-accordion__section:nth-of-type(2) > button |
        | .tl-accordion__section:nth-of-type(2) > button | .tl-accordion__section:nth-of-type(3) > button |

  @2.4.7 @aa @automatic
  Rule: 2.4.7 Focus Visible, Level AA
    Scenario: A trigger has a visible focus indicator when it receives keyboard focus
      When I focus ".tl-accordion__section:nth-of-type(1) > button" using a keyboard
      Then it should have a visible focus indicator

  @2.4.7 @aa @automatic
  Rule: 2.4.7 Focus Visible, Level AA
    Scenario: The Show all sections button has a visible focus indicator when it receives keyboard focus
      When I focus ".tl-accordion__toggle-all" using a keyboard
      Then it should have a visible focus indicator

  @2.4.11 @aa @automatic
  Rule: 2.4.11 Focus Not Obscured (Minimum), Level AA
    Scenario Outline: The triggers and the Show all sections button are not fully hidden by other content when they receive keyboard focus
      When I focus "<element>" using a keyboard
      Then it should have a visible focus indicator
      And its focus indicator should be at least partially visible
      Examples:
        | element                                         |
        | .tl-accordion__toggle-all                       |
        | .tl-accordion__section:nth-of-type(1) > button |

  @2.1.3 @aaa @automatic
  Rule: 2.1.3 Keyboard (No Exception), Level AAA
    Scenario: The accordion component is accessible by keyboard, with no exceptions
      When I view the rendered ".tl-accordion"
      Then every interactive control should be reachable using the keyboard

  @2.4.12 @aaa @automatic
  Rule: 2.4.12 Focus Not Obscured (Enhanced), Level AAA
    Scenario Outline: The triggers and the Show all sections button are fully visible when they receive keyboard focus
      When I focus "<element>" using a keyboard
      Then it should have a visible focus indicator
      And its focus indicator should be fully visible
      Examples:
        | element                                         |
        | .tl-accordion__toggle-all                       |
        | .tl-accordion__section:nth-of-type(1) > button |

  @2.4.13 @aaa @automatic
  Rule: 2.4.13 Focus Appearance, Level AAA
    Scenario Outline: The custom focus style has a solid 2 pixel thick perimeter, or equivalent, and a contrast ratio of at least 3:1
      When I focus "<element>" using a keyboard
      Then it should have a visible focus indicator
      And the focus indicator should have a contrast ratio of 3:1 against its background
      And its focus indicator should have a minimum perimiter thickness of 2px
      Examples:
        | element                                         |
        | .tl-accordion__toggle-all                       |
        | .tl-accordion__section:nth-of-type(1) > button |
