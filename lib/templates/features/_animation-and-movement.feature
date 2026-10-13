@{{componentName}} @animation-and-movement
Feature: {{componentName}} — Animation and movement
  Helping people to limit animation or reduce motion within content

  User story:
    As a person who is sensitive to motion or animation
    I want components that allow me to control or disable motion
    so that I can use the interface without experiencing discomfort, dizziness, or distraction.
  
  Background:
    Given I load the sample "{{componentURL}}"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------
  
  @2.2.2 @a @manual
  Rule: 2.2.2 Pause, Stop, Hide, Level A
    Scenario Outline: People can pause, stop or hide moving or auto-updating content

  @2.3.1 @a @manual
  Rule: 2.3.1 Three Flashes or Below Threshold, Level A
    Scenario Outline: No content flashes more than three times per second

  @2.3.2 @aaa @manual
  Rule: 2.3.2 Three Flashes, Level AAA
    Scenario Outline: No flashing content at all

  @2.3.3 @aaa @manual
  Rule: 2.3.3 Animation from Interactions, Level AAA
    Scenario Outline: People can disable motion triggered by interaction
