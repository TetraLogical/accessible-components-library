@textArea @colour-and-contrast
Feature: Textarea — Colour and contrast
  Helping people who struggle with colour perception or low vision

  User story:
    As a person with low vision or colour vision deficiency
    I want components with sufficient contrast and that don't rely solely on colour
    so that I can perceive and understand all content and interface elements.

  Background:
    Given I load the sample "http://localhost:8081/textarea/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------

  @1.4.1 @a @automatic
  Rule: 1.4.1 Use of Color, Level A
    Scenario: Colour alone is not used to identify a textarea in error
      Given I load the sample "http://localhost:8081/textarea/examples/error"
      When I inspect ".tl-textarea .error-message" in the Accessibility Tree
      Then it should contain static text, not an image

    Scenario: The error message is associated with the textarea
      Given I load the sample "http://localhost:8081/textarea/examples/error"
      When I inspect "#textarea-1" in the DOM
      Then it should have the attribute "aria-describedby" with the value "textarea-1-hint textarea-1-error"
      And it should have the attribute "aria-invalid" with the value "true"

  @1.4.3 @aa @automatic
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario Outline: Text content has a contrast ratio of at least 4.5:1 against its background
      When I view the rendered "<element>"
      Then its text should have a contrast ratio of '4.5:1' against its background
      Examples:
        | element               |
        | .tl-textarea label    |
        | .tl-textarea textarea |

  @1.4.3 @aa @automatic
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario: The error message text has a contrast ratio of at least 4.5:1 against its background
      Given I load the sample "http://localhost:8081/textarea/examples/error"
      When I view the rendered ".tl-textarea .error-message"
      Then its text should have a contrast ratio of '4.5:1' against its background

  @1.4.3 @aa @automatic
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario: The hint text has a contrast ratio of at least 4.5:1 against its background
      When I view the rendered ".tl-textarea .hint-text"
      Then its text should have a contrast ratio of '4.5:1' against its background

  @1.4.11 @aa @automatic
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario: The custom focus indicator has a contrast ratio of at least 3:1 against the background
      When I focus ".tl-textarea textarea" using a keyboard
      Then it should have a visible focus indicator
      And the focus indicator should have a contrast ratio of 3:1 against its background

  @1.4.6 @aaa @automatic
  Rule: 1.4.6 Contrast (Enhanced), Level AAA
    Scenario Outline: Text content has a contrast ratio of at least 7:1 against its background
      When I view the rendered "<element>"
      Then its text should have a contrast ratio of '7:1' against its background
      Examples:
        | element               |
        | .tl-textarea label    |
        | .tl-textarea textarea |

  @1.4.6 @aaa @automatic
  Rule: 1.4.6 Contrast (Enhanced), Level AAA
    Scenario: The hint text has a contrast ratio of at least 7:1 against its background
      When I view the rendered ".tl-textarea .hint-text"
      Then its text should have a contrast ratio of '7:1' against its background
