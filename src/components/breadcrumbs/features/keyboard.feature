@breadcrumbs @keyboard
Feature: Breadcrumbs — Keyboard
  Helping people who use a keyboard

  User story:
    As a keyboard user
    I want components that follow a logical tab order and provide visible, predictable focus states
    so that I can move through the interface efficiently and operate every feature without using a mouse.

  Background:
    Given I load the sample "http://localhost:8081/breadcrumbs/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------
  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario Outline: Each link is focusable using the Tab key
      When I focus "<element>"
      And I press the 'TAB' key once
      Then "<next element>" should be focused
      Examples:
        | element                       | next element                  |
        | .tl-breadcrumbs li:nth-child(1) a | .tl-breadcrumbs li:nth-child(2) a |
        | .tl-breadcrumbs li:nth-child(2) a | .tl-breadcrumbs li:nth-child(3) a |
  
  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario Outline: Each link is clickable using the Enter key
      When I focus "<element>"
      And I press the 'ENTER' key once
      Then it should navigate to a new page
      Examples:
        | element                       |
        | .tl-breadcrumbs li:nth-child(1) a |
        | .tl-breadcrumbs li:nth-child(2) a |
        | .tl-breadcrumbs li:nth-child(3) a |

  @2.1.2 @a @automatic
  Rule: 2.1.2 No Keyboard Trap, Level A
    Scenario: Each link does not trap focus going forwards
    When I focus '.tl-breadcrumbs li:last-child a'
    And I press the 'TAB' key once
    Then the focus should not be on a '.tl-breadcrumbs a' element

  @2.1.2 @a @automatic
  Rule: 2.1.2 No Keyboard Trap, Level A
    Scenario: Each link does not trap focus going backwards
      When I focus '.tl-breadcrumbs li:first-child a'
      And I hold the 'SHIFT' key
      And I press the 'TAB' key once
      Then the focus should not be on a '.tl-breadcrumbs a' element
  
  @2.4.3 @a @automatic
  Rule: 2.4.3 Focus Order, Level A
    Scenario Outline: Each link receives focus in logical order
      When I focus "<element>"
      And I press the 'TAB' key once
      Then "<next element>" should be focused
      Examples:
        | element                       | next element                  |
        | .tl-breadcrumbs li:nth-child(1) a | .tl-breadcrumbs li:nth-child(2) a |
        | .tl-breadcrumbs li:nth-child(2) a | .tl-breadcrumbs li:nth-child(3) a |
  
  @2.4.7 @aa @automatic
  Rule: 2.4.7 Focus Visible, Level AA
    Scenario Outline: Keyboard focus indicator is visible and discernible
      When I focus "<element>" using a keyboard
      Then it should have a visible focus indicator
      Examples:
        | element                     |
        | .tl-breadcrumbs li:nth-child(1) |
        | .tl-breadcrumbs li:nth-child(2) |
        | .tl-breadcrumbs li:nth-child(3) |

  @2.4.11 @aa @automatic
  Rule: 2.4.11 Focus Not Obscured (Minimum), Level AA
    Scenario Outline: Each link is not fully hidden by other content when it receives keyboard focus
      When I focus "<element>" using a keyboard
      Then it should have a visible focus indicator
      And its focus indicator should be at least partially visible
      Examples:
        | element                     |
        | .tl-breadcrumbs li:nth-child(1) |
        | .tl-breadcrumbs li:nth-child(2) |
        | .tl-breadcrumbs li:nth-child(3) |

  @2.4.12 @aaa @automatic
  Rule: 2.4.12 Focus Not Obscured (Enhanced), Level AAA
    Scenario Outline: Focus is not even partially hidden by other content
      When I focus "<element>" using a keyboard
      Then it should have a visible focus indicator
      And its focus indicator should be fully visible
      Examples:
        | element                     |
        | .tl-breadcrumbs li:nth-child(1) |
        | .tl-breadcrumbs li:nth-child(2) |
        | .tl-breadcrumbs li:nth-child(3) |

  @2.4.13 @aaa @automatic
  Rule: 2.4.13 Focus Appearance, Level AAA
    Scenario Outline: Each link has a custom focus style with a solid 2 pixel thick perimeter, or equivalent, and a contrast ratio of at least 3:1 against the background colour
      When I focus "<element>" using a keyboard
      Then it should have a visible focus indicator
      And the focus indicator should have a contrast ratio of 3:1 against its background
      And its focus indicator should have a minimum perimiter thickness of 2px
      Examples:
        | element                     |
        | .tl-breadcrumbs li:nth-child(1) |
        | .tl-breadcrumbs li:nth-child(2) |
        | .tl-breadcrumbs li:nth-child(3) |
  
