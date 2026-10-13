@tabs @keyboard
Feature: Tabs — Keyboard
  Helping people who use a keyboard

  User story:
    As a keyboard user
    I want components that follow a logical tab order and provide visible, predictable focus states
    so that I can move through the interface efficiently and operate every feature without using a mouse.

  Background:
    Given I load the sample "http://localhost:8081/tabs/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario: The active tab can be focused using the Tab key
      When I focus "#tabs-0-tab-1" using a keyboard
      Then "#tabs-0-tab-1" should be focused

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario: The active tab is the only tab in the tab order
      When I inspect "#tabs-0-tab-1" in the DOM
      Then it should not have the attribute "tabindex"

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario Outline: Tabs which are not active are removed from the tab order
      When I inspect "<element>" in the DOM
      Then it should have the attribute "tabindex" with the value "-1"
      Examples:
        | element       |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario Outline: Each tab can be reached using the arrow keys, wrapping around at each end
      When I focus "<element>" using the arrow keys
      And I press the "<key>" key once
      Then "<next element>" should be focused
      Examples:
        | element       | key   | next element  |
        | #tabs-0-tab-1 | RIGHT | #tabs-0-tab-2 |
        | #tabs-0-tab-2 | RIGHT | #tabs-0-tab-3 |
        | #tabs-0-tab-3 | RIGHT | #tabs-0-tab-1 |
        | #tabs-0-tab-1 | LEFT  | #tabs-0-tab-3 |
        | #tabs-0-tab-2 | LEFT  | #tabs-0-tab-1 |
        | #tabs-0-tab-3 | LEFT  | #tabs-0-tab-2 |

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario Outline: Each tab is activated when it receives focus
      When I focus "<element>" using the arrow keys
      And I inspect "<element>" in the DOM
      Then it should have the attribute "aria-selected" with the value "true"
      Examples:
        | element       |
        | #tabs-0-tab-1 |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario Outline: Activating a tab reveals the tabpanel it controls
      When I focus "<tab>" using the arrow keys
      And I inspect "<panel>" in the DOM
      Then it should not have the attribute "hidden"
      Examples:
        | tab           | panel           |
        | #tabs-0-tab-1 | #tabs-0-panel-1 |
        | #tabs-0-tab-2 | #tabs-0-panel-2 |
        | #tabs-0-tab-3 | #tabs-0-panel-3 |

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario Outline: Only the tabpanel controlled by the active tab is visible
      When I focus "#tabs-0-tab-2" using the arrow keys
      And I inspect "<element>" in the DOM
      Then it should have the attribute "hidden"
      Examples:
        | element         |
        | #tabs-0-panel-1 |
        | #tabs-0-panel-3 |

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario: The active tab can be activated using the Enter key
      When I focus "#tabs-0-tab-1" using a keyboard
      And I press the "ENTER" key once
      And I inspect "#tabs-0-panel-1" in the DOM
      Then it should not have the attribute "hidden"

  @2.1.2 @a @automatic
  Rule: 2.1.2 No Keyboard Trap, Level A
    Scenario: Focus is not trapped going forwards
      When I focus '#tabs-0-panel-1 .demo-link'
      And I press the 'TAB' key once
      Then the focus should not be on a 'tl-tabs a' element

  @2.1.2 @a @automatic
  Rule: 2.1.2 No Keyboard Trap, Level A
    Scenario: Focus is not trapped going backwards
      When I focus '#tabs-0-tab-1'
      And I hold the 'SHIFT' key
      And I press the 'TAB' key once
      Then the focus should not be on a 'tl-tabs a' element

  @2.4.3 @a @automatic
  Rule: 2.4.3 Focus Order, Level A
    Scenario: Focus moves from the active tab to the first focusable element in the tabpanel it controls
      When I focus '#tabs-0-tab-1'
      And I press the 'TAB' key once
      Then '#tabs-0-panel-1 .demo-link' should be focused

  @2.4.3 @a @automatic
  Rule: 2.4.3 Focus Order, Level A
    Scenario Outline: The tabpanel itself is not in the tab order
      When I inspect "<panel>" in the DOM
      Then it should not have the attribute "tabindex"
      Examples:
        | panel          |
        | #tabs-0-panel-1 |
        | #tabs-0-panel-2 |
        | #tabs-0-panel-3 |

  @2.4.3 @a @automatic
  Rule: 2.4.3 Focus Order, Level A
    Scenario: Focus cannot be moved into the content of a non-visible tabpanel
      When I focus "#tabs-0-tab-2" using the arrow keys
      And I press the 'TAB' key once
      And I press the 'TAB' key once
      Then the focus should not be on a '#tabs-0-panel-1 .demo-link' element

  @2.4.7 @aa @automatic
  Rule: 2.4.7 Focus Visible, Level AA
    Scenario Outline: Each tab has a visible focus indicator when it receives keyboard focus
      When I focus "<element>" using the arrow keys
      Then it should have a visible focus indicator
      Examples:
        | element       |
        | #tabs-0-tab-1 |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |

  @2.4.11 @aa @automatic
  Rule: 2.4.11 Focus Not Obscured (Minimum), Level AA
    Scenario Outline: Each tab is not fully hidden by other content when it receives keyboard focus
      When I focus "<element>" using the arrow keys
      Then it should have a visible focus indicator
      And its focus indicator should be at least partially visible
      Examples:
        | element       |
        | #tabs-0-tab-1 |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |

  @2.1.3 @aaa @automatic
  Rule: 2.1.3 Keyboard (No Exception), Level AAA
    Scenario: The tabs component is accessible by keyboard, with no exceptions
      When I view the rendered 'tl-tabs'
      Then every interactive control should be reachable using the keyboard

  @2.4.12 @aaa @automatic
  Rule: 2.4.12 Focus Not Obscured (Enhanced), Level AAA
    Scenario Outline: Each tab is fully visible when it receives keyboard focus
      When I focus "<element>" using the arrow keys
      Then it should have a visible focus indicator
      And its focus indicator should be fully visible
      Examples:
        | element       |
        | #tabs-0-tab-1 |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |

  @2.4.13 @aaa @automatic
  Rule: 2.4.13 Focus Appearance, Level AAA
    Scenario Outline: Each tab has a custom focus style with a solid 2 pixel thick perimeter, or equivalent, and a contrast ratio of at least 3:1 against the background colour
      When I focus "<element>" using the arrow keys
      Then it should have a visible focus indicator
      And the focus indicator should have a contrast ratio of 3:1 against its background
      And its focus indicator should have a minimum perimiter thickness of 2px
      Examples:
        | element       |
        | #tabs-0-tab-1 |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |

  @recommendation @automatic
  Rule: Recommendation
    Scenario Outline: The right and left arrow keys are used to navigate between tabs, with automatic activation
      When I focus "<element>" using the arrow keys
      And I press the "<key>" key once
      And I inspect "<next element>" in the DOM
      Then it should have the attribute "aria-selected" with the value "true"
      Examples:
        | element       | key   | next element  |
        | #tabs-0-tab-1 | RIGHT | #tabs-0-tab-2 |
        | #tabs-0-tab-2 | LEFT  | #tabs-0-tab-1 |

  @recommendation @automatic
  Rule: Recommendation
    Scenario Outline: The Home and End keys move to the first and last tab
      When I focus "#tabs-0-tab-2" using the arrow keys
      And I press the "<key>" key once
      Then "<next element>" should be focused
      Examples:
        | key  | next element  |
        | HOME | #tabs-0-tab-1 |
        | END  | #tabs-0-tab-3 |

  @recommendation @automatic
  Rule: Recommendation
    Scenario Outline: A custom focus style is used instead of the browser's default
      When I focus "<element>" using the arrow keys
      Then it should have a visible focus indicator
      And its focus indicator should have a minimum perimiter thickness of 2px
      Examples:
        | element       |
        | #tabs-0-tab-1 |
        | #tabs-0-tab-2 |
        | #tabs-0-tab-3 |
