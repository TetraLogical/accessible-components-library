@accordion @pointer-and-touch
Feature: Accordion — Pointer and touch
  Helping people use single pointer or touch interactions

  User story:
    As a person using touch or pointer input
    I want components with accessible gestures, adequate target sizes, and predictable interactions
    so that I can accurately interact with all functionality.

  Background:
    Given I load the sample "http://localhost:8081/accordion/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.5.2 @a @automatic
  Rule: 2.5.2 Pointer Cancellation, Level A
    Scenario: A trigger is activated on the up event, not on the down event
      When I press the mouse down on ".tl-accordion__section:nth-of-type(2) > button"
      And I inspect ".tl-accordion__section:nth-of-type(2) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"
      When I inspect "#accordion-content-2" in the DOM
      Then it should have the attribute "hidden"

  @2.5.2 @a @automatic
  Rule: 2.5.2 Pointer Cancellation, Level A
    Scenario: The Show all sections button is activated on the up event, not on the down event
      When I press the mouse down on ".tl-accordion__toggle-all"
      And I inspect ".tl-accordion__section:nth-of-type(1) > button" in the DOM
      Then it should have the attribute "aria-expanded" with the value "false"
      When I inspect "#accordion-content-1" in the DOM
      Then it should have the attribute "hidden"

  @2.5.8 @aa @automatic
  Rule: 2.5.8 Target Size (Minimum), Level AA
    Scenario Outline: The triggers and the Show all sections button have a target area size of at least 24 by 24 pixels
      When I view the rendered "<element>"
      Then it should have a width and height of at least 24px
      Examples:
        | element                                         |
        | .tl-accordion__toggle-all                       |
        | .tl-accordion__section:nth-of-type(1) > button |

  @2.5.5 @aaa @automatic
  Rule: 2.5.5 Target Size (Enhanced), Level AAA
    Scenario Outline: The triggers and the Show all sections button have a target area size of at least 44 by 44 pixels
      When I view the rendered "<element>"
      Then it should have a width and height of at least 44px
      Examples:
        | element                                         |
        | .tl-accordion__toggle-all                       |
        | .tl-accordion__section:nth-of-type(1) > button |
