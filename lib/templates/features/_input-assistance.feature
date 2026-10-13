@{{componentName}} @input-assistance
Feature: {{componentName}} — Input assistance
  Helping people to complete forms, enter data and pass authentication

  User story:
    As a person who completes forms or enters data
    I want clear labels, helpful error messages, and accessible authentication
    so that I can successfully complete tasks without confusion or frustration.
  
  Background:
    Given I load the sample "{{componentURL}}"

  # ----------------------------------------------------------------------------
  # Operable
  # ----------------------------------------------------------------------------
  
  @2.5.4 @a @manual
  Rule: 2.5.4 Motion Actuation, Level A
    Scenario Outline: Input is possible without relying solely on device or user movement

  @2.2.5 @aaa @manual
  Rule: 2.2.5 Re-authenticating, Level AAA
    Scenario Outline: If an authenticated session expires, prior activity and data is preserved after re-authenticating

  @2.2.6 @aaa @manual
  Rule: 2.2.6 Timeouts, Level AAA
    Scenario Outline: People are warned how long their session can be inactive before they may lose information, unless more than 20 hours

  @2.5.6 @aaa @manual
  Rule: 2.5.6 Concurrent Input Mechanisms, Level AAA
    Scenario Outline: Interface supports multiple input modes, like mouse, touch, and voice

  # ----------------------------------------------------------------------------
  # Understandable
  # ----------------------------------------------------------------------------

  @3.3.1 @a @manual
  Rule: 3.3.1 Error Identification, Level A
    Scenario Outline: It's clear which inputs have errors, and errors are identified in text

  @3.3.2 @a @manual
  Rule: 3.3.2 Labels or Instructions, Level A
    Scenario Outline: Labels or instructions are provided for all inputs

  @3.3.3 @aa @manual
  Rule: 3.3.3 Error Suggestion, Level AA
    Scenario Outline: Error messages suggest how to correct them, unless this would jeopardise security or purpose

  @3.3.4 @aa @manual
  Rule: 3.3.4 Error Prevention (Legal, Financial, Data), Level AA
    Scenario Outline: People can go back, review, or confirm before irreversible form submissions

  @3.3.7 @a @manual
  Rule: 3.3.7 Redundant Entry, Level A
    Scenario Outline: People are not required to re-enter the same information twice

  @3.3.8 @aa @manual
  Rule: 3.3.8 Accessible Authentication (Minimum), Level AA
    Scenario Outline: Authentication does not rely on cognitive function tests

  @3.3.5 @aaa @manual
  Rule: 3.3.5 Help, Level AAA
    Scenario Outline: Context-sensitive help is available

  @3.3.6 @aaa @manual
  Rule: 3.3.6 Error Prevention (All), Level AAA
    Scenario Outline: All submissions reversible or confirm-able before finalising

  @3.3.9 @aaa @manual
  Rule: 3.3.9 Accessible Authentication (Enhanced), Level AAA
    Scenario Outline: Authentication requires no cognitive test
