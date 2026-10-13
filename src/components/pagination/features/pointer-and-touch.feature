@pagination @pointer-and-touch
Feature: Pagination — Pointer and touch
  Helping people who use a mouse, touch screen, or other pointing device

  User story:
    As a person using touch or pointer input
    I want components with accessible gestures, adequate target sizes, and predictable interactions
    so that I can accurately interact with all functionality.
  
  Background:
    Given I load the sample "http://localhost:8081/pagination/examples/default"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.5.2 @a @automatic
  Rule: 2.5.2 Pointer Cancellation, Level A
    Scenario Outline: Each link is activated on the "up" event, not on the "down" event
      When I press the mouse down on "<element>"
      Then it should NOT navigate to a new page
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

  @2.5.8 @aa @automatic
  Rule: 2.5.8 Target Size (Minimum), Level AA
    Scenario Outline: Each link has a target area size and spacing of at least 24 by 24 pixels
      When I view the rendered "<element>"
      Then it should have a width and height of at least 24px
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

  @2.5.5 @aaa @automatic
  Rule: 2.5.5 Target Size (Enhanced), Level AAA
    Scenario Outline: Each link has a target area size and spacing of at least 44 by 44 pixels
      When I view the rendered "<element>"
      Then it should have a width and height of at least 44px
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
