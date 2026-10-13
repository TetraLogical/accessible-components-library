@tabs @pointer-and-touch
Feature: Tabs — Pointer and touch
  Helping people use single pointer or touch interactions

  User story:
    As a person using touch or pointer input
    I want components with accessible gestures, adequate target sizes, and predictable interactions
    so that I can accurately interact with all functionality.

  Background:
    Given I load the sample "http://localhost:8081/tabs/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.5.2 @a @automatic
  Rule: 2.5.2 Pointer Cancellation, Level A
    Scenario Outline: Each tab is not activated on the down event
      When I press the mouse down on "<element>"
      Then it should not have the attribute "aria-selected"
      Examples:
        | element       |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |

  @2.5.2 @a @automatic
  Rule: 2.5.2 Pointer Cancellation, Level A
    Scenario Outline: Each tab is activated on the up event
      When I click on "<element>"
      Then it should have the attribute "aria-selected" with the value "true"
      Examples:
        | element       |
        | #tabs-0-tab-1 |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |

  @2.5.2 @a @automatic
  Rule: 2.5.2 Pointer Cancellation, Level A
    Scenario: Activating a tab with a pointer does not navigate to a new page
      When I click on "#tabs-0-tab-2"
      Then it should NOT navigate to a new page

  @2.5.8 @aa @automatic
  Rule: 2.5.8 Target Size (Minimum), Level AA
    Scenario Outline: Each tab has a target area size, or a target area size together with spacing, of at least 24 by 24 pixels
      When I view the rendered "<element>"
      Then it should have a width and height of at least 24px
      Examples:
        | element       |
        | #tabs-0-tab-1 |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |

  @2.5.5 @aaa @automatic
  Rule: 2.5.5 Target Size (Enhanced), Level AAA
    Scenario Outline: Each tab has a target area size of at least 44 by 44 pixels
      When I view the rendered "<element>"
      Then it should have a width and height of at least 44px
      Examples:
        | element       |
        | #tabs-0-tab-1 |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |
