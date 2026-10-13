@accordion @colour-and-contrast
Feature: Accordion — Colour and contrast
  Helping people who struggle with colour perception or low vision

  User story:
    As a person with low vision or colour vision deficiency
    I want components with sufficient contrast and that don't rely solely on colour
    so that I can perceive and understand all content and interface elements.

  Background:
    Given I load the sample "http://localhost:8081/accordion/examples/default"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------

  @1.4.3 @aa @automatic
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario: A collapsed trigger has a contrast ratio of at least 4.5:1 against the background
      When I view the rendered ".tl-accordion__section:nth-of-type(2) > button"
      Then its text should have a contrast ratio of "4.5" against its background

  @1.4.3 @aa @automatic
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario: An expanded trigger and its content have a contrast ratio of at least 4.5:1 against the background
      When I click on ".tl-accordion__section:nth-of-type(1) > button"
      And I view the rendered ".tl-accordion__section:nth-of-type(1) > button"
      Then its text should have a contrast ratio of "4.5" against its background
      When I view the rendered "#accordion-content-1 p"
      Then its text should have a contrast ratio of "4.5" against its background

  @1.4.3 @aa @automatic @darkmode
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario: Darkmode: An expanded trigger and its content have a contrast ratio of at least 4.5:1 against the background
      When I click on ".tl-accordion__section:nth-of-type(1) > button"
      And I view the rendered ".tl-accordion__section:nth-of-type(1) > button"
      And I enable "dark" mode
      Then its text should have a contrast ratio of "4.5" against its background
      When I view the rendered "#accordion-content-1 p"
      Then its text should have a contrast ratio of "4.5" against its background

  @1.4.3 @aa @automatic
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario: The Show all sections button has a contrast ratio of at least 4.5:1 against the background
      When I view the rendered ".tl-accordion__toggle-all"
      Then its text should have a contrast ratio of "4.5" against its background

  @1.4.3 @aa @automatic @darkmode
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario: Darkmode: The Show all sections button has a contrast ratio of at least 4.5:1 against the background
      When I view the rendered ".tl-accordion__toggle-all"
      And I enable "dark" mode
      Then its text should have a contrast ratio of "4.5" against its background

  @1.4.11 @aa @automatic
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario: The icon which indicates the state of a section has a contrast ratio of at least 3:1 against the background
      When I view the rendered ".tl-accordion__section:nth-of-type(2) > button svg"
      Then its text should have a contrast ratio of "3" against its background

  @1.4.11 @aa @automatic @darkmode
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario: Darkmode: The icon which indicates the state of a section has a contrast ratio of at least 3:1 against the background
      When I view the rendered ".tl-accordion__section:nth-of-type(2) > button svg"
      And I enable "dark" mode
      Then its text should have a contrast ratio of "3" against its background

  @1.4.11 @aa @automatic
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario: The Show all sections button's icon has a contrast ratio of at least 3:1 against the background
      When I view the rendered ".tl-accordion__toggle-all svg"
      Then its text should have a contrast ratio of "3" against its background

  @1.4.11 @aa @automatic @darkmode
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario: Darkmode: The Show all sections button's icon has a contrast ratio of at least 3:1 against the background
      When I view the rendered ".tl-accordion__toggle-all svg"
      And I enable "dark" mode
      Then its text should have a contrast ratio of "3" against its background

  @1.4.11 @aa @automatic
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario: The custom focus style of a trigger has a contrast ratio of at least 3:1 against the background
      When I focus ".tl-accordion__section:nth-of-type(1) > button" using a keyboard
      Then it should have a visible focus indicator
      And the focus indicator should have a contrast ratio of 3:1 against its background

  @1.4.11 @aa @automatic
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario: The custom focus style of the Show all sections button has a contrast ratio of at least 3:1 against the background
      When I focus ".tl-accordion__toggle-all" using a keyboard
      Then it should have a visible focus indicator
      And the focus indicator should have a contrast ratio of 3:1 against its background

  @1.4.6 @aaa @automatic
  Rule: 1.4.6 Contrast (Enhanced), Level AAA
    Scenario: An expanded trigger and its content have a contrast ratio of at least 7:1 against the background
      When I click on ".tl-accordion__section:nth-of-type(1) > button"
      And I view the rendered ".tl-accordion__section:nth-of-type(1) > button"
      Then its text should have a contrast ratio of "7" against its background
      When I view the rendered "#accordion-content-1 p"
      Then its text should have a contrast ratio of "7" against its background

  @1.4.6 @aaa @automatic @darkmode
  Rule: 1.4.6 Contrast (Enhanced), Level AAA
    Scenario: Darkmode: An expanded trigger and its content have a contrast ratio of at least 7:1 against the background
      When I click on ".tl-accordion__section:nth-of-type(1) > button"
      And I view the rendered ".tl-accordion__section:nth-of-type(1) > button"
      And I enable "dark" mode
      Then its text should have a contrast ratio of "7" against its background
      When I view the rendered "#accordion-content-1 p"
      Then its text should have a contrast ratio of "7" against its background

  @1.4.6 @aaa @automatic
  Rule: 1.4.6 Contrast (Enhanced), Level AAA
    Scenario: The Show all sections button has a contrast ratio of at least 7:1 against the background
      When I view the rendered ".tl-accordion__toggle-all"
      Then its text should have a contrast ratio of "7" against its background
