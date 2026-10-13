@pagination @images-and-media
Feature: Pagination — Images and media
  Helping people to access (and remove distractions caused by) image, video and audio content

  User story:
    As a person who cannot see or hear media content
    I want appropriate text alternatives and captions for images, video and audio
    so that I can access the same information as everyone else.
  
  Background:
    Given I load the sample "http://localhost:8081/pagination/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------
  
  @1.1.1 @a @automatic
  Rule: 1.1.1 Non-text Content, Level A
    Scenario Outline: Arrows in "Next" and "Previous" links are hidden from screen readers
      When I inspect "<element>" in the Accessibility Tree
      Then its accessible name should be "<name>"
        Examples:
          | element                        | name          |
          | .tl-pagination > a:first-child | Previous page |
          | .tl-pagination > ol + a        | Next page     |

  @1.1.1 @a @automatic
  Rule: 1.1.1 Non-text Content, Level A
    Scenario Outline: Each ellipsis character is hidden from screen readers, and visually hidden text alongside it reads "Ellipsis"
      Given I load the sample "<sample>"
      When I inspect "<item> span[aria-hidden]" in the DOM
      Then it should have the attribute "aria-hidden" with the value "true"
      When I inspect "<item> .visually-hidden" in the DOM
      Then it should contain the text "Ellipsis"
        Examples:
          | sample                                                    | item                           |
          | http://localhost:8081/pagination/examples/default         | .tl-pagination li:nth-child(2) |
          | http://localhost:8081/pagination/examples/default         | .tl-pagination li:nth-child(9) |
          | http://localhost:8081/pagination/examples/default?page=1  | .tl-pagination li:nth-child(9) |
          | http://localhost:8081/pagination/examples/default?page=13 | .tl-pagination li:nth-child(2) |

  @1.4.5 @aa @automatic
  Rule: 1.4.5 Images of Text, Level AA
    Scenario Outline: Real text is used instead of images for links where possible
      When I inspect "<element>" in the Accessibility Tree
      Then it should contain static text, not an image
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

  @1.4.9 @aaa @automatic
  Rule: 1.4.9 Images of Text (No Exception), Level AAA
    Scenario Outline: No images of text at all
      When I inspect "<element>" in the Accessibility Tree
      Then it should contain static text, not an image
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
