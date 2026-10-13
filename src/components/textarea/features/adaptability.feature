@textArea @adaptability
Feature: Textarea — Adaptability
  Helping people by honouring user preferences and by allowing adaptations to content presentation and time limits

  User story:
    As a person who needs to adjust the way content is presented, or to adjust timings
    I want components that my tools can interpret and adjust
    so that I can navigate, understand, and operate the interface reliably using the technology that supports me.

  Background:
    Given I load the sample "http://localhost:8081/textarea/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------

  @1.3.4 @aa @automatic
  Rule: 1.3.4 Orientation, Level AA
    Scenario Outline: Content is not restricted to a single orientation, unless it's essential
      When I switch to landscape mode
      And I view the rendered "<element>"
      Then it should not lose any content or functionality
      Examples:
        | element                |
        | .tl-textarea label     |
        | .tl-textarea textarea  |

  @1.4.4 @aa @automatic
  Rule: 1.4.4 Resize Text, Level AA
    Scenario Outline: Text can scale up to 200% without loss of content or functionality
      When I zoom in the browser to 200%
      And I view the rendered "<element>"
      Then it should not lose any content or functionality
      Examples:
        | element                |
        | .tl-textarea label     |
        | .tl-textarea textarea  |

  @1.4.10 @aa @automatic
  Rule: 1.4.10 Reflow, Level AA
    Scenario: Content reflows without horizontal scrolling at 320px wide
      When I view the rendered '.tl-textarea'
      And I set the viewport to 320px wide
      Then it should reflow without requiring horizontal scrolling

  @1.4.12 @aa @automatic
  Rule: 1.4.12 Text Spacing, Level AA
    Scenario: Line, letter and word spacing can be increased without a loss of content
      When I view the rendered '.tl-textarea'
      And I increase the line height to 1.5 times the font size
      And I increase the spacing following paragraphs to 2 times the font size
      And I increase the letter spacing to 0.12 times the font size
      And I increase the word spacing to 0.16 times the font size
      Then it should not lose any content or functionality

  @1.4.8 @aaa @automatic
  Rule: 1.4.8 Visual Presentation, Level AAA
    Scenario: Content adjusts as expected when people apply their own colour, width, alignment, spacing and size preferences
      When I view the rendered '.tl-textarea'
      And I apply a custom foreground and background colour using a user stylesheet
      And I apply a custom max-width using a user stylesheet
      And I apply a custom text-alignment using a user stylesheet
      And I apply a custom line height using a user stylesheet
      And I apply a custom font size of 200% using a user stylesheet
      Then it should not lose any content or functionality

  @recommendation @automatic
  Rule: Recommendation
    Scenario: Content and information remains visible and understandable when using high contrast themes
      When I enable "forced colors" mode
      And I view the rendered '.tl-textarea'
      Then it should not lose any content or functionality
