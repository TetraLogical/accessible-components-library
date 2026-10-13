@{{componentName}} @consistency-and-predictability
Feature: {{componentName}} — Consistency and predictability
  Helping people by keeping functionality and content consistent and predictable

  User story:
    As a person who benefits from consistent and predictable interfaces
    I want components that behave in expected ways and don't cause unexpected changes
    so that I can navigate and interact with confidence.
  
  Background:
    Given I load the sample "{{componentURL}}"

  # ----------------------------------------------------------------------------
  # Understandable
  # ----------------------------------------------------------------------------
  
  @3.2.1 @a @manual
  Rule: 3.2.1 On Focus, Level A
    Scenario Outline: A control receiving focus does not initiate a change of context

  @3.2.2 @a @manual
  Rule: 3.2.2 On Input, Level A
    Scenario Outline: Changing a setting in the component does not trigger a change of context

  @3.2.3 @aa @manual
  Rule: 3.2.3 Consistent Navigation, Level AA
    Scenario Outline: Consistently order navigation that repeats across multiple pages

  @3.2.4 @aa @manual
  Rule: 3.2.4 Consistent Identification, Level AA
    Scenario Outline: Components with the same functionality in a set of web pages are identified consistently

  @3.2.6 @a @manual
  Rule: 3.2.6 Consistent Help, Level A
    Scenario Outline: Help mechanisms are consistently located across multiple pages

  @3.2.5 @aaa @manual
  Rule: 3.2.5 Change on Request, Level AAA
    Scenario Outline: Context changes occur only on explicit user request
