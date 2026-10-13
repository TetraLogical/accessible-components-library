@{{componentName}} @colour-and-contrast
Feature: {{componentName}} — Colour and contrast
  Helping people who struggle with colour perception or low vision

  User story:
    As a person with low vision or colour vision deficiency
    I want components with sufficient contrast and that don't rely solely on colour
    so that I can perceive and understand all content and interface elements.
  
  Background:
    Given I load the sample "{{componentURL}}"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------
  
  @1.4.1 @a @automatic
  Rule: 1.4.1 Use of Color, Level A
    Scenario Outline: Colour is not the only visual means of conveying information
      # Example test using existing steps
      # Links: "it should be visually identifiable as a link without relying on colour alone"
      # States: compare the element with one in the other state, for example
      # When I view the rendered ".tl-breadcrumbs li:nth-child(3) a"
      # Then it should be distinguishable from ".tl-breadcrumbs li:nth-child(1) a" without relying on colour alone

  @1.4.3 @aa @manual
  Rule: 1.4.3 Contrast (Minimum), Level AA
    Scenario Outline: Text has a contrast ratio of 4.5:1 or higher (or 3:1 for large text)

  @1.4.11 @aa @manual
  Rule: 1.4.11 Non-text Contrast, Level AA
    Scenario Outline: Graphical elements and UI components have a contrast ratio of 3:1 or higher

  @1.4.6 @aaa @manual
  Rule: 1.4.6 Contrast (Enhanced), Level AAA
    Scenario Outline: Text contrast ratio at least 7:1 (or 4.5:1 for large text)
