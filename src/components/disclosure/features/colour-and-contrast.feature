@disclosure @colour-and-contrast
Feature: Disclosure — Colour and contrast
  Helping people who struggle with colour perception or low vision

  User story:
    As a person with low vision or colour vision deficiency
    I want components with sufficient contrast and that don't rely solely on colour
    so that I can perceive and understand all content and interface elements.

  Background:
    Given I load the sample "http://localhost:8081/disclosure/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------

  @1.4.3 @aa @automatic
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario: The disclosure trigger has a contrast ratio of at least 4.5:1 against the background, when collapsed
      When I view the rendered ".tl-disclosure > button"
      Then its text should have a contrast ratio of "4.5" against its background

  @1.4.3 @aa @automatic
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario: The trigger and the content have a contrast ratio of at least 4.5:1 against the background, when expanded
      When I click on ".tl-disclosure > button"
      And I view the rendered ".tl-disclosure > button"
      Then its text should have a contrast ratio of "4.5" against its background
      When I view the rendered "#disclosure-content p"
      Then its text should have a contrast ratio of "4.5" against its background

  @1.4.3 @aa @automatic @darkmode
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario: Darkmode: The trigger and the content have a contrast ratio of at least 4.5:1 against the background
      When I click on ".tl-disclosure > button"
      And I view the rendered ".tl-disclosure > button"
      And I enable "dark" mode
      Then its text should have a contrast ratio of "4.5" against its background
      When I view the rendered "#disclosure-content p"
      Then its text should have a contrast ratio of "4.5" against its background

  @1.4.11 @aa @automatic
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario: The icon which indicates the disclosure state has a contrast ratio of at least 3:1 against the background
      When I view the rendered ".tl-disclosure > button svg"
      Then its text should have a contrast ratio of "3" against its background

  @1.4.11 @aa @automatic @darkmode
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario: Darkmode: The icon which indicates the disclosure state has a contrast ratio of at least 3:1 against the background
      When I view the rendered ".tl-disclosure > button svg"
      And I enable "dark" mode
      Then its text should have a contrast ratio of "3" against its background

  @1.4.11 @aa @automatic
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario: The custom focus style has a contrast ratio of at least 3:1 against the background
      When I focus ".tl-disclosure > button" using a keyboard
      Then it should have a visible focus indicator
      And the focus indicator should have a contrast ratio of 3:1 against its background

  @1.4.6 @aaa @automatic
  Rule: 1.4.6 Contrast (Enhanced), Level AAA
    Scenario: The trigger and the content have a contrast ratio of at least 7:1 against the background
      When I click on ".tl-disclosure > button"
      And I view the rendered ".tl-disclosure > button"
      Then its text should have a contrast ratio of "7" against its background
      When I view the rendered "#disclosure-content p"
      Then its text should have a contrast ratio of "7" against its background

  @1.4.6 @aaa @automatic @darkmode
  Rule: 1.4.6 Contrast (Enhanced), Level AAA
    Scenario: Darkmode: The trigger and the content have a contrast ratio of at least 7:1 against the background
      When I click on ".tl-disclosure > button"
      And I view the rendered ".tl-disclosure > button"
      And I enable "dark" mode
      Then its text should have a contrast ratio of "7" against its background
      When I view the rendered "#disclosure-content p"
      Then its text should have a contrast ratio of "7" against its background
