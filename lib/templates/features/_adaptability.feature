@{{componentName}} @adaptability
Feature: {{componentName}} — Adaptability
  Helping people by honouring user preferences and by allowing adaptations to content presentation and time limits

  User story:
    As a person who needs to adjust the way content is presented, or to adjust timings, I want components that my tools can interpret and adjust, so that I can navigate, understand, and operate the interface reliably using the technology that supports me.
  
  Background:
    Given I load the sample "{{componentURL}}"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------
  
  @1.3.3 @a @manual
  Rule: 1.3.3 Sensory Characteristics, Level A
    Scenario Outline: Instructions do not rely solely on sensory characteristics like colour, shape or placement
  
  @1.3.4 @aa @automatic
  Rule: 1.3.4 Orientation, Level AA
    Scenario Outline: Content is not restricted to a single orientation, unless it's essential
      # Example test using existing steps
      # When I switch to landscape mode
      # And I view the rendered "<element>"
      # Then it should not lose any content or functionality
      # Examples:
      #   | element                     |
      #   | .tl-breadcrumbs li:nth-child(1) |
      #   | .tl-breadcrumbs li:nth-child(2) |
      #   | .tl-breadcrumbs li:nth-child(3) |

  @1.4.4 @aa @automatic
  Rule: 1.4.4 Resize Text, Level AA
    Scenario Outline: Text can scale up to 200% without loss of content or functionality
      # Example test using existing steps
      # When I zoom in the browser to 200%
      # And I view the rendered "<element>"
      # Then it should not lose any content or functionality
      # Examples:
      #   | element                     |
      #   | .tl-breadcrumbs li:nth-child(1) |
      #   | .tl-breadcrumbs li:nth-child(2) |
      #   | .tl-breadcrumbs li:nth-child(3) |

  @1.4.10 @aa @manual
  Rule: 1.4.10 Reflow, Level AA
    Scenario Outline: Content reflows without horizontal scrolling at 320px wide
      # Example test using existing steps
      # When I view the rendered '.tl-breadcrumbs'
      # And I set the viewport to 320px wide
      # Then it should reflow without requiring horizontal scrolling

  @1.4.12 @aa @automatic
  Rule: 1.4.12 Text Spacing, Level AA
    Scenario Outline: Line, letter and word spacing can be increased without a loss of content 
      # Example test using existing steps
      # When I view the rendered '.tl-breadcrumbs'
      # And I increase the line height to 1.5 times the font size
      # And I increase the spacing following paragraphs to 2 times the font size
      # And I increase the letter spacing to 0.12 times the font size
      # And I increase the word spacing to 0.16 times the font size
      # Then it should not lose any content or functionality

  @1.4.8 @aaa @automatic
  Rule: 1.4.8 Visual Presentation, Level AAA
    Scenario Outline: People can see their preferences for text colour, width, alignment, spacing, and size reflected in the visual presentation
      # Example test using existing steps
      # When I view the rendered '.tl-breadcrumbs'
      # And I apply a custom foreground and background colour using a user stylesheet
      # And I apply a custom max-width using a user stylesheet
      # And I apply a custom text-alignment using a user stylesheet
      # And I apply a custom line height using a user stylesheet
      # And I apply a custom font size of 200% using a user stylesheet
      # Then it should not lose any content or functionality

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------
  
  @2.2.1 @a @manual
  Rule: 2.2.1 Timing Adjustable, Level A
    Scenario Outline: People can extend or turn off any time limits

  @2.2.3 @aaa @manual
  Rule: 2.2.3 No Timing, Level AAA
    Scenario Outline: No time limits, except for video and live events

  @2.2.4 @aaa @manual
  Rule: 2.2.4 Interruptions, Level AAA
    Scenario Outline: Updates can be delayed or turned off, except in emergencies

  # ----------------------------------------------------------------------------
  # Recommendations
  # ----------------------------------------------------------------------------
  
  @recommendation @manual
  Rule: Recommendation
    Scenario: Content and information remains visible and understandable when using high contrast themes
    #   When I enable "forced colors" mode
    #   And I view the rendered '.tl-breadcrumbs'
    #   Then the content should be readable and usable
