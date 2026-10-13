@pagination @keyboard
Feature: Pagination — Keyboard
  Helping people who use a keyboard

  User story:
    As a keyboard user
    I want components that follow a logical tab order and provide visible, predictable focus states
    so that I can move through the interface efficiently and operate every feature without using a mouse.

  Background:
    Given I load the sample "http://localhost:8081/pagination/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------
  
  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario Outline: Each link is focusable using the "Tab" key 
      When I focus "<element>" using a keyboard
      Then "<element>" should be focused
        Examples:
          | element                           |
          | .tl-pagination > a:first-child    |
          | .tl-pagination > ol + a           |
          | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(3) a  |
          | .tl-pagination li:nth-child(4) a  |
          | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(6) a  |
          | .tl-pagination li:nth-child(7) a  |
          | .tl-pagination li:nth-child(8) a  |
          | .tl-pagination li:nth-child(10) a |

  @2.1.1 @a @automatic
  Rule: 2.1.1 Keyboard, Level A
    Scenario Outline: Each link can be activated by pressing the "Enter" key
      When I focus "<element>"
      And I press the "Enter" key once
      Then the URL should change
        Examples:
          | element                           |
          | .tl-pagination > a:first-child    |
          | .tl-pagination > ol + a           |
          | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(3) a  |
          | .tl-pagination li:nth-child(4) a  |
          | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(6) a  |
          | .tl-pagination li:nth-child(7) a  |
          | .tl-pagination li:nth-child(8) a  |
          | .tl-pagination li:nth-child(10) a |

  @2.1.2 @a @automatic
  Rule: 2.1.2 No Keyboard Trap, Level A
    Scenario Outline: Each link does not trap focus going forwards
      When I focus "<element>"
      And I press the "TAB" key once
      Then the focus should not be on a "<element>" element
        Examples:
          | element                           |
          | .tl-pagination > a:first-child    |
          | .tl-pagination > ol + a           |
          | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(3) a  |
          | .tl-pagination li:nth-child(4) a  |
          | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(6) a  |
          | .tl-pagination li:nth-child(7) a  |
          | .tl-pagination li:nth-child(8) a  |
          | .tl-pagination li:nth-child(10) a |

  @2.1.2 @a @automatic
  Rule: 2.1.2 No Keyboard Trap, Level A
    Scenario Outline: Each link does not trap focus going backwards
      When I focus "<element>"
      And I hold the "SHIFT" key
      And I press the "TAB" key once
      Then the focus should not be on a "<element>" element
        Examples:
          | element                           |
          | .tl-pagination > a:first-child    |
          | .tl-pagination > ol + a           |
          | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(3) a  |
          | .tl-pagination li:nth-child(4) a  |
          | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(6) a  |
          | .tl-pagination li:nth-child(7) a  |
          | .tl-pagination li:nth-child(8) a  |
          | .tl-pagination li:nth-child(10) a |

  @2.4.3 @a @automatic
  Rule: 2.4.3 Focus Order, Level A
    Scenario Outline: Each link receives focus in logical order
      When I focus "<element>"
      And I press the "TAB" key once
      Then "<next_element>" should be focused
        Examples:
          | element                           | next_element                      |
          | .tl-pagination > a:first-child    | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(1) a  | .tl-pagination li:nth-child(3) a  |
          | .tl-pagination li:nth-child(3) a  | .tl-pagination li:nth-child(4) a  |
          | .tl-pagination li:nth-child(4) a  | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(5) a  | .tl-pagination li:nth-child(6) a  |
          | .tl-pagination li:nth-child(6) a  | .tl-pagination li:nth-child(7) a  |
          | .tl-pagination li:nth-child(7) a  | .tl-pagination li:nth-child(8) a  |
          | .tl-pagination li:nth-child(8) a  | .tl-pagination li:nth-child(10) a |
          | .tl-pagination li:nth-child(10) a | .tl-pagination > ol + a           |

  @2.4.7 @aa @automatic
  Rule: 2.4.7 Focus Visible, Level AA
    Scenario Outline: Each link has a focus indicator when it receives keyboard focus
      When I focus "<element>" using a keyboard
      Then it should have a visible focus indicator
        Examples:
          | element                           |
          | .tl-pagination > a:first-child    |
          | .tl-pagination > ol + a           |
          | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(3) a  |
          | .tl-pagination li:nth-child(4) a  |
          | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(6) a  |
          | .tl-pagination li:nth-child(7) a  |
          | .tl-pagination li:nth-child(8) a  |
          | .tl-pagination li:nth-child(10) a |

  @2.4.11 @aa @automatic
  Rule: 2.4.11 Focus Not Obscured (Minimum), Level AA
    Scenario Outline: Each link has a focus indicator which is not fully hidden by other content when it receives keyboard focus
      When I focus "<element>" using a keyboard
      Then it should have a visible focus indicator
      And its focus indicator should be at least partially visible
        Examples:
          | element                           |
          | .tl-pagination > a:first-child    |
          | .tl-pagination > ol + a           |
          | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(3) a  |
          | .tl-pagination li:nth-child(4) a  |
          | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(6) a  |
          | .tl-pagination li:nth-child(7) a  |
          | .tl-pagination li:nth-child(8) a  |
          | .tl-pagination li:nth-child(10) a |

  @2.1.3 @aaa @automatic
  Rule: 2.1.3 Keyboard (No Exception), Level AAA
    Scenario Outline: Each link is focusable using the "Tab" key 
      When I focus "<element>" using a keyboard
      Then "<element>" should be focused
        Examples:
          | element                           |
          | .tl-pagination > a:first-child    |
          | .tl-pagination > ol + a           |
          | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(3) a  |
          | .tl-pagination li:nth-child(4) a  |
          | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(6) a  |
          | .tl-pagination li:nth-child(7) a  |
          | .tl-pagination li:nth-child(8) a  |
          | .tl-pagination li:nth-child(10) a |

  @2.1.3 @aaa @automatic
  Rule: 2.1.3 Keyboard (No Exception), Level AAA
    Scenario Outline: Each link can be activated by pressing the "Enter" key
      When I focus "<element>"
      And I press the "Enter" key once
      Then the URL should change
        Examples:
          | element                           |
          | .tl-pagination > a:first-child    |
          | .tl-pagination > ol + a           |
          | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(3) a  |
          | .tl-pagination li:nth-child(4) a  |
          | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(6) a  |
          | .tl-pagination li:nth-child(7) a  |
          | .tl-pagination li:nth-child(8) a  |
          | .tl-pagination li:nth-child(10) a |

  @2.4.12 @aaa @automatic
  Rule: 2.4.12 Focus Not Obscured (Enhanced), Level AAA
    Scenario Outline: Each link has a focus indicator which is not even partially hidden by other content 
      When I focus "<element>" using a keyboard
      Then it should have a visible focus indicator
      And its focus indicator should be fully visible
        Examples:
          | element                           |
          | .tl-pagination > a:first-child    |
          | .tl-pagination > ol + a           |
          | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(3) a  |
          | .tl-pagination li:nth-child(4) a  |
          | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(6) a  |
          | .tl-pagination li:nth-child(7) a  |
          | .tl-pagination li:nth-child(8) a  |
          | .tl-pagination li:nth-child(10) a |

  @2.4.13 @aaa @automatic
  Rule: 2.4.13 Focus Appearance, Level AAA
    Scenario Outline: The focus indicator is at least 2px larger than the component boundary and has a contrast ratio of 3:1 or higher 
      When I focus "<element>" using a keyboard
      Then it should have a visible focus indicator
      And the focus indicator should have a contrast ratio of 3:1 against its background
      And its focus indicator should have a minimum perimiter thickness of 2px
        Examples:
          | element                           |
          | .tl-pagination > a:first-child    |
          | .tl-pagination > ol + a           |
          | .tl-pagination li:nth-child(1) a  |
          | .tl-pagination li:nth-child(3) a  |
          | .tl-pagination li:nth-child(4) a  |
          | .tl-pagination li:nth-child(5) a  |
          | .tl-pagination li:nth-child(6) a  |
          | .tl-pagination li:nth-child(7) a  |
          | .tl-pagination li:nth-child(8) a  |
          | .tl-pagination li:nth-child(10) a |
