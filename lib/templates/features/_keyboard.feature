@{{componentName}} @keyboard
Feature: {{componentName}} — Keyboard
  Helping people who use a keyboard

  User story:
    As a keyboard user
    I want components that follow a logical tab order and provide visible, predictable focus states
    so that I can move through the interface efficiently and operate every feature without using a mouse.

  Background:
    Given I load the sample "{{componentURL}}"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------
  
  @2.1.1 @a @manual
  Rule: 2.1.1 Keyboard, Level A
    Scenario Outline: All functionality works using a keyboard (unless it's an exception)
      # Example test using existing steps  
      # When I focus "<element>"
      # And I press the 'TAB' key once
      # Then "<next element>" should be focused
      # Examples:
      #   | element                       | next element                  |
      #   | .tl-breadcrumbs li:nth-child(1) a | .tl-breadcrumbs li:nth-child(2) a |
      #   | .tl-breadcrumbs li:nth-child(2) a | .tl-breadcrumbs li:nth-child(3) a |

  @2.1.2 @a @manual
  Rule: 2.1.2 No Keyboard Trap, Level A
    Scenario Outline: Focus does not become trapped
      # Example test using existing steps  
      # When I focus '.tl-breadcrumbs li:first-child a'
      # And I hold the 'SHIFT' key
      # And I press the 'TAB' key once
      # Then the focus should not be on a '.tl-breadcrumbs a' element

  @2.1.4 @a @manual
  Rule: 2.1.4 Character Key Shortcuts, Level A
    Scenario Outline: Character-only shortcut keys can be turned off or modified

  @2.4.1 @a @manual
  Rule: 2.4.1 Bypass Blocks, Level A
    Scenario Outline: Repeated content can be skipped over

  @2.4.3 @a @manual
  Rule: 2.4.3 Focus Order, Level A
    Scenario Outline: Focus order is logical
      # Example test using existing steps  
      # When I focus "<element>"
      # And I press the 'TAB' key once
      # Then "<next element>" should be focused
      # Examples:
      #   | element                       | next element                  |
      #   | .tl-breadcrumbs li:nth-child(1) a | .tl-breadcrumbs li:nth-child(2) a |
      #   | .tl-breadcrumbs li:nth-child(2) a | .tl-breadcrumbs li:nth-child(3) a |

  @2.4.7 @aa @manual
  Rule: 2.4.7 Focus Visible, Level AA
    Scenario Outline: Keyboard focus indicator is visible and discernible

  @2.4.11 @aa @manual
  Rule: 2.4.11 Focus Not Obscured (Minimum), Level AA
    Scenario Outline: Focus indicator is not completely hidden by other elements

  @2.1.3 @aaa @automatic
  Rule: 2.1.3 Keyboard (No Exception), Level AAA
    Scenario Outline: Keyboard operability without exception
      # Example test using existing steps
      # When I view the rendered '.tl-breadcrumbs'
      # Then every interactive control should be reachable using the keyboard

  @2.4.12 @aaa @manual
  Rule: 2.4.12 Focus Not Obscured (Enhanced), Level AAA
    Scenario Outline: Focus is not even partially hidden by other content

  @2.4.13 @aaa @manual
  Rule: 2.4.13 Focus Appearance, Level AAA
    Scenario Outline: The focus indicator has a contrast ratio of 3:1 or higher