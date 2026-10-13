@{{componentName}} @pointer-and-touch
Feature: {{componentName}} — Pointer and touch
  Helping people who use a mouse, touch screen, or other pointing device

  User story:
    As a person using touch or pointer input
    I want components with accessible gestures, adequate target sizes, and predictable interactions
    so that I can accurately interact with all functionality.
  
  Background:
    Given I load the sample "{{componentURL}}"

  # ----------------------------------------------------------------------------
  # Perceivable
  # ----------------------------------------------------------------------------
  
  @1.4.13 @aa @manual
  Rule: 1.4.13 Content on Hover or Focus, Level AA
    Scenario Outline: Content revealed on hover or focus is persistent, hoverable and dismissible

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------

  @2.5.1 @a @manual
  Rule: 2.5.1 Pointer Gestures, Level A
    Scenario Outline: Path-based or multi-point gestures have single-pointer alternatives

  @2.5.2 @a @manual
  Rule: 2.5.2 Pointer Cancellation, Level A
    Scenario Outline: Actions triggered on release, not press, to prevent errors

  @2.5.7 @aa @manual
  Rule: 2.5.7 Dragging Movements, Level AA
    Scenario Outline: Drag actions have single-pointer alternatives

  @2.5.8 @aa @manual
  Rule: 2.5.8 Target Size (Minimum), Level AA
    Scenario Outline: Actionable elements have a clickable area which is least 24×24 px

  @2.5.5 @aaa @manual
  Rule: 2.5.5 Target Size (Enhanced), Level AAA
    Scenario Outline: Actionable elements have a clickable area which is least 44x44 px
